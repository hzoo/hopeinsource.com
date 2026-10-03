import { afterAll, beforeAll, expect, test } from 'bun:test';
import * as pagefind from 'pagefind';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createEpisodeSearchHtml } from './build-search-index';
import { getQueryResults, hasVisibleSearchMatch, searchTerms, type PagefindData } from '../src/scripts/search-results';

interface NativeResult {
    id: string;
    score: number;
    words: number[];
    matchedMetaFields?: string[];
    data: () => Promise<PagefindData>;
}

interface NativeSearch {
    options: (options: { baseUrl: string; noWorker: boolean; ranking?: { metaWeights: { passage_speakers: number } } }) => Promise<void>;
    init: () => Promise<void>;
    search: (query: string, options?: { filters: { episode: string } }) => Promise<{ results: NativeResult[] }>;
    destroy: () => Promise<void>;
}

let directory: string;
let native: NativeSearch;
const nativeOptions = { baseUrl: '/', noWorker: true, ranking: { metaWeights: { passage_speakers: 0 } } };

const records = [
    {
        anchor: 'msg-21', seconds: '21', speaker: 'Henry',
        content: 'Creativity brings communities. Cities shelter babies, ladies watch the skies, and people keep running while others are dying. Sequoias grow.',
    },
    {
        anchor: 'msg-21-2', seconds: '21', speaker: 'Nadia',
        content: 'Sequoias grow too. I don’t know. It’s like God’s will. You’re right.',
    },
    {
        anchor: 'msg-42', seconds: '42', speaker: 'Henry',
        content: 'Open source software matters. Again, open source welcomes readers.',
    },
    { anchor: 'msg-65', seconds: '65', speaker: 'Nadia', content: 'Open source remains a gift.' },
    { anchor: 'msg-90', seconds: '90', speaker: 'Henry', content: 'We discuss creativity today.' },
    { anchor: 'msg-100', seconds: '100', speaker: 'Nadia', content: 'Our communities gather tomorrow.' },
    { anchor: 'msg-120', seconds: '120', speaker: 'Henry', content: 'This turn ends with open.' },
    { anchor: 'msg-121', seconds: '121', speaker: 'Nadia', content: 'Source starts another turn.' },
].map(record => ({
    url: `/conversation/#${record.anchor}`,
    content: record.content,
    meta: { title: 'Conversation', speaker: record.speaker, seconds: record.seconds, timestamp: `0:${record.seconds}` },
}));

beforeAll(async () => {
    directory = await mkdtemp(join(tmpdir(), 'his-native-search-'));
    const { index, errors } = await pagefind.createIndex();
    if (!index || errors.length) throw new Error(`Could not create test search index: ${errors.join('; ')}`);
    try {
        const added = await index.addHTMLFile({ url: '/conversation/', content: createEpisodeSearchHtml(records) });
        expect(added.errors).toEqual([]);
        const otherEpisode = await index.addHTMLFile({
            url: '/other/',
            content: createEpisodeSearchHtml([{
                url: '/other/#msg-7',
                content: 'Open source offers starlight.',
                meta: { title: 'Other Conversation', speaker: 'Guest', seconds: '7', timestamp: '0:07' },
            }]),
        });
        expect(otherEpisode.errors).toEqual([]);
        // A title that exists only in metadata must remain searchable independently
        // of spoken words and the speaker-attribution carrier.
        const metadataFixture = createEpisodeSearchHtml([{
            url: '/metadata-fixture/#msg-8',
            content: 'Nadia describes bluebirds.',
            meta: { title: 'Velarium', speaker: 'Henry', seconds: '8', timestamp: '0:08' },
        }]).replace('<h1 data-pagefind-meta="title">Velarium</h1>', '')
            .replace('<head>', '<head><meta data-pagefind-meta="title[content]" content="Velarium">');
        const metadataEpisode = await index.addHTMLFile({ url: '/metadata-fixture/', content: metadataFixture });
        expect(metadataEpisode.errors).toEqual([]);
        const written = await index.writeFiles({ outputPath: directory });
        expect(written.errors).toEqual([]);
    } finally {
        await index.deleteIndex();
        await pagefind.close();
    }
    // Exercise the shipped browser engine and its real WASM/index files, without a server.
    native = await import(`${directory}/pagefind.js`) as NativeSearch;
    await native.options(nativeOptions);
}, 10_000);

afterAll(async () => {
    await native?.destroy();
    if (directory) await rm(directory, { recursive: true, force: true });
});

/** The production UI attaches native per-term word offsets without loading extra fragments. */
async function hydrate(query: string, episode?: string): Promise<PagefindData[]> {
    const options = episode ? { filters: { episode } } : undefined;
    const resultSet = await native.search(query, options);
    const terms = searchTerms(query);
    const termSets = terms.length === 1
        ? [resultSet]
        : await Promise.all(terms.map(term => native.search(term, options)));
    const termMatches = termSets.map(set => new Map(set.results.map(result => [result.id, result.words])));
    const visibleTermIds = termSets.map(set => new Set(set.results.filter(hasVisibleSearchMatch).map(result => result.id)));
    const candidates = resultSet.results.filter(result => hasVisibleSearchMatch(result)
        && visibleTermIds.every(ids => ids.has(result.id)));
    return Promise.all(candidates.map(async result => ({
        ...await result.data(),
        term_locations: termMatches.map(matches => matches.get(result.id) ?? []),
    })));
}

async function passages(query: string): Promise<PagefindData[]> {
    return getQueryResults(await hydrate(query), query).filter(result => result.meta.seconds !== undefined);
}

test('real empty-heading fragments retain first-word offsets and duplicate-second speaker links', async () => {
    const [fragment] = await hydrate('sequoias');
    expect(fragment).toBeDefined();
    expect(fragment.anchors?.map(anchor => anchor.text)).toEqual(records.map(() => ''));
    const firstAnchor = fragment.anchors![0]!;
    expect(fragment.content!.split(/\s+/)[firstAnchor.location]).toBe('Creativity');
    expect(JSON.parse(fragment.meta.passage_speakers!)).toEqual(records.map(record => record.meta.speaker));

    // Pagefind does not split native sub-results at an empty heading; our canonical ranges do.
    expect(fragment.sub_results?.every(result => result.anchor === undefined)).toBe(true);
    const results = getQueryResults([fragment], 'sequoias');
    expect(results.map(result => result.url)).toEqual(['/conversation/#msg-21', '/conversation/#msg-21-2']);
    expect(results.map(result => result.meta.speaker)).toEqual(['Henry', 'Nadia']);
    expect(results.map(result => result.meta.seconds)).toEqual(['21', '21']);
});

test('native multiword morphology matches within one turn and retains its first spoken word', async () => {
    const results = await passages('creative community');
    expect(results.map(result => result.url)).toEqual(['/conversation/#msg-21']);
    expect(results[0]!.excerpt).toContain('<mark>Creativity</mark>');
    expect(results[0]!.excerpt).toContain('<mark>communities.</mark>');
    expect(results[0]!.raw_content).toBe(records[0]!.content);
    // Creativity and communities also occur in separate later turns; those are not matches.
    expect(results.some(result => /#msg-(90|100)$/.test(result.url))).toBe(false);
});

test('the native short-root matches survive the prefix-fallback guard', async () => {
    for (const query of ['city', 'sky', 'baby', 'lady', 'die', 'run']) {
        const results = await passages(query);
        expect(results.map(result => result.url)).toEqual(['/conversation/#msg-21']);
    }
});

test('straight and curly apostrophe queries preserve podcast contractions and possessives', async () => {
    for (const query of ["don't know", 'don’t know', "it's like", 'it’s like', "God's will", 'God’s will', "you're right", 'you’re right']) {
        const results = await passages(query);
        expect(results.map(result => result.url)).toEqual(['/conversation/#msg-21-2']);
        expect(results[0]!.meta.speaker).toBe('Nadia');
    }
});

test('quoted search returns every matching turn and every occurrence inside a turn', async () => {
    const [fragment] = await hydrate('"open source"', '/conversation/');
    expect(fragment).toBeDefined();
    // The native exact search only supplies its first phrase hit in this document.
    expect(fragment.locations).toHaveLength(2);
    const results = getQueryResults([fragment], '"open source"');
    expect(results.map(result => result.url)).toEqual(['/conversation/#msg-42', '/conversation/#msg-65']);
    expect(results[0]!.locations).toHaveLength(4);
    expect(results[1]!.locations).toHaveLength(2);
    expect(results.map(result => result.meta.speaker)).toEqual(['Henry', 'Nadia']);
    expect(results[0]!.excerpt.match(/<mark>open<\/mark>/gi)).toHaveLength(2);
});

test('native episode filtering excludes other fragments before passage hydration', async () => {
    const all = await hydrate('open source');
    expect(all.map(result => result.url).sort()).toEqual(['/conversation/', '/other/']);
    const scoped = await hydrate('open source', '/conversation/');
    expect(scoped.map(result => result.url)).toEqual(['/conversation/']);
    expect(getQueryResults(scoped, 'open source').map(result => result.url).sort())
        .toEqual(['/conversation/#msg-42', '/conversation/#msg-65']);
    const other = await hydrate('open source', '/other/');
    expect(getQueryResults(other, 'open source').map(result => result.url)).toEqual(['/other/#msg-7']);
});

test('an episode miss never falls back to matching passages elsewhere', async () => {
    expect(getQueryResults(await hydrate('starlight'), 'starlight').map(result => result.url))
        .toEqual(['/other/#msg-7']);
    expect(await hydrate('starlight', '/conversation/')).toEqual([]);
    expect(await hydrate('open source', '/missing/')).toEqual([]);
    const scopedMorphology = getQueryResults(await hydrate('creative community', '/conversation/'), 'creative community');
    expect(scopedMorphology.map(result => result.url)).toEqual(['/conversation/#msg-21']);
});

test('quoted phrases never join neighboring speaker turns or reverse word order', async () => {
    const fragments = await hydrate('creative community');
    expect(getQueryResults(fragments, '"today our"')).toEqual([]);
    expect(getQueryResults(fragments, '"source open"')).toEqual([]);
    // The last two turns contain open / source across their boundary, but add no phrase hit.
    expect(getQueryResults(fragments, '"open source"').map(result => result.url))
        .toEqual(['/conversation/#msg-42', '/conversation/#msg-65']);
});

test('a failed native fragment needs a lifecycle restart and fresh result handles to recover', async () => {
    // Start from an empty native cache so this request exercises the real fetch path.
    await native.destroy();
    await native.options(nativeOptions);
    const first = (await native.search('starlight')).results[0]!;
    const originalFetch = globalThis.fetch;
    let fragmentRequests = 0;
    let abortNextFragment = true;
    globalThis.fetch = Object.assign(async (request: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1]) => {
        const url = request instanceof Request ? request.url : String(request);
        if (url.includes('/fragment/')) {
            fragmentRequests++;
            if (abortNextFragment) {
                abortNextFragment = false;
                throw new DOMException('Simulated fragment abort', 'AbortError');
            }
        }
        return originalFetch(request, options);
    }, originalFetch);
    try {
        expect(await first.data().catch((error: Error) => error.message)).toBe('Simulated fragment abort');
        expect(await first.data().catch((error: Error) => error.message)).toBe('Simulated fragment abort');
        const sameInstance = (await native.search('starlight')).results[0]!;
        expect(await sameInstance.data().catch((error: Error) => error.message)).toBe('Simulated fragment abort');
        expect(fragmentRequests).toBe(1);

        // The documented public lifecycle discards rejected caches. Old handles
        // still point at the old instance, so pagination must acquire new ones.
        await native.destroy();
        await native.options(nativeOptions);
        await native.init();
        const restarted = (await native.search('starlight')).results[0]!;
        expect(restarted.id).toBe(first.id);
        const recovered = await restarted.data();
        expect(recovered.url).toBe('/other/');
        expect(getQueryResults([recovered], 'starlight').map(result => result.url)).toEqual(['/other/#msg-7']);
        expect(fragmentRequests).toBe(2);
        expect(await first.data().catch((error: Error) => error.message)).toBe('Simulated fragment abort');
        expect(fragmentRequests).toBe(2);
    } finally {
        globalThis.fetch = originalFetch;
        await native.destroy();
        await native.options(nativeOptions);
    }
});

test('native carrier-only matches are excluded before hydration and zero weighting survives restart', async () => {
    const originalFetch = globalThis.fetch;
    let fragmentRequests = 0;
    globalThis.fetch = Object.assign(async (request: Parameters<typeof fetch>[0], options?: Parameters<typeof fetch>[1]) => {
        const url = request instanceof Request ? request.url : String(request);
        if (url.includes('/fragment/')) fragmentRequests++;
        return originalFetch(request, options);
    }, originalFetch);
    try {
        // Establish that the real engine searches the display-only carrier and
        // gives it positive relevance with its default configuration.
        await native.destroy();
        await native.options({ baseUrl: '/', noWorker: true });
        const defaultCarriers = (await native.search('Henry')).results;
        expect(defaultCarriers).toHaveLength(2);
        expect(defaultCarriers.every(result => result.score > 0)).toBe(true);
        expect(defaultCarriers.every(result => result.words.length === 0)).toBe(true);
        expect(defaultCarriers.every(result => result.matchedMetaFields?.includes('passage_speakers'))).toBe(true);
        await Promise.all(defaultCarriers.filter(hasVisibleSearchMatch).map(result => result.data()));
        expect(fragmentRequests).toBe(0);

        for (let initialization = 0; initialization < 2; initialization++) {
            await native.destroy();
            await native.options(nativeOptions);
            await native.init();
            const carriers = (await native.search('Henry')).results;
            expect(carriers).toHaveLength(2);
            expect(carriers.every(result => result.score === 0)).toBe(true);
            expect(carriers.filter(hasVisibleSearchMatch)).toEqual([]);
            const beforeHydration = fragmentRequests;
            await Promise.all(carriers.filter(hasVisibleSearchMatch).map(result => result.data()));
            expect(fragmentRequests).toBe(beforeHydration);

            // A whole-query hit has spoken offsets even when one of its terms
            // exists only in speaker metadata. Native per-term descriptors must
            // reject that mixed candidate before the first fragment is fetched.
            const mixedCarrier = (await native.search('Henry bluebirds')).results;
            expect(mixedCarrier.filter(hasVisibleSearchMatch)).toHaveLength(1);
            expect(await hydrate('Henry bluebirds')).toEqual([]);
            expect(fragmentRequests).toBe(beforeHydration);
            const spokenPair = await hydrate('Nadia bluebirds');
            const pairedPassages = getQueryResults(spokenPair, 'Nadia bluebirds');
            expect(pairedPassages.map(result => result.url)).toEqual(['/metadata-fixture/#msg-8']);
            expect(pairedPassages[0]!.excerpt).toContain('<mark>Nadia</mark>');
            expect(pairedPassages[0]!.excerpt).toContain('<mark>bluebirds.</mark>');
            expect(fragmentRequests).toBe(beforeHydration + 1);

            // Nadia is spoken in one episode but otherwise exists only in the
            // attribution carrier. Only the spoken result should fetch a fragment.
            const names = (await native.search('Nadia')).results;
            expect(names.some(result => !hasVisibleSearchMatch(result))).toBe(true);
            const visibleNames = names.filter(hasVisibleSearchMatch);
            expect(visibleNames).toHaveLength(1);
            expect(visibleNames[0]!.score).toBeGreaterThan(0);
            const spoken = await visibleNames[0]!.data();
            expect(getQueryResults([spoken], 'Nadia').map(result => result.url)).toEqual(['/metadata-fixture/#msg-8']);
            expect(getQueryResults([spoken], 'Nadia')[0]!.meta.speaker).toBe('Henry');
            expect(fragmentRequests).toBe(beforeHydration + 1);

            const titles = (await native.search('Velarium')).results;
            expect(titles).toHaveLength(1);
            expect(titles[0]!.words).toEqual([]);
            expect(titles[0]!.matchedMetaFields).toContain('title');
            expect(titles[0]!.score).toBeGreaterThan(0);
            expect(titles.filter(hasVisibleSearchMatch)).toHaveLength(1);
            const title = await hydrate('Velarium');
            expect(title).toHaveLength(1);
            expect(title[0]!.term_locations).toEqual([[]]);
            expect(getQueryResults(title, 'Velarium').map(result => result.url)).toEqual(['/metadata-fixture/']);
            const exactTitle = await hydrate('"Velarium"');
            expect(exactTitle).toHaveLength(1);
            expect(exactTitle[0]!.term_locations).toEqual([[]]);
            expect(getQueryResults(exactTitle, '"Velarium"').map(result => result.url)).toEqual(['/metadata-fixture/']);
            // The same episode fragment is reused for its title and spoken hit.
            expect(fragmentRequests).toBe(beforeHydration + 1);
        }
    } finally {
        globalThis.fetch = originalFetch;
        await native.destroy();
        await native.options(nativeOptions);
    }
});

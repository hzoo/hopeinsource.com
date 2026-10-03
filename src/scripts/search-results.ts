import { normalizeSearchWord } from './search-spelling';

export interface PagefindResult {
    id?: string;
    words?: number[];
    matchedMetaFields?: string[];
    data: () => Promise<PagefindData>;
}

/** Speaker attribution is display data; a metadata-only hit has no destination. */
export function hasVisibleSearchMatch(result: PagefindResult): boolean {
    const fields = result.matchedMetaFields ?? [];
    return fields.length === 0 || !!result.words?.length
        || fields.some(field => field !== 'passage_speakers');
}

export interface PagefindAnchor {
    id: string;
    element: string;
    text: string;
    location: number;
}

export interface PagefindSubResult {
    url: string;
    excerpt: string;
    plain_excerpt?: string;
    locations: number[];
    anchor?: PagefindAnchor;
}

export interface PagefindData {
    url: string;
    excerpt: string;
    plain_excerpt?: string;
    content?: string;
    raw_content?: string;
    locations?: number[];
    anchors?: PagefindAnchor[];
    sub_results?: PagefindSubResult[];
    /** Native Pagefind offsets for each meaningful term; no extra fragments loaded. */
    term_locations?: number[][];
    match_span?: number;
    meta: {
        title: string;
        speaker?: string;
        timestamp?: string;
        seconds?: string;
        passage_speakers?: string;
    };
}

const MESSAGE_ID = /^msg-(\d+(?:\.\d+)?)(?:-\d+)?$/;
const FILLER_WORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with',
]);
const ACKNOWLEDGMENT_WORDS = new Set([
    'ah', 'aha', 'cool', 'exactly', 'ha', 'hah', 'hm', 'hmm', 'huh',
    'laugh', 'laughing', 'laughs', 'laughter', 'mhm', 'mm', 'mmhmm', 'mmm',
    'nice', 'oh', 'ok', 'okay', 'right', 'sure', 'uh', 'um', 'wow',
    'yeah', 'yep', 'yup',
]);

/** Backchannels are useful context, but rarely the best unquoted search destination. */
function isBriefAcknowledgment(content: string): boolean {
    let count = 0;
    for (const [word] of decodeSearchText(content).matchAll(/[\p{L}\p{N}]+/gu)) {
        if (++count > 6 || !ACKNOWLEDGMENT_WORDS.has(normalizeSearchWord(word))) return false;
    }
    return count > 0;
}

export function searchTerms(query: string): string[] {
    const words = query.toLowerCase().replace(/['’]/g, '').match(/[\p{L}\p{N}]+/gu) ?? [];
    const meaningful = words.filter(word => !FILLER_WORDS.has(word));
    return [...new Set(meaningful.length ? meaningful : words)];
}

export function escapeSearchText(text: string): string {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function decodeSearchText(text: string): string {
    return text.replace(/&(amp|lt|gt|quot|#39);/g, (_, entity: string) => ({
        amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'",
    })[entity] ?? '');
}

function wordsFor(result: PagefindData): string[] {
    return (result.content ?? result.raw_content ?? '').split(/[\r\n\s]+/);
}

function passageRanges(result: PagefindData, words: string[]) {
    const anchors = (result.anchors ?? []).filter(anchor => MESSAGE_ID.test(anchor.id))
        .sort((a, b) => a.location - b.location);
    let speakers: string[] = [];
    try { speakers = JSON.parse(result.meta.passage_speakers ?? '[]'); } catch { /* Older indexes have labels. */ }
    return anchors.map((anchor, index) => ({
        anchor,
        start: anchor.location + (anchor.text.trim() ? anchor.text.trim().split(/\s+/).length : 0),
        end: anchors[index + 1]?.location ?? words.length,
        speaker: speakers[index] ?? anchor.text.match(/^\[[^\]]+\]\s+(.*):$/)?.[1],
    }));
}

/** Find the tightest cluster containing each native query term. */
function bestCluster(locations: number[], terms?: number[][]): { start: number; span: number } {
    if (!terms?.length || terms.some(term => !term.length)) return { start: locations[0], span: Infinity };
    const hits = terms.flatMap((positions, term) => positions.map(position => ({ position, term })))
        .sort((a, b) => a.position - b.position);
    const counts = new Array<number>(terms.length).fill(0);
    let covered = 0;
    let left = 0;
    let start = locations[0];
    let span = Infinity;
    for (let right = 0; right < hits.length; right++) {
        if (counts[hits[right].term]++ === 0) covered++;
        while (covered === terms.length) {
            const width = hits[right].position - hits[left].position;
            if (width < span) { span = width; start = hits[left].position; }
            if (--counts[hits[left++].term] === 0) covered--;
        }
    }
    return { start, span };
}

function excerptAt(words: string[], start: number, end: number, locations: number[], focus: number, span: number): string {
    // Reduce leading context when necessary to keep a fitting query cluster visible.
    const leadingContext = span < 32 ? Math.min(10, 31 - span) : 10;
    const first = Math.max(start, focus - leadingContext);
    const last = Math.min(end, first + 32);
    const marked = new Set(locations);
    const text = words.slice(first, last).map((word, index) => {
        const safe = escapeSearchText(decodeSearchText(word));
        return marked.has(first + index) ? `<mark>${safe}</mark>` : safe;
    }).join(' ');
    return `${first > start ? '… ' : ''}${text}${last < end ? ' …' : ''}`;
}

/**
 * Empty headings retain canonical anchors but Pagefind omits them from its native
 * excerpt list. Use the public content/locations directly, with one result per turn.
 */
export function getPassageResults(result: PagefindData): PagefindData[] {
    const words = wordsFor(result);
    const ranges = passageRanges(result, words);
    const locations = result.locations ?? (result.sub_results ?? []).flatMap(sub => sub.locations);
    const passages = ranges.flatMap(range => {
        const hits = locations.filter(location => location >= range.start && location < range.end);
        if (!hits.length) return [];
        const termHits = result.term_locations?.map(term => term.filter(location => location >= range.start && location < range.end));
        const cluster = bestCluster(hits, termHits);
        const content = words.slice(range.start, range.end).join(' ');
        return [{
            acknowledgmentRank: isBriefAcknowledgment(content) ? 1 : 0,
            result: {
                url: `${result.url.split('#')[0]}#${range.anchor.id}`,
                excerpt: excerptAt(words, range.start, range.end, hits, cluster.start, cluster.span),
                raw_content: content,
                content,
                locations: hits,
                term_locations: termHits?.map(term => term.map(location => location - range.start)),
                match_span: cluster.span,
                meta: { ...result.meta, seconds: range.anchor.id.match(MESSAGE_ID)![1], speaker: range.speaker ?? result.meta.speaker },
            },
        }];
    });
    // Preserve every turn: substantive matches precede brief backchannels, then
    // the best term cluster wins. Equal matches retain conversation order.
    passages.sort((a, b) => a.acknowledgmentRank - b.acknowledgmentRank
        || a.result.match_span - b.result.match_span);
    const titleEnd = ranges[0]?.anchor.location ?? words.length;
    return [{
        url: result.url, excerpt: '', locations: [], content: words.slice(0, titleEnd).join(' '),
        term_locations: result.term_locations?.map(term => term.filter(location => location < titleEnd)),
        meta: result.meta,
    }, ...passages.map(passage => passage.result)];
}

/**
 * Native stemming decides the matches. Reject drastic prefix fallback (a typo such
 * as "coniviality" returning "cons") rather than presenting it as a real match.
 */
function compatibleWord(word: string, term: string): boolean {
    const normalized = normalizeSearchWord(decodeSearchText(word)).replace(/['’]/g, '');
    const query = normalizeSearchWord(term);
    const tokens = normalized.match(/[\p{L}\p{N}]+/gu) ?? [];
    return tokens.some(token => {
        if (token === query || token.startsWith(query)) return true;
        let prefix = 0;
        while (prefix < Math.min(token.length, query.length) && token[prefix] === query[prefix]) prefix++;
        if (prefix >= (query.length <= 4 ? Math.max(1, query.length - 2) : 4)) return true;
        if (/ies$/.test(query) && token.length <= 4 && prefix >= query.length - 3) return true;
        // Native short roots such as run/running and die/dying are still useful.
        return prefix >= 1 && token.length <= 3 && /(?:ing|ed|s)$/.test(query)
            && query.length - prefix <= 4;
    });
}

function matchesTerms(result: PagefindData, terms: string[]): boolean {
    // Title metadata can match without body offsets (for example a HEAD title).
    if (result.term_locations && result.meta.seconds !== undefined) {
        const words = wordsFor(result);
        return terms.every((term, index) => result.term_locations?.[index]?.some(location => compatibleWord(words[location] ?? '', term)));
    }
    // Title metadata and older indexes still reject unrelated prefix fallback.
    const text = result.meta.seconds === undefined ? result.meta.title : result.raw_content ?? result.plain_excerpt ?? '';
    const words = text.match(/[\p{L}\p{N}]+/gu) ?? [];
    return terms.length > 0 && terms.every(term => words.some(word => compatibleWord(word, term)));
}

/** Normalize a complete smart-quoted phrase for Pagefind without changing the input. */
export function normalizeSearchQuery(query: string): string {
    return query.replace(/^(\s*)“([^“”"]+)”(\s*)$/u, '$1"$2"$3');
}

/** Fully quoted queries are exact, and all matching turns are returned. */
function exactPhrase(query: string): string[] | null {
    const phrase = normalizeSearchQuery(query).trim().match(/^"([^"]+)"$/)?.[1];
    return phrase ? (normalizeSearchWord(phrase).replace(/['’]/g, '').match(/[\p{L}\p{N}]+/gu) ?? []) : null;
}

function phraseLocations(words: string[], phrase: string[], start: number, end: number): number[] {
    const tokens = words.slice(start, end).flatMap((word, index) =>
        (normalizeSearchWord(decodeSearchText(word)).replace(/['’]/g, '').match(/[\p{L}\p{N}]+/gu) ?? []).map(text => ({ text, location: start + index })),
    );
    const locations = new Set<number>();
    for (let index = 0; index <= tokens.length - phrase.length; index++) {
        if (phrase.every((word, offset) => word === tokens[index + offset].text)) {
            for (let offset = 0; offset < phrase.length; offset++) locations.add(tokens[index + offset].location);
        }
    }
    return [...locations];
}

function phraseResults(result: PagefindData, phrase: string[]): PagefindData[] {
    const words = wordsFor(result);
    const titleWords = result.meta.title.split(/\s+/);
    const ranges = passageRanges(result, words);
    const matches: PagefindData[] = [];
    if (phraseLocations(titleWords, phrase, 0, titleWords.length).length
        || phraseLocations(words, phrase, 0, ranges[0]?.anchor.location ?? words.length).length) {
        matches.push({ url: result.url, excerpt: '', locations: [], meta: result.meta });
    }
    for (const range of ranges) {
        const locations = phraseLocations(words, phrase, range.start, range.end);
        if (!locations.length) continue;
        const start = Math.max(range.start, locations[0] - 10);
        const end = Math.min(range.end, Math.max(start + 32, locations[0] + phrase.length));
        const marked = new Set(locations);
        const excerpt = words.slice(start, end).map((word, index) => {
            const text = escapeSearchText(decodeSearchText(word));
            return marked.has(start + index) ? `<mark>${text}</mark>` : text;
        }).join(' ');
        matches.push({
            url: `${result.url.split('#')[0]}#${range.anchor.id}`,
            excerpt: `${start > range.start ? '… ' : ''}${excerpt}${end < range.end ? ' …' : ''}`,
            locations,
            meta: { ...result.meta, seconds: range.anchor.id.match(MESSAGE_ID)![1], speaker: range.speaker },
        });
    }
    return matches;
}

export function getQueryResults(results: PagefindData[], query: string): PagefindData[] {
    const phrase = exactPhrase(query);
    if (phrase) return results.flatMap(result => phraseResults(result, phrase));
    const terms = searchTerms(query);
    return results.flatMap(getPassageResults).filter(result =>
        (result.meta.seconds === undefined || (result.locations?.length ?? 0) > 0)
        && matchesTerms(result, terms));
}

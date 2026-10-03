import { expect, test } from 'bun:test';
import { loadSearchVocabulary, normalizeSearchWord, suggestQuery, type SearchVocabulary } from './search-spelling';

const vocabulary: SearchVocabulary = { version: 1, words: [
    ['open', 200], ['source', 100], ['sauce', 2], ['community', 300],
    ['conviviality', 12], ['embodiment', 50], ['maggie', 12], ['appleton', 10],
    ['react', 3], ['naive', 5], ['new', 50], ['communities', 200],
    ['project', 90], ['projects', 45], ['the', 500],
] };

test('podcast concept typos get small, explicit full-query suggestions', () => {
    expect(suggestQuery('open souce', vocabulary)[0]).toBe('open source');
    expect(suggestQuery('communtiy', vocabulary)).toEqual(['community']);
    expect(suggestQuery('coniviality', vocabulary)).toEqual(['conviviality']);
    expect(suggestQuery('embodimnet', vocabulary)).toEqual(['embodiment']);
    expect(suggestQuery('Maggie Appelton', vocabulary)).toEqual(['Maggie Appleton']);
});

test('exact words, quoted phrases, short terms, and identifiers are never rewritten', () => {
    for (const query of ['open source', 'open sauce', 'new', 'npm', 'JSX', 'sou', 'open "souce"',
        '“communtiy”', "'open souce'", 'source_communtiy', 'communtiy42', 'communtiy.foo', 'myCommuntiy', 'COMMUNTIY']) {
        expect(suggestQuery(query, vocabulary)).toEqual([]);
    }
});

test('case and diacritics normalize without changing already-known query words', () => {
    expect(normalizeSearchWord('NAÏVE')).toBe('naive');
    expect(suggestQuery('Naïve', vocabulary)).toEqual([]);
    expect(suggestQuery('OPEN souce!', vocabulary)[0]).toBe('OPEN source!');
});

test('two edits require long words; suggestions preserve surrounding text', () => {
    expect(suggestQuery('comunty', vocabulary)).toEqual([]);
    expect(suggestQuery('communtes', vocabulary)).toContain('communities');
    expect(suggestQuery('the communtiy projct?', vocabulary)[0]).toBe('the community project?');
    expect(suggestQuery('zyxwvut', vocabulary)).toEqual([]);
});

test('nearest spellings outrank more frequent but more distant words and remain capped', () => {
    const many: SearchVocabulary = { version: 1, words: [
        ['community', 5], ['communities', 20000], ['commanity', 1], ['commenity', 2], ['commxnity', 3],
    ] };
    const suggestions = suggestQuery('commqnity', many);
    expect(suggestions[0]).toBe('community');
    expect(suggestions).toHaveLength(3);
    expect(suggestions).not.toContain('communities');
});

test('the optional dictionary loads once through a revalidated manifest and immutable asset', async () => {
    const originalFetch = globalThis.fetch;
    const requests: Array<{ url: string; cache?: RequestCache }> = [];
    globalThis.fetch = Object.assign(async (url: string | URL | Request, options?: RequestInit) => {
        requests.push({ url: String(url), cache: options?.cache });
        return Response.json(requests.length === 1
            ? { url: '/pagefind/vocabulary-0123456789abcdef.json' } : vocabulary);
    }, { preconnect: originalFetch.preconnect }) as typeof fetch;
    try {
        // Pure suggestions do not fetch the corpus.
        suggestQuery('communtiy', vocabulary);
        expect(requests).toEqual([]);
        const [first, second] = await Promise.all([loadSearchVocabulary(), loadSearchVocabulary()]);
        expect(first).toEqual(vocabulary);
        expect(second).toBe(first);
        expect(requests).toEqual([
            { url: '/pagefind/vocabulary.json', cache: 'no-cache' },
            { url: '/pagefind/vocabulary-0123456789abcdef.json', cache: 'force-cache' },
        ]);
    } finally {
        globalThis.fetch = originalFetch;
    }
});

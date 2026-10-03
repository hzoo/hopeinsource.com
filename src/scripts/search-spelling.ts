/** Optional, corpus-specific spelling help. Fetch only after no validated search results. */
export interface SearchVocabulary {
    version: 1;
    /** Normalized transcript/title words with their corpus frequency. */
    words: Array<[string, number]>;
}

interface VocabularyEntry { word: string; frequency: number }
interface PreparedVocabulary {
    known: Set<string>;
    lengths: Map<number, VocabularyEntry[]>;
}

const prepared = new WeakMap<SearchVocabulary, PreparedVocabulary>();
let vocabularyRequest: Promise<SearchVocabulary | null> | null = null;

export function normalizeSearchWord(word: string): string {
    return word.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();
}

/** The manifest revalidates; the named vocabulary is immutable for that build. */
export function loadSearchVocabulary(): Promise<SearchVocabulary | null> {
    if (!vocabularyRequest) {
        vocabularyRequest = (async () => {
            try {
                const manifestResponse = await fetch('/pagefind/vocabulary.json', { cache: 'no-cache' });
                if (!manifestResponse.ok) return null;
                const manifest: unknown = await manifestResponse.json();
                if (!manifest || typeof manifest !== 'object' || !('url' in manifest)
                    || typeof manifest.url !== 'string'
                    || !/^\/pagefind\/vocabulary-[a-f0-9]{16}\.json$/.test(manifest.url)) return null;
                const response = await fetch(manifest.url, { cache: 'force-cache' });
                if (!response.ok) return null;
                const vocabulary: unknown = await response.json();
                if (!isSearchVocabulary(vocabulary)) return null;
                return vocabulary;
            } catch {
                // Optional spelling help must never turn an empty search into an error.
                return null;
            }
        })();
    }
    return vocabularyRequest;
}

function isSearchVocabulary(value: unknown): value is SearchVocabulary {
    return !!value && typeof value === 'object' && 'version' in value && value.version === 1
        && 'words' in value && Array.isArray(value.words)
        && value.words.every((entry: unknown) => Array.isArray(entry) && entry.length === 2
            && typeof entry[0] === 'string' && /^[\p{L}]+$/u.test(entry[0])
            && typeof entry[1] === 'number' && Number.isFinite(entry[1]) && entry[1] > 0);
}

function prepare(vocabulary: SearchVocabulary): PreparedVocabulary {
    const cached = prepared.get(vocabulary);
    if (cached) return cached;
    const known = new Set<string>();
    const lengths = new Map<number, VocabularyEntry[]>();
    for (const [word, frequency] of vocabulary.words) {
        known.add(word);
        const entries = lengths.get(word.length) ?? [];
        entries.push({ word, frequency });
        lengths.set(word.length, entries);
    }
    const result = { known, lengths };
    prepared.set(vocabulary, result);
    return result;
}

/** Bounded Damerau–Levenshtein (adjacent transpositions count as one edit). */
function spellingDistance(a: string, b: string, limit: number): number {
    if (Math.abs(a.length - b.length) > limit) return limit + 1;
    if (a === b) return 0;

    // Most candidates fail the cheap one-edit scan without allocating a matrix.
    let i = 0;
    while (i < Math.min(a.length, b.length) && a[i] === b[i]) i++;
    let tailA = a.slice(i);
    let tailB = b.slice(i);
    const equalTail = a.length === b.length
        ? tailA.slice(1) === tailB.slice(1)
            || (tailA[0] === tailB[1] && tailA[1] === tailB[0] && tailA.slice(2) === tailB.slice(2))
        : a.length > b.length ? tailA.slice(1) === tailB : tailA === tailB.slice(1);
    if (equalTail) return 1;
    if (limit === 1) return 2;

    // A common prefix/suffix contributes no edits and reduces the bounded scan.
    let endA = a.length;
    let endB = b.length;
    while (endA > i && endB > i && a[endA - 1] === b[endB - 1]) { endA--; endB--; }
    tailA = a.slice(i, endA);
    tailB = b.slice(i, endB);
    if (!tailA.length || !tailB.length) return Math.max(tailA.length, tailB.length);
    const outside = limit + 1;
    let previousPrevious: number[] = [];
    let previous = Array.from({ length: tailB.length + 1 }, (_, column) => column);
    for (let row = 1; row <= tailA.length; row++) {
        const current = new Array<number>(tailB.length + 1).fill(outside);
        current[0] = row;
        let rowMinimum = outside;
        for (let column = Math.max(1, row - limit); column <= Math.min(tailB.length, row + limit); column++) {
            current[column] = Math.min(
                previous[column] + 1,
                current[column - 1] + 1,
                previous[column - 1] + (tailA[row - 1] === tailB[column - 1] ? 0 : 1),
            );
            if (row > 1 && column > 1 && tailA[row - 1] === tailB[column - 2] && tailA[row - 2] === tailB[column - 1]) {
                current[column] = Math.min(current[column], previousPrevious[column - 2] + 1);
            }
            rowMinimum = Math.min(rowMinimum, current[column]);
        }
        if (rowMinimum > limit) return outside;
        previousPrevious = previous;
        previous = current;
    }
    return previous[tailB.length];
}

function alternatives(word: string, vocabulary: PreparedVocabulary): VocabularyEntry[] {
    const limit = word.length >= 9 ? 2 : 1;
    const candidates: Array<VocabularyEntry & { distance: number }> = [];
    for (let length = Math.max(4, word.length - limit); length <= word.length + limit; length++) {
        for (const entry of vocabulary.lengths.get(length) ?? []) {
            const distance = spellingDistance(word, entry.word, limit);
            if (distance <= limit) candidates.push({ ...entry, distance });
        }
    }
    candidates.sort((a, b) => a.distance - b.distance || b.frequency - a.frequency || a.word.localeCompare(b.word));
    // Do not broaden to two edits when a one-edit spelling exists.
    return candidates.filter(candidate => candidate.distance === candidates[0]?.distance).slice(0, 3);
}

/**
 * Return at most three explicit full-query suggestions; never rewrite the input.
 * Exact vocabulary, quoted phrases, short words, and code identifiers stay intact.
 * One edit is allowed, including transposition; two edits require a nine-letter word.
 */
export function suggestQuery(query: string, vocabulary: SearchVocabulary): string[] {
    if (!query.trim() || query.length > 160 || /["“”]|(?:^|\s)['‘].+['’](?:\s|$)/u.test(query)) return [];
    const tokens = [...query.matchAll(/[\p{L}\p{M}]+/gu)];
    if (!tokens.length || tokens.length > 12) return [];
    const dictionary = prepare(vocabulary);
    const misspellings: Array<{ index: number; length: number; words: VocabularyEntry[] }> = [];
    for (const token of tokens) {
        const word = normalizeSearchWord(token[0]);
        if (dictionary.known.has(word) || word.length < 4) continue;
        const index = token.index;
        // Protect snake/camel case, all-capital abbreviations, URLs, and numbered identifiers.
        if (/\p{Ll}\p{Lu}|^\p{Lu}+$/u.test(token[0])
            || /[\p{N}_./:@]/u.test(query[index - 1] ?? '')
            || /[\p{N}_/:@]/u.test(query[index + token[0].length] ?? '')
            || /^\.\p{L}/u.test(query.slice(index + token[0].length))) continue;
        const words = alternatives(word, dictionary);
        if (!words.length) return [];
        misspellings.push({ index, length: token[0].length, words });
    }
    if (!misspellings.length || misspellings.length > 2) return [];

    // Prefer the most likely spelling of all misspelled terms, then vary one term.
    const choices = [misspellings.map(() => 0)];
    for (let term = 0; term < misspellings.length; term++) {
        for (let choice = 1; choice < misspellings[term].words.length; choice++) {
            choices.push(misspellings.map((_, index) => index === term ? choice : 0));
        }
    }
    return choices.slice(0, 3).map(choice => {
        let suggestion = query;
        for (let term = misspellings.length - 1; term >= 0; term--) {
            const spelling = misspellings[term];
            const word = spelling.words[choice[term]].word;
            const replacement = /^\p{Lu}/u.test(query.slice(spelling.index, spelling.index + spelling.length))
                ? word[0].toUpperCase() + word.slice(1) : word;
            suggestion = suggestion.slice(0, spelling.index) + replacement
                + suggestion.slice(spelling.index + spelling.length);
        }
        return suggestion;
    });
}

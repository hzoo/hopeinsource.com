import { createHash } from 'node:crypto';
import { normalizeSearchWord, type SearchVocabulary } from '../src/scripts/search-spelling';

interface VocabularyRecord {
    url: string;
    content: string;
    meta: { title: string; speaker: string };
}

/** Derive spelling candidates from rendered dialogue and actual episode/guest names. */
export function buildSearchVocabulary(records: VocabularyRecord[]): SearchVocabulary {
    const frequencies = new Map<string, number>();
    const count = (text: string, weight = 1) => {
        for (const token of text.match(/[\p{L}\p{M}]+/gu) ?? []) {
            const word = normalizeSearchWord(token);
            if (word.length < 2 || word.length > 40) continue;
            frequencies.set(word, (frequencies.get(word) ?? 0) + weight);
        }
    };
    const episodes = new Set<string>();
    const speakers = new Set<string>();
    for (const record of records) {
        count(record.content);
        const url = record.url.split('#')[0];
        if (!episodes.has(url)) { count(record.meta.title, 8); episodes.add(url); }
        if (!speakers.has(record.meta.speaker)) { count(record.meta.speaker, 8); speakers.add(record.meta.speaker); }
    }
    return { version: 1, words: [...frequencies].sort(([a], [b]) => a.localeCompare(b, 'en')) };
}

/** Hashed filenames allow immutable caching without mixing deploy generations. */
export function vocabularyAsset(vocabulary: SearchVocabulary): { filename: string; content: string; manifest: string } {
    const content = JSON.stringify(vocabulary);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 16);
    const filename = `vocabulary-${hash}.json`;
    return { filename, content, manifest: JSON.stringify({ url: `/pagefind/${filename}` }) };
}

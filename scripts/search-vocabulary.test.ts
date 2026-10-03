import { expect, test } from 'bun:test';
import { buildSearchVocabulary, vocabularyAsset } from './search-vocabulary';
import { suggestQuery } from '../src/scripts/search-spelling';

test('the vocabulary uses only rendered dialogue and real title/speaker names', () => {
    const vocabulary = buildSearchVocabulary([
        { url: '/episode/#msg-0', content: 'Open source and community. Naïve naïve.', meta: { title: 'Maggie Appleton', speaker: 'Henry' } },
        { url: '/episode/#msg-2', content: 'Community.', meta: { title: 'Maggie Appleton', speaker: 'Henry' } },
    ]);
    const words = new Map(vocabulary.words);
    expect(words.get('community')).toBe(2);
    expect(words.get('naive')).toBe(2);
    expect(words.get('appleton')).toBe(8);
    expect(words.get('henry')).toBe(8);
    expect(words.has('episode')).toBe(false);
    expect(suggestQuery('Maggie Appelton', vocabulary)).toEqual(['Maggie Appleton']);
});

test('dictionary order/hash is stable and changed content gets a new immutable URL', () => {
    const first = buildSearchVocabulary([{ url: '/one/', content: 'open source', meta: { title: 'One', speaker: 'Henry' } }]);
    const same = buildSearchVocabulary([{ url: '/one/', content: 'source open', meta: { title: 'One', speaker: 'Henry' } }]);
    expect(vocabularyAsset(first)).toEqual(vocabularyAsset(same));
    const asset = vocabularyAsset(first);
    expect(asset.filename).toMatch(/^vocabulary-[a-f0-9]{16}\.json$/);
    expect(JSON.parse(asset.manifest)).toEqual({ url: `/pagefind/${asset.filename}` });
    const changed = buildSearchVocabulary([{ url: '/one/', content: 'open source community', meta: { title: 'One', speaker: 'Henry' } }]);
    expect(vocabularyAsset(changed).filename).not.toBe(asset.filename);
});

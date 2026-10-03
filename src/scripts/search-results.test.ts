import { expect, test } from 'bun:test';
import { getPassageResults, getQueryResults, normalizeSearchQuery, searchTerms, hasVisibleSearchMatch, type PagefindData } from './search-results';

const anchors = [
    { id: 'msg-21', element: 'h2', text: '', location: 1 },
    { id: 'msg-21-2', element: 'h2', text: '', location: 4 },
    { id: 'msg-42', element: 'h2', text: '', location: 7 },
];

test('internal attribution-only candidates are skipped before episode hydration', () => {
    const data = async () => ({ url: '/episode/', excerpt: '', meta: { title: 'Episode' } });
    expect(hasVisibleSearchMatch({ words: [], matchedMetaFields: ['passage_speakers'], data })).toBe(false);
    expect(hasVisibleSearchMatch({ words: [4], matchedMetaFields: ['passage_speakers'], data })).toBe(true);
    expect(hasVisibleSearchMatch({ words: [], matchedMetaFields: ['title', 'passage_speakers'], data })).toBe(true);
    expect(hasVisibleSearchMatch({ words: [4], data })).toBe(true);
});
const episode: PagefindData = {
    url: '/episode/', excerpt: '', content: 'Episode. Creativity brings communities. Open source matters. Open source again.',
    anchors,
    meta: { title: 'Episode', passage_speakers: JSON.stringify(['Henry', 'Nadia', 'Henry']) },
    sub_results: [
        { url: '/episode/#msg-21', anchor: anchors[0], locations: [1, 3], excerpt: '<mark>Creativity</mark> brings <mark>communities.</mark>' },
        { url: '/episode/#msg-21-2', anchor: anchors[1], locations: [4, 5], excerpt: '<mark>Open</mark> <mark>source</mark> matters.' },
    ],
};

test('empty virtual headings retain the first spoken word and speaker attribution', () => {
    const [, first, second] = getPassageResults(episode);
    expect(first.raw_content).toBe('Creativity brings communities.');
    expect(first.meta.speaker).toBe('Henry');
    expect(second.meta.speaker).toBe('Nadia');
    expect(second.url).toBe('/episode/#msg-21-2');
});

test('native term offsets retain morphology and require all terms in the same speaker turn', () => {
    const results = getQueryResults([{ ...episode, term_locations: [[1], [3]] }], 'creative community');
    expect(results).toHaveLength(1);
    expect(results[0].url).toBe('/episode/#msg-21');
    expect(getQueryResults([{ ...episode, term_locations: [[1], [5]] }], 'creative source')).toEqual([]);
});

test('drastic native prefix fallback is rejected for single and multiple words', () => {
    const result: PagefindData = {
        url: '/episode/', excerpt: '', content: 'Episode. Consider pros and cons.',
        anchors: [anchors[0]], meta: { title: 'Episode' }, term_locations: [[4]],
        sub_results: [{ url: '/episode/#msg-21', anchor: anchors[0], locations: [4], excerpt: 'Consider pros and <mark>cons.</mark>' }],
    };
    expect(getQueryResults([result], 'coniviality')).toEqual([]);
    result.content = 'Episode. Visit maintainersanonymous.com for transcripts.';
    result.term_locations = [[2]];
    result.sub_results![0].locations = [2];
    expect(getQueryResults([result], 'communtiy')).toEqual([]);
});

test('quoted search finds every matching message even when native excerpts only include the first', () => {
    const results = getQueryResults([episode], '"open source"');
    expect(results.map(result => result.url)).toEqual(['/episode/#msg-21-2', '/episode/#msg-42']);
    expect(results[1].excerpt).toBe('<mark>Open</mark> <mark>source</mark> again.');
    expect(results[0].meta.speaker).toBe('Nadia');
});

test('quoted phrases preserve word order and never cross speaker boundaries', () => {
    expect(getQueryResults([episode], '"source open"')).toEqual([]);
    expect(getQueryResults([episode], '"communities open"')).toEqual([]);
});

test('quoted snippets escape transcript markup and decode pre-escaped punctuation once', () => {
    const results = getQueryResults([{
        ...episode, anchors: [anchors[0]], content: 'Episode. Open source <script> &amp; friends.',
    }], '"open source"');
    expect(results[0].excerpt).toBe('<mark>Open</mark> <mark>source</mark> &lt;script&gt; &amp; friends.');
});

test('native locations are checked against normalized diacritics', () => {
    const results = getQueryResults([{
        ...episode, content: 'Episode. Café culture flourishes.', anchors: [anchors[0]], term_locations: [[1], [2]],
        sub_results: [{ url: '/episode/#msg-21', anchor: anchors[0], locations: [1, 2], excerpt: '<mark>Café</mark> <mark>culture</mark> flourishes.' }],
    }], 'cafe culture');
    expect(results[0].url).toBe('/episode/#msg-21');
});

test('all-filler queries remain searchable and repeated terms only need one native lookup', () => {
    expect(searchTerms('to be or not to be')).toEqual(['not']);
    expect(searchTerms('to be')).toEqual(['to', 'be']);
    expect(searchTerms('community community')).toEqual(['community']);
});

function episodeWithTurns(turns: string[], hits: number[], terms?: number[][]): PagefindData {
    let location = 1;
    return {
        url: '/brief-turns/',
        excerpt: '',
        content: `Episode. ${turns.join(' ')}`,
        anchors: turns.map((text, index) => {
            const anchor = { id: `msg-${index + 1}`, element: 'h2', text: '', location };
            location += text.split(/\s+/).length;
            return anchor;
        }),
        locations: hits,
        term_locations: terms,
        meta: { title: 'Episode', passage_speakers: JSON.stringify(turns.map(() => 'Henry')) },
    };
}

test('brief acknowledgments remain searchable behind substantive short and long matches', () => {
    const result = episodeWithTurns([
        'Right.',
        'Human rights.',
        'Yeah, right.',
        'Right now.',
        'The right answer depends on the question.',
    ], [1, 3, 5, 6, 9], [[1, 3, 5, 6, 9]]);
    const matches = getQueryResults([result], 'right');
    expect(matches.map(match => match.url)).toEqual([
        '/brief-turns/#msg-2', '/brief-turns/#msg-4', '/brief-turns/#msg-5',
        '/brief-turns/#msg-1', '/brief-turns/#msg-3',
    ]);
    expect(matches.map(match => match.content).sort()).toEqual([
        'Right.', 'Human rights.', 'Yeah, right.', 'Right now.',
        'The right answer depends on the question.',
    ].sort());
});

test('short meaningful answers keep their existing conversation order', () => {
    const result = episodeWithTurns(['Faith.', 'Open source.', 'Yes.', 'No.', 'I don’t know.'], [1, 2, 4, 5, 6]);
    expect(getPassageResults(result).slice(1).map(match => match.content)).toEqual([
        'Faith.', 'Open source.', 'Yes.', 'No.', 'I don’t know.',
    ]);
});

test('quoted acknowledgment searches preserve exact matches and conversation order', () => {
    const result = episodeWithTurns(['Yeah.', 'Yeah, community matters.', 'Yeah.'], [1, 2, 5]);
    expect(getQueryResults([result], '"yeah"').map(match => match.url)).toEqual([
        '/brief-turns/#msg-1', '/brief-turns/#msg-2', '/brief-turns/#msg-3',
    ]);
});

test('nonverbal acknowledgments are demoted without treating a topic as filler', () => {
    const result = episodeWithTurns(['Yeah (laughs).', 'Yeah, faith.'], [1, 3], [[1, 3]]);
    expect(getQueryResults([result], 'yeah').map(match => match.content)).toEqual([
        'Yeah, faith.', 'Yeah (laughs).',
    ]);
});

test('complete smart-quoted phrases normalize only their outer quotation marks', () => {
    expect(normalizeSearchQuery('  “Open source”  ')).toBe('  "Open source"  ');
    expect(normalizeSearchQuery('“don’t know”')).toBe('"don’t know"');
    for (const query of ['open source', '"open source"', 'open “source”', '“open source', 'open source”', '“open source"']) {
        expect(normalizeSearchQuery(query)).toBe(query);
    }
});

test('smart-quoted phrases preserve exact order and speaker boundaries', () => {
    expect(getQueryResults([episode], '“open source”')).toEqual(getQueryResults([episode], '"open source"'));
    expect(getQueryResults([episode], '“source open”')).toEqual([]);
    expect(getQueryResults([episode], '“communities open”')).toEqual([]);
});

test('excerpts reduce leading context to show every term in a fitting query cluster', () => {
    const words = [
        ...Array(15).fill('context'), 'open', '<script>', '&amp;',
        ...Array(22).fill('detail'), 'source', ...Array(12).fill('after'),
    ];
    const open = words.indexOf('open') + 1;
    const source = words.indexOf('source') + 1;
    const [match] = getQueryResults([
        episodeWithTurns([words.join(' ')], [open, source], [[open], [source]]),
    ], 'open source');
    expect(match.url).toBe('/brief-turns/#msg-1');
    expect(match.match_span).toBe(25);
    expect(match.excerpt).toContain('<mark>open</mark>');
    expect(match.excerpt).toContain('<mark>source</mark>');
    expect(match.excerpt).toContain('&lt;script&gt; &amp;');
    expect(match.excerpt.replace(/<\/?mark>|…/g, '').trim().split(/\s+/)).toHaveLength(32);
    expect(match.content).toBe(words.join(' '));
});

test('a cluster spanning exactly 32 words fits without crossing canonical speaker turns', () => {
    const turn = [...Array(6).fill('context'), 'open', ...Array(30).fill('detail'), 'source'].join(' ');
    const [match] = getQueryResults([
        episodeWithTurns(['Previous speaker context.', turn, 'Next speaker context.'], [10, 41], [[10], [41]]),
    ], 'open source');
    expect(match.url).toBe('/brief-turns/#msg-2');
    expect(match.match_span).toBe(31);
    expect(match.excerpt).toStartWith('… <mark>open</mark>');
    expect(match.excerpt).toEndWith('<mark>source</mark>');
    expect(match.excerpt.replace(/<\/?mark>|…/g, '').trim().split(/\s+/)).toHaveLength(32);
    expect(match.excerpt).not.toContain('speaker');
});

test('query clusters wider than 32 words retain a bounded excerpt', () => {
    const words = [...Array(15).fill('context'), 'open', ...Array(44).fill('detail'), 'source', ...Array(12).fill('after')];
    const open = words.indexOf('open') + 1;
    const source = words.indexOf('source') + 1;
    const [match] = getQueryResults([
        episodeWithTurns([words.join(' ')], [open, source], [[open], [source]]),
    ], 'open source');
    expect(match.match_span).toBe(45);
    expect(match.excerpt).toContain('<mark>open</mark>');
    expect(match.excerpt).not.toContain('<mark>source</mark>');
    expect(match.excerpt.replace(/<\/?mark>|…/g, '').trim().split(/\s+/)).toHaveLength(32);
    expect(match.content).toBe(words.join(' '));
    expect(match.url).toBe('/brief-turns/#msg-1');
});

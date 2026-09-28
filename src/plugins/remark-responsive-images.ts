import { visit } from 'unist-util-visit';
import type { Image, Root } from 'mdast';
import type { Plugin } from 'unified';

// Intrinsic sizes for the remote images embedded in the Emotional Programming transcript.
// Keeping these at build time reserves space before each lazy image loads.
const remoteImageSizes: Record<string, [number, number]> = {
  'https://user-images.githubusercontent.com/588473/95118854-fa9af180-0718-11eb-9b58-7a9c341ff98a.png': [607, 396],
  'https://user-images.githubusercontent.com/588473/95119801-90834c00-071a-11eb-9cc8-de45195a7073.png': [599, 225],
  'https://lh3.googleusercontent.com/wlf842vsNrbW70WRloE0LzJVOJfoL4lYMbqOEebLudfLr91bLou7Sb6Hu7f5C_uP9femGOjfLdns4B9q5rdzVBHx9NIGvOayPqbvRQ=w790': [790, 191],
  'https://user-images.githubusercontent.com/588473/95120290-536b8980-071b-11eb-8fef-bde27e712c98.png': [379, 222],
  'https://user-images.githubusercontent.com/588473/95122652-d3dfb980-071e-11eb-88fa-0b9bb5a964fd.png': [701, 179],
  'https://user-images.githubusercontent.com/588473/95123250-a6474000-071f-11eb-9ebf-a10847be83bd.png': [522, 303],
  'https://user-images.githubusercontent.com/588473/95123390-e1497380-071f-11eb-8402-25c55e6d2a31.png': [680, 510],
  'https://pbs.twimg.com/media/Edc-UXiVAAECZ38?format=png&name=large': [1440, 1594],
  'https://user-images.githubusercontent.com/588473/95124439-6f722980-0721-11eb-9472-07be9d8e1f48.png': [633, 242],
  'https://user-images.githubusercontent.com/588473/95124614-ad6f4d80-0721-11eb-8667-989bc4f69506.png': [591, 545],
};

export const remarkResponsiveImages: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, 'image', (node: Image) => {
      const dimensions = remoteImageSizes[node.url];
      node.data = node.data || {};
      node.data.hProperties = {
        ...node.data.hProperties,
        'style': 'width: 100%; height: auto',
        'loading': 'lazy',
        'decoding': 'async',
        ...(dimensions ? { width: dimensions[0], height: dimensions[1] } : {}),
      };
    });
  };
};

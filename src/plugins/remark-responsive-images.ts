import { visit } from 'unist-util-visit';
import type { Image } from 'mdast';
import type { Plugin } from 'unified';

export const remarkResponsiveImages: Plugin = () => {
  return (tree) => {
    visit(tree, 'image', (node: Image) => {
      // Add responsive image attributes
      node.data = node.data || {};
      node.data.hProperties = {
        ...node.data.hProperties,
        'layout': 'responsive',
        'width': '100%',
        'loading': 'lazy',
        'decoding': 'async',
      };
    });
  };
}; 
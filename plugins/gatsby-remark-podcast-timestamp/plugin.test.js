const Remark = require(`remark`);
const toString = require(`mdast-util-to-string`);
const visit = require(`unist-util-visit`);
const plugin = require(`./plugin`);

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
});

function filterLoc(obj) {
  if (obj.position) delete obj.position;

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") filterLoc(obj[key]);
  });

  return obj;
}

describe(`gatsby-remark-podcast-timestamp`, () => {
  it(`doesn't affect normal paragraphs or use of link references`, () => {
    const markdownAST = remark.parse(`hi [asdf]`);
    const transformed = plugin({ markdownAST }, {});
    visit(transformed, `paragraph`, (node) => {
      expect(node).toMatchSnapshot();
    });
  });

  it(`adds id to a markdown header`, () => {
    const markdownAST = remark.parse(`
[00:00] **Henry**: Hi.
`);
    const transformed = plugin({ markdownAST }, {});

    visit(transformed, `paragraph`, (node) => {
      expect(filterLoc(node)).toMatchSnapshot();
    });
  });
});

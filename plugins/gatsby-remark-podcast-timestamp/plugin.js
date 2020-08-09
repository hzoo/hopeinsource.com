const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");
const timestampRegex = /(\d+:\d+(:\d+)?)/;

function isTimestamp(p) {
  // has to be the first child in a paragraph and match the regex
  // [00:28] **Speaker**: more text here
  return (
    p.children.length > 1 &&
    p.children[0].type === "linkReference" &&
    p.children[0].referenceType === "shortcut" &&
    p.children[0].identifier.match(timestampRegex)
  );
}

let firstSpeaker;

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", (node) => {
    let timestamp = isTimestamp(node);
    if (!timestamp) return;
    node.children.shift(); // remove timestamp
    node.children.shift(); // remove space
    let name = toString(node.children[0]);
    if (!firstSpeaker) {
      firstSpeaker = name;
    }

    node.children = [
      {
        type: "html",
        children: undefined,
        value: `<a href="#t=${timestamp[1]}"><span class="timestamp">${timestamp[1]} 🕐</span></a>`,
      },
      {
        type: "paragraph",
        data: {
          hName: "span",
          hProperties: {
            className: ["text"],
          },
        },
        children: node.children,
      },
    ];

    node.type = "paragraph";
    node.data = {
      hProperties: {
        className: ["wrap"],
      },
    };
    if (name === firstSpeaker) {
      node.data.hProperties.className.push("right");
    }
  });

  return markdownAST;
};

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

// allow no timestamp?
function isSpeaker(p) {
  return p.children.length > 1 && p.children[0].type === "strong";
}

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  let firstSpeaker;
  visit(markdownAST, "paragraph", (node) => {
    if (node.data && (node.data.hName || node.data.hProperties)) return;

    let timestamp = isTimestamp(node) && isTimestamp(node)[0];
    if (timestamp) {
      node.children.shift(); // remove timestamp
      node.children.shift(); // remove space
    } else if (isSpeaker(node)) {
      timestamp = "00:00";
    } else {
      return;
    }
    let name = toString(node.children[0]);
    if (!firstSpeaker) {
      firstSpeaker = name;
    }

    node.children = [
      {
        type: "html",
        children: undefined,
        value: `<a href="#t=${timestamp}"><span class="timestamp">${timestamp} 🕐</span></a>`,
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

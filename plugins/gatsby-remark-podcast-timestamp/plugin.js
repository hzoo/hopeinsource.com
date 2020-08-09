const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");
const timestampRegex = /(\d+:\d+(:\d+)?)/;
const remove = require("unist-util-remove");

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

let emojiMap = {
  "(laughs)": "😂",
  hm: "🤔",
  mm: "👍",
};

function getReaction(node) {
  return (
    node.type === "text" &&
    emojiMap[
      node.value
        .slice(2)
        .toLowerCase()
        .replace(".", "")
    ]
  );
}

let firstSpeaker;

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", (node, index, parent) => {
    let timestamp = isTimestamp(node);
    if (!timestamp || parent.type !== "root") return;

    // if a reaction
    let reaction = getReaction(node.children[3]);
    if (reaction) {
      let prevText = parent.children[index - 1];
      if (prevText.type === "paragraph" && prevText.children.length === 2) {
        prevText.children.push({
          type: "paragraph",
          children: [
            {
              type: "text",
              value: reaction,
            },
          ],
          data: {
            hName: "span",
            hProperties: {
              className: ["laugh"],
            },
          },
        });
        return;
      }
    }

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

  // remove paragraph text for reaction
  remove(
    markdownAST,
    (node) =>
      node.type === "paragraph" &&
      node.children.length === 4 &&
      getReaction(node.children[3])
  );

  return markdownAST;
};

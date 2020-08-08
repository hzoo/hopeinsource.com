const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");
const timestampRegex = /\((\d+:\d+(:\d+)?)\)/;

function isTimestamp(p) {
  // '(00:28) **Henry**: talking here!'
  if (
    p.children.length >= 3 &&
    p.children[0].type === "text" &&
    p.children[1].type === "strong"
  ) {
    return p.children[0].value.match(timestampRegex);
  }
}

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", (node) => {
    let timestamp = isTimestamp(node);
    if (timestamp) {
      node.children.shift();
      let name = toString(node.children.shift());
      let html = `<p class="wrap">
<a href="#t=${timestamp[1]}"><span class="timestamp">${
        timestamp[1]
      } 🕐</span><strong>${name}</strong></a><span>${toString(
        node
      )}</span></p>`;

      node.type = "html";
      node.children = undefined;
      node.value = html;
    }
  });

  return markdownAST;
};

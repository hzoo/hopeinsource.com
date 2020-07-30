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

  // (00:28) talking here!'
  // if (p.children.length > 0 && p.children[0].type === 'text') {
  //   return p.children[0].value.match(timestampRegex);
  // }
}

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", (node) => {
    let timestamp = isTimestamp(node);
    if (timestamp) {
      let html = `<p class="wrap">
<a href="#t=${timestamp[1]}"><span class="timestamp">${timestamp[1]} 🕐</span>`;

      // remove timestamp
      if (node.children.length >= 3) {
        node.children.shift();
        let name = `<strong>${toString(node.children.shift())}</strong>`;
        html += name;
      }
      // else if (node.children.length === 1) {
      //   node.children[0].value.replace(timestampRegex, '');
      // }

      html += `${toString(node)}</a></p>`;

      node.type = "html";
      node.children = undefined;
      node.value = html;
    }
  });

  return markdownAST;
};

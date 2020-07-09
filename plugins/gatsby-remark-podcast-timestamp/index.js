const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

function isTimestamp(p) {
  // '(00:28) **Henry**: talking here!'
  if (p.children.length >= 3 &&
  	  p.children[0].type === 'text' &&
  	  p.children[1].type === 'strong') { 
  		return p.children[0].value.match(/\((\d+:\d+(:\d+)?)\)/);
  }
}

// https://www.gatsbyjs.org/tutorial/remark-plugin-tutorial/
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", node => {
  	let timestamp = isTimestamp(node);
  	if (timestamp) {
  		let noColon = timestamp[1].replace(/:/g,"");
  		// remove timestamp
  		node.children.shift();

    	const html = `<p>
  <a href="#${noColon}" id="${noColon}" class="timestamp">(${timestamp[1]})</a>
  <strong>${toString(node.children.shift())}</strong>${toString(node)}
</p>
`

  		node.type = "html"
	    node.children = undefined
	    node.value = html
  	}
  })

  return markdownAST
}
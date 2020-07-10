const React = require("react")

const pluginDefaults = {
  className: `timestamp`,
}

exports.onRenderBody = ({ setHeadComponents }, pluginOptions) => {
  const { className } = Object.assign(
    pluginDefaults,
    pluginOptions
  )

  // match quote distance
  const styles = `
    .${className} {
      position: absolute;
      transform: translateX(-100%);
      padding-right: 1.42188rem;
      box-shadow: none;
      text-decoration: underline;
      opacity: 0;
    }
    .wrap:hover .${className} {
      opacity: 1;
    }
    .wrap a {
      box-shadow: inherit;
      color: inherit;
      text-decoration: inherit;
    }
  `

  return setHeadComponents([
    <style key={`gatsby-remark-podcast-timestamps`} type="text/css">
      {styles}
    </style>
  ])
}
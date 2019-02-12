import React from 'react'

import { rhythm } from '../utils/typography'
import Subscribe from './Subscribe'
// import patreon from '../assets/patreon.png'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(3 / 4),
          paddingTop: rhythm(1 / 2),
        }}
      >
        {
          // <a style={{
          //   boxShadow: "none"
          // }} href="https://www.patreon.com/bePatron?u=905738">
          //   <img src={patreon} alt="Become a Patron" height="35" style={{margin: 0}}/>
          // </a>
        }

        <Subscribe />

        All rights reserved
      </footer>
    )
  }
}

export default Footer

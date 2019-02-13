import React from 'react'
import { Link } from 'gatsby'

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
          textAlign: 'center',
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
        <Link
          style={{
            boxShadow: 'none',
            textDecoration: 'none',
            color: 'inherit',
          }}
          to={'/'}
        >
          All rights reserved
        </Link>
      </footer>
    )
  }
}

export default Footer

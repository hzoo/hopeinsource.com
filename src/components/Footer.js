import React from 'react'
import { Link } from 'gatsby'

import { rhythm } from '../utils/typography'
import Subscribe from './Subscribe'

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
        <Subscribe />
        <div>
          Hosts: <a href="https://twitter.com/nayafia">Nadia Eghbal</a> & <a href="https://twitter.com/left_pad">Henry Zhu</a>
        </div>
        <div>
          Cover Art: Jessica Han | Music: <a href="https://twitter.com/ken_wheeler/">Ken Wheeler</a>
        </div>
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

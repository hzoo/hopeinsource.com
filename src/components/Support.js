import React from 'react'
import { Link } from 'gatsby'

class Support extends React.Component {
  render() {
    return (
      <p style={{
      	maxWidth: 620,
        backgroundColor: '#4F5B66',
      }}>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <i>Hope in Source</i>
          </Link>{' '}
          is made possible by the support of Patrons. Consider becoming a{' '}
        <a href="https://www.patreon.com/henryzhu">supporter</a> today!
      </p>
    )
  }
}

export default Support

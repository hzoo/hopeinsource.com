import React from 'react'

import { rhythm } from '../utils/typography'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(3 / 4),
          paddingTop: rhythm(1 / 2),
        }}
      >
        <div style={{ float: 'right' }}>
          Subscribe:{' '}
          <a href="https://itunes.apple.com/us/podcast/on-margins/id1236390557">
            iTunes
          </a>{' '}
          &bull;{' '}
          <a href="https://open.spotify.com/show/5EXwiyKzPrrucncKyrHy0B">
            Spotify
          </a>{' '}
          &bull;{' '}
          <a href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvNzA0OS9yc3M%3D">
            Google
          </a>{' '}
          &bull;{' '}
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            RSS
          </a>
        </div>
        All rights reserved
      </footer>
    )
  }
}

export default Footer

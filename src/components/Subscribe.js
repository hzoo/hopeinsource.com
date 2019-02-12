import React from 'react'

class Subscribe extends React.Component {
  render() {
    return (
      <div style={{ float: 'right' }}>
        Subscribe:{' '}
        <a href="https://itunes.apple.com/us/podcast/on-margins/id1236390557" target="_blank">
          iTunes
        </a>{' '}
        &bull;{' '}
        <a href="https://open.spotify.com/show/5EXwiyKzPrrucncKyrHy0B" target="_blank">
          Spotify
        </a>{' '}
        &bull;{' '}
        <a href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvNzA0OS9yc3M%3D" target="_blank">
          Google
        </a>{' '}
        &bull;{' '}
        <a href="https://rss.simplecast.com/podcasts/7049/rss" target="_blank" rel="noopener noreferrer">
          RSS
        </a>
      </div>
    )
  }
}

export default Subscribe

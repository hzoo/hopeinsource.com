import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import cover from '../assets/icon.jpg'

class Intro extends React.Component {
  render() {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: 'center',
        maxWidth: '472px',
        margin: '0 auto',
      }}>
        <img src={cover} alt="Hope in Source Cover Art"/>
        
        <p>
          <i>Hope in Source</i> is a podcast about the parallels between faith
          and open source software. Join{' '}
          <a href="https://twitter.com/nayafia">Nadia Eghbal</a> and{' '}
          <a href="https://twitter.com/left_pad">Henry Zhu</a> for an
          off-the-cuff conversation between friends. Check out{' '}
          <a href="nadiaeghbal.com/public-faith">
            nadiaeghbal.com/public-faith
          </a>{' '}
          for the backstory
        </p>
        
        <p>
          Subscribe:{' '}
          <a href="https://itunes.apple.com/us/podcast/on-margins/id1236390557">
            iTunes
          </a>
          ,{' '}
          <a href="https://open.spotify.com/show/5EXwiyKzPrrucncKyrHy0B">
            Spotify
          </a>
          ,{' '}
          <a href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvNzA0OS9yc3M%3D">
            Google
          </a>
        </p>
      </div>
    )
  }
}

export default Intro

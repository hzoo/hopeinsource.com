import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        feed {
          rss
          google
          apple
          spotify
        }
      }
    }
  }
`

class Subscribe extends React.Component {
  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const feed = data.site.siteMetadata.feed;
          return (
            <p>
              <a href={feed.google} target="_blank">
                Google
              </a>{' '}
              &bull;{' '}
              <a href={feed.apple} target="_blank">
                Apple
              </a>{' '}
              &bull;{' '}
              <a href={feed.spotify} target="_blank">
                Spotify
              </a>{' '}
              &bull;{' '}
              <a href={feed.rss} target="_blank" rel="noopener noreferrer">
                RSS
              </a>
            </p>
          )
        }
      />
    )
  }
}

export default Subscribe
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const query = graphql`
  query getFeed {
    site {
      siteMetadata {
        gitOrg
        gitRepo
        siteUrl,
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
          const metaData = data.site.siteMetadata;
          return (
            <p>
              <a href={metaData.feed.apple} target="_blank">
                Apple
              </a>{' '}
              &bull;{' '}
              <a href={metaData.feed.spotify} target="_blank">
                Spotify
              </a>{' '}
              &bull;{' '}
              <a href={metaData.feed.google} target="_blank">
                Google
              </a>{' '}
              &bull;{' '}
              <a href={metaData.feed.rss} target="_blank" rel="noopener noreferrer">
                RSS
              </a>{' '}
              &bull;{' '}
              <a href={`https://github.com/${metaData.gitOrg}/${metaData.gitRepo}`} target="_blank">
                GitHub
              </a>
            </p>
          )
        }}
      />
    )
  }
}

export default Subscribe

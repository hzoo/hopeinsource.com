import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import cover from '../assets/icon.jpg'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`

function SEO({ meta, image=cover, title, description, slug, appId=1437677655, episodeLink }) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const { siteMetadata } = data.site
        const metaDescription = description || siteMetadata.description
        const metaImage = image ? `${siteMetadata.siteUrl}${image}` : null
        const url = `${siteMetadata.siteUrl}${slug}`
        return (
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            {...(title
              ? {
                  titleTemplate: `%s - ${siteMetadata.title}`,
                  title,
                }
              : {
                  title: siteMetadata.title,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'og:description',
                content: metaDescription,
              },
              {
                name: 'twitter:card',
                content: episodeLink ? 'player': 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteMetadata.social.twitter,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: 'og:image',
                        content: metaImage,
                      },
                      {
                        name: 'twitter:image',
                        content: metaImage,
                      },
                    ]
                  : []
              )
              .concat(
                episodeLink
                  ? [
                      {
                        name: 'twitter:player',
                        content: `https://simplecast.com/card/${episodeLink}`,
                      },
                      {
                        name: 'twitter:player:width',
                        content: '300',
                      },
                      {
                        name: 'twitter:player:height',
                        content: '80',
                      },
                      {
                        name: 'twitter:player:stream',
                        content: `https://dts.podtrac.com/redirect.mp3/audio.simplecast.com/${episodeLink}.mp3`,
                      },
                      {
                        name: 'twitter:player:stream:content_type',
                        content: 'audio/mpeg',
                      },
                    ]
                  : []
              )
              .concat(
                appId
                  ? [
                      {
                        name: 'apple-itunes-app',
                        content: `app-id=${appId}`,
                      },
                    ]
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO

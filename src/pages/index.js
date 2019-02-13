import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Intro from '../components/Intro'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { formatReadingTime } from '../utils/helpers'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <Intro />
        <hr />

        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginTop: rhythm(1),
                  marginBottom: rhythm(1 / 4),
                  textDecoration: 'underline',
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {` • ${node.frontmatter.time} min 🎧`}
              </small>
              <p
                dangerouslySetInnerHTML={{ __html: node.frontmatter.description }}
              />
            </div>
          )
        })}

        <a href="https://twitter.com/left_pad/status/1052290013059153920">
          <h3 style={{ textAlign: "center" }}>Praise</h3>
        </a>
        
        <blockquote className="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Really been enjoying the Hope in Source podcast from <a href="https://twitter.com/nayafia?ref_src=twsrc%5Etfw">@nayafia</a> and <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">@left_pad</a>.</p>&mdash; Nicholas C. Zakas (@slicknet) <a href="https://twitter.com/slicknet/status/1059181425184755713?ref_src=twsrc%5Etfw">November 4, 2018</a></blockquote>
        <blockquote className="twitter-tweet tw-align-center" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Just listened to the first episode and one of the things that came to mind is the connection between motivation for giving and anticipated benefits/rewards, as with the prosperity gospel movement. I wonder what the parallels between that and Open source might be</p>&mdash; jory burson (@jorydotcom) <a href="https://twitter.com/jorydotcom/status/1052646871154548738?ref_src=twsrc%5Etfw">October 17, 2018</a></blockquote>
        <blockquote className="twitter-tweet tw-align-center" data-lang="en"><p lang="en" dir="ltr">Really encouraged by <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">@left_pad</a> and <a href="https://twitter.com/nayafia?ref_src=twsrc%5Etfw">@nayafia</a>&#39;s podcast series &quot;Hope In Source&quot;. Not only from the insightful discussions and parallels drawn, but also by their commitment to learn and explore some of the greater questions in life with a childlike heart of awe and wonder.</p>&mdash; Jonathan Tsao (@JonathanTsao) <a href="https://twitter.com/JonathanTsao/status/1053342917014753281?ref_src=twsrc%5Etfw">October 19, 2018</a></blockquote>

        <Footer />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            time
            title
            description
            episodeLink
          }
        }
      }
    }
  }
`

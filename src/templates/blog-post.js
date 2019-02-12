import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/Layout'
import Support from '../components/Support'
import SEO from '../components/SEO'
import { formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

const GITHUB_USERNAME = 'hzoo'
const GITHUB_REPO_NAME = 'hopeinsource.com'
const SITE = 'hopeinsource.com'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next, slug } = this.props.pageContext
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${slug.replace(
      /\//g,
      ''
    )}.md`
    let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${SITE}${slug}`
    )}`
    console.log(post);
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          slug={post.fields.slug}
          episodeLink={post.frontmatter.episodeLink}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
          {` • ${post.frontmatter.time} min 🎧`}
        </p>

        <Support />
        
        <blockquote>{post.frontmatter.spoiler}</blockquote>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <h2>Credits</h2>
        <p>
          Hosted by <a href="https://twitter.com/nayafia">Nadia Eghbal</a> and{' '}
          <a href="https://twitter.com/left_pad">Henry Zhu</a>. <br />
          Edited by <a href="https://twitter.com/left_pad">Henry Zhu</a>. <br />
          Cover art by Jessica Han. <br />
          Music by <a href="https://twitter.com/ken_wheeler">Ken Wheeler</a>.
        </p>

        <p>
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
          </a>
          {` • `}
          <a href={editUrl} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
          </a>
        </p>
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: rhythm(0.25),
          }}
        />
        <div
          style={{
            display: 'flex',
            marginBottom: rhythm(2.5),
          }}
        />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        time
        date(formatString: "MMMM DD, YYYY")
        description
        episodeLink
      }
      fields {
        slug
      }
    }
  }
`

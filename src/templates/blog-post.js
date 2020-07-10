import React from 'react'
import { Link, graphql } from 'gatsby'
import AudioPlayer from 'react-h5-audio-player';

import Layout from '../components/Layout'
import Subscribe from '../components/Subscribe'
import Support from '../components/Support'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { rhythm, scale } from '../utils/typography'

class Player extends React.Component {
  constructor(props) {
    super(props);
    // this.player.current.audio.current
    this.player = React.createRef();
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", this.testAudioSeek);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("hashchange", this.testAudioSeek);
    }
  }

  testAudioSeek = event => {
    window.player = this.player.current.audio.current;
    // TODO get the new hash from the event, prevent hash from actually changing
    // this looks for a URL hash using this format:
    // #t=<number of seconds> (e.g. #t=120)
    if (typeof window !== "undefined") {
      // const query = window.location.search;
      // const urlParams = new URLSearchParams(query);
      // const time = urlParams.get('t')
      if (location.hash.startsWith('#t=')) {
        let time = location.hash.slice(3);
        const timestamp = time.match(/^(\d+):(\d+)(?::(\d+))?/);
        if (timestamp) {
          let seconds = 0;
          if (timestamp[3]) {
            seconds =
              Number(timestamp[1]) * 3600 +
              Number(timestamp[2]) * 60 +
              Number(timestamp[3]);
          } else {
            seconds = Number(timestamp[1]) * 60 + Number(timestamp[2]);
          }
          this.player.current.audio.current.currentTime = seconds;
        }
      }
    }
  };

  render() {
    return <AudioPlayer
      header={this.props.title}
      src={this.props.src}
      layout="horizontal-reverse"
      ref={this.player}
      customAdditionalControls={[]}
      customVolumeControls={[]}
    />
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteMetadata = this.props.data.site.siteMetadata
    const { previous, next, slug } = this.props.pageContext
    const editUrl = `https://github.com/${siteMetadata.gitOrg}/${siteMetadata.siteUrl}/edit/master/src/pages/${slug.replace(
      /\//g,
      ''
    )}.md`
    let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteMetadata.siteUrl}${slug}`
    )}`
    return (
      <Layout location={this.props.location} title={siteMetadata.title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          slug={post.fields.slug}
          embedUrl={post.frontmatter.embedUrl}
        />

        <h2>{post.frontmatter.title}</h2>
      
        <Subscribe />

        <blockquote>{post.frontmatter.description}</blockquote>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Support />

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
      <Footer />
              <Player
        title={post.frontmatter.title}
        src={`https://media.transistor.fm/${post.frontmatter.episodeLink}.mp3`}
      />
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
        gitOrg
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        time
        date(formatString: "MMMM DD, YYYY")
        description
        episodeLink
        embedUrl
      }
      fields {
        slug
      }
    }
  }
`

import React from "react";
import { Link, graphql } from "gatsby";
import AudioPlayer from "react-h5-audio-player";
import slugs from "github-slugger";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/Layout";
import Subscribe from "../components/Subscribe";
import Support from "../components/Support";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import { rhythm } from "../utils/typography";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  componentDidMount() {
    // play if url has timestamp
    this.testAudioSeek();
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", this.testAudioSeek);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("hashchange", this.testAudioSeek);
    }
  }

  testAudioSeek(event) {
    // TODO get the new hash from the event, prevent hash from actually changing
    // this looks for a URL hash using this format:
    // #t=<number of seconds> (e.g. #t=120)
    if (typeof window !== "undefined") {
      let hash = window.location.hash;
      if (hash.startsWith("#t=")) {
        let time = hash.slice(3);
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
          this.player.current.audio.current.play();
        }
      }
    }
  }

  render() {
    return (
      <AudioPlayer
        // header={this.props.title}
        preload="metadata"
        src={this.props.src}
        layout="horizontal-reverse"
        ref={this.player}
        customAdditionalControls={[]}
        customVolumeControls={[]}
      />
    );
  }
}

const preprocessHeading = (h) => {
  const cleanValue = h.value
    .replace(/<(\/)?[^>]+>/g, "")
    .replace(/\s{2,}/g, " ");
  return {
    // depth: h.depth,
    value: cleanValue,
    id: slugs.slug(cleanValue),
  };
};

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.mdx;
  const headings = post.headings
    .filter((h) => h.depth === 4)
    .map(preprocessHeading);
  const siteMetadata = data.site.siteMetadata;
  const { previous, next, slug } = pageContext;
  let discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}${slug}`
  )}`;
  return (
    <Layout>
      <div>
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "inherit",
            }}
            to={"/"}
          >
            {`← ${siteMetadata.title}`}
          </Link>
        </h3>

        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          slug={post.fields.slug}
          embedUrl={post.frontmatter.embedUrl}
        />

        <h2>{post.frontmatter.title}</h2>

        <Subscribe />

        <blockquote>
          {post.frontmatter.description} ({post.frontmatter.time} min)
        </blockquote>

        <MDXRenderer>{post.body}</MDXRenderer>

        <Support title={siteMetadata.title} />

        <p>
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
          </a>
        </p>
        <div
          style={{
            display: "flex",
            marginBottom: rhythm(2.5),
          }}
        />
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            listStyle: "none",
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
        <Footer title={siteMetadata.title} />
        <Player
          title={post.frontmatter.title}
          src={`https://media.transistor.fm/${post.frontmatter.episodeLink}.mp3`}
        />
      </div>
      <div className="sidebar">
        <ul className="toc">
          {headings.map((heading, i) => {
            return (
              <li key={i}>
                <a href={`#${heading.id}`}>{heading.value}</a>
              </li>
            );
          })}
          <br />
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}
          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
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
      headings {
        depth
        value
      }
    }
  }
`;

import React from "react";
import { Link, graphql } from "gatsby";

import Intro from "../components/Intro";
import Layout from "../components/Layout";
import Testimonial from "../components/Testimonial";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import { rhythm } from "../utils/typography";

class BlogIndex extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title;
    const posts = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div className="hero-wrapper">
          <div className="hero">
            <SEO />
            <Intro />
          </div>
        </div>

        <div>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug;
            return (
              <div key={node.fields.slug}>
                <h3
                  style={{
                    marginTop: rhythm(1),
                    marginBottom: rhythm(1 / 4),
                    textDecoration: "underline",
                  }}
                >
                  <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>
                  {node.frontmatter.date}
                  {` • ${node.frontmatter.time} min 🎧`}
                </small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description,
                  }}
                />
              </div>
            );
          })}
          <Testimonial />
          <Footer />
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date, frontmatter___title]
        order: [DESC, DESC]
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            time
            title
            description
          }
        }
      }
    }
  }
`;

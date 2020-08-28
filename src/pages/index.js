import React from "react";
import { Link, graphql } from "gatsby";

import Intro from "../components/Intro";
import Layout from "../components/Layout";
import Testimonial from "../components/Testimonial";
import SEO from "../components/SEO";
import Footer from "../components/Footer";
import { rhythm } from "../utils/typography";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMdx.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <div className="hero-wrapper">
        <div className="hero">
          <SEO />
          <Intro title={siteTitle} />
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
                {node.frontmatter.season
                  ? ` • Season ${node.frontmatter.season}`
                  : null}
              </small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description,
                }}
              />
            </div>
          );
        })}
        <Testimonial title={siteTitle} />
        <Footer title={siteTitle} />
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(
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
            season
          }
        }
      }
    }
  }
`;

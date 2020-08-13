import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import his_cover from "../assets/his.jpg";
import ma_cover from "../assets/ma.jpg";

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
        feed {
          rss
        }
      }
    }
  }
`;

function SEO({
  meta,
  title,
  image,
  description,
  slug,
  appId = 1437677655,
  embedUrl,
}) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const { siteMetadata } = data.site;
        image =
          image || siteMetadata.title === "Hope in Source"
            ? his_cover
            : ma_cover;
        const metaDescription = description || siteMetadata.description;
        const metaImage = image ? `${siteMetadata.siteUrl}${image}` : null;
        const url = `${siteMetadata.siteUrl}${slug}`;
        return (
          <Helmet
            htmlAttributes={{ lang: "en" }}
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
                name: "description",
                content: metaDescription,
              },
              {
                property: "og:url",
                content: url,
              },
              {
                property: "og:title",
                content: title || siteMetadata.title,
              },
              {
                name: "og:description",
                content: metaDescription,
              },
              {
                name: "twitter:card",
                content: embedUrl ? "player" : "summary",
              },
              {
                name: "twitter:creator",
                content: siteMetadata.social.twitter,
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: "og:image",
                        content: metaImage,
                      },
                    ]
                  : []
              )
              .concat(
                embedUrl
                  ? [
                      {
                        name: "twitter:player",
                        content: `${embedUrl}`,
                      },
                      {
                        name: "twitter:player:width",
                        content: "500",
                      },
                      {
                        name: "twitter:player:height",
                        content: "180",
                      },
                    ]
                  : []
              )
              .concat(
                appId
                  ? [
                      {
                        name: "apple-itunes-app",
                        content: `app-id=${appId}`,
                      },
                    ]
                  : []
              )
              .concat(meta)}
          >
            <link
              rel="alternate"
              type="application/rss+xml"
              title={siteMetadata.title}
              href={siteMetadata.feed.rss}
            />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: "",
  slug: "",
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;

import React from "react";
import { StaticQuery, graphql } from "gatsby";

const query = graphql`
  query getFeed {
    site {
      siteMetadata {
        gitOrg
        gitRepo
        siteUrl
        feed {
          rss
          google
          apple
          spotify
        }
      }
    }
  }
`;

const Subscribe = () => {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        const metaData = data.site.siteMetadata;
        return (
          <p>
            <a href={metaData.feed.apple} target="_blank" rel="noreferrer">
              Apple
            </a>{" "}
            &bull;{" "}
            <a href={metaData.feed.spotify} target="_blank" rel="noreferrer">
              Spotify
            </a>{" "}
            &bull;{" "}
            <a href={metaData.feed.google} target="_blank" rel="noreferrer">
              Google
            </a>{" "}
            &bull;{" "}
            <a
              href={metaData.feed.rss}
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS
            </a>{" "}
            &bull;{" "}
            <a
              href={`https://github.com/${metaData.gitOrg}/${metaData.gitRepo}`}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        );
      }}
    />
  );
};

export default Subscribe;

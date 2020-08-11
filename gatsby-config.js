module.exports = {
  siteMetadata: {
    title: "Hope in Source",
    author: "Nadia Eghbal & Henry Zhu",
    description:
      "What are the parallels between faith and open source software? Join Nadia and Henry for an off-the-cuff conversation between friends.",
    gitOrg: "hzoo",
    gitRepo: "hopeinsource.com",
    siteUrl: "https://hopeinsource.com",
    social: {
      twitter: "@left_pad",
    },
    feed: {
      rss: "https://feeds.transistor.fm/hope-in-source",
      google:
        "https://www.google.com/podcasts?feed=aHR0cHM6Ly9yc3Muc2ltcGxlY2FzdC5jb20vcG9kY2FzdHMvNzA0OS9yc3M%3D",
      apple: "https://itunes.apple.com/us/podcast/hope-in-source/id1437677655",
      spotify: "https://open.spotify.com/show/5EXwiyKzPrrucncKyrHy0B",
    },
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/episodes`,
        name: "episodes",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {
              offsetY: "20",
            },
          },
          "gatsby-remark-copy-linked-files",
          {
            resolve: require.resolve(
              "./plugins/gatsby-remark-podcast-timestamp"
            ),
          },
        ],
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
  ],
};

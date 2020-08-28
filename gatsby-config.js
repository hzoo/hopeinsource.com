let MA_metadata = {
  title: "Maintainers Anonymous",
  author: "Henry Zhu",
  description: "A podcast about sharing our lives as people, as maintainers.",
  gitOrg: "hzoo",
  gitRepo: "hopeinsource.com",
  siteUrl: "https://maintainersanonymous.com",
  social: {
    twitter: "@left_pad",
  },
  feed: {
    rss: "https://feeds.transistor.fm/maintainers-anonymous",
    google:
      "https://podcasts.google.com/?feed=aHR0cHM6Ly9mZWVkcy50cmFuc2lzdG9yLmZtL21haW50YWluZXJzLWFub255bW91cw%3D%3D",
    apple:
      "https://itunes.apple.com/us/podcast/maintainers-anonymous/id1459347058",
    spotify: "https://open.spotify.com/show/1rvrUipEYmYOt2EZoL0uWm",
  },
};

let HIS_metadata = {
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
};

let MA = process.env.MA;

module.exports = {
  siteMetadata: MA ? MA_metadata : HIS_metadata,
  pathPrefix: "/",
  plugins: [
    MA && {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/season-2`,
        name: "episodes",
      },
    },
    !MA && {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/season-1`,
        name: "episodes",
      },
    },
    !MA && {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/season-2`,
        name: "episodes",
      },
    },
    !MA && {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/season-3`,
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
  ].filter(Boolean),
};

import { Helmet } from "react-helmet";
import his_cover from "../assets/his.jpg";
import { hisMetadata } from "metadata";

// props can be optional
export default function SEO({
  title,
  description,
  slug,
  embedUrl,
}: {
  title?: string,
  description?: string,
  slug?: string,
  embedUrl?: string,
} = {}) {
  const siteMetadata = hisMetadata;
  const image = his_cover;
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
          content: siteMetadata.twitter,
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
        .concat([
          {
            name: "apple-itunes-app",
            content: `app-id=1437677655`,
          },
        ])}
    >
      <link
        rel="alternate"
        type="application/rss+xml"
        title={siteMetadata.title}
        href={siteMetadata.rss}
      />
    </Helmet>
  );
}

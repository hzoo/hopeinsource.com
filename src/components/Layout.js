import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";

let TOC = ({ headings }) => {
  return (
    <ul className="toc">
      {headings.map((heading, i) => {
        return (
          <li key={i}>
            <a href={`#${heading.id}`}>{heading.value}</a>
          </li>
        );
      })}
    </ul>
  );
};

class Layout extends React.Component {
  render() {
    const { location, title, children, headings } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    let header;
    if (location.pathname !== rootPath) {
      header = (
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
            {`← ${title}`}
          </Link>
        </h3>
      );
    }

    return (
      <div
        style={{
          color: "var(--textNormal)",
          background: "var(--bg)",
          padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
          display: "flex",
          maxWidth: headings ? rhythm(36) : rhythm(24),
          margin: "0 auto",
        }}
      >
        <div
          className="content"
          style={{
            flex: "1 1 auto",
          }}
        >
          {header}
          {children}
        </div>
        {headings && (
          <div className="sidebar">
            <TOC headings={headings} />
          </div>
        )}
      </div>
    );
  }
}

export default Layout;

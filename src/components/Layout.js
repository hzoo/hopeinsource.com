import React from "react";
import { rhythm } from "../utils/typography";

export default function Layout({ children }) {
  return (
    <div
      className="container"
      style={{
        color: "var(--textNormal)",
        background: "var(--bg)",
        padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
        display: "flex",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}

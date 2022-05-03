import React from "react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";

const Footer = ({ title }) => {
  let his = title === "Hope in Source";
  return (
    <footer
      style={{
        marginTop: rhythm(3 / 4),
        paddingTop: rhythm(1 / 2),
        textAlign: "center",
      }}
    >
      {his ? (
        <>
          <div>
            Hosts: <a href="https://twitter.com/nayafia">Nadia Eghbal</a> &{" "}
            <a href="https://twitter.com/left_pad">Henry Zhu</a>
          </div>
          <div>
            Cover Art: Jessica Han | Music:{" "}
            <a href="https://twitter.com/ken_wheeler/">Ken Wheeler</a>
          </div>
        </>
      ) : (
        <>
          <div>
            Hosted by <a href="https://twitter.com/left_pad">Henry Zhu</a>
          </div>
          <div>
            Cover art by{" "}
            <a href="https://twitter.com/Mappletons">Maggie Appleton</a>
          </div>
        </>
      )}
      <Link
        style={{
          boxShadow: "none",
          textDecoration: "none",
          color: "inherit",
        }}
        to={"/"}
      >
        All rights reserved
      </Link>
      <br />
      <br />
      <div>
        Donate on{" "}
        <a href="https://github.com/sponsors/hzoo/">GitHub Sponsors</a>
      </div>
      <div>ETH: 0xD060a6E825fE8012aE1aC7Fb9F33Cc9A05fD1998</div>
    </footer>
  );
};

export default Footer;

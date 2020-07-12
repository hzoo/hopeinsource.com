import React from "react";
import { Link } from "gatsby";

class Support extends React.Component {
  render() {
    return (
      <p
        style={{
          maxWidth: 620,
          backgroundColor: "#4F5B66",
          textAlign: "center",
        }}
      >
        <Link
          style={{
            color: "inherit",
          }}
          to={"/"}
        >
          <i>Hope in Source</i>
        </Link>{" "}
        <br />
        is made possible by the support of the community!
        <br />
        Consider becoming a{" "}
        <a href="https://github.com/users/hzoo/sponsorship">sponsor</a> today!
      </p>
    );
  }
}

export default Support;

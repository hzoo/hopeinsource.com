import React from "react";

// Import typefaces
import "typeface-montserrat";
import "typeface-merriweather";
import his_cover from "../assets/his.jpg";
import ma_cover from "../assets/ma.jpg";
import Subscribe from "./Subscribe";

const Intro = ({ title }) => {
  let his = title === "Hope in Source";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        maxWidth: "472px",
        margin: "0 auto",
      }}
    >
      <img src={his ? his_cover : ma_cover} alt={`${title} Cover Art`} />

      {his ? (
        <p>
          Join <a href="https://twitter.com/nayafia">Nadia Eghbal</a> and{" "}
          <a href="https://twitter.com/left_pad">Henry Zhu</a> for an
          off-the-cuff conversation between friends. Read the backstory from{" "}
          <a href="https://henryzoo.com/living-out-in-faith">Henry</a> and{" "}
          <a href="https://nadiaeghbal.com/public-faith">Nadia</a>.
        </p>
      ) : (
        <p>
          How can we work together to achieve a common goal: whether in our
          code, cities, or infrastructure?{" "}
          <a href="https://twitter.com/left_pad">Henry Zhu</a> chats with fellow
          maintainers across all disciplines of life on their process,
          motivations, and struggles as they learn in public.
        </p>
      )}

      <Subscribe />
    </div>
  );
};

export default Intro;

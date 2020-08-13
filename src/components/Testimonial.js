import React from "react";

const Testimonial = ({ title }) => {
  return title === "Hope in Source" ? (
    <>
      <a href="https://twitter.com/left_pad/status/1052290013059153920">
        <h3 style={{ textAlign: "center" }}>Praise</h3>
      </a>

      <blockquote className="twitter-tweet tw-align-center" data-lang="en">
        <p lang="en" dir="ltr">
          Really been enjoying the Hope in Source podcast from{" "}
          <a href="https://twitter.com/nayafia?ref_src=twsrc%5Etfw">@nayafia</a>{" "}
          and{" "}
          <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">
            @left_pad
          </a>
          .
        </p>
        &mdash; Nicholas C. Zakas (@slicknet){" "}
        <a href="https://twitter.com/slicknet/status/1059181425184755713?ref_src=twsrc%5Etfw">
          November 4, 2018
        </a>
      </blockquote>
      <blockquote
        className="twitter-tweet tw-align-center"
        data-conversation="none"
        data-lang="en"
      >
        <p lang="en" dir="ltr">
          Just listened to the first episode and one of the things that came to
          mind is the connection between motivation for giving and anticipated
          benefits/rewards, as with the prosperity gospel movement. I wonder
          what the parallels between that and Open source might be
        </p>
        &mdash; jory burson (@jorydotcom){" "}
        <a href="https://twitter.com/jorydotcom/status/1052646871154548738?ref_src=twsrc%5Etfw">
          October 17, 2018
        </a>
      </blockquote>
      <blockquote className="twitter-tweet tw-align-center" data-lang="en">
        <p lang="en" dir="ltr">
          Really encouraged by{" "}
          <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">
            @left_pad
          </a>{" "}
          and{" "}
          <a href="https://twitter.com/nayafia?ref_src=twsrc%5Etfw">@nayafia</a>
          &#39;s podcast series &quot;Hope In Source&quot;. Not only from the
          insightful discussions and parallels drawn, but also by their
          commitment to learn and explore some of the greater questions in life
          with a childlike heart of awe and wonder.
        </p>
        &mdash; Jonathan Tsao (@JonathanTsao){" "}
        <a href="https://twitter.com/JonathanTsao/status/1053342917014753281?ref_src=twsrc%5Etfw">
          October 19, 2018
        </a>
      </blockquote>
    </>
  ) : (
    <>
      <blockquote class="twitter-tweet">
        <p lang="en" dir="ltr">
          I feel like the core of Maintainers Anonymous by{" "}
          <a href="https://twitter.com/left_pad?ref_src=twsrc%5Etfw">
            @left_pad
          </a>
          , at least so far, boils down to “Maintainers are people!” We tend to
          extremes, seeing them as either robots that serve our code-based
          expectations or idealize them and take their words as absolute truths.{" "}
          <a href="https://twitter.com/hashtag/JSHeroes?src=hash&amp;ref_src=twsrc%5Etfw">
            #JSHeroes
          </a>
        </p>
        &mdash; Aisha Blake (@AishaBlake){" "}
        <a href="https://twitter.com/AishaBlake/status/1116309265340338176?ref_src=twsrc%5Etfw">
          April 11, 2019
        </a>
      </blockquote>
      <blockquote
        class="twitter-tweet"
        data-conversation="none"
        data-dnt="true"
      >
        <p lang="en" dir="ltr">
          Fascinating podcast on speedrunning:
          <a href="https://t.co/OG2WGcd1gT">https://t.co/OG2WGcd1gT</a>
          <br />
          <br />
          So many parallels with science, discovery, open source, and all the
          ways communities can interact with optimization problems!
        </p>
        &mdash; David Laing (@davidklaing){" "}
        <a href="https://twitter.com/davidklaing/status/1175490437357830144?ref_src=twsrc%5Etfw">
          September 21, 2019
        </a>
      </blockquote>
    </>
  );
};

export default Testimonial;

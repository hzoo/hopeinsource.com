import {hisMetadata} from "../../metadata";

export default function Subscribe() {
  return (
    <p>
      <a href={hisMetadata.apple} target="_blank" rel="noreferrer">
        Apple
      </a>{" "}
      &bull;{" "}
      <a href={hisMetadata.spotify} target="_blank" rel="noreferrer">
        Spotify
      </a>{" "}
      &bull;{" "}
      <a href={hisMetadata.google} target="_blank" rel="noreferrer">
        Google
      </a>{" "}
      &bull;{" "}
      <a
        href={hisMetadata.rss}
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS
      </a>{" "}
      &bull;{" "}
      <a
        href={`https://github.com/${hisMetadata.gitOrg}/${hisMetadata.gitRepo}`}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
  </p>
  );
}
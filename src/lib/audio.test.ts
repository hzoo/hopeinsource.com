import { expect, test } from "bun:test";

import { getEpisodeAudioSource } from "./audio";

test("unwraps a known Anchor CloudFront audio URL", () => {
  const wrapped = "https://anchor.fm/s/show/podcast/play/123/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2Fepisode.mp3";

  expect(getEpisodeAudioSource(wrapped)).toBe(
    "https://d3ctxlq1ktw2nl.cloudfront.net/staging/episode.mp3",
  );
});

test("preserves an already-direct audio URL", () => {
  const direct = "https://d3ctxlq1ktw2nl.cloudfront.net/staging/episode.mp3";
  expect(getEpisodeAudioSource(direct)).toBe(direct);
});

test("does not unwrap an untrusted nested host", () => {
  const wrapped = "https://anchor.fm/s/show/podcast/play/123/https%3A%2F%2Fexample.com%2Fepisode.mp3";
  expect(getEpisodeAudioSource(wrapped)).toBe(wrapped);
});

test("preserves invalid URLs", () => {
  expect(getEpisodeAudioSource("not a URL")).toBe("not a URL");
});

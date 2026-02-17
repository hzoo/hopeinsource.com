import { expect, test } from "bun:test";

import { parseTimeHash, parseTimeValue } from "./time-hash";

test("parseTimeValue accepts seconds", () => {
  expect(parseTimeValue("884")).toBe(884);
});

test("parseTimeValue accepts MM:SS", () => {
  expect(parseTimeValue("14:44")).toBe(884);
});

test("parseTimeValue accepts HH:MM:SS", () => {
  expect(parseTimeValue("1:14:44")).toBe(4484);
});

test("parseTimeValue accepts long MM:SS minutes", () => {
  expect(parseTimeValue("120:05")).toBe(7205);
});

test("parseTimeValue rejects invalid values", () => {
  expect(parseTimeValue("")).toBeNull();
  expect(parseTimeValue("14:77")).toBeNull();
  expect(parseTimeValue("1:70:00")).toBeNull();
  expect(parseTimeValue("14m44s")).toBeNull();
});

test("parseTimeHash returns canonical hash", () => {
  expect(parseTimeHash("#t=14:44")).toEqual({
    seconds: 884,
    canonicalHash: "#t=884",
  });
  expect(parseTimeHash("#t=884")).toEqual({
    seconds: 884,
    canonicalHash: "#t=884",
  });
});

test("parseTimeHash rejects non-time hash", () => {
  expect(parseTimeHash("#msg-884")).toBeNull();
  expect(parseTimeHash("#t=14m44s")).toBeNull();
});

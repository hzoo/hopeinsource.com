import { expect, test } from "bun:test";

import { parseTimeHash, parseTimeValue, timeHashTarget } from "./time-hash";

test("parseTimeValue accepts seconds", () => {
  expect(parseTimeValue("884")).toBe(884);
});

test('time links skip relocated aliases while keeping real-time passage destinations', () => {
  const retained = { dataset: { timestamp: '1487' }, id: 'msg-1487' };
  const duplicateAlias = { dataset: {}, id: 'msg-1533' };
  const distinct = { dataset: { timestamp: '1533' }, id: 'msg-1533-2' };
  const points = [{ time: 1487, el: retained }, { time: 1533, el: distinct }];
  expect(timeHashTarget(1533, duplicateAlias, points)).toBe(distinct);
  expect(timeHashTarget(1533, retained, points)).toBe(distinct);
  expect(timeHashTarget(1533, distinct, points.slice(0, 1))).toBe(distinct);
  expect(timeHashTarget(1532, null, points)).toBe(retained);
  expect(timeHashTarget(2, null, points)).toBe(retained);
  expect(timeHashTarget(1533, duplicateAlias, [])).toBeUndefined();
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
  expect(parseTimeValue("9007199254740992")).toBeNull();
  expect(parseTimeValue(`${'9'.repeat(400)}:00`)).toBeNull();
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

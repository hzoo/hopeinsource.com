/** Presentation only: a compact response is not necessarily filler or agreement. */
export function isCompactReply(text) {
  if (/[?？]/u.test(text)) return false;
  const words = text.match(/[\p{L}\p{N}]+(?:['’‘-][\p{L}\p{N}]+)*/gu) ?? [];
  return words.length > 0 && words.length <= 2;
}

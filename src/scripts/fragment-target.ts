export function getFragmentTarget(hash: string): HTMLElement | null {
  if (!hash.startsWith('#') || hash.length === 1) return null;
  const id = hash.slice(1);
  const target = document.getElementById(id);
  if (target || !id.includes('%')) return target;
  try {
    return document.getElementById(decodeURIComponent(id));
  } catch {
    return null;
  }
}

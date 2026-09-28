const AUDIO_CDN_HOST = "d3ctxlq1ktw2nl.cloudfront.net";

/**
 * Anchor episode URLs wrap the actual CloudFront MP3 in the final path segment.
 * Use the direct source only when it decodes to the known HTTPS audio host.
 */
export function getEpisodeAudioSource(source: string): string {
  try {
    const wrapper = new URL(source);
    if (wrapper.hostname !== "anchor.fm") return source;

    const encodedSource = wrapper.pathname.split("/").at(-1);
    if (!encodedSource) return source;

    const directSource = new URL(decodeURIComponent(encodedSource));
    if (directSource.protocol !== "https:" || directSource.hostname !== AUDIO_CDN_HOST) {
      return source;
    }

    return directSource.toString();
  } catch {
    return source;
  }
}

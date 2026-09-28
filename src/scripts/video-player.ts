/**
 * Opt-in YouTube playback.
 *
 * Read stays request-free. Watch assigns the known-working embed URL directly
 * to the iframe without making the separate YouTube iframe API a dependency.
 */

import { parseTimeHash } from "./time-hash";

type VideoMode = "read" | "watch";

let mode: VideoMode = "read";
let episodeShell: HTMLElement | null = null;
let contentShell: HTMLElement | null = null;
let headerShell: HTMLElement | null = null;
let modeWatchButton: HTMLButtonElement | null = null;
let modeReadButton: HTMLButtonElement | null = null;
let videoRoot: HTMLElement | null = null;
let videoIframe: HTMLIFrameElement | null = null;
let videoEmbedSrc = "";
let videoOffsetSeconds = 0;
let requestedTranscriptTime = 0;

function timeFromHash(): number | null {
    const hash = window.location.hash;
    const parsed = parseTimeHash(hash);
    if (parsed) {
        if (hash !== parsed.canonicalHash) history.replaceState(null, "", parsed.canonicalHash);
        return parsed.seconds;
    }

    if (!hash.startsWith("#msg-")) return null;
    const message = document.getElementById(hash.slice(1));
    const seconds = parseInt(message?.dataset.timestamp || "", 10);
    return Number.isNaN(seconds) ? null : seconds;
}

function updateModeUi() {
    const isWatch = mode === "watch";
    modeWatchButton?.setAttribute("aria-pressed", String(isWatch));
    modeReadButton?.setAttribute("aria-pressed", String(!isWatch));
    episodeShell?.setAttribute("data-video-mode", mode);
    contentShell?.setAttribute("data-video-mode", mode);
    headerShell?.setAttribute("data-video-mode", mode);

    const videoShell = document.getElementById("episode-video-shell");
    videoShell?.setAttribute("aria-hidden", String(!isWatch));
    if (isWatch) {
        videoShell?.removeAttribute("inert");
    } else {
        videoShell?.setAttribute("inert", "");
    }
}

function embedUrlAt(seconds: number, shouldPlay: boolean): string {
    const url = new URL(videoEmbedSrc);
    const videoSeconds = Math.max(0, Math.floor(seconds + videoOffsetSeconds));

    if (videoSeconds > 0) {
        url.searchParams.set("start", String(videoSeconds));
    } else {
        url.searchParams.delete("start");
    }

    if (shouldPlay) {
        url.searchParams.set("autoplay", "1");
    } else {
        url.searchParams.delete("autoplay");
    }

    return url.toString();
}

function loadVideoAt(seconds: number, shouldPlay: boolean) {
    if (!videoIframe || !videoEmbedSrc || !Number.isFinite(seconds) || seconds < 0) return;
    requestedTranscriptTime = seconds;
    const src = embedUrlAt(seconds, shouldPlay);
    if (videoIframe.getAttribute("src") === src) return;
    videoIframe.src = src;
}

function unloadVideo() {
    if (!videoIframe?.hasAttribute("src")) return;
    videoIframe.src = "about:blank";
    videoIframe.removeAttribute("src");
}

function setMode(nextMode: VideoMode) {
    if (nextMode === "read") {
        mode = "read";
        unloadVideo();
        updateModeUi();
        return;
    }

    const audio = document.getElementById("audio-element") as HTMLAudioElement | null;
    const audioTime = audio?.currentSrc && Number.isFinite(audio.currentTime)
        ? audio.currentTime
        : null;
    const resumeTime = audioTime ?? timeFromHash() ?? requestedTranscriptTime;

    document.dispatchEvent(new CustomEvent("his:watch-intent"));
    mode = "watch";
    updateModeUi();
    loadVideoAt(resumeTime, false);
}

function initVideoPlayer() {
    videoRoot = document.getElementById("episode-video-sync");
    videoIframe = document.getElementById("episode-youtube-player") as HTMLIFrameElement | null;
    if (!videoRoot || !videoIframe) return;

    videoEmbedSrc = videoRoot.dataset.videoSrc || "";
    const parsedOffset = parseInt(videoRoot.dataset.videoOffsetSeconds || "0", 10);
    videoOffsetSeconds = Number.isNaN(parsedOffset) ? 0 : Math.max(0, parsedOffset);
    requestedTranscriptTime = timeFromHash() ?? 0;

    episodeShell = document.getElementById("episode-shell");
    contentShell = document.getElementById("episode-content-shell");
    headerShell = document.getElementById("chat-header");
    modeWatchButton = document.getElementById("video-mode-watch") as HTMLButtonElement | null;
    modeReadButton = document.getElementById("video-mode-read") as HTMLButtonElement | null;

    mode = "read";
    unloadVideo();
    updateModeUi();

    modeWatchButton?.addEventListener("click", () => setMode("watch"));
    modeReadButton?.addEventListener("click", () => setMode("read"));
    document.addEventListener("his:audio-intent", () => setMode("read"));
    document.addEventListener("his:timestamp-intent", (event) => {
        if (mode !== "watch") return;
        const seconds = (event as CustomEvent<{ seconds: number }>).detail?.seconds;
        if (!Number.isFinite(seconds)) return;
        loadVideoAt(seconds, true);
    });

    document.addEventListener("click", (event) => {
        if (mode !== "watch") return;
        const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#t="]');
        const href = link?.getAttribute("href");
        const parsed = href ? parseTimeHash(href) : null;
        if (!link || !parsed) return;

        event.preventDefault();
        history.replaceState(null, "", parsed.canonicalHash);
        loadVideoAt(parsed.seconds, true);
    });

    window.addEventListener("hashchange", () => {
        if (mode !== "watch") return;
        const seconds = timeFromHash();
        if (seconds !== null) loadVideoAt(seconds, false);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoPlayer, { once: true });
} else {
    initVideoPlayer();
}

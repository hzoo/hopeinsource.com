/**
 * YouTube player + transcript sync for video episodes.
 * Keeps transcript highlighting and timestamp navigation transcript-first.
 */

interface MessagePoint {
    time: number;
    el: HTMLElement;
}

type VideoMode = "watch" | "read";

declare global {
    interface Window {
        YT?: {
            Player: new (element: string | HTMLElement, config: {
                events?: {
                    onReady?: () => void;
                    onStateChange?: (event: { data: number }) => void;
                };
            }) => YouTubePlayer;
            PlayerState: {
                PLAYING: number;
            };
        };
        onYouTubeIframeAPIReady?: () => void;
        __hisYouTubeApiPromise?: Promise<void>;
    }
}

interface YouTubePlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    getPlayerState: () => number;
    destroy: () => void;
}

let player: YouTubePlayer | null = null;
let messagePoints: MessagePoint[] = [];
let listenerAbort: AbortController | null = null;
let tickInterval: ReturnType<typeof setInterval> | null = null;
let lastHighlightedMessage: HTMLElement | null = null;
let mode: VideoMode = "watch";
let contentShell: HTMLElement | null = null;
let headerShell: HTMLElement | null = null;
let modeWatchButton: HTMLButtonElement | null = null;
let modeReadButton: HTMLButtonElement | null = null;
let followResumeButton: HTMLButtonElement | null = null;
let scrollContainerEl: HTMLElement | null = null;
let videoOffsetSeconds = 0;
let followTranscript = true;
let ignoreScrollEventsUntil = 0;

function isPlayerPlaying(): boolean {
    return Boolean(
        player &&
        window.YT?.PlayerState &&
        player.getPlayerState() === window.YT.PlayerState.PLAYING,
    );
}

function findMessageIndex(seconds: number): number {
    let low = 0;
    let high = messagePoints.length - 1;
    let best = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (messagePoints[mid].time <= seconds) {
            best = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return best;
}

function scrollMessageIntoView(message: HTMLElement) {
    const scrollContainer = scrollContainerEl ?? document.getElementById("episode-scroll-container");
    if (!scrollContainer) {
        message.scrollIntoView({ block: "start", behavior: "smooth" });
        return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const messageRect = message.getBoundingClientRect();
    const topInset = 20;

    const currentTop = scrollContainer.scrollTop;
    const messageTop = currentTop + (messageRect.top - containerRect.top);
    const targetTop = Math.max(0, messageTop - topInset);

    if (Math.abs(targetTop - currentTop) > 8) {
        ignoreScrollEventsUntil = Date.now() + 600;
        scrollContainer.scrollTo({
            top: targetTop,
            behavior: "smooth",
        });
    }
}

function updateTranscriptAtTime(seconds: number, shouldAutoScroll: boolean) {
    if (messagePoints.length === 0) return;

    const currentIndex = findMessageIndex(Math.floor(seconds));
    const currentMessage = currentIndex >= 0 ? messagePoints[currentIndex].el : null;

    if (currentMessage !== lastHighlightedMessage) {
        if (lastHighlightedMessage) {
            lastHighlightedMessage.classList.remove("message-current");
        }
        if (currentMessage) {
            currentMessage.classList.add("message-current");
            if (shouldAutoScroll) {
                scrollMessageIntoView(currentMessage);
            }
        }
        lastHighlightedMessage = currentMessage;
    }
}

function updateModeButtons() {
    const isWatch = mode === "watch";
    modeWatchButton?.setAttribute("aria-pressed", String(isWatch));
    modeReadButton?.setAttribute("aria-pressed", String(!isWatch));
}

function updateFollowControls() {
    const showResume = mode === "watch" && !followTranscript;
    followResumeButton?.classList.toggle("hidden", !showResume);
}

function setFollowEnabled(enabled: boolean) {
    followTranscript = enabled;
    updateFollowControls();
}

function setMode(nextMode: VideoMode) {
    mode = nextMode;
    contentShell?.setAttribute("data-video-mode", nextMode);
    headerShell?.setAttribute("data-video-mode", nextMode);
    updateModeButtons();

    if (nextMode === "read") {
        player?.pauseVideo();
        setFollowEnabled(false);
        stopTicker();
        return;
    }

    setFollowEnabled(true);
    updatePlayerUi();
    syncTickerToPlaybackState();
}

function updatePlayerUi() {
    if (!player) return;

    const videoTime = player.getCurrentTime();
    const transcriptTime = videoTime - videoOffsetSeconds;
    const shouldAutoScroll = mode === "watch" && followTranscript;
    updateTranscriptAtTime(transcriptTime, shouldAutoScroll);
}

function startTicker() {
    stopTicker();
    tickInterval = setInterval(() => {
        updatePlayerUi();
    }, 250);
}

function stopTicker() {
    if (tickInterval) {
        clearInterval(tickInterval);
        tickInterval = null;
    }
}

function syncTickerToPlaybackState() {
    if (mode !== "watch" || !isPlayerPlaying()) {
        stopTicker();
        return;
    }
    startTicker();
}

function seekToTime(seconds: number, shouldPlay: boolean) {
    if (!player || !Number.isFinite(seconds) || seconds < 0) return;

    const videoTime = Math.max(0, seconds + videoOffsetSeconds);
    player.seekTo(videoTime, true);
    if (shouldPlay) {
        player.playVideo();
        return;
    }
    updatePlayerUi();
    syncTickerToPlaybackState();
}

function handleHashSeek(autoplay: boolean) {
    const hash = window.location.hash;
    if (!hash) return;

    if (hash.startsWith("#t=")) {
        const seconds = parseInt(hash.slice(3), 10);
        if (!Number.isNaN(seconds)) {
            seekToTime(seconds, autoplay);
        }
        return;
    }

    if (!hash.startsWith("#msg-")) return;
    const msg = document.getElementById(hash.slice(1));
    const timestamp = msg?.getAttribute("data-timestamp");
    if (!timestamp) return;
    const seconds = parseInt(timestamp, 10);
    if (!Number.isNaN(seconds)) {
        seekToTime(seconds, autoplay);
    }
}

function loadYouTubeApi(): Promise<void> {
    if (window.YT?.Player) return Promise.resolve();
    if (window.__hisYouTubeApiPromise) return window.__hisYouTubeApiPromise;

    window.__hisYouTubeApiPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            'script[src="https://www.youtube.com/iframe_api"]',
        );

        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            previousReady?.();
            resolve();
        };

        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.onerror = () => reject(new Error("Failed to load YouTube iframe API"));
        document.head.appendChild(script);
    });

    return window.__hisYouTubeApiPromise;
}

async function initVideoPlayer() {
    listenerAbort?.abort();
    listenerAbort = new AbortController();
    const { signal } = listenerAbort;

    const root = document.getElementById("episode-video-sync");
    const iframe = document.getElementById("episode-youtube-player");
    if (!root || !iframe) return;

    const parsedOffset = parseInt(root.getAttribute("data-video-offset-seconds") || "0", 10);
    videoOffsetSeconds = Number.isNaN(parsedOffset) ? 0 : Math.max(0, parsedOffset);

    contentShell = document.getElementById("episode-content-shell");
    headerShell = document.getElementById("chat-header");
    modeWatchButton = document.getElementById("video-mode-watch") as HTMLButtonElement | null;
    modeReadButton = document.getElementById("video-mode-read") as HTMLButtonElement | null;
    followResumeButton = document.getElementById("video-follow-resume") as HTMLButtonElement | null;
    scrollContainerEl = document.getElementById("episode-scroll-container");

    mode = "watch";
    setFollowEnabled(true);
    contentShell?.setAttribute("data-video-mode", "watch");
    headerShell?.setAttribute("data-video-mode", "watch");
    updateModeButtons();

    modeWatchButton?.addEventListener("click", () => {
        setMode("watch");
    }, { signal });

    modeReadButton?.addEventListener("click", () => {
        setMode("read");
    }, { signal });

    followResumeButton?.addEventListener("click", () => {
        setFollowEnabled(true);
        updatePlayerUi();
    }, { signal });

    const pauseFollowOnManualScroll = () => {
        if (mode !== "watch" || !followTranscript || !isPlayerPlaying()) return;
        setFollowEnabled(false);
    };

    scrollContainerEl?.addEventListener("wheel", pauseFollowOnManualScroll, { passive: true, signal });
    scrollContainerEl?.addEventListener("touchstart", pauseFollowOnManualScroll, { passive: true, signal });
    scrollContainerEl?.addEventListener("scroll", () => {
        if (Date.now() < ignoreScrollEventsUntil) return;
        pauseFollowOnManualScroll();
    }, { passive: true, signal });

    messagePoints = Array.from(document.querySelectorAll<HTMLElement>(".message"))
        .map((message) => ({
            time: parseInt(message.getAttribute("data-timestamp") || "", 10),
            el: message,
        }))
        .filter(({ time }) => !Number.isNaN(time))
        .sort((a, b) => a.time - b.time);

    try {
        await loadYouTubeApi();
    } catch (error) {
        console.error(error);
        return;
    }

    if (!window.YT?.Player) return;

    player = new window.YT.Player("episode-youtube-player", {
        events: {
            onReady: () => {
                setMode("watch");
                if (!window.location.hash && videoOffsetSeconds > 0) {
                    player?.seekTo(videoOffsetSeconds, true);
                }
                handleHashSeek(false);
                updatePlayerUi();
                syncTickerToPlaybackState();
            },
            onStateChange: () => {
                updatePlayerUi();
                syncTickerToPlaybackState();
            },
        },
    });

    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const timestampLink = target.closest<HTMLAnchorElement>('a[href^="#t="]');
        if (timestampLink) {
            e.preventDefault();
            const href = timestampLink.getAttribute("href");
            if (!href) return;
            history.replaceState(null, "", href);
            setMode("watch");
            setFollowEnabled(true);
            handleHashSeek(true);
            return;
        }

        const messageTime = target.closest(".message-time");
        if (!messageTime) return;
        const message = messageTime.closest<HTMLElement>(".message");
        const timestamp = message?.getAttribute("data-timestamp");
        if (!timestamp) return;
        const seconds = parseInt(timestamp, 10);
        if (Number.isNaN(seconds)) return;
        history.replaceState(null, "", `#t=${seconds}`);
        setMode("watch");
        setFollowEnabled(true);
        seekToTime(seconds, true);
    }, { signal });

    window.addEventListener("hashchange", () => {
        if (window.location.hash.startsWith("#t=") || window.location.hash.startsWith("#msg-")) {
            setMode("watch");
            setFollowEnabled(true);
        }
        handleHashSeek(true);
    }, { signal });
}

function cleanupVideoPlayer() {
    listenerAbort?.abort();
    listenerAbort = null;
    stopTicker();

    if (player) {
        player.destroy();
        player = null;
    }

    if (lastHighlightedMessage) {
        lastHighlightedMessage.classList.remove("message-current");
        lastHighlightedMessage = null;
    }

    mode = "watch";
    videoOffsetSeconds = 0;
    followTranscript = true;
    ignoreScrollEventsUntil = 0;
    contentShell = null;
    headerShell = null;
    modeWatchButton = null;
    modeReadButton = null;
    followResumeButton = null;
    scrollContainerEl = null;
    messagePoints = [];
}

function setupVideoPlayer() {
    cleanupVideoPlayer();
    initVideoPlayer();
}

document.addEventListener("astro:page-load", setupVideoPlayer);

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupVideoPlayer, { once: true });
} else {
    setupVideoPlayer();
}

export {};

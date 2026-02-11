/**
 * YouTube player + transcript sync for video episodes.
 * Keeps transcript highlighting and timestamp navigation transcript-first.
 */

interface MessagePoint {
    time: number;
    el: HTMLElement;
}

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
    const scrollContainer = document.getElementById("episode-scroll-container");
    if (!scrollContainer) {
        message.scrollIntoView({ block: "center", behavior: "smooth" });
        return;
    }

    const containerRect = scrollContainer.getBoundingClientRect();
    const messageRect = message.getBoundingClientRect();
    const topThreshold = containerRect.top + containerRect.height * 0.2;
    const bottomThreshold = containerRect.top + containerRect.height * 0.8;
    const isOutsideFocusBand = messageRect.top < topThreshold || messageRect.bottom > bottomThreshold;

    if (isOutsideFocusBand) {
        message.scrollIntoView({ block: "center", behavior: "smooth" });
    }
}

function updateTranscriptAtTime(seconds: number) {
    if (messagePoints.length === 0) return;

    const currentIndex = findMessageIndex(Math.floor(seconds));
    const currentMessage = currentIndex >= 0 ? messagePoints[currentIndex].el : null;

    if (currentMessage !== lastHighlightedMessage) {
        if (lastHighlightedMessage) {
            lastHighlightedMessage.classList.remove("message-current");
        }
        if (currentMessage) {
            currentMessage.classList.add("message-current");
            scrollMessageIntoView(currentMessage);
        }
        lastHighlightedMessage = currentMessage;
    }
}

function updatePlayerUi() {
    if (!player) return;

    const currentTime = player.getCurrentTime();
    updateTranscriptAtTime(currentTime);
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

function seekToTime(seconds: number, shouldPlay: boolean) {
    if (!player || !Number.isFinite(seconds) || seconds < 0) return;

    player.seekTo(seconds, true);
    if (shouldPlay) {
        player.playVideo();
    }
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

    const iframe = document.getElementById("episode-youtube-player");
    if (!iframe) return;

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
                updatePlayerUi();
                startTicker();
                handleHashSeek(false);
            },
            onStateChange: () => {
                updatePlayerUi();
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
        seekToTime(seconds, true);
    }, { signal });

    window.addEventListener("hashchange", () => {
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

    messagePoints = [];
}

function setupVideoPlayer() {
    cleanupVideoPlayer();
    initVideoPlayer();
}

document.addEventListener("astro:page-load", setupVideoPlayer);

if (document.readyState === "complete") {
    setupVideoPlayer();
}

export {};

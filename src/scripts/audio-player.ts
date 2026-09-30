/**
 * Lazy native audio playback for every episode.
 * Audio owns timestamps in Read view; video owns them in Watch view.
 */

import { parseTimeHash } from "./time-hash";

interface MessagePoint {
    time: number;
    el: HTMLElement;
}

let audio: HTMLAudioElement | null = null;
let playPauseButton: HTMLButtonElement | null = null;
let seekSlider: HTMLInputElement | null = null;
let currentTimeDisplay: HTMLElement | null = null;
let durationDisplay: HTMLElement | null = null;
let progressBar: HTMLElement | null = null;
let playIcon: HTMLElement | null = null;
let pauseIcon: HTMLElement | null = null;
let muteButton: HTMLElement | null = null;
let volumeIcon: HTMLElement | null = null;
let muteIcon: HTMLElement | null = null;
let shortcutsButton: HTMLElement | null = null;
let shortcutsDialog: HTMLElement | null = null;
let closeShortcuts: HTMLElement | null = null;
let volumeSlider: HTMLInputElement | null = null;
let playerFeedback: HTMLElement | null = null;
let feedbackText: HTMLElement | null = null;
let messagePoints: MessagePoint[] = [];
let messagePointsReady = false;
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null;
let lastHighlightedMessage: HTMLElement | null = null;
let isLoaded = false;
let pendingTime = 0;
let src = "";
let shortcutReturnFocus: HTMLElement | null = null;

function isWatchView(): boolean {
    return document.getElementById("episode-shell")?.dataset.videoMode === "watch";
}

function enterReadView() {
    if (isWatchView()) {
        document.dispatchEvent(new CustomEvent("his:audio-intent"));
    }
}

function ensureMessagePoints() {
    if (messagePointsReady) return;
    messagePoints = Array.from(document.querySelectorAll<HTMLElement>(".message"))
        .map((message) => ({
            time: parseInt(message.dataset.timestamp || "", 10),
            el: message,
        }))
        .filter(({ time }) => !Number.isNaN(time))
        .sort((a, b) => a.time - b.time);
    messagePointsReady = true;
}

function formatTime(seconds: number) {
    if (!seconds || Number.isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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

function highlightTime(seconds: number) {
    ensureMessagePoints();
    const currentIndex = findMessageIndex(Math.floor(seconds));
    const currentMessage = currentIndex >= 0 ? messagePoints[currentIndex].el : null;

    if (currentMessage === lastHighlightedMessage) return;
    lastHighlightedMessage?.classList.remove("message-current");
    currentMessage?.classList.add("message-current");
    lastHighlightedMessage = currentMessage;
}

function updateTimeDisplay() {
    if (!audio || !audio.duration || !currentTimeDisplay || !durationDisplay || !seekSlider || !progressBar) return;

    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);
    const percent = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = String(percent);
    seekSlider.setAttribute(
        "aria-valuetext",
        `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`,
    );
    progressBar.style.width = `${percent}%`;
    highlightTime(audio.currentTime);
}

function setPlaybackUi(isPaused: boolean) {
    playIcon?.classList.toggle("hidden", !isPaused);
    pauseIcon?.classList.toggle("hidden", isPaused);
    playPauseButton?.setAttribute("aria-label", isPaused ? "Play episode" : "Pause episode");
}

function ensureAudioLoaded() {
    if (!audio || isLoaded || !src) return;
    document.getElementById("audio-player-container")?.setAttribute("data-audio-state", "active");
    audio.src = src;
    audio.load();
    isLoaded = true;
}

function setAudioPosition(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) return;
    pendingTime = seconds;
    if (isLoaded && audio) audio.currentTime = seconds;
    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(seconds);
    seekSlider?.setAttribute("aria-valuetext", `${formatTime(seconds)} of ${durationDisplay?.textContent || "00:00"}`);
    highlightTime(seconds);
}

function playFrom(seconds = pendingTime) {
    if (!audio) return;
    enterReadView();
    ensureAudioLoaded();
    audio.currentTime = seconds;
    pendingTime = seconds;
    void audio.play().catch((error) => {
        if (error instanceof DOMException && (error.name === "AbortError" || error.name === "NotAllowedError")) {
            return;
        }
        console.error("Error playing audio:", error);
    });
}

function togglePlayPause() {
    if (!audio) return;
    enterReadView();
    if (!isLoaded || audio.paused) {
        playFrom(isLoaded ? audio.currentTime : pendingTime);
    } else {
        audio.pause();
    }
}

function stageHashTime(options: { scroll: boolean }) {
    const hash = window.location.hash;
    if (!hash) return;

    const parsedTimeHash = parseTimeHash(hash);
    if (parsedTimeHash) {
        if (hash !== parsedTimeHash.canonicalHash) {
            history.replaceState(null, "", parsedTimeHash.canonicalHash);
        }
        setAudioPosition(parsedTimeHash.seconds);
        if (options.scroll) {
            const index = findMessageIndex(parsedTimeHash.seconds);
            const message = document.getElementById(`msg-${parsedTimeHash.seconds}`)
                ?? messagePoints[Math.max(0, index)]?.el;
            requestAnimationFrame(() => message?.scrollIntoView({ block: "start", behavior: "instant" }));
        }
        return;
    }

    if (!hash.startsWith("#msg-")) return;
    const anchor = document.getElementById(hash.slice(1));
    const message = anchor?.matches('.message') ? anchor : anchor?.closest<HTMLElement>('.message');
    const seconds = parseInt(message?.dataset.timestamp || "", 10);
    if (!Number.isNaN(seconds)) setAudioPosition(seconds);
}

function updateMuteIcon(isMuted: boolean) {
    volumeIcon?.classList.toggle("hidden", isMuted);
    muteIcon?.classList.toggle("hidden", !isMuted);
    muteButton?.setAttribute("aria-label", isMuted ? "Unmute episode" : "Mute episode");
}

function showFeedback(action: "seek" | "play" | "pause" | "mute" | "unmute" | "volume" | "error", value: string | number = "") {
    if (!feedbackText || !playerFeedback) return;
    if (feedbackTimeout) clearTimeout(feedbackTimeout);

    const feedback = {
        play: "Playing",
        pause: "Paused",
        mute: "Muted",
        unmute: "Unmuted",
        volume: `Volume ${value}%`,
        seek: `${Number(value) > 0 ? "Forward" : "Back"} ${Math.abs(Number(value))}s`,
        error: "Audio could not play",
    };

    feedbackText.textContent = feedback[action];
    playerFeedback.style.opacity = "1";
    feedbackTimeout = setTimeout(() => {
        if (playerFeedback) playerFeedback.style.opacity = "0";
    }, 500);
}

function seekRelative(seconds: number) {
    if (!audio || !isLoaded) return;
    const duration = Number.isFinite(audio.duration) ? audio.duration : Infinity;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    showFeedback("seek", seconds);
}

function handleAudioKeydown(event: KeyboardEvent) {
    if (shortcutsDialog && !shortcutsDialog.classList.contains("hidden")) {
        if (event.key === "Escape") {
            event.preventDefault();
            closeShortcutsDialog();
        } else if (event.key === "Tab") {
            event.preventDefault();
            closeShortcuts?.focus();
        }
        return;
    }

    if ((event.target as HTMLElement).matches("input, textarea, select, button, a, [role='button'], [contenteditable='true']")) return;
    if (!audio || isWatchView()) return;

    switch (event.code) {
        case "Space":
            event.preventDefault();
            togglePlayPause();
            break;
        case "KeyJ":
            event.preventDefault();
            seekRelative(-10);
            break;
        case "KeyK":
            event.preventDefault();
            seekRelative(10);
            break;
        case "KeyM":
            event.preventDefault();
            audio.muted = !audio.muted;
            showFeedback(audio.muted ? "mute" : "unmute");
            break;
    }
}

function openShortcutsDialog() {
    if (!shortcutsDialog) return;
    shortcutReturnFocus = document.activeElement as HTMLElement | null;
    shortcutsDialog.classList.remove("hidden");
    shortcutsDialog.setAttribute("aria-hidden", "false");
    closeShortcuts?.focus();
}

function closeShortcutsDialog() {
    if (!shortcutsDialog || shortcutsDialog.classList.contains("hidden")) return;
    shortcutsDialog.classList.add("hidden");
    shortcutsDialog.setAttribute("aria-hidden", "true");
    shortcutReturnFocus?.focus();
    shortcutReturnFocus = null;
}

function handleGlobalClick(event: MouseEvent) {
    if (isWatchView()) return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#t="]');
    if (!link) return;

    const href = link.getAttribute("href");
    const parsed = href ? parseTimeHash(href) : null;
    if (!href || !parsed) return;

    event.preventDefault();
    history.replaceState(null, "", parsed.canonicalHash);
    setAudioPosition(parsed.seconds);
    playFrom(parsed.seconds);
}

function initAudioPlayer() {
    audio = document.getElementById("audio-element") as HTMLAudioElement | null;
    playPauseButton = document.getElementById("play-pause") as HTMLButtonElement | null;
    seekSlider = document.getElementById("seek-slider") as HTMLInputElement | null;
    currentTimeDisplay = document.getElementById("current-time");
    durationDisplay = document.getElementById("duration");
    progressBar = document.getElementById("progress-bar");
    playIcon = document.getElementById("play-icon");
    pauseIcon = document.getElementById("pause-icon");
    muteButton = document.getElementById("mute-button");
    volumeIcon = document.getElementById("volume-icon");
    muteIcon = document.getElementById("mute-icon");
    shortcutsButton = document.getElementById("shortcuts-button");
    shortcutsDialog = document.getElementById("shortcuts-dialog");
    closeShortcuts = document.getElementById("close-shortcuts");
    volumeSlider = document.getElementById("volume-slider") as HTMLInputElement | null;
    playerFeedback = document.getElementById("player-feedback");
    feedbackText = document.getElementById("feedback-text");

    const container = document.getElementById("audio-player-container");
    src = container?.dataset.src || "";
    if (!audio) return;

    playPauseButton?.addEventListener("click", togglePlayPause);
    seekSlider?.addEventListener("input", () => {
        if (!audio?.duration || !seekSlider) return;
        audio.currentTime = audio.duration * (Number(seekSlider.value) / 100);
    });

    audio.addEventListener("timeupdate", updateTimeDisplay);
    audio.addEventListener("loadedmetadata", () => {
        if (!audio) return;
        if (pendingTime > 0) audio.currentTime = pendingTime;
        if (seekSlider) seekSlider.disabled = false;
        updateTimeDisplay();
    });
    audio.addEventListener("play", () => {
        setPlaybackUi(false);
        showFeedback("play");
    });
    audio.addEventListener("pause", () => {
        setPlaybackUi(true);
        if (isLoaded) showFeedback("pause");
    });
    audio.addEventListener("error", () => {
        setPlaybackUi(true);
        showFeedback("error");
    });

    volumeSlider?.addEventListener("input", () => {
        if (!audio || !volumeSlider) return;
        const value = Number(volumeSlider.value);
        audio.volume = value / 100;
        audio.muted = value === 0;
        volumeSlider.setAttribute("aria-valuetext", `${value} percent`);
        showFeedback("volume", value);
    });
    audio.addEventListener("volumechange", () => {
        if (!audio) return;
        updateMuteIcon(audio.muted);
        if (!audio.muted && volumeSlider) {
            volumeSlider.value = String(Math.round(audio.volume * 100));
        }
    });
    muteButton?.addEventListener("click", () => {
        if (!audio) return;
        audio.muted = !audio.muted;
        if (!audio.muted && audio.volume === 0) audio.volume = 0.5;
        showFeedback(audio.muted ? "mute" : "unmute");
    });

    shortcutsButton?.addEventListener("click", openShortcutsDialog);
    closeShortcuts?.addEventListener("click", closeShortcutsDialog);
    shortcutsDialog?.addEventListener("click", (event) => {
        if (event.target === shortcutsDialog) closeShortcutsDialog();
    });

    document.addEventListener("keydown", handleAudioKeydown);
    document.addEventListener("click", handleGlobalClick);
    window.addEventListener("hashchange", () => stageHashTime({ scroll: true }));
    document.addEventListener("his:watch-intent", () => audio?.pause());
    document.addEventListener("his:video-position", (event) => {
        const seconds = (event as CustomEvent<{ seconds: number }>).detail?.seconds;
        if (Number.isFinite(seconds)) setAudioPosition(seconds);
    });

    audio.volume = 0.5;
    setPlaybackUi(true);
    stageHashTime({ scroll: true });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAudioPlayer, { once: true });
} else {
    initAudioPlayer();
}

export {};

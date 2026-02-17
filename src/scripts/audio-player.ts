/**
 * Audio Player functionality
 */

let audio: HTMLAudioElement | null = null;
let playPauseButton: HTMLElement | null = null;
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

interface MessagePoint {
    time: number;
    el: HTMLElement;
}

let messagePoints: MessagePoint[] = [];
let messagePointsReady = false;
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null;
let lastHighlightedMessage: HTMLElement | null = null;
let isLoaded = false;
let src = '';
let listenerAbort: AbortController | null = null;

function ensureMessagePoints() {
    if (messagePointsReady) return;
    messagePoints = Array.from(document.querySelectorAll<HTMLElement>('.message'))
        .map((message) => ({
            time: parseInt(message.getAttribute('data-timestamp') || '', 10),
            el: message,
        }))
        .filter(({ time }) => !isNaN(time))
        .sort((a, b) => a.time - b.time);
    messagePointsReady = true;
}

function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function updateTimeDisplay() {
    if (!audio || !audio.duration || !currentTimeDisplay || !durationDisplay || !seekSlider || !progressBar) return;

    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    durationDisplay.textContent = formatTime(audio.duration);

    const percent = (audio.currentTime / audio.duration) * 100;
    seekSlider.value = String(percent);
    progressBar.style.width = `${percent}%`;

    updateCurrentMessage();
}

function updateCurrentMessage() {
    ensureMessagePoints();
    if (!audio || messagePoints.length === 0) return;
    const currentTime = Math.floor(audio.currentTime);
    const currentIndex = findMessageIndex(currentTime);
    const currentMessage = currentIndex >= 0 ? messagePoints[currentIndex].el : null;

    if (currentMessage !== lastHighlightedMessage) {
        if (lastHighlightedMessage) {
            lastHighlightedMessage.classList.remove('message-current');
        }
        if (currentMessage) {
            currentMessage.classList.add('message-current');
        }
        lastHighlightedMessage = currentMessage;
    }
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

function prepAudioPosition(seconds: number) {
    if (!audio) return;
    if (!isLoaded) {
        audio.src = src;
        audio.load();
        isLoaded = true;
    }
    audio.currentTime = seconds;
    if (seekSlider) seekSlider.disabled = false;
}

function seekToTimestamp(playAudio = true) {
    const hash = window.location.hash;
    if (!hash) return;

    let seconds: number;
    if (hash.startsWith("#t=")) {
        seconds = parseInt(hash.slice(3), 10);
        if (isNaN(seconds)) return;

        const msgId = `msg-${seconds}`;
        const msgElement = document.getElementById(msgId);
        if (msgElement) {
            msgElement.scrollIntoView();
        }

        loadAudioAndPlay(seconds, playAudio);

    } else if (hash.startsWith("#msg-")) {
        const msgElement = document.getElementById(hash.slice(1));
        if (!msgElement) return;

        const timestamp = msgElement.getAttribute("data-timestamp");
        if (!timestamp) return;

        seconds = parseInt(timestamp, 10);
        if (isNaN(seconds)) return;

        prepAudioPosition(seconds);
    }
}

function togglePlayPauseIcon(isPaused: boolean) {
    if (!playIcon || !pauseIcon) return;
    playIcon.classList.toggle('hidden', !isPaused);
    pauseIcon.classList.toggle('hidden', isPaused);
}

function loadAudioAndPlay(startTime = 0, play = true) {
    if (!audio) return;
    if (!isLoaded) {
        audio.src = src;
        audio.load();
        isLoaded = true;
    }

    audio.currentTime = startTime;
    if (play) {
        audio.play()
            .then(() => {
                togglePlayPauseIcon(false);
                if (seekSlider) seekSlider.disabled = false;
                showFeedback('play');
            })
            .catch((error) => console.error("Error playing audio:", error));
    }
}

function togglePlayPause() {
    if (!audio) return;
    if (!isLoaded) {
        loadAudioAndPlay();
    } else if (audio.paused) {
        audio.play().then(() => {
            togglePlayPauseIcon(false);
            showFeedback('play');
        });
    } else {
        audio.pause();
        togglePlayPauseIcon(true);
        showFeedback('pause');
    }
}

function updateMuteIcon(isMuted: boolean) {
    if (!volumeIcon || !muteIcon) return;
    volumeIcon.classList.toggle('hidden', isMuted);
    muteIcon.classList.toggle('hidden', !isMuted);
}

function showFeedback(action: string, value: string | number = '') {
    if (!feedbackText || !playerFeedback) return;
    if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
    }

    let text = '';
    switch (action) {
        case 'seek':
            const direction = (value as number) > 0 ? 'Forward' : 'Back';
            text = `${direction} ${Math.abs(value as number)}s`;
            break;
        case 'play': text = 'Playing'; break;
        case 'pause': text = 'Paused'; break;
        case 'mute': text = 'Muted'; break;
        case 'unmute': text = 'Unmuted'; break;
        case 'volume': text = `Volume ${value}%`; break;
    }

    feedbackText.textContent = text;
    playerFeedback.style.opacity = '1';

    feedbackTimeout = setTimeout(() => {
        if (playerFeedback) playerFeedback.style.opacity = '0';
    }, 500);
}

function seekRelative(seconds: number) {
    if (!audio || !audio.duration) return;
    const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    showFeedback('seek', seconds);
}

function handleAudioKeydown(e: KeyboardEvent) {
    if ((e.target as HTMLElement).matches('input, [contenteditable="true"]')) return;
    if (!audio) return;

    switch (e.code) {
        case "Space":
            e.preventDefault();
            togglePlayPause();
            break;
        case "KeyJ":
            e.preventDefault();
            seekRelative(-10);
            break;
        case "KeyK":
            e.preventDefault();
            seekRelative(10);
            break;
        case "KeyM":
            e.preventDefault();
            audio.muted = !audio.muted;
            showFeedback(audio.muted ? 'mute' : 'unmute');
            break;
    }
}

function handleGlobalClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    // Handle hash links (#t=)
    const link = target.closest<HTMLAnchorElement>('a[href^="#t="]');
    if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
            history.replaceState(null, "", href);
            seekToTimestamp();
        }
        return;
    }

    // Handle message time clicks
    const timeEl = target.closest(".message-time");
    if (timeEl) {
        const messageEl = timeEl.closest(".message");
        if (messageEl) {
            const seconds = parseInt(messageEl.getAttribute("data-timestamp") || '', 10);
            if (!isNaN(seconds)) {
                history.replaceState(null, "", `#t=${seconds}`);
                seekToTimestamp(false);
            }
        }
    }
}

function handleHashChange() {
    seekToTimestamp();
}

function initAudioPlayer() {
    listenerAbort?.abort();
    listenerAbort = new AbortController();
    const { signal } = listenerAbort;

    audio = document.getElementById("audio-element") as HTMLAudioElement;
    playPauseButton = document.getElementById("play-pause");
    seekSlider = document.getElementById("seek-slider") as HTMLInputElement;
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
    volumeSlider = document.getElementById("volume-slider") as HTMLInputElement;
    playerFeedback = document.getElementById("player-feedback");
    feedbackText = document.getElementById("feedback-text");

    const container = document.getElementById("audio-player-container");
    src = container?.dataset.src || '';
    if (!audio) return;

    // Listeners
    playPauseButton?.addEventListener("click", togglePlayPause, { signal });

    seekSlider?.addEventListener("input", () => {
        if (audio && audio.duration) {
            const seekTime = audio.duration * (Number(seekSlider?.value) / 100);
            audio.currentTime = seekTime;
        }
    }, { signal });

    audio.addEventListener("timeupdate", updateTimeDisplay, { signal });
    audio.addEventListener("loadedmetadata", () => {
        updateTimeDisplay();
        if (seekSlider) seekSlider.disabled = false;
    }, { signal });

    volumeSlider?.addEventListener("input", () => {
        if (audio && volumeSlider) {
            const val = Number(volumeSlider.value);
            audio.volume = val / 100;
            audio.muted = val === 0;
            updateMuteIcon(audio.muted);
            showFeedback('volume', val);
        }
    }, { signal });

    audio.addEventListener("volumechange", () => {
        if (!audio) return;
        updateMuteIcon(audio.muted);
        if (!audio.muted && volumeSlider) {
            volumeSlider.value = String(Math.round(audio.volume * 100));
        }
    }, { signal });

    muteButton?.addEventListener("click", () => {
        if (!audio) return;
        audio.muted = !audio.muted;
        showFeedback(audio.muted ? 'mute' : 'unmute');
        if (!audio.muted && audio.volume === 0) {
            audio.volume = 0.5;
            if (volumeSlider) volumeSlider.value = "50";
        }
    }, { signal });

    shortcutsButton?.addEventListener("click", () => shortcutsDialog?.classList.remove("hidden"), { signal });
    closeShortcuts?.addEventListener("click", () => shortcutsDialog?.classList.add("hidden"), { signal });
    shortcutsDialog?.addEventListener("click", (e) => {
        if (e.target === shortcutsDialog) shortcutsDialog?.classList.add("hidden");
    }, { signal });

    document.addEventListener("keydown", handleAudioKeydown, { signal });

    document.addEventListener("click", handleGlobalClick, { signal });
    window.addEventListener("hashchange", handleHashChange, { signal });

    audio.volume = 0.5;
    seekToTimestamp();
}

function cleanupAudioPlayer() {
    listenerAbort?.abort();
    listenerAbort = null;

    if (audio) {
        audio.pause();
        audio.src = '';
    }

    if (lastHighlightedMessage) {
        lastHighlightedMessage.classList.remove('message-current');
    }

    if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
        feedbackTimeout = null;
    }

    messagePoints = [];
    messagePointsReady = false;
    isLoaded = false;
    lastHighlightedMessage = null;
}

function setupAudioPlayer() {
    cleanupAudioPlayer();
    initAudioPlayer();
}

document.addEventListener('astro:page-load', setupAudioPlayer);

if (document.readyState === 'complete') {
    setupAudioPlayer();
}

export {};

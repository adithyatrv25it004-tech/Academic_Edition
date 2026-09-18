/**
 * UI Bubble Sound
 * Subtle, soft acoustic bubble pop for meaningful primary button interactions.
 * - Volume: ~0.20 (low, gentle, non-intrusive)
 * - Anti-spam cooldown: 120ms
 * - Fails silently; never blocks UI execution or navigation.
 */

const BUBBLE_AUDIO_PATH = '/audio/ui-bubble.mp3';
const BUBBLE_VOLUME = 0.20;
const COOLDOWN_MS = 120;

let lastPlayedTime = 0;
let preloadedAudio = null;

if (typeof window !== 'undefined') {
  try {
    preloadedAudio = new Audio(BUBBLE_AUDIO_PATH);
    preloadedAudio.volume = BUBBLE_VOLUME;
    preloadedAudio.preload = 'auto';
  } catch {
    // Silently continue if audio environment is not yet initialized
  }
}

export function playUiBubbleSound() {
  if (typeof window === 'undefined') {
    return;
  }

  // Respect user sound preference if set
  try {
    if (localStorage.getItem('atp_sound_muted') === 'true') {
      return;
    }
  } catch {
    // Ignore localStorage access issues
  }

  // Anti-spam cooldown (100–150ms) to avoid audio stacking on rapid clicks
  const now = Date.now();
  if (now - lastPlayedTime < COOLDOWN_MS) {
    return;
  }
  lastPlayedTime = now;

  try {
    if (preloadedAudio) {
      preloadedAudio.currentTime = 0;
      preloadedAudio.play().catch(() => {
        // In case browser requires a fresh Audio instance per gesture
        try {
          const fresh = new Audio(BUBBLE_AUDIO_PATH);
          fresh.volume = BUBBLE_VOLUME;
          fresh.play().catch(() => {});
        } catch {}
      });
    } else {
      const audio = new Audio(BUBBLE_AUDIO_PATH);
      audio.volume = BUBBLE_VOLUME;
      audio.play().catch(() => {});
    }
  } catch {
    // Audio failure must NEVER block the button action
  }
}

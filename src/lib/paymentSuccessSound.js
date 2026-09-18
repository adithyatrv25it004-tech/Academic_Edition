const PAYMENT_SUCCESS_AUDIO_PATH = "/audio/payment-success.wav";

export function playPaymentSuccessSound() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const audio = new Audio(PAYMENT_SUCCESS_AUDIO_PATH);
    audio.volume = 0.42;
    audio.preload = "auto";
    audio.play().catch(() => {
      // Browsers may block autoplay; never block the payment flow.
    });
  } catch {
    // Audio may be unsupported. Continue silently.
  }
}

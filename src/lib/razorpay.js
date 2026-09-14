import { supabase } from "./supabase";

/**
 * Dynamically loads the official Razorpay Checkout SDK.
 * @returns {Promise<boolean>} Resolves true when loaded.
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay Checkout script");
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/**
 * Calls create-payment-order Supabase Edge Function to get a unique Razorpay order for ₹49.
 */
export async function createPaymentOrder() {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    throw new Error("You must be logged in to initiate checkout.");
  }

  const { data, error } = await supabase.functions.invoke("create-payment-order", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    throw new Error(error.message || "Failed to create payment order");
  }

  return data;
}

/**
 * Calls register-device Edge Function to register this browser's ECDSA P-256 public key.
 * @param {object} publicKeyJwk - JWK object of the browser-generated public key
 * @param {string} deviceName - Human-readable device description
 * @returns {Promise<{success: boolean, device_id: string} | {error: string}>}
 */
export async function registerDevice(publicKeyJwk, deviceName) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) throw new Error("Session expired. Please log in again.");

  const { data, error } = await supabase.functions.invoke("register-device", {
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: {
      public_key: JSON.stringify(publicKeyJwk),
      device_name: deviceName,
    },
  });

  if (error) throw new Error(error.message || "Failed to register device");

  return data;
}

/**
 * Calls get-material-access to retrieve short-lived signed Storage URL.
 * Requires an active study session token (x-session-token header).
 * @param {string} materialId
 * @param {string} sessionToken - from studySession.getStoredSessionToken()
 */
export async function getMaterialAccess(materialId, sessionToken) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    throw new Error("Session expired. Please log in again.");
  }

  if (!sessionToken) {
    throw new Error("No active study session. Please re-authenticate your device.");
  }

  const { data, error } = await supabase.functions.invoke("get-material-access", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "x-session-token": sessionToken,
    },
    body: { material_id: materialId },
  });

  if (error) throw error;

  return data;
}

/**
 * Calls request-device-transfer Edge Function.
 * Sends the NEW device's public key (ECDSA P-256 JWK) to replace the old one.
 * @param {object} publicKeyJwk - New device's public key JWK
 * @param {string} deviceName - New device name
 * @param {string} reason - Transfer reason
 */
export async function requestDeviceTransfer(publicKeyJwk, deviceName, reason = "Replaced study device") {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    throw new Error("Session expired. Please log in again.");
  }

  const { data, error } = await supabase.functions.invoke("request-device-transfer", {
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: {
      public_key: JSON.stringify(publicKeyJwk),
      device_name: deviceName,
      reason,
    },
  });

  if (error) throw new Error(error.message || "Device transfer request failed");
  if (data?.error) throw new Error(data.message || data.error);

  return data;
}

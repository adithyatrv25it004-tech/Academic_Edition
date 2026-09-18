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

  if (error) {
    let payload = null;
    if (error.context && typeof error.context.json === 'function') {
      try {
        payload = await error.context.json();
      } catch {}
    }
    if (payload?.error) {
      return payload;
    }
    const msg = payload?.message || payload?.error || error.message;
    const err = new Error(msg || "Failed to register device");
    err.code = payload?.error;
    throw err;
  }

  return data;
}

/**
 * Calls get-material-access (paid) or get-free-material-access (free) to retrieve short-lived signed Storage URL.
 * @param {string} materialId
 * @param {string} sessionToken - from studySession.getStoredSessionToken()
 * @param {boolean} isFree - whether the material is marked as free
 */
export async function getMaterialAccess(materialId, sessionToken, isFree = false) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (isFree) {
    const headers = {};
    if (session) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }
    
    const { data, error } = await supabase.functions.invoke("get-free-material-access", {
      headers,
      body: { material_id: materialId },
    });

    if (error) throw error;
    return data;
  }

  // PAID FLOW (existing)
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

  if (error) {
    let payload = null;
    if (error.context && typeof error.context.json === 'function') {
      try {
        payload = await error.context.json();
      } catch {}
    }
    if (payload?.error) {
      return payload;
    }
    const msg = payload?.message || payload?.error || error.message;
    const err = new Error(msg || "Device transfer request failed");
    err.code = payload?.error;
    throw err;
  }
  if (data?.error) {
    return data;
  }

  return data;
}

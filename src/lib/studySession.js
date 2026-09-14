/**
 * studySession.js
 * Manages the study session token lifecycle in sessionStorage.
 *
 * sessionStorage (not localStorage) is used intentionally:
 * - Cleared when the browser tab/window closes
 * - NOT shared between different browser instances
 * - Still scoped to this origin
 *
 * The actual security enforcement is server-side:
 * - Session token must exist in study_sessions table
 * - Session must not be expired or revoked
 * - Device must still be active
 */

import { supabase } from './supabase';

const SESSION_KEY = 'atp_study_session_token';
const SESSION_EXPIRES_KEY = 'atp_study_session_expires';

/**
 * Stores the session token and its expiry in sessionStorage.
 * @param {string} token
 * @param {string} expiresAt - ISO timestamp
 */
export function storeSessionToken(token, expiresAt) {
  sessionStorage.setItem(SESSION_KEY, token);
  sessionStorage.setItem(SESSION_EXPIRES_KEY, expiresAt);
}

/**
 * Retrieves the session token from sessionStorage.
 * @returns {string | null}
 */
export function getStoredSessionToken() {
  return sessionStorage.getItem(SESSION_KEY);
}

/**
 * Returns the stored session expiry timestamp.
 * @returns {string | null} ISO timestamp
 */
export function getSessionExpiry() {
  return sessionStorage.getItem(SESSION_EXPIRES_KEY);
}

/**
 * Checks whether the locally stored session has expired.
 * Note: server always does the authoritative check.
 * @returns {boolean}
 */
export function isSessionTokenExpired() {
  const expires = sessionStorage.getItem(SESSION_EXPIRES_KEY);
  if (!expires) return true;
  return new Date(expires) < new Date();
}

/**
 * Clears the session token from sessionStorage.
 */
export function clearSessionToken() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_EXPIRES_KEY);
}

/**
 * Calls the issue-device-challenge Edge Function.
 * @returns {Promise<{challenge_id: string, challenge: string, device_id: string}>}
 */
export async function issueDeviceChallenge() {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) throw new Error('Not authenticated. Please log in again.');

  const { data, error } = await supabase.functions.invoke('issue-device-challenge', {
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (error) throw new Error(error.message || 'Failed to issue device challenge');
  if (data?.error) throw new Error(data.message || data.error);

  return data;
}

/**
 * Calls the verify-device-and-start-session Edge Function.
 * @param {string} challengeId
 * @param {string} signature - base64url ECDSA P-256 signature
 * @param {string} deviceId
 * @returns {Promise<{session_token: string, expires_at: string}>}
 */
export async function verifyAndStartSession(challengeId, signature, deviceId) {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) throw new Error('Not authenticated. Please log in again.');

  const { data, error } = await supabase.functions.invoke('verify-device-and-start-session', {
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: { challenge_id: challengeId, signature, device_id: deviceId },
  });

  if (error) throw new Error(error.message || 'Device verification failed');
  if (data?.error) throw new Error(data.message || data.error);

  return data;
}

/**
 * Calls the refresh-study-session Edge Function to extend the session.
 * @returns {Promise<{ok: boolean, expires_at: string}>}
 */
export async function refreshStudySession() {
  const token = getStoredSessionToken();
  if (!token) throw new Error('No active session token');

  const { data: authData } = await supabase.auth.getSession();
  const session = authData?.session;
  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase.functions.invoke('refresh-study-session', {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      'x-session-token': token,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.message || data.error);

  // Update local expiry
  if (data?.expires_at) {
    storeSessionToken(token, data.expires_at);
  }

  return data;
}

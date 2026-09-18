/**
 * deviceCrypto.js
 * Cryptographic device identity using Web Crypto API + IndexedDB.
 *
 * Key properties:
 * - Generates ECDSA P-256 key pair in the browser
 * - Private key is NON-EXPORTABLE and never leaves the browser
 * - Private key stored in IndexedDB (survives page refresh, not copyable via DevTools)
 * - Only the public key (JWK) is sent to the backend
 */

const DB_NAME = 'atp-vault-security';
const DB_VERSION = 1;
const STORE_NAME = 'device-keys';
const KEY_ID = 'primary-device-key';

/**
 * Opens (or creates) the IndexedDB for key storage.
 * @returns {Promise<IDBDatabase>}
 */
function openKeyDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Failed to open security database: ' + request.error?.message));
  });
}

/**
 * Saves the private CryptoKey (non-exportable) and public JWK to IndexedDB.
 * @param {CryptoKey} privateKey
 * @param {object} publicKeyJwk
 * @param {string} deviceId - server-assigned device ID
 */
async function saveKeyPair(privateKey, publicKeyJwk, deviceId) {
  const db = await openKeyDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put({
      id: KEY_ID,
      privateKey,        // CryptoKey object — non-exportable, stored by the browser
      publicKeyJwk,      // JWK object for reference
      deviceId,          // Server-assigned UUID
      createdAt: Date.now(),
    });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Failed to save key pair: ' + request.error?.message));
  });
}

/**
 * Loads the stored key pair from IndexedDB.
 * @returns {Promise<{privateKey: CryptoKey, publicKeyJwk: object, deviceId: string} | null>}
 */
export async function loadKeyPair() {
  try {
    const db = await openKeyDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(KEY_ID);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error('Failed to load key pair: ' + request.error?.message));
    });
  } catch (err) {
    console.warn('deviceCrypto: could not load key pair:', err.message);
    return null;
  }
}

/**
 * Removes the stored key pair from IndexedDB.
 * Called during device transfer to clean up old key material.
 */
async function clearKeyPair() {
  try {
    const db = await openKeyDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(KEY_ID);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve(); // silently fail on clear
    });
  } catch {
    // noop
  }
}

/**
 * Checks whether this browser has a stored device key pair.
 * @returns {Promise<boolean>}
 */
export async function hasLocalKeyPair() {
  const kp = await loadKeyPair();
  return kp !== null;
}

/**
 * Returns the stored device ID (server-assigned UUID) if one exists.
 * @returns {Promise<string | null>}
 */
export async function getStoredDeviceId() {
  const kp = await loadKeyPair();
  return kp?.deviceId || null;
}

/**
 * Returns the stored public key JWK if one exists.
 * @returns {Promise<object | null>}
 */
export async function getStoredPublicKeyJwk() {
  const kp = await loadKeyPair();
  return kp?.publicKeyJwk || null;
}

/**
 * Generates a new ECDSA P-256 key pair.
 * The private key is NON-EXPORTABLE and stored in IndexedDB.
 * The public key JWK is returned for sending to the server.
 *
 * @returns {Promise<{publicKeyJwk: object}>}
 */
export async function generateDeviceKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    false, // NOT extractable — private key can NEVER be exported
    ['sign', 'verify']
  );

  // Export only the PUBLIC key as JWK to send to the server
  const publicKeyJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);

  // Store privately in IndexedDB (deviceId will be set after server registration)
  await saveKeyPair(keyPair.privateKey, publicKeyJwk, '');

  return { publicKeyJwk };
}

/**
 * Updates the stored device ID after successful server registration.
 * @param {string} deviceId - Server-assigned UUID
 */
export async function storeDeviceId(deviceId) {
  const kp = await loadKeyPair();
  if (!kp) throw new Error('No key pair found in storage');
  await saveKeyPair(kp.privateKey, kp.publicKeyJwk, deviceId);
}

/**
 * Signs a challenge string using the stored non-exportable private key.
 * Challenge is signed as UTF-8 bytes using ECDSA P-256 with SHA-256.
 *
 * @param {string} challenge - base64url challenge string from the server
 * @returns {Promise<string>} base64url-encoded signature
 */
export async function signChallenge(challenge) {
  const kp = await loadKeyPair();
  if (!kp?.privateKey) {
    throw new Error('No device private key found. Please activate your device first.');
  }

  const encoder = new TextEncoder();
  const challengeBytes = encoder.encode(challenge);

  const signatureBuffer = await crypto.subtle.sign(
    { name: 'ECDSA', hash: { name: 'SHA-256' } },
    kp.privateKey,
    challengeBytes
  );

  // Encode signature as base64url without padding
  const signatureBytes = new Uint8Array(signatureBuffer);
  let binary = '';
  for (let i = 0; i < signatureBytes.byteLength; i++) {
    binary += String.fromCharCode(signatureBytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Checks if a server-stored public key matches a local JWK.
 * @param {string | object} serverPublicKey
 * @param {object} localJwk
 * @returns {boolean}
 */
export function matchPublicKey(serverPublicKey, localJwk) {
  if (!serverPublicKey || !localJwk) return false;
  try {
    const serverObj = typeof serverPublicKey === 'string' ? JSON.parse(serverPublicKey) : serverPublicKey;
    return Boolean(
      serverObj &&
      localJwk &&
      serverObj.x &&
      localJwk.x &&
      serverObj.x === localJwk.x &&
      serverObj.y === localJwk.y
    );
  } catch {
    return false;
  }
}

/**
 * Clears the device key pair from IndexedDB.
 * Used when initiating a device transfer from a new device.
 */
export async function clearDeviceKeys() {
  await clearKeyPair();
}

/**
 * Returns a human-readable device name based on User-Agent.
 * @returns {string}
 */
export function getDeviceName() {
  if (typeof navigator === 'undefined') return 'Study Device';

  const ua = navigator.userAgent;
  let os = 'Device';
  if (ua.includes('Win')) os = 'Windows PC';
  else if (ua.includes('Mac')) os = 'Mac';
  else if (ua.includes('Android')) os = 'Android Phone';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS Device';
  else if (ua.includes('Linux')) os = 'Linux PC';

  let browser = 'Browser';
  if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';

  return `${browser} on ${os}`;
}

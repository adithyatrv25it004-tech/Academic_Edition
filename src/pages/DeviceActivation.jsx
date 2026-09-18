import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  generateDeviceKeyPair,
  getDeviceName,
  storeDeviceId,
  clearDeviceKeys,
  loadKeyPair,
  matchPublicKey,
  signChallenge,
} from '../lib/deviceCrypto';
import {
  storeSessionToken,
  getStoredSessionToken,
  isSessionTokenExpired,
  issueDeviceChallenge,
  verifyAndStartSession,
} from '../lib/studySession';
import { registerDevice, requestDeviceTransfer } from '../lib/razorpay';
import { playUiBubbleSound } from '../lib/uiBubbleSound';
import { CheckmarkAnim } from './CheckmarkAnim';
import './Auth.css';

/**
 * DeviceActivation
 * Orchestrates cryptographic device binding and session issuance:
 *   1. Confirms authenticated user + active entitlement
 *   2. Generates/loads ECDSA P-256 key pair in browser (private key in IndexedDB, non-exportable)
 *   3. Registers public key on server (or recognizes existing matching device)
 *   4. Immediately calls issue-device-challenge
 *   5. Signs raw challenge bytes using local WebCrypto private key
 *   6. Submits signature to verify-device-and-start-session
 *   7. Receives session token, stores in sessionStorage, and routes to /vault
 */
function DeviceActivation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState('check'); // 'check' | 'ready' | 'verifying_existing' | 'activating' | 'active' | 'conflict' | 'transferring' | 'transferred' | 'error'
  const [activatingStep, setActivatingStep] = useState('Preparing secure device key...');
  const [conflictDevice, setConflictDevice] = useState(null);
  const [recognizedDevice, setRecognizedDevice] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const verificationStartedRef = useRef(false);

  /**
   * Executes the cryptographic challenge-response authentication
   * and stores the 4-hour study session token in sessionStorage.
   * On success, routes immediately to /vault.
   */
  const performCryptographicChallenge = useCallback(
    async (deviceId) => {
      setPhase('activating');
      setErrorMsg('');

      try {
        // Step 4: Issue server-side one-time challenge
        setActivatingStep('Requesting secure study challenge...');
        const challengeData = await issueDeviceChallenge();

        if (!challengeData?.challenge || !challengeData?.challenge_id) {
          throw new Error(challengeData?.message || challengeData?.error || 'Failed to issue device challenge');
        }

        const targetDeviceId = challengeData.device_id || deviceId;

        // Step 5: Browser signs raw UTF-8 challenge bytes with non-exportable private key
        setActivatingStep('Signing challenge with secure device key...');
        const signature = await signChallenge(challengeData.challenge);

        // Step 6 & 7: Server verifies ECDSA P-256 signature and returns study session
        setActivatingStep('Verifying cryptographic signature...');
        const verifyData = await verifyAndStartSession(
          challengeData.challenge_id,
          signature,
          targetDeviceId
        );

        if (!verifyData?.session_token) {
          throw new Error(verifyData?.message || verifyData?.error || 'Device verification failed');
        }

        // Step 8: Store session token in sessionStorage
        storeSessionToken(verifyData.session_token, verifyData.expires_at);

        // Step 9: Success confirmation -> navigate to /vault
        setPhase('active');
        setTimeout(() => {
          navigate('/vault', { replace: true });
        }, 1500);
      } catch (err) {
        console.error('Cryptographic verification error:', err);
        const msg = err.message || 'Failed to verify device. Please try again.';
        setErrorMsg(msg);
        setPhase('verifying_existing');
        throw err;
      }
    },
    [navigate]
  );

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        // 1. Confirm logged-in user
        const { data: userData } = await supabase.auth.getUser();
        if (!userData?.user) {
          navigate('/login', { replace: true });
          return;
        }
        if (!isMounted) return;
        setUser(userData.user);

        // 2. Confirm active entitlement
        const { data: ent } = await supabase
          .from('entitlements')
          .select('status')
          .eq('user_id', userData.user.id)
          .eq('product_id', 'atp_complete')
          .eq('status', 'active')
          .maybeSingle();

        if (!ent) {
          navigate('/payment', { replace: true });
          return;
        }

        // 3. Removed blind redirect to /vault based on storedToken alone.
        // We MUST verify server device status first to prevent ping-pong loops.

        // 4. Check local keys in IndexedDB
        const localKeyPair = await loadKeyPair();
        const hasPrivateKey = Boolean(localKeyPair?.privateKey);
        const localDeviceId = localKeyPair?.deviceId;

        // 5. Query user's registered active device on server
        const { data: serverDevice } = await supabase
          .from('devices')
          .select('id, device_name, status, public_key, activated_at')
          .eq('user_id', userData.user.id)
          .eq('status', 'active')
          .order('activated_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!isMounted) return;

        if (serverDevice) {
          // Check if this browser holds the matching private key for the registered device
          const isMatch =
            hasPrivateKey &&
            ((localDeviceId && localDeviceId === serverDevice.id) ||
              (localKeyPair?.publicKeyJwk &&
                matchPublicKey(serverDevice.public_key, localKeyPair.publicKeyJwk)));

          if (isMatch) {
            // Ensure local device_id matches server record
            if (localDeviceId !== serverDevice.id) {
              await storeDeviceId(serverDevice.id);
            }

            const storedToken = getStoredSessionToken();
            if (storedToken && !isSessionTokenExpired()) {
              if (isMounted) navigate('/vault', { replace: true });
              return;
            }

            setRecognizedDevice(serverDevice);
            setPhase('verifying_existing');

            // Automatically attempt challenge-response authentication ONCE
            if (!verificationStartedRef.current) {
              verificationStartedRef.current = true;
              try {
                await performCryptographicChallenge(serverDevice.id);
              } catch (authErr) {
                console.warn('Auto challenge verification note:', authErr.message);
                if (isMounted) {
                  setErrorMsg(authErr.message || 'Session verification needed. Please click continue.');
                  setPhase('verifying_existing');
                }
              }
            }
            return;
          } else {
            // Server has an active device, but this browser lacks the matching private key
            // Show legitimate device recovery/transfer flow (never silently overwrite keys)
            setConflictDevice({
              registered_device: serverDevice.device_name || 'Your registered device',
              activated_at: serverDevice.activated_at,
              device_id: serverDevice.id,
            });
            setPhase('conflict');
            return;
          }
        }

        // No active device on server yet -> ready for new device activation
        setPhase('ready');
      } catch (err) {
        console.error('Initialization error:', err);
        if (isMounted) {
          setErrorMsg(err.message || 'Failed to initialize device activation');
          setPhase('error');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    init();
    return () => {
      isMounted = false;
    };
  }, [navigate, performCryptographicChallenge]);

  async function handleActivateDevice() {
    setPhase('activating');
    setErrorMsg('');

    try {
      // 1. Generate or load ECDSA P-256 key pair (private key non-exportable in IndexedDB)
      let localKeyPair = await loadKeyPair();
      let publicKeyJwk = localKeyPair?.publicKeyJwk;

      if (!localKeyPair?.privateKey || !publicKeyJwk) {
        setActivatingStep('Generating ECDSA P-256 key pair...');
        const generated = await generateDeviceKeyPair();
        publicKeyJwk = generated.publicKeyJwk;
        localKeyPair = await loadKeyPair();
      }

      setActivatingStep('Registering device on secure server...');
      const deviceName = getDeviceName();
      const result = await registerDevice(publicKeyJwk, deviceName);

      let targetDeviceId = null;

      if (result?.error === 'DEVICE_CONFLICT') {
        // Check if the existing registered device is actually this browser
        const isMatch =
          localKeyPair?.privateKey &&
          ((localKeyPair.deviceId && localKeyPair.deviceId === result.device_id) ||
            (result.public_key && matchPublicKey(result.public_key, localKeyPair.publicKeyJwk)));

        if (isMatch) {
          targetDeviceId = result.device_id;
          await storeDeviceId(result.device_id);
        } else {
          // Foreign device conflict -> show transfer flow
          setConflictDevice(result);
          setPhase('conflict');
          return;
        }
      } else if (result?.success) {
        targetDeviceId = result.device_id;
        await storeDeviceId(result.device_id);
      } else {
        throw new Error(result?.message || result?.error || 'Device registration failed');
      }

      // Steps 4 to 9: Challenge -> Sign -> Verify -> Session -> /vault
      await performCryptographicChallenge(targetDeviceId);
    } catch (err) {
      console.error('Device activation error:', err);
      setErrorMsg(err.message || 'Failed to activate device. Please try again.');
      setPhase('error');
    }
  }

  async function handleRequestTransfer() {
    setPhase('transferring');
    setTransferMessage('');

    try {
      // 1. Clear old keys from this device's IndexedDB
      await clearDeviceKeys();

      // 2. Generate a brand new key pair for this new device
      const { publicKeyJwk } = await generateDeviceKeyPair();
      const deviceName = getDeviceName();

      // 3. Call device transfer (revokes old device, registers new one)
      const result = await requestDeviceTransfer(publicKeyJwk, deviceName, 'User replaced study device');

      if (result?.error === 'TRANSFER_RATE_LIMITED') {
        const cooldownDate = result.next_transfer_available
          ? new Date(result.next_transfer_available).toLocaleDateString()
          : 'a few days';
        setTransferMessage(`Transfer not yet available. You can transfer again after ${cooldownDate} for account security.`);
        setPhase('conflict');
        return;
      }

      if (!result?.success || !result?.new_device_id) {
        throw new Error(result?.message || result?.error || 'Device transfer failed');
      }

      // 4. Store new device ID
      await storeDeviceId(result.new_device_id);

      // Steps 4 to 9: Challenge -> Sign -> Verify -> Session -> /vault
      await performCryptographicChallenge(result.new_device_id);
    } catch (err) {
      console.error('Device transfer error:', err);
      setTransferMessage(err.message || 'Device transfer failed. Please try again.');
      setPhase('conflict');
    }
  }

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="payment-spinner" style={{ margin: '0 auto 16px' }} aria-hidden="true" />
          <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Checking device authorization...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="activation-page">
      <header className="quiet-topbar">
        <div className="auth-brand">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Python Journey</strong>
            <span>DEVICE ACTIVATION</span>
          </div>
        </div>
        <span className="secure-badge">
          <span>🔐</span> SECURE BINDING
        </span>
      </header>

      <main className="activation-wrapper">
        <div className="activation-card">

          {/* ============ PHASE: RECOGNIZED EXISTING DEVICE ============ */}
          {phase === 'verifying_existing' && (
            <div className="activation-body">
              <div className="activation-success-banner" style={{ marginBottom: '20px' }}>
                <span className="activation-check">✓</span>
                <div>
                  <h2 style={{ margin: '0 0 4px', color: 'var(--green)' }}>
                    Device Recognized ✓
                  </h2>
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--muted-brown)' }}>
                    This device is registered to your ATP Python Journey account.
                  </p>
                </div>
              </div>

              <span className="auth-eyebrow">ACTIVE STUDY DEVICE</span>
              <h1 className="activation-headline" style={{ fontSize: '22px' }}>
                Continue to Python Journey
              </h1>
              <p className="activation-desc">
                Your cryptographic key pair is secured in this browser. Start your verified 4-hour study session to enter the vault.
              </p>

              <div className="activation-device-preview" style={{ marginBottom: '20px' }}>
                <span className="activation-device-icon">📱</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--ink)' }}>
                    {recognizedDevice?.device_name || getDeviceName()}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    {user?.email}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="auth-error" style={{ marginBottom: '16px', textAlign: 'left' }}>
                  {errorMsg}
                </div>
              )}

              <button
                id="btn-verify-existing-device"
                type="button"
                className="btn-primary activation-btn"
                onClick={() => { playUiBubbleSound(); performCryptographicChallenge(recognizedDevice?.id); }}
              >
                VERIFY THIS DEVICE / CONTINUE SECURELY →
              </button>

              <p className="activation-footnote" style={{ marginTop: '16px' }}>
                🔒 Session tokens are scoped to your private cryptographic key in IndexedDB.
              </p>
            </div>
          )}

          {/* ============ PHASE: READY TO ACTIVATE NEW DEVICE ============ */}
          {(phase === 'ready' || phase === 'error') && (
            <>
              <div className="activation-success-banner">
                <span className="activation-check">✓</span>
                <div>
                  <h2 style={{ margin: '0 0 4px', color: 'var(--green)' }}>
                    ATP Python Journey Unlocked ✓
                  </h2>
                  <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--muted-brown)' }}>
                    Your payment has been verified. One final step to secure your pack.
                  </p>
                </div>
              </div>

              <div className="activation-divider" />

              <div className="activation-body">
                <span className="auth-eyebrow">DEVICE SECURITY</span>
                <h1 className="activation-headline">Secure this study pack to this device</h1>
                <p className="activation-desc">
                  For account protection, your Python Journey is available on{' '}
                  <strong>one activated device at a time</strong>. A unique cryptographic key will be
                  generated and stored securely in your browser — your private key never leaves this device.
                </p>

                <div className="activation-device-preview">
                  <span className="activation-device-icon">📱</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--ink)' }}>
                      {getDeviceName()}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      {user?.email}
                    </span>
                  </div>
                </div>

                {phase === 'error' && errorMsg && (
                  <div className="auth-error" style={{ marginBottom: '16px', textAlign: 'left' }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  id="btn-activate-device"
                  type="button"
                  className="btn-primary activation-btn"
                  onClick={(e) => { playUiBubbleSound(); handleActivateDevice(e); }}
                >
                  ACTIVATE THIS DEVICE →
                </button>

                <p className="activation-footnote">
                  🔒 Your private key is generated locally and stored in your browser — it never reaches
                  our servers. Only your public key is registered to verify your identity.
                </p>
              </div>
            </>
          )}

          {/* ============ PHASE: ACTIVATING / CHALLENGE VERIFICATION ============ */}
          {phase === 'activating' && (
            <div className="activation-loading-state">
              <div className="payment-spinner" style={{ margin: '0 auto 20px' }} aria-hidden="true" />
              <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Authenticating Device...</h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px', lineHeight: 1.6 }}>
                {activatingStep}
              </p>
              <div className="activation-steps-list">
                <div className="activation-step-item">⚙️ ECDSA P-256 cryptographic binding...</div>
                <div className="activation-step-item">🔐 One-time server challenge signature...</div>
                <div className="activation-step-item">📡 Issuing encrypted 4-hour study session...</div>
              </div>
            </div>
          )}

          {/* ============ PHASE: ACTIVE CONFIRMATION ============ */}
          {phase === 'active' && (
            <div className="activation-loading-state" style={{ textAlign: 'center' }}>
              <CheckmarkAnim size={52} />
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginBottom: '8px' }}>
                YOUR DEVICE IS ACTIVE ✓
              </h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px' }}>
                Cryptographic session established. Opening your Python Journey...
              </p>
            </div>
          )}

          {/* ============ PHASE: CONFLICT (device registered on another browser) ============ */}
          {phase === 'conflict' && (
            <div className="activation-body">
              <div className="conflict-header">
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--burgundy)', margin: 0 }}>
                  This Python Journey is already activated on another device.
                </h2>
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--muted-brown)', lineHeight: 1.6, marginBottom: '16px' }}>
                For account security and exam integrity, each student pack is bound to one primary device at a time.
              </p>

              {conflictDevice && (
                <div className="conflict-device-box">
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                    Currently Registered Device:
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--muted-brown)' }}>
                    {conflictDevice.registered_device || 'Your primary study device'}
                  </span>
                </div>
              )}

              {transferMessage && (
                <div className="auth-error" style={{ marginBottom: '16px', textAlign: 'left' }}>
                  {transferMessage}
                </div>
              )}

              <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '20px' }}>
                Replaced your phone or laptop? You can transfer your active study pack to this current device ({getDeviceName()}).
                Transfers are limited to once every 7 days for account security.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  id="btn-request-transfer"
                  type="button"
                  className="btn-primary"
                  onClick={(e) => { playUiBubbleSound(); handleRequestTransfer(e); }}
                  style={{ flex: 1, minWidth: '180px', fontSize: '13px' }}
                >
                  REQUEST DEVICE TRANSFER →
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/vault')}
                  style={{ flex: 1, minWidth: '120px', fontSize: '13px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ============ PHASE: TRANSFERRING ============ */}
          {phase === 'transferring' && (
            <div className="activation-loading-state">
              <div className="payment-spinner" style={{ margin: '0 auto 20px' }} aria-hidden="true" />
              <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Transferring Device...</h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px', lineHeight: 1.6 }}>
                Revoking old device access and activating this device. Please wait.
              </p>
            </div>
          )}

          {/* ============ PHASE: TRANSFERRED ============ */}
          {phase === 'transferred' && (
            <div className="activation-loading-state" style={{ textAlign: 'center' }}>
              <div className="activation-success-icon">✓</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginBottom: '8px' }}>
                DEVICE TRANSFER COMPLETE ✓
              </h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px' }}>
                Your study pack is now secured to this new device. Opening your vault...
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default DeviceActivation;

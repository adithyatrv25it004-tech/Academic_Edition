import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  generateDeviceKeyPair,
  getDeviceName,
  hasLocalKeyPair,
  getStoredDeviceId,
  storeDeviceId,
  clearDeviceKeys,
} from '../lib/deviceCrypto';
import { registerDevice, requestDeviceTransfer } from '../lib/razorpay';
import { CheckmarkAnim } from './CheckmarkAnim';
import './Auth.css';

/**
 * DeviceActivation
 * Shown after payment confirmation.
 * Guides the user through:
 *   1. Generate ECDSA P-256 key pair in browser (private key = non-exportable)
 *   2. Send public key to register-device Edge Function
 *   3. If conflict: show device transfer flow
 *   4. On success: navigate to /dashboard
 */
function DeviceActivation() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState('check'); // 'check' | 'ready' | 'activating' | 'active' | 'conflict' | 'transferring' | 'transferred' | 'error'
  const [conflictDevice, setConflictDevice] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [transferMessage, setTransferMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        navigate('/login', { replace: true });
        return;
      }
      setUser(data.user);

      // Check if user has an active entitlement
      const { data: ent } = await supabase
        .from('entitlements')
        .select('status')
        .eq('user_id', data.user.id)
        .eq('product_id', 'atp_complete')
        .eq('status', 'active')
        .maybeSingle();

      if (!ent) {
        navigate('/payment', { replace: true });
        return;
      }

      // Check if this browser already has a key pair registered with an active device
      const hasKeys = await hasLocalKeyPair();
      if (hasKeys) {
        const deviceId = await getStoredDeviceId();
        if (deviceId) {
          // Verify device is still active on the server
          const { data: deviceRow } = await supabase
            .from('devices')
            .select('status')
            .eq('id', deviceId)
            .maybeSingle();

          if (deviceRow?.status === 'active') {
            // Already activated on this browser, go to dashboard
            navigate('/dashboard', { replace: true });
            return;
          }
        }
      }

      setPhase('ready');
      setLoading(false);
    }
    init();
  }, [navigate]);

  async function handleActivateDevice() {
    setPhase('activating');
    setErrorMsg('');

    try {
      // 1. Generate ECDSA P-256 key pair (private key non-exportable)
      const { publicKeyJwk } = await generateDeviceKeyPair();
      const deviceName = getDeviceName();

      // 2. Register device on server
      const result = await registerDevice(publicKeyJwk, deviceName);

      if (result?.error === 'DEVICE_CONFLICT') {
        setConflictDevice(result);
        setPhase('conflict');
        return;
      }

      if (!result?.success) {
        throw new Error(result?.message || 'Device registration failed');
      }

      // 3. Store server-assigned device_id locally
      await storeDeviceId(result.device_id);

      setPhase('active');

      // Navigate after brief confirmation display
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
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
      const result = await requestDeviceTransfer(publicKeyJwk, deviceName, 'User replaced device');

      if (result?.error === 'TRANSFER_RATE_LIMITED') {
        const cooldownDate = result.next_transfer_available
          ? new Date(result.next_transfer_available).toLocaleDateString()
          : 'a few days';
        setTransferMessage(`Transfer not yet available. You can transfer again after ${cooldownDate} for account security.`);
        setPhase('conflict');
        return;
      }

      if (!result?.success) {
        throw new Error(result?.message || 'Device transfer failed');
      }

      // 4. Store new device ID
      await storeDeviceId(result.new_device_id);

      setPhase('transferred');

      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2200);
    } catch (err) {
      console.error('Device transfer error:', err);
      setTransferMessage(err.message || 'Device transfer failed. Please try again.');
      setPhase('conflict'); // Return to conflict screen with error
    }
  }

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="payment-spinner" style={{ margin: '0 auto 16px' }} aria-hidden="true" />
          <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Checking device status...</p>
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
            <strong>ATP Revision Vault</strong>
            <span>DEVICE ACTIVATION</span>
          </div>
        </div>
        <span className="secure-badge">
          <span>🔐</span> SECURE BINDING
        </span>
      </header>

      <main className="activation-wrapper">
        <div className="activation-card">

          {/* ============ PHASE: READY TO ACTIVATE ============ */}
          {(phase === 'ready' || phase === 'error') && (
            <>
              <div className="activation-success-banner">
                <span className="activation-check">✓</span>
                <div>
                  <h2 style={{ margin: '0 0 4px', color: 'var(--green)' }}>
                    ATP Revision Vault Unlocked ✓
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
                  For account protection, your Revision Vault is available on{' '}
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
                  onClick={handleActivateDevice}
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

          {/* ============ PHASE: ACTIVATING ============ */}
          {phase === 'activating' && (
            <div className="activation-loading-state">
              <div className="payment-spinner" style={{ margin: '0 auto 20px' }} aria-hidden="true" />
              <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Generating Device Keys...</h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px', lineHeight: 1.6 }}>
                Creating your cryptographic device identity. This only takes a moment.
              </p>
              <div className="activation-steps-list">
                <div className="activation-step-item">⚙️ Generating ECDSA P-256 key pair...</div>
                <div className="activation-step-item">🔐 Storing private key in secure browser storage...</div>
                <div className="activation-step-item">📡 Registering device with your account...</div>
              </div>
            </div>
          )}

          {/* ============ PHASE: ACTIVATED ============ */}
          {phase === 'active' && (
            <div className="activation-loading-state" style={{ textAlign: 'center' }}>
              <CheckmarkAnim size={52} />
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--green)', marginBottom: '8px' }}>
                YOUR DEVICE IS ACTIVE ✓
              </h2>
              <p style={{ color: 'var(--muted-brown)', fontSize: '13.5px' }}>
                Your study pack is now secured to this device. Opening your vault...
              </p>
            </div>
          )}

          {/* ============ PHASE: CONFLICT (device already registered) ============ */}
          {phase === 'conflict' && (
            <div className="activation-body">
              <div className="conflict-header">
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--burgundy)', margin: 0 }}>
                  This Revision Vault is already activated on another device.
                </h2>
              </div>

              <p style={{ fontSize: '13.5px', color: 'var(--muted-brown)', lineHeight: 1.6, marginBottom: '16px' }}>
                For account security and exam integrity, each student pack is bound to one primary device.
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
                  onClick={handleRequestTransfer}
                  style={{ flex: 1, minWidth: '180px', fontSize: '13px' }}
                >
                  REQUEST DEVICE TRANSFER →
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => navigate('/dashboard')}
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

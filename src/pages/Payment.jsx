import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { loadRazorpayScript, createPaymentOrder } from "../lib/razorpay";
import { CheckmarkAnim } from "./CheckmarkAnim";
import "./Auth.css";
import bookThumbnail from "../assets/atp-revision-book.png";

function Payment() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const pollTimerRef = useRef(null);

  useEffect(() => {
    async function checkUserAndEntitlement() {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(data.user);

      // Check if user already has an active entitlement
      try {
        const { data: ent } = await supabase
          .from("entitlements")
          .select("*")
          .eq("user_id", data.user.id)
          .eq("product_id", "atp_complete")
          .eq("status", "active")
          .maybeSingle();

        if (ent) {
          // Already purchased and active, redirect straight to dashboard
          navigate("/dashboard", { replace: true });
          return;
        }
      } catch (err) {
        console.warn("Entitlement check fallback:", err);
      }

      setCheckingUser(false);

      setUser(data.user);

      // Check if user already has an active entitlement
      try {
        const { data: ent } = await supabase
          .from("entitlements")
          .select("*")
          .eq("user_id", data.user.id)
          .eq("product_id", "atp_complete")
          .eq("status", "active")
          .maybeSingle();

        if (ent) {
          // Already purchased and active, redirect straight to dashboard
          navigate("/dashboard", { replace: true });
          return;
        }
      } catch (err) {
        console.warn("Entitlement check fallback:", err);
      }

      setCheckingUser(false);
    }

    checkUserAndEntitlement();

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
      }
    };
  }, [navigate]);

  /**
   * Securely polls the entitlements table for server-verified activation.
   * Only transitions to unlocked once trusted server-side record appears.
   */
  function startEntitlementPolling(userId) {
    setIsConfirming(true);
    let attempts = 0;
    const maxAttempts = 24; // Poll every 1.5s for up to 36 seconds

    pollTimerRef.current = setInterval(async () => {
      attempts += 1;

      try {
        const { data: ent } = await supabase
          .from("entitlements")
          .select("*")
          .eq("user_id", userId)
          .eq("product_id", "atp_complete")
          .eq("status", "active")
          .maybeSingle();

        if (ent) {
          clearInterval(pollTimerRef.current);
          setIsConfirming(false);
          setIsUnlocked(true);

          // Give student a brief visual confirmation before entering dashboard
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1400);
          return;
        }
      } catch (err) {
        console.error("Polling error:", err);
      }

      if (attempts >= maxAttempts) {
        clearInterval(pollTimerRef.current);
        setIsConfirming(false);
        // If webhook was delayed, give helpful reassurance with manual refresh button
        setPaymentError(
          "Payment received. Your transaction reference was recorded and access verification is completing. Please refresh in a moment."
        );
      }
    }, 1500);
  }

  /**
   * Initiates server-side Razorpay Order creation and opens Razorpay Checkout modal
   */
  async function handleStartPayment() {
    if (!user) return;

    setIsProcessing(true);
    setPaymentError("");

    try {
      // 1. Ensure Razorpay script is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Unable to load payment gateway. Please check your internet connection and retry.");
      }

      // 2. Call Edge Function to create unique order for ₹49 (4900 paise)
      let orderData;
      try {
        orderData = await createPaymentOrder();
      } catch (edgeErr) {
        console.warn("Edge function create-payment-order notice:", edgeErr.message);
        // If edge function returns already_active
        if (edgeErr.message?.includes("already have active access")) {
          navigate("/dashboard");
          return;
        }
        throw edgeErr;
      }

      if (orderData?.already_active) {
        navigate("/dashboard");
        return;
      }

      // 3. Launch official Razorpay Checkout modal
      const razorpayKey = orderData.key_id || import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key: razorpayKey,
        amount: orderData.amount, // 4900 paise
        currency: orderData.currency || "INR",
        name: "ATP Revision Vault",
        description: "ATP Complete Revision Pack (One-Time Access)",
        image: bookThumbnail,
        order_id: orderData.order_id,
        prefill: {
          name: user.user_metadata?.name || user.email?.split("@")[0] || "",
          email: user.email || "",
        },
        theme: {
          color: "#172033", // Deep Ink Navy
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            if (!isConfirming && !isUnlocked) {
              setPaymentError("Payment window was closed. You can retry whenever you are ready.");
            }
          },
        },
        handler: async (_response) => {
          // Client payment completed.
          // IMPORTANT: Do NOT grant access from client handler alone.
          // Show "Confirming your payment..." while server verification / webhook activates entitlement.
          setIsProcessing(false);
          startEntitlementPolling(user.id);
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (failedResponse) => {
        setIsProcessing(false);
        const reason = failedResponse.error?.description || "Payment was not completed.";
        setPaymentError(`Payment was not completed: ${reason}. Please retry.`);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      setIsProcessing(false);
      setPaymentError(err.message || "Failed to initiate payment. Please try again.");
    }
  }

  if (checkingUser || !user) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)" }}>Verifying your study account...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="checkout-page">
      {/* --- Top Navigation --- */}
      <header className="quiet-topbar">
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>Academic Checkout</span>
          </div>
        </Link>
        <span className="secure-badge">
          <span>🔒</span> SECURE RAZORPAY GATEWAY
        </span>
      </header>

      {/* --- Centered Quiet Card --- */}
      <main className="checkout-wrapper">
        <section className="checkout-card">
          <div className="checkout-header">
            <span className="auth-eyebrow">AUTOMATED INSTANT ACTIVATION</span>
            <h1 className="checkout-heading">
              You're one step away from your Revision Vault.
            </h1>
            <p className="checkout-subtext">
              Complete the one-time payment of ₹49. Your personal revision dashboard unlocks automatically upon verification.
            </p>
          </div>

          {/* 4-Step Progress Indicator */}
          <div className="checkout-steps">
            <div className="step-item completed">
              <div className="step-num">✓</div>
              <span className="step-name">Account</span>
            </div>
            <div className={`step-item ${isConfirming || isUnlocked ? "completed" : "active"}`}>
              <div className="step-num">{isConfirming || isUnlocked ? "✓" : "2"}</div>
              <span className="step-name">Pay ₹49</span>
            </div>
            <div className={`step-item ${isConfirming ? "active" : isUnlocked ? "completed" : ""}`}>
              <div className="step-num">{isUnlocked ? "✓" : "3"}</div>
              <span className="step-name">Verification</span>
            </div>
            <div className={`step-item ${isUnlocked ? "completed active" : ""}`}>
              <div className="step-num">4</div>
              <span className="step-name">Vault Unlocked</span>
            </div>
          </div>

          {/* Product Summary Row */}
          <div className="checkout-product-summary">
            <div className="product-summary-left">
              <img
                src={bookThumbnail}
                alt="ATP Complete Revision Pack"
                className="checkout-book-thumb"
              />
              <div className="product-summary-details">
                <strong>ATP Complete Revision Pack</strong>
                <span>Simplified Notes • PYQs • Last-Minute • Important Questions • Quick Recall</span>
              </div>
            </div>
            <div className="checkout-price-badge">
              <strong>₹49</strong>
              <small>One-time access</small>
            </div>
          </div>

          {/* Dynamic States: Unlocked / Confirming / Error / Ready to Pay */}
          {isUnlocked ? (
            <div className="utr-success-box" style={{ borderColor: "var(--green)" }}>
              <CheckmarkAnim size={48} />
              <h3 style={{ color: "var(--green)" }}>Revision Vault Unlocked ✓</h3>
              <p>
                Your ₹49 payment has been verified by the server. Opening your study dashboard now...
              </p>
              <div style={{ marginTop: "18px" }}>
                <Link to="/dashboard" className="btn-verify-access" style={{ width: "auto", textDecoration: "none" }}>
                  ENTER YOUR REVISION VAULT →
                </Link>
              </div>
            </div>
          ) : isConfirming ? (
            <div className="payment-confirming-box">
              <div className="payment-spinner" aria-hidden="true"></div>
              <h3>Payment received.</h3>
              <p className="payment-confirming-subtext">
                We're confirming your access securely with the server. Your vault will unlock in just a few seconds...
              </p>
              <span className="payment-confirming-badge">● Verifying Entitlement</span>
            </div>
          ) : (
            <div className="scan-pay-card">
              <div className="scan-pay-title">
                <span>⚡</span>
                <span>Instant UPI &amp; Online Payment</span>
              </div>

              <p style={{ fontSize: "13px", color: "var(--muted-brown)", margin: "0 0 20px" }}>
                Pay safely using any UPI app (Google Pay, PhonePe, Paytm, BHIM) or Credit/Debit Card via Razorpay.
              </p>

              {/* Payment Methods Badges */}
              <div className="payment-apps-row">
                <span className="pay-app-pill">Google Pay</span>
                <span className="pay-app-pill">PhonePe</span>
                <span className="pay-app-pill">Paytm</span>
                <span className="pay-app-pill">BHIM / UPI</span>
                <span className="pay-app-pill">Cards</span>
              </div>

              {/* Error Notification */}
              {paymentError && (
                <div className="auth-error" style={{ margin: "16px 0", textAlign: "left" }}>
                  {paymentError}
                </div>
              )}

              {/* Main Automated Action Button */}
              <button
                type="button"
                className="btn-checkout-primary"
                onClick={handleStartPayment}
                disabled={isProcessing}
                style={{ marginTop: "16px" }}
              >
                {isProcessing ? "INITIALIZING SECURE CHECKOUT..." : "PAY ₹49 WITH UPI / CARD →"}
              </button>

              <div className="checkout-trust-guarantee">
                <span>🔒 256-bit Encrypted</span>
                <span>•</span>
                <span>Trusted Server-Side Activation</span>
                <span>•</span>
                <span>One-Time Fee</span>
              </div>
            </div>
          )}

          {/* Footer Assistance */}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Link to="/" style={{ fontSize: "12.5px", color: "var(--muted)", textDecoration: "none" }}>
              ← Return to homepage
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Payment;

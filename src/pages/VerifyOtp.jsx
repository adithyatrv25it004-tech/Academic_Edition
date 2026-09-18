import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { CheckmarkAnim } from "./CheckmarkAnim";
import { playUiBubbleSound } from "../lib/uiBubbleSound";
import "./Auth.css";

function maskEmail(email) {
  if (!email || !email.includes("@")) return "your email";
  const [local, domain] = email.split("@");
  if (local.length <= 3) {
    return `${local[0]}***@${domain}`;
  }
  return `${local.slice(0, 3)}***@${domain}`;
}

function VerifyOtp({ email: propEmail, onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const email = propEmail || location.state?.email || "";

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendNotice, setResendNotice] = useState("");
  const [cooldown, setCooldown] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [destinationNotice, setDestinationNotice] = useState("");

  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // 45-second resend cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Handle single digit input or multi-digit entry
  function handleDigitChange(index, event) {
    const rawVal = event.target.value;
    const cleanDigits = rawVal.replace(/\D/g, "");

    setError("");

    if (!cleanDigits) {
      const nextDigits = [...digits];
      nextDigits[index] = "";
      setDigits(nextDigits);
      return;
    }

    // If multiple digits were pasted/typed into this single box
    if (cleanDigits.length > 1) {
      const pastedChars = cleanDigits.slice(0, 6).split("");
      const nextDigits = [...digits];

      pastedChars.forEach((char, i) => {
        if (index + i < 6) {
          nextDigits[index + i] = char;
        }
      });

      setDigits(nextDigits);
      const nextFocusIdx = Math.min(index + pastedChars.length, 5);
      inputRefs.current[nextFocusIdx]?.focus();
      return;
    }

    // Single digit input
    const nextDigits = [...digits];
    nextDigits[index] = cleanDigits.slice(-1);
    setDigits(nextDigits);

    // Auto-advance focus to next box
    if (index < 5 && cleanDigits) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Handle Backspace and arrow keys
  function handleKeyDown(index, event) {
    if (event.key === "Backspace") {
      if (digits[index] === "" && index > 0) {
        event.preventDefault();
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        setDigits(nextDigits);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      event.preventDefault();
      inputRefs.current[index + 1]?.focus();
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (digits.every((d) => d !== "") && !loading) {
        handleVerifySubmit();
      }
    }
  }

  // Handle full paste of 6 digits
  function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    const cleanDigits = pastedData.replace(/\D/g, "").slice(0, 6);

    if (!cleanDigits) return;

    const chars = cleanDigits.split("");
    const nextDigits = [...digits];

    for (let i = 0; i < 6; i++) {
      nextDigits[i] = chars[i] || "";
    }

    setDigits(nextDigits);
    setError("");

    // Focus last filled box or 6th box
    const focusIdx = Math.min(cleanDigits.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }

  // Submit OTP Verification
  async function handleVerifySubmit(event) {
    if (event) event.preventDefault();

    const otpCode = digits.join("");
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits of your verification code.");
      return;
    }

    if (!email) {
      setError("No email address found. Please return to login.");
      return;
    }

    setLoading(true);
    setError("");
    setResendNotice("");

    try {
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "email",
      });

      if (verifyError) {
        setLoading(false);
        const msg = (verifyError.message || "").toLowerCase();
        if (msg.includes("expired")) {
          setError("This code has expired. Request a new one.");
        } else if (msg.includes("invalid") || msg.includes("token") || msg.includes("code")) {
          setError("That code isn't correct. Please try again.");
        } else {
          setError("That code isn't correct. Please try again.");
        }
        return;
      }

      // Successful verification
      setIsVerified(true);
      setLoading(false);

      // Verify active entitlement to decide redirect destination
      const user = verifyData?.user;
      let hasEntitlement = false;

      if (user) {
        try {
          const { data: ent } = await supabase
            .from("entitlements")
            .select("*")
            .eq("user_id", user.id)
            .eq("product_id", "atp_complete")
            .eq("status", "active")
            .maybeSingle();

          if (ent) {
            hasEntitlement = true;
          }
        } catch (entErr) {
          console.error("Entitlement query error:", entErr);
        }
      }

      if (hasEntitlement) {
        setDestinationNotice("Taking you to your Python Journey...");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1200);
      } else {
        setDestinationNotice("Taking you to your student dashboard...");
        setTimeout(() => {
          navigate("/student-dashboard", { replace: true });
        }, 1200);
      }
    } catch {
      setLoading(false);
      setError("Unable to verify code right now. Please try again.");
    }
  }

  // Resend OTP with cooldown
  async function handleResendCode() {
    if (cooldown > 0 || isResending || !email) return;

    setIsResending(true);
    setError("");
    setResendNotice("");

    try {
      const { error: resendErr } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (resendErr) {
        setError(resendErr.message || "Failed to resend code. Please try again.");
      } else {
        setResendNotice("A new code has been sent.");
        setCooldown(45);
        setDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  }

  const isComplete = digits.every((d) => d !== "");

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Python Journey</strong>
            <span>YOUR STUDY PACK AWAITS</span>
          </div>
        </Link>

        {isVerified ? (
          <div className="otp-success-card">
            <CheckmarkAnim size={48} />
            <h3>Email verified ✓</h3>
            <p>{destinationNotice || "Taking you to your Python Journey..."}</p>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <span className="auth-eyebrow">SECURITY VERIFICATION</span>
              <h1>Verify your email</h1>
              <p className="otp-masked-lead">
                We sent a 6-digit verification code to <strong>{maskEmail(email)}</strong>
              </p>
              <p className="otp-instruction-subtext">
                Enter the 6-digit code we sent to your email to continue.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleVerifySubmit}>
              {/* 6 Individual Digit Boxes */}
              <div className="otp-boxes-container">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={loading || isVerified}
                    className="otp-digit-box"
                    aria-label={`Digit ${index + 1} of 6`}
                  />
                ))}
              </div>

              <p className="otp-expiry-hint">
                This code expires shortly and can only be used once.
              </p>

              {/* Error State */}
              {error && (
                <div className="auth-error" role="alert">
                  {error}
                </div>
              )}

              {/* Resend Notice */}
              {resendNotice && (
                <div className="otp-resend-notice" role="status">
                  ✓ {resendNotice}
                </div>
              )}

              {/* Primary Verify Button */}
              <button
                className="auth-btn-submit"
                type="submit"
                disabled={!isComplete || loading || isVerified}
                onClick={playUiBubbleSound}
              >
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span className="payment-spinner" style={{ width: "16px", height: "16px", borderWidth: "2px", margin: 0 }}></span>
                    Verifying...
                  </span>
                ) : (
                  "Verify and Continue →"
                )}
              </button>
            </form>

            {/* Resend OTP Section with 45s Cooldown */}
            <div className="otp-resend-row">
              <span>Didn't receive the code?</span>
              {cooldown > 0 ? (
                <span className="otp-cooldown-text">Resend code in {cooldown}s</span>
              ) : (
                <button
                  type="button"
                  className="otp-resend-btn"
                  onClick={handleResendCode}
                  disabled={isResending || loading}
                >
                  {isResending ? "Sending..." : "Resend code"}
                </button>
              )}
            </div>

            {/* Back / Change email */}
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              {onBack ? (
                <button
                  type="button"
                  className="auth-text-link"
                  onClick={onBack}
                  disabled={loading}
                >
                  ← Use a different email address
                </button>
              ) : (
                <Link to="/login" className="auth-text-link">
                  ← Use a different email address
                </Link>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default VerifyOtp;

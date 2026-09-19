import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, isConfigured, setStoredPreviewUser } from "../lib/supabase";
import VerifyOtp from "./VerifyOtp";
import { playUiBubbleSound } from "../lib/uiBubbleSound";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInstantPreview = () => {
    playUiBubbleSound();
    const previewUser = {
      id: "preview-student-101",
      email: email.trim() || "preview.student@atp.ktu",
      user_metadata: { name: email ? email.split("@")[0] : "Student" },
      created_at: new Date().toISOString()
    };
    setStoredPreviewUser(previewUser);
    navigate("/student-dashboard");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    // If Supabase is not configured or using placeholders, bypass straight into preview session
    if (!isConfigured) {
      handleInstantPreview();
      return;
    }

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setLoading(false);
        const msg = loginError.message || "";
        if (msg.toLowerCase().includes("failed to fetch") || msg.toLowerCase().includes("networkerror")) {
          setError(
            "Unable to connect to Supabase: 'Failed to fetch'. The remote database could not be reached (your Supabase project may be paused, or credentials in Settings may be unconfigured). You can explore the full course in Preview Mode below."
          );
        } else {
          setError(msg);
        }
        return;
      }

      const { error: signoutError } = await supabase.auth.signOut();

      if (signoutError) {
        setLoading(false);
        setError(signoutError.message);
        return;
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      setLoading(false);

      if (otpError) {
        setError(otpError.message);
        return;
      }

      setVerificationStep(true);
    } catch (err) {
      setLoading(false);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("failed to fetch")) {
        setError(
          "Network error: 'Failed to fetch'. Unable to reach Supabase backend. Please check your network or enter via Preview Mode below."
        );
      } else {
        setError(msg || "An unexpected error occurred. You can enter via Preview Mode below.");
      }
    }
  }

  if (verificationStep) {
    return <VerifyOtp email={email} onBack={() => setVerificationStep(false)} />;
  }

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

        <div className="auth-header">
          <span className="auth-eyebrow">ACCOUNT LOGIN</span>
          <h1>Welcome back.</h1>
          <p>Your guided Python classroom is ready when you are.</p>
        </div>

        {!isConfigured && (
          <div
            style={{
              background: "#FFF9F0",
              border: "1.5px solid #F3DFC1",
              borderRadius: "8px",
              padding: "12px 14px",
              marginBottom: "20px",
              fontSize: "0.85rem",
              color: "#8C6718",
              lineHeight: 1.45
            }}
          >
            <strong style={{ display: "block", marginBottom: "4px" }}>Preview Mode Active</strong>
            Supabase credentials are not connected or using template placeholders. You can test and explore the complete classroom and materials without a database.
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your account password"
              required
            />
          </div>

          {error && (
            <div className="auth-error" style={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>
              {error}
              {error.includes("Failed to fetch") && (
                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={handleInstantPreview}
                    style={{
                      background: "#315C8C",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Continue in Preview Mode →
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="auth-btn-submit" type="submit" disabled={loading} onClick={playUiBubbleSound}>
            {loading ? "Checking account..." : "Sign In →"}
          </button>
        </form>

        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed #E2DACB", textAlign: "center" }}>
          <button
            type="button"
            onClick={handleInstantPreview}
            style={{
              background: "#FDFBF7",
              border: "1.5px solid #C79A45",
              color: "#172033",
              padding: "10px 16px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.88rem",
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 2px 6px rgba(199, 154, 69, 0.1)"
            }}
          >
            <span>⚡</span> Enter in Preview Student Mode (No DB Needed)
          </button>
        </div>

        <p className="auth-footer-switch">
          Don't have an account yet? <Link to="/signup">Create one here</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;


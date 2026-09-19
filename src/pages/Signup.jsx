import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase, isConfigured, setStoredPreviewUser } from "../lib/supabase";
import { playUiBubbleSound } from "../lib/uiBubbleSound";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInstantPreview = () => {
    playUiBubbleSound();
    const previewUser = {
      id: "preview-student-101",
      email: email.trim() || "preview.student@atp.ktu",
      user_metadata: { name: name.trim() || "Student" },
      created_at: new Date().toISOString()
    };
    setStoredPreviewUser(previewUser);
    navigate("/student-dashboard");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!isConfigured) {
      handleInstantPreview();
      return;
    }

    try {
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      setLoading(false);

      if (signupError) {
        const msg = signupError.message || "";
        if (msg.toLowerCase().includes("failed to fetch") || msg.toLowerCase().includes("networkerror")) {
          setError(
            "Unable to connect to Supabase: 'Failed to fetch'. Remote database could not be reached. You can enter in Preview Mode below."
          );
        } else {
          setError(msg);
        }
        return;
      }

      // If Supabase sends confirmation OTP (user created without active session)
      if (signupData?.user && !signupData?.session) {
        navigate("/verify-otp", { state: { email } });
        return;
      }

      navigate("/student-dashboard");
    } catch (err) {
      setLoading(false);
      const msg = err?.message || "";
      if (msg.toLowerCase().includes("failed to fetch")) {
        setError(
          "Network error: 'Failed to fetch'. Unable to reach Supabase backend. Please enter via Preview Mode below."
        );
      } else {
        setError(msg || "Failed to create account.");
      }
    }
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
          <span className="auth-eyebrow">CREATE STUDENT ACCOUNT</span>
          <h1>Start your Python Journey.</h1>
          <p>Guided KTU S1 UCEST105 learning built for first-year B.Tech students.</p>
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
            Database credentials are not yet connected. You can register and test in local preview mode immediately.
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@example.com"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              minLength={6}
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
            {loading ? "Creating your account..." : "Unlock Access — Proceed to Payment →"}
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
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;


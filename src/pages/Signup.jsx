import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

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
      setError(signupError.message);
      return;
    }

    // If Supabase sends confirmation OTP (user created without active session)
    if (signupData?.user && !signupData?.session) {
      navigate("/verify-otp", { state: { email } });
      return;
    }

    navigate("/payment");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>YOUR STUDY PACK AWAITS</span>
          </div>
        </Link>

        <div className="auth-header">
          <span className="auth-eyebrow">CREATE STUDENT ACCOUNT</span>
          <h1>Start revising better.</h1>
          <p>Get organised revision material built for your upcoming ATP exam.</p>
        </div>

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

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn-submit" type="submit" disabled={loading}>
            {loading ? "Creating your account..." : "Unlock Access — Proceed to Payment →"}
          </button>
        </form>

        <p className="auth-footer-switch">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;


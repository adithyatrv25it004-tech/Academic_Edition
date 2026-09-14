import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import VerifyOtp from "./VerifyOtp";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationStep, setVerificationStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setLoading(false);
      setError(loginError.message);
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
            <strong>ATP Revision Vault</strong>
            <span>YOUR STUDY PACK AWAITS</span>
          </div>
        </Link>

        <div className="auth-header">
          <span className="auth-eyebrow">ACCOUNT LOGIN</span>
          <h1>Welcome back.</h1>
          <p>Your revision vault is ready when you are.</p>
        </div>

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

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-btn-submit" type="submit" disabled={loading}>
            {loading ? "Checking account..." : "Sign In →"}
          </button>
        </form>

        <p className="auth-footer-switch">
          Don't have an account yet? <Link to="/signup">Create one here</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;

import { Link } from "react-router-dom";
import "./Auth.css";

function Privacy() {
  return (
    <main className="auth-page">
      <section className="auth-card" style={{ maxWidth: "800px", textAlign: "left" }}>
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>PRIVACY POLICY</span>
          </div>
        </Link>

        <div className="auth-header" style={{ textAlign: "left" }}>
          <span className="auth-eyebrow">LEGAL INFORMATION</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: September 2026</p>
        </div>

        <div className="legal-content">
          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>1. Information We Collect</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              ATP Revision Vault collects minimal information necessary to provide our academic revision services:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Name and email address for account creation</li>
              <li>Payment information processed securely through Razorpay</li>
              <li>Device information for security and access management</li>
              <li>Study session data for service delivery</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>2. How We Use Your Information</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              Your information is used exclusively for:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Providing access to purchased study materials</li>
              <li>Processing payments securely</li>
              <li>Managing your account and study sessions</li>
              <li>Ensuring platform security and preventing unauthorized access</li>
              <li>Sending essential service communications</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>3. Data Security</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We implement industry-standard security measures:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>End-to-end encryption for sensitive data</li>
              <li>Secure payment processing via Razorpay</li>
              <li>Cryptographic device binding for access control</li>
              <li>Private storage with temporary access URLs</li>
              <li>Row-level security in our database</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>4. Personal Study Access</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              Your ATP Revision Vault access is intended for personal study use only. The platform uses device binding technology to ensure secure, individual access to study materials.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>5. Data Retention</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We retain your data only as long as necessary to provide our services. You may request data deletion by contacting our support team.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>6. Third-Party Services</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We use trusted third-party services:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li><strong>Supabase</strong> - Database and authentication services</li>
              <li><strong>Razorpay</strong> - Secure payment processing</li>
            </ul>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              These services have their own privacy policies which we encourage you to review.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>7. Your Rights</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              You have the right to:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>8. Contact Us</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              For privacy-related questions or data requests, please contact us through our support page.
            </p>
          </section>

          <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--border)" }}>
            <Link to="/" style={{ fontSize: "14px", color: "var(--muted)", textDecoration: "none" }}>
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Privacy;
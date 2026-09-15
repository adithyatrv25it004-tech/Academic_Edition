import { Link } from "react-router-dom";
import "./Auth.css";

function Terms() {
  return (
    <main className="auth-page">
      <section className="auth-card" style={{ maxWidth: "800px", textAlign: "left" }}>
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>TERMS OF USE</span>
          </div>
        </Link>

        <div className="auth-header" style={{ textAlign: "left" }}>
          <span className="auth-eyebrow">LEGAL INFORMATION</span>
          <h1>Terms of Use</h1>
          <p>Last updated: September 2026</p>
        </div>

        <div className="legal-content">
          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>1. Acceptance of Terms</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              By accessing and using ATP Revision Vault, you agree to these Terms of Use. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>2. Service Description</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              ATP Revision Vault provides digital study materials for academic revision purposes. The service includes access to simplified notes, previous year questions, revision sheets, and other educational content.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>3. Personal Study Access</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              Your purchase grants you <strong>personal study access</strong> to the ATP Revision Vault materials. This access is:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>For individual, non-commercial use only</li>
              <li>Limited to one approved device at a time</li>
              <li>Non-transferable without proper device transfer procedure</li>
              <li>Subject to these terms of use</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>4. Intellectual Property & Content Restrictions</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              All study materials, content, and intellectual property on ATP Revision Vault are protected by copyright law. You agree NOT to:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Copy, reproduce, or distribute study materials</li>
              <li>Share access credentials or bypass device security</li>
              <li>Use content for commercial purposes</li>
              <li>Remove watermarks or copyright notices</li>
              <li>Upload materials to public platforms or file-sharing sites</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>5. Device Access Policy</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              To maintain academic integrity and service security:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Access is limited to one registered device per account</li>
              <li>Device transfer requests are rate-limited for security</li>
              <li>Attempting to bypass device restrictions may result in account termination</li>
              <li>Device binding ensures personal, individual study access</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>6. Payment Terms</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              The ATP Complete Revision Pack is available for a one-time payment of ₹49. This grants you access to all study materials. There are no recurring subscription charges.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>7. Refund Policy</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              <strong>Refund policy must be confirmed by the site owner before launch.</strong> For refund requests, please contact our support team with your order details and reason for refund request.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>8. Account Responsibilities</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              You are responsible for:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>Ensuring your device remains secure</li>
              <li>Notifying us immediately of unauthorized access</li>
              <li>Complying with all applicable laws and regulations</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>9. Service Availability</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We strive to maintain high service availability but do not guarantee uninterrupted access. Temporary maintenance or technical issues may occur.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>10. Termination</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We reserve the right to terminate access for violations of these terms, abuse of the service, or other security concerns. Upon termination, your right to access study materials ceases immediately.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>11. Changes to Terms</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              We may update these terms from time to time. Continued use of the service constitutes acceptance of any changes.
            </p>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>12. Contact</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              For questions about these Terms of Use, please contact us through our support page.
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

export default Terms;
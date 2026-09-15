import { Link } from "react-router-dom";
import "./Auth.css";

function Support() {
  return (
    <main className="auth-page">
      <section className="auth-card" style={{ maxWidth: "700px", textAlign: "left" }}>
        <Link className="auth-brand" to="/">
          <span className="auth-brand-icon">A</span>
          <div className="auth-brand-text">
            <strong>ATP Revision Vault</strong>
            <span>SUPPORT</span>
          </div>
        </Link>

        <div className="auth-header" style={{ textAlign: "left" }}>
          <span className="auth-eyebrow">CUSTOMER SERVICE</span>
          <h1>How Can We Help?</h1>
          <p>We're here to support your revision journey.</p>
        </div>

        <div className="legal-content">
          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Common Support Topics</h3>
            
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "var(--ink)" }}>Payment & Access Issues</h4>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                Having trouble with payment completion or accessing your materials? Please provide your order ID and describe the issue you're experiencing.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "var(--ink)" }}>Device Transfer Requests</h4>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                Need to move your study pack to a new device? Device transfers are available through the Vault interface. If you encounter issues, contact us with your device details.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "var(--ink)" }}>Technical Support</h4>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                Experiencing technical difficulties with the platform, PDF viewer, or session management? Please describe the issue and include your browser/device information.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "8px", color: "var(--ink)" }}>Refund Requests</h4>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                For refund-related inquiries, please visit our Refund Policy page for the process and requirements, then contact us if you need to proceed with a request.
              </p>
            </div>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Contact Information</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              For fastest response, please contact us through:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li><strong>Email:</strong> support@atprevisionvault.com</li>
              <li><strong>Response Time:</strong> Typically within 24-48 hours</li>
              <li><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM IST</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>What to Include in Your Message</h3>
            <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
              To help us assist you faster, please include:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8", color: "var(--muted-brown)" }}>
              <li>Your registered email address</li>
              <li>Order ID (for payment-related issues)</li>
              <li>Clear description of the problem</li>
              <li>Screenshots if applicable (for technical issues)</li>
              <li>Browser and device information</li>
            </ul>
          </section>

          <section style={{ marginBottom: "32px" }}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px", color: "var(--ink)" }}>Frequently Asked Questions</h3>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontWeight: 600, marginBottom: "4px", color: "var(--ink)" }}>Q: I completed payment but can't access materials.</p>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                A: Please refresh the page after payment completion. If issues persist, contact us with your order ID.
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontWeight: 600, marginBottom: "4px", color: "var(--ink)" }}>Q: Can I access materials on multiple devices?</p>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                A: Access is limited to one device at a time for security. You can request a device transfer through the Vault if needed.
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontWeight: 600, marginBottom: "4px", color: "var(--ink)" }}>Q: How long does my access last?</p>
              <p style={{ lineHeight: "1.6", color: "var(--muted-brown)" }}>
                A: Your one-time payment grants permanent access to the ATP Complete Revision Pack for your personal study use.
              </p>
            </div>
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

export default Support;
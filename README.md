# ATP Revision Vault — Academic Edition

A high-performance, academic bookstore-styled revision platform built for focused exam preparation. Features automated Razorpay payment activation, single-device cryptographic binding, Supabase authentication with 6-digit email OTP, and a dynamic watermarked reader.

---

## ✨ Features

- **Academic Bookstore UI**: Warm ivory, deep ink navy, academic blue, and gold design system with smooth micro-interactions.
- **6-Digit Split Email OTP**: Dedicated digit boxes with auto-advance, backspace auto-reverse, clipboard paste, masked email security, and a 45-second resend cooldown timer.
- **Automated ₹49 Payment**: Server-verified Razorpay Orders API integration with HMAC-SHA256 webhook verification. Entitlements activate automatically without manual UTR submission.
- **Single-Device Cryptographic Binding**: Browser generates non-exportable ECDSA P-256 Web Crypto key pairs in IndexedDB. Protects revision material with a one-student device session limit and secure device transfer flow.
- **Protected Study Viewer**: Dynamic watermarked reader with 90-second temporary signed URLs from private Supabase Storage buckets.
- **Production Ready**: Full SPA routing configuration (`vercel.json` & `public/_redirects`) for zero-404 deployments on Vercel or Netlify.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7, React Router 7
- **Database & Auth**: Supabase (PostgreSQL with RLS, GoTrue Auth)
- **Backend & Logic**: Supabase Edge Functions (Deno / TypeScript)
- **Payment Gateway**: Razorpay Orders API & Webhooks
- **Security & Crypto**: Web Crypto API (ECDSA P-256), Subclass Watermarking

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/adithyatrv25it004-tech/Academic_Edition.git
cd Academic_Edition
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and add your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-key
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
```

### 3. Run Locally
```bash
npm run dev -- --host
```
Visit `http://localhost:5173/`.

---

## 📦 Database & Edge Functions Setup

1. **SQL Migrations**: Run the scripts in `supabase/migrations/` in your Supabase SQL Editor.
2. **Private Storage**: Create a private bucket `vault-materials` in Supabase Storage.
3. **Deploy Edge Functions**:
```bash
npx supabase functions deploy create-payment-order
npx supabase functions deploy razorpay-webhook
npx supabase functions deploy get-material-access
```

---

## 📄 License
All rights reserved © 2026 ATP Revision Vault.

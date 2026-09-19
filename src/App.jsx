import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";

// Lazy-load heavy and post-auth routes for optimal initial page performance
const Payment = lazy(() => import("./pages/Payment"));
const Vault = lazy(() => import("./pages/Vault"));
const DeviceActivation = lazy(() => import("./pages/DeviceActivation"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));
const Support = lazy(() => import("./pages/Support"));
const Learn = lazy(() => import("./pages/Learn"));
const Lesson = lazy(() => import("./pages/Lesson"));
const LabList = lazy(() => import("./pages/LabList"));
const Lab = lazy(() => import("./pages/Lab"));
const Exam = lazy(() => import("./pages/Exam"));

function RouteLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        color: "#64748b",
        gap: "12px",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #e2e8f0",
          borderTopColor: "#315C8C",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }}
      />
      <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>Loading study module...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/device-activation" element={<DeviceActivation />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/dashboard" element={<Vault />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/support" element={<Support />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:lessonId" element={<Lesson />} />
          <Route path="/learn/lab" element={<LabList />} />
          <Route path="/learn/lab/:labId" element={<Lab />} />
          <Route path="/learn/exam" element={<Exam />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Payment from "./pages/Payment";
import Vault from "./pages/Vault";
import DeviceActivation from "./pages/DeviceActivation";
import StudentDashboard from "./pages/StudentDashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Support from "./pages/Support";
import Learn from "./pages/Learn";
import Lesson from "./pages/Lesson";
import LabList from "./pages/LabList";
import Lab from "./pages/Lab";
import Exam from "./pages/Exam";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;


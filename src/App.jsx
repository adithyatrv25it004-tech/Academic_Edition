import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Payment from "./pages/Payment";
import Vault from "./pages/Vault";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/dashboard" element={<Vault />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


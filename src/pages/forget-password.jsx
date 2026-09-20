import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function sendOTP() {
    try {
      await axios.get(
        import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email,
      );
      toast.success("OTP sent to your email " + email);
      setStep("otp");
    } catch (e) {
      console.error(e);
      toast.error("Failed to send OTP. Please try again.");
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/change-password",
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        },
      );
      toast.success(
        "Password changed successfully. Please login with your new password.",
      );
      navigate("/login");
    } catch (e) {
      console.error(e);
      toast.error("OTP is incorrect or expired. Please try again.");
      return;
    }
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#F3E8D8] p-4 relative">
      {/* Brand logo / header at the top */}
      <div className="mb-6 flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Loop & Lace Logo"
          className="h-10 w-auto mb-2"
        />
        <span className="text-[#3E2723] font-semibold tracking-wide text-sm">
          Loop & Lace • Handcrafted Crochet
        </span>
      </div>

      {/* Centered Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#FFF9F0] border border-[#D7C3A8] shadow-xl p-8">
        {step === "email" && (
          <div>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-[#3E2723]">
                Reset Password
              </h1>
              <p className="text-[#6D4C41] text-xs mt-1">
                Enter your email to receive a verification code
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-[#4E342E]"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., you@example.com"
                  className="w-full h-11 rounded-xl bg-white text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                />
              </div>

              <button
                className="w-full h-11 rounded-xl bg-[#5D4037] text-[#FFF9F0] font-semibold shadow-lg shadow-[#3E2723]/20 hover:bg-[#4E342E] active:scale-[0.99] transition text-sm"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {step === "otp" && (
          <div>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-[#3E2723]">
                Reset Password
              </h1>
              <p className="text-[#6D4C41] text-xs mt-1">
                Enter the OTP code sent to your email and set a new password
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label
                  htmlFor="otp"
                  className="text-xs font-medium text-[#4E342E]"
                >
                  Verification Code (OTP)
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full h-11 rounded-xl bg-white text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="newPassword"
                  className="text-xs font-medium text-[#4E342E]"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-11 rounded-xl bg-white text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium text-[#4E342E]"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full h-11 rounded-xl bg-white text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                />
              </div>

              <button
                className="w-full h-11 rounded-xl bg-[#5D4037] text-[#FFF9F0] font-semibold shadow-lg shadow-[#3E2723]/20 hover:bg-[#4E342E] active:scale-[0.99] transition text-sm mt-1"
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Back to Login Link */}
        <div className="mt-5 text-center text-sm text-[#6D4C41]">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-[#4E342E] font-semibold hover:text-[#3E2723] hover:underline underline-offset-4"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

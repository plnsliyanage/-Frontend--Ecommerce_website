// Import axios for making HTTP requests to the backend
import axios from "axios";

// Import React state hook
import { useState } from "react";

// Import toast notifications
import toast from "react-hot-toast";

// Import routing components
import { Link, useNavigate } from "react-router-dom";

// Register Page Component
export default function RegisterPage() {
  // State for email input
  const [email, setEmail] = useState("");

  // State for password input
  const [password, setPassword] = useState("");

  // State for first name input
  const [firstName, setFirstName] = useState("");

  // State for last name input
  const [lastName, setLastName] = useState("");

  // State for confirm password input
  const [confirmPassword, setConfirmPassword] = useState("");

  // Hook used for page navigation
  const navigate = useNavigate();

  // Function executed when Register button is clicked
  async function register() {
    // Check whether password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Send registration data to backend API
      await axios.post(import.meta.env.VITE_API_URL + "/api/users/", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });

      // Show success message
      toast.success("Registration successful! Please login.");

      // Redirect user to login page
      navigate("/login");
    } catch (e) {
      // Display error in browser console
      console.error("Registration failed:", e);

      // Show error notification
      toast.error("Registration failed. Please check your credentials.");
    }
  }

  return (
    // Main container - locked to viewport height, no outer scrolling
    <div className="h-screen w-full relative flex items-stretch bg-[#F3E8D8] overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[url('/bg.jfif')] bg-cover bg-center" />
        {/* Soft brown transparent overlay matching login page */}
        <div className="absolute inset-0 bg-[#3E2723]/25" />
      </div>

      {/* Main page layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* Left side brand section (Visible on desktop) */}
        <div className="hidden lg:flex flex-col justify-between p-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Loop & Lace logo"
              className="h-10 w-auto"
            />
            <span className="text-[#FFF9F0] tracking-wide font-semibold drop-shadow">
              Loop & Lace • Handcrafted Crochet
            </span>
          </div>

          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl font-bold leading-tight text-[#3E2723] drop-shadow">
              Cozy looks. <span className="text-[#795548]">Handmade with care.</span>
            </h1>
            <p className="text-[#6D4C41] text-sm">
              Register to discover crochet cardigans, tops, bags, and seasonal
              handmade collections designed for comfort.
            </p>
            <div className="h-1 w-20 bg-[#795548] rounded-full" />
          </div>

          <p className="text-[#FFF9F0]/80 text-xs">
            © {new Date().getFullYear()} Loop & Lace – Handcrafted Crochet. All rights
            reserved.
          </p>
        </div>

        {/* Registration Form Section - Internally scrollable if needed */}
        <div className="flex items-center justify-center p-4 sm:p-6 overflow-y-auto h-full">
          <div className="w-full max-w-md my-auto">
            {/* Glassmorphism card */}
            <div className="rounded-3xl backdrop-blur-xl bg-[#FFF9F0]/80 border border-[#FFF9F0]/40 shadow-2xl p-6 sm:p-8">
              {/* Company logo & Header */}
              <div className="mb-6 flex flex-col items-center text-center">
                <img
                  src="/logo.png"
                  alt="Loop & Lace Logo"
                  className="h-10 w-auto mb-3"
                />
                <h2 className="text-xl font-bold text-[#3E2723]">
                  Create your account
                </h2>
                <p className="text-[#6D4C41] text-xs mt-1">
                  Join Loop & Lace today
                </p>
              </div>

              {/* Registration form fields */}
              <div className="space-y-3.5">
                {/* Email input field */}
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
                    placeholder="e.g., you@example.com"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#FFF9F0]/90 text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                  />
                </div>

                {/* First name input field */}
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="text-xs font-medium text-[#4E342E]"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="e.g., John"
                    autoComplete="given-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#FFF9F0]/90 text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                  />
                </div>

                {/* Last name input field */}
                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="text-xs font-medium text-[#4E342E]"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="e.g., Doe"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#FFF9F0]/90 text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                  />
                </div>

                {/* Password input field */}
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-[#4E342E]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#FFF9F0]/90 text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                  />
                </div>

                {/* Confirm password input field */}
                <div className="space-y-1">
                  <label
                    htmlFor="confirmPassword"
                    className="text-xs font-medium text-[#4E342E]"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#FFF9F0]/90 text-[#3E2723] placeholder-[#8D6E63] px-4 outline-none ring-2 ring-transparent focus:ring-[#795548]/40 border border-[#D7C3A8] transition text-sm"
                  />
                </div>

                {/* Register button */}
                <button
                  onClick={register}
                  className="w-full h-10 rounded-xl bg-[#5D4037] text-[#FFF9F0] font-semibold shadow-lg shadow-[#3E2723]/20 hover:bg-[#4E342E] active:scale-[0.99] transition text-sm mt-1"
                >
                  Register
                </button>
              </div>

              {/* Link to login page */}
              <div className="mt-5 text-center text-sm text-[#6D4C41]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#4E342E] font-semibold hover:text-[#3E2723] hover:underline underline-offset-4"
                >
                  Login here
                </Link>
              </div>
            </div>

            {/* Mobile footer */}
            <p className="mt-4 text-center text-[#FFF9F0]/90 text-xs lg:hidden">
              © {new Date().getFullYear()} Loop & Lace – Handcrafted Crochet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

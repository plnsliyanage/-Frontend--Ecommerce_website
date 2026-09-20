// Import Axios for making HTTP requests
import axios from "axios";

// Import React state hook
import { useState } from "react";

// Import toast notifications
import toast from "react-hot-toast";

// Import navigation and link components
import { Link, useNavigate } from "react-router-dom";

// Login Page Component
export default function LoginPage() {
  // State for storing email input value
  const [email, setEmail] = useState("");

  // State for storing password input value
  const [password, setPassword] = useState("");

  // Hook used for page navigation
  const navigate = useNavigate();

  // Normal email/password login function
  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        {
          email: email,
          password: password,
        },
      );

      // Store JWT token received from backend
      localStorage.setItem("token", response.data.token);

      // Display success notification
      toast.success("Login successful!");

      // Get user information from response
      const user = response.data.user;

      // Redirect user based on role
      if (user.role == "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("Login failed:", e);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    // Changed min-h-screen to h-screen and added overflow-hidden to lock viewport
    <div className="h-screen w-full relative flex items-stretch bg-[#F3E8D8] overflow-hidden">
      {/* Background image and same blur/overlay style */}
      <div className="absolute inset-0">
        <div
          className="
            h-full
            w-full
            bg-[url('/bg.jfif')]
            bg-cover
            bg-center
          "
        />

        {/* Soft brown transparent overlay */}
        <div className="absolute inset-0 bg-[#3E2723]/25" />
      </div>

      {/* Main page layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* Left side */}
        <div className="hidden lg:flex flex-col justify-between p-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Loop & Lace - Handmade Crochet Creations"
              className="h-10 w-auto"
            />
            <span className="text-[#FFF9F0] tracking-wide font-semibold drop-shadow">
              Loop & Lace • Handcrafted Crochet
            </span>
          </div>
        </div>

        {/* Login Form Section - Added overflow-y-auto so inner content scrolls if screen is very short, while outer page stays fixed */}
        <div className="flex items-center justify-center p-4 sm:p-6 overflow-y-auto h-full">
          <div className="w-full max-w-md my-auto">
            {/* Glassmorphism Login Card */}
            <div
              className="
                rounded-3xl
                backdrop-blur-xl
                bg-[#FFF9F0]/80
                border
                border-[#FFF9F0]/40
                shadow-2xl
                p-6
                sm:p-8
              "
            >
              {/* Logo and text */}
              <div className="mb-6 flex flex-col items-center text-center">
                <img
                  src="/logo.png"
                  alt="Loop & Lace Logo"
                  className="h-10 w-auto mb-3"
                />

                <h1 className="text-2xl font-bold leading-tight text-[#3E2723]">
                  Crafted with love.
                </h1>

                <h2 className="text-lg font-semibold text-[#6D4C41] mt-0.5">
                  Wrapped in warmth.
                </h2>

                <p className="text-[#6D4C41] text-xs sm:text-sm mt-2 leading-relaxed">
                  Sign in to explore cozy handmade cardigans, custom plushies,
                  and intricate yarn treasures.
                </p>

                <div className="h-1 w-20 bg-[#795548] rounded-full mt-3" />

                <h2 className="text-xl font-semibold text-[#3E2723] mt-4">
                  Welcome back
                </h2>
              </div>

              {/* Login Form Fields */}
              <div className="space-y-4">
                {/* Email Input Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#4E342E]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., you@example.com"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full
                      h-10
                      rounded-xl
                      bg-[#FFF9F0]/90
                      text-[#3E2723]
                      placeholder-[#8D6E63]
                      px-4
                      outline-none
                      ring-2
                      ring-transparent
                      focus:ring-[#795548]/40
                      border
                      border-[#D7C3A8]
                      transition
                    "
                  />
                </div>

                {/* Password Input Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#4E342E]"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full
                      h-10
                      rounded-xl
                      bg-[#FFF9F0]/90
                      text-[#3E2723]
                      placeholder-[#8D6E63]
                      px-4
                      outline-none
                      ring-2
                      ring-transparent
                      focus:ring-[#795548]/40
                      border
                      border-[#D7C3A8]
                      transition
                    "
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-end text-sm">
                  <Link
                    to="/forget-password"
                    className="
                      text-[#6D4C41]
                      hover:text-[#3E2723]
                      hover:underline
                      underline-offset-4
                    "
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  onClick={login}
                  className="
                    w-full
                    h-10
                    rounded-xl
                    bg-[#5D4037]
                    text-[#FFF9F0]
                    font-semibold
                    shadow-lg
                    shadow-[#3E2723]/20
                    hover:bg-[#4E342E]
                    active:scale-[0.99]
                    transition
                  "
                >
                  Login
                </button>
              </div>

              {/* Register Page Link */}
              <div className="mt-5 text-center text-sm text-[#6D4C41]">
                New to Loop & Lace?{" "}
                <Link
                  to="/register"
                  className="
                    text-[#4E342E]
                    font-semibold
                    hover:text-[#3E2723]
                    hover:underline
                    underline-offset-4
                  "
                >
                  Create your account
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <p className="mt-4 text-center text-[#FFF9F0]/90 text-xs lg:hidden">
              © {new Date().getFullYear()} Loop & Lace – Handcrafted Crochet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

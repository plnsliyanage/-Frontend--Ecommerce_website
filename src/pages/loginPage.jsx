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
    // Send login request to backend
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
      // Display login error
      console.error("Login failed:", e);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    // Main page container
    <div className="min-h-screen w-full relative flex items-stretch">
      {/* Background image and gradient overlay */}
      <div className="absolute inset-0">
        {/* Background image */}
        <div className="h-full w-full bg-[url('/bg.jfif')] bg-cover bg-center" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-secondary/40 to-primary/70" />
      </div>

      {/* Main page layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full">
        {/* Left Hero Section (Visible on Large Screens Only) */}
        <div className="hidden lg:flex flex-col justify-between p-10">
          {/* Company logo and name */}
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Loop & Lace - Handmade Crochet Creations"
              className="h-10 w-auto"
            />
            <span className="text-primary/90 tracking-wide font-semibold">
              Loop & Lace • Handcrafted Crochet
            </span>
          </div>

          {/* Marketing content */}
          <div className="flex-1 flex items-center">
            <div className="max-w-xl space-y-6">
              {/* Main heading */}
              <h1 className="text-5xl font-bold leading-tight text-white drop-shadow">
                Crafted with love.{" "}
                <span className="text-accent">Wrapped in warmth.</span>
              </h1>

              {/* Description */}
              <p className="text-primary/90 text-lg">
                Sign in to explore cozy handmade cardigans, custom plushies, and
                intricate yarn treasures. Cozy crafting—made just for you.
              </p>

              {/* Decorative line */}
              <div className="h-1 w-28 bg-accent rounded-full" />
            </div>
          </div>

          {/* Footer */}
          <p className="text-primary/80 text-sm">
            © {new Date().getFullYear()} Loop & Lace – Handcrafted Crochet. All
            rights reserved.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            {/* Glassmorphism Login Card */}
            <div className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl p-8 sm:p-10">
              {/* Logo and Welcome Text */}
              <div className="mb-8 flex flex-col items-center text-center">
                <img
                  src="/logo.png"
                  alt="Loop & Lace Logo"
                  className="h-12 w-auto mb-4"
                />

                <h2 className="text-2xl font-semibold text-white">
                  Welcome back to Loop & Lace
                </h2>

                <p className="text-primary/90 text-sm">
                  Log in to track your custom orders and manage your saved yarn
                  wishes.
                </p>
              </div>

              {/* Login Form Fields */}
              <div className="space-y-5">
                {/* Email Input Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-primary/90"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="e.g., you@example.com"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
                  />
                </div>

                {/* Password Input Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-primary/90"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/90 text-secondary placeholder-secondary/50 px-4 outline-none ring-2 ring-transparent focus:ring-accent/60 transition"
                  />
                </div>

                {/* Forgot Password Link */}
                <div className="flex items-center justify-end text-sm">
                  <Link
                    to="/forget-password"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Normal Login Button */}
                <button
                  onClick={login}
                  className="w-full h-11 rounded-xl bg-accent text-white font-semibold shadow-lg shadow-accent/20 hover:brightness-110 active:scale-[0.99] transition"
                >
                  Login
                </button>
              </div>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative text-center">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20"></span>
                  </div>
                </div>
              </div>

              {/* Register Page Link */}
              <div className="mt-6 text-center text-sm text-primary/90">
                New to Loop & Lace?{" "}
                <Link
                  to="/register"
                  className="text-accent hover:underline underline-offset-4"
                >
                  Create your account
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <p className="mt-6 text-center text-primary/80 text-xs lg:hidden">
              © {new Date().getFullYear()} Loop & Lace – Handcrafted Crochet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Replace with your actual logout logic
    console.log("User logged out successfully");
  };

  return (
    <header className="w-full bg-[#2C1A1D] shadow-xl sticky top-0 z-50 border-b border-[#4A2E35]">
      <div className="max-w-7xl mx-auto h-[90px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E6D5C3] to-[#C8B6A6] flex items-center justify-center text-[#2C1A1D] font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              L
            </div>
            <span className="text-[#F5EEEC] font-serif tracking-wide text-xl font-semibold hidden sm:inline-block">
              LuxeBrand
            </span>
          </Link>
        </div>

        {}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-[#3A2227] px-4 py-2 rounded-full border border-[#4E323A] shadow-inner">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "bg-[#E6D5C3] text-[#2C1A1D] shadow-sm"
                : "text-[#D8C7B5] hover:text-[#F5EEEC] hover:bg-[#452930]"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/products")
                ? "bg-[#E6D5C3] text-[#2C1A1D] shadow-sm"
                : "text-[#D8C7B5] hover:text-[#F5EEEC] hover:bg-[#452930]"
            }`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/about")
                ? "bg-[#E6D5C3] text-[#2C1A1D] shadow-sm"
                : "text-[#D8C7B5] hover:text-[#F5EEEC] hover:bg-[#452930]"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/contact")
                ? "bg-[#E6D5C3] text-[#2C1A1D] shadow-sm"
                : "text-[#D8C7B5] hover:text-[#F5EEEC] hover:bg-[#452930]"
            }`}
          >
            Contact
          </Link>
        </nav>

        {}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#E6D5C3] text-[#2C1A1D] hover:bg-[#F5EEEC] hover:shadow-lg active:scale-95 transition-all duration-200 shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>

          {}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#3A2227] text-[#E6D5C3] hover:bg-[#452930] focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#351F24] border-t border-[#4E323A] px-6 py-5 space-y-3 shadow-2xl animate-fadeIn">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-[#D8C7B5] hover:bg-[#452930] hover:text-[#F5EEEC]"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-[#D8C7B5] hover:bg-[#452930] hover:text-[#F5EEEC]"
          >
            Products
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-[#D8C7B5] hover:bg-[#452930] hover:text-[#F5EEEC]"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-base font-medium text-[#D8C7B5] hover:bg-[#452930] hover:text-[#F5EEEC]"
          >
            Contact
          </Link>
          <div className="pt-2 border-t border-[#4E323A]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-center py-3 rounded-xl font-semibold bg-[#E6D5C3] text-[#2C1A1D] hover:bg-[#F5EEEC] shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

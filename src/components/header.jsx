import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-[#2D1810] h-[90px] text-[#F5F1E9] px-6 md:px-12 shadow-md">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <img
            src="logo.png"
            alt="Logo"
            className="w-[140px] h-[55px] object-contain rounded"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-[#D4B59D] transition-colors">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#D4B59D] transition-colors"
          >
            Products
          </Link>
          <Link to="/about" className="hover:text-[#D4B59D] transition-colors">
            About
          </Link>
          <Link
            to="/contacts"
            className="hover:text-[#D4B59D] transition-colors"
          >
            Contacts
          </Link>
        </nav>

        {/* Logout Button */}
        <div>
          <button
            onClick={() => console.log("Logged out")}
            className="bg-[#F5F1E9] text-[#2D1810] px-5 py-2 rounded-lg font-semibold hover:bg-[#D4B59D] transition-all shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="w-full bg-[#5D4037] h-[90px] border-b border-[#4E342E] px-[40px] shadow-md">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 h-full py-3">
          <img
            src="/logo.png"
            alt="Loop & Lace"
            className="h-full w-auto object-contain"
          />
          <span className="text-[#FFF9F0] font-semibold tracking-wide hidden sm:inline">
            Loop & Lace
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-[24px] sm:gap-[30px]">
          <Link
            to="/"
            className="text-[#FFF9F0]/90 font-medium hover:text-[#FFF9F0] transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-[#FFF9F0]/90 font-medium hover:text-[#FFF9F0] transition"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-[#FFF9F0]/90 font-medium hover:text-[#FFF9F0] transition"
          >
            About
          </Link>
          <Link
            to="/contacts"
            className="text-[#FFF9F0]/90 font-medium hover:text-[#FFF9F0] transition"
          >
            Contacts
          </Link>

          {/* Cart Link */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 text-[#FFF9F0]/90 font-medium hover:text-[#FFF9F0] transition px-3 py-1.5 rounded-xl bg-[#4E342E]/60 border border-[#4E342E]"
          >
            <span className="text-base">🛒</span>
            <span className="hidden md:inline text-sm">Cart</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
                            ml-2
                            px-4
                            py-2
                            rounded-xl
                            bg-[#FFF9F0]
                            text-[#3E2723]
                            font-semibold
                            text-sm
                            shadow-md
                            hover:bg-[#F3E8D8]
                            active:scale-[0.98]
                            transition
                          "
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
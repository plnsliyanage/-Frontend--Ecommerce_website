import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  return (
    <header className="w-full bg-[#2D1810] text-[#F5F1E9] px-4 md:px-8 shadow-md">
      <div className="w-full min-h-[90px] py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Loop and Lace logo"
            className="w-[140px] h-[55px] object-contain rounded"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-5 md:gap-8 font-medium text-sm md:text-base">
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
          <Link to="/cart" className="hover:text-[#D4B59D] transition-colors">
            Cart
          </Link>
        </nav>

        <UserData />
      </div>
    </header>
  );
}

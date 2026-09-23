import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";

export default function AdminPage() {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="w-full h-screen bg-[#FAF6EE] flex p-3 gap-3 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <div className="w-[280px] h-full bg-[#FFF9F0] border border-[#EAD7C2] shadow-sm flex flex-col items-center py-6 px-4 rounded-3xl gap-6">
        {/* Admin Header / Logo Section */}
        <div className="flex flex-row w-full bg-[#5D4037] h-[75px] items-center px-4 rounded-2xl shadow-md gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="text-[#FFF9F0] font-bold text-base leading-tight">
              Admin Panel
            </span>
            <span className="text-[#D7C3A8] text-xs">Loop & Lace</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col w-full gap-2 mt-2">
          <Link
            to="/admin"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
              isActive("/admin") && location.pathname === "/admin"
                ? "bg-[#5D4037] text-[#FFF9F0] shadow-sm"
                : "text-[#4E342E] hover:bg-[#EAD7C2]/40"
            }`}
          >
            <FaChartLine className="text-lg" />
            DashBoard
          </Link>

          <Link
            to="/admin/orders"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
              isActive("/admin/orders")
                ? "bg-[#5D4037] text-[#FFF9F0] shadow-sm"
                : "text-[#4E342E] hover:bg-[#EAD7C2]/40"
            }`}
          >
            <MdOutlineShoppingCart className="text-lg" />
            Orders
          </Link>

          <Link
            to="/admin/products"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
              isActive("/admin/products")
                ? "bg-[#5D4037] text-[#FFF9F0] shadow-sm"
                : "text-[#4E342E] hover:bg-[#EAD7C2]/40"
            }`}
          >
            <BsBox2Heart className="text-lg" />
            Products
          </Link>

          <Link
            to="/admin/users"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
              isActive("/admin/users")
                ? "bg-[#5D4037] text-[#FFF9F0] shadow-sm"
                : "text-[#4E342E] hover:bg-[#EAD7C2]/40"
            }`}
          >
            <HiOutlineUsers className="text-lg" />
            Users
          </Link>
        </div>
      </div>

      {/* Main Content Viewport */}
      <div className="w-[calc(100%-280px)] h-full bg-[#FFF9F0] border border-[#EAD7C2] rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="w-full h-full overflow-y-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-[#3E2723] text-2xl font-bold">
                  Dashboard Overview
                </div>
              }
            />
            <Route path="/products" element={<AdminProductPage />} />
            <Route
              path="/orders"
              element={
                <div className="text-[#3E2723] text-2xl font-bold">
                  Orders Management
                </div>
              }
            />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product" element={<UpdateProductPage />} />
            <Route
              path="/users"
              element={
                <div className="text-[#3E2723] text-2xl font-bold">
                  Users Management
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
} from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";

// Sample dashboard data for preview
const recentOrders = [
  {
    id: "#ORD-9382",
    customer: "Amara Perera",
    item: "Cozy Daisy Granny Square Cardigan",
    amount: 8500,
    status: "Delivered",
    date: "Oct 24, 2026",
  },
  {
    id: "#ORD-9381",
    customer: "Kasun Silva",
    item: "Sunflower Amigurumi Plushie",
    amount: 2800,
    status: "Processing",
    date: "Oct 24, 2026",
  },
  {
    id: "#ORD-9380",
    customer: "Nirosha Jayasinghe",
    item: "Boho Fringe Crossbody Bag",
    amount: 3600,
    status: "Shipped",
    date: "Oct 23, 2026",
  },
  {
    id: "#ORD-9379",
    customer: "Randika Fernando",
    item: "Curated Warmth Gift Bundle",
    amount: 6500,
    status: "Delivered",
    date: "Oct 22, 2026",
  },
];

export default function AdminPage() {
  const location = useLocation();

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
            className="h-10 w-10 object-contain rounded-full bg-[#FAF6EE] p-1"
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
            Dashboard
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
        <div className="w-full h-full overflow-y-auto p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  {/* Top Welcome Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EAD7C2]/60 pb-6">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-[#3E2723]">
                        Dashboard Overview 🧶
                      </h1>
                      <p className="text-sm text-[#6D4C41] mt-1">
                        Here is what is happening with your crochet store today.
                      </p>
                    </div>
                    <Link
                      to="/admin/add-product"
                      className="flex items-center gap-2 bg-[#5D4037] text-[#FFF9F0] px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-[#4E342E] transition shadow-xs"
                    >
                      <FaPlus /> Add New Product
                    </Link>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Card 1 */}
                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#EAD7C2] shadow-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[#6D4C41]">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Total Revenue
                        </span>
                        <FaShoppingBag className="text-lg text-[#5D4037]" />
                      </div>
                      <div className="my-4">
                        <h3 className="text-2xl font-bold text-[#3E2723]">
                          LKR 284,500
                        </h3>
                        <span className="text-xs text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                          <FaArrowUp /> +12.4% from last month
                        </span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#EAD7C2] shadow-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[#6D4C41]">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Total Orders
                        </span>
                        <FaBoxOpen className="text-lg text-[#5D4037]" />
                      </div>
                      <div className="my-4">
                        <h3 className="text-2xl font-bold text-[#3E2723]">
                          48 Orders
                        </h3>
                        <span className="text-xs text-emerald-700 flex items-center gap-1 mt-1 font-medium">
                          <FaArrowUp /> +8.2% from last week
                        </span>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#EAD7C2] shadow-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[#6D4C41]">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Active Products
                        </span>
                        <BsBox2Heart className="text-lg text-[#5D4037]" />
                      </div>
                      <div className="my-4">
                        <h3 className="text-2xl font-bold text-[#3E2723]">
                          24 Items
                        </h3>
                        <span className="text-xs text-[#6D4C41] mt-1 font-medium">
                          Across 6 categories
                        </span>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#EAD7C2] shadow-xs flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[#6D4C41]">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Total Customers
                        </span>
                        <FaUsers className="text-lg text-[#5D4037]" />
                      </div>
                      <div className="my-4">
                        <h3 className="text-2xl font-bold text-[#3E2723]">
                          1,280
                        </h3>
                        <span className="text-xs text-rose-700 flex items-center gap-1 mt-1 font-medium">
                          <FaArrowDown /> -1.1% churn rate
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Section */}
                  <div className="bg-[#FAF6EE] rounded-2xl border border-[#EAD7C2] p-6 shadow-xs">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-[#3E2723]">
                        Recent Customer Orders
                      </h3>
                      <Link
                        to="/admin/orders"
                        className="text-sm font-semibold text-[#5D4037] hover:underline"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#EAD7C2] text-xs font-bold text-[#6D4C41] uppercase tracking-wider">
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Item</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Date</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm text-[#3E2723]">
                          {recentOrders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-[#EAD7C2]/40 hover:bg-[#EAD7C2]/20 transition"
                            >
                              <td className="py-3.5 px-4 font-semibold text-[#5D4037]">
                                {order.id}
                              </td>
                              <td className="py-3.5 px-4">{order.customer}</td>
                              <td className="py-3.5 px-4 max-w-[200px] truncate">
                                {order.item}
                              </td>
                              <td className="py-3.5 px-4 font-medium">
                                LKR {order.amount.toLocaleString()}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                    order.status === "Delivered"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : order.status === "Processing"
                                        ? "bg-amber-100 text-amber-800"
                                        : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-[#6D4C41] text-xs">
                                {order.date}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/products" element={<AdminProductPage />} />
            <Route
              path="/orders"
              element={
                <div className="text-[#3E2723] text-2xl font-bold">
                  Orders Management Page
                </div>
              }
            />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/update-product" element={<UpdateProductPage />} />
            <Route
              path="/users"
              element={
                <div className="text-[#3E2723] text-2xl font-bold">
                  Users Management Page
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full font-sans">
      <OrderModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => {
          setIsLoading(true);
        }}
      />

      {/* Page container */}
      <div className="mx-auto max-w-7xl">
        {/* Card */}
        <div className="rounded-3xl border border-[#EAD7C2] bg-[#FFF9F0] shadow-sm overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between gap-4 border-b border-[#EAD7C2] px-6 py-5 bg-[#FAF6EE]">
            <div>
              <h1 className="text-xl font-bold text-[#3E2723]">
                Orders Management
              </h1>
              <p className="text-xs text-[#6D4C41] mt-0.5">
                Manage customer purchases and order fulfillment
              </p>
            </div>
            <span className="rounded-full bg-[#5D4037] text-[#FFF9F0] px-4 py-1.5 text-xs font-semibold shadow-sm">
              {orders.length} Orders
            </span>
          </div>

          {/* Table wrapper for responsive scrolling */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 flex justify-center">
                <Loader />
              </div>
            ) : (
              <table className="w-full min-w-[950px] text-left border-collapse">
                <thead className="bg-[#5D4037] text-[#FFF9F0]">
                  <tr>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Items
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Address
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider">
                      Total
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="sticky top-0 z-10 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-center">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EAD7C2]">
                  {orders.map((item) => {
                    return (
                      <tr
                        key={item.orderID}
                        className="bg-[#FFF9F0] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedOrder(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <td className="px-4 py-4 font-mono text-xs font-medium text-[#5D4037]">
                          #{item.orderID}
                        </td>
                        <td className="px-4 py-4 font-medium text-[#3E2723]">
                          <span className="bg-[#EAD7C2]/40 px-2.5 py-1 rounded-lg text-xs">
                            {item.items.length} items
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-[#3E2723]">
                          {item.customerName}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6D4C41]">
                          {item.email}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6D4C41]">
                          {item.phone}
                        </td>
                        <td className="px-4 py-4 text-sm text-[#6D4C41] max-w-[180px] truncate">
                          {item.address}
                        </td>
                        <td className="px-4 py-4 font-bold text-[#5D4037]">
                          LKR {item.total.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EAD7C2]/50 text-[#3E2723]">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center text-[#6D4C41]">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        className="px-4 py-16 text-center text-[#6D4C41]"
                        colSpan={9}
                      >
                        No orders available to display.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

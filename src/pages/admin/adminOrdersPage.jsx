import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

// Sample mock orders data
const sampleOrders = [
  {
    orderID: "ORD-9382",
    customerName: "Amara Perera",
    email: "amara.perera@gmail.com",
    phone: "+94 77 123 4567",
    address: "42/A, Flower Road, Colombo 07",
    total: 8500.0,
    status: "Delivered",
    date: "2026-09-22T10:30:00Z",
    items: [
      {
        productID: 1,
        name: "Cozy Daisy Granny Square Cardigan",
        price: 8500.0,
        quantity: 1,
        category: "Women",
      },
    ],
  },
  {
    orderID: "ORD-9383",
    customerName: "Kasun Silva",
    email: "kasun.s@yahoo.com",
    phone: "+94 71 987 6543",
    address: "15/2, Temple Lane, Kandy",
    total: 5600.0,
    status: "Processing",
    date: "2026-09-23T08:15:00Z",
    items: [
      {
        productID: 3,
        name: "Sunflower Amigurumi Plushie",
        price: 2800.0,
        quantity: 2,
        category: "Toys",
      },
    ],
  },
  {
    orderID: "ORD-9384",
    customerName: "Nirosha Jayasinghe",
    email: "niro.jaya@outlook.com",
    phone: "+94 70 456 7890",
    address: "88, Galle Road, Matara",
    total: 3600.0,
    status: "Shipped",
    date: "2026-09-21T14:45:00Z",
    items: [
      {
        productID: 4,
        name: "Boho Fringe Crossbody Bag",
        price: 3600.0,
        quantity: 1,
        category: "Accessories",
      },
    ],
  },
  {
    orderID: "ORD-9385",
    customerName: "Randika Fernando",
    email: "randika.f@gmail.com",
    phone: "+94 75 333 2211",
    address: "12, Station Road, Negombo",
    total: 9900.0,
    status: "Pending",
    date: "2026-09-23T16:00:00Z",
    items: [
      {
        productID: 5,
        name: "Tiny Tots Organic Booties & Bonnet Set",
        price: 3400.0,
        quantity: 1,
        category: "Baby",
      },
      {
        productID: 6,
        name: "Curated Warmth Gift Bundle",
        price: 6500.0,
        quantity: 1,
        category: "Gifts",
      },
    ],
  },
  {
    orderID: "ORD-9386",
    customerName: "Dilini Rathnayake",
    email: "dilini.rath@gmail.com",
    phone: "+94 78 555 4433",
    address: "50/3, Lake Road, Kurunegala",
    total: 4500.0,
    status: "Cancelled",
    date: "2026-09-20T11:20:00Z",
    items: [
      {
        productID: 2,
        name: "Pastel Dream Crochet Top",
        price: 4500.0,
        quantity: 1,
        category: "New Arrivals",
      },
    ],
  },
];

// Helper function to return beautiful styling based on order status
const getStatusBadge = (status) => {
  const currentStatus = status?.toLowerCase() || "pending";

  switch (currentStatus) {
    case "delivered":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "shipped":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "processing":
      return "bg-amber-100 text-amber-800 border border-amber-200";
    case "cancelled":
      return "bg-rose-100 text-rose-800 border border-rose-200";
    default:
      return "bg-stone-100 text-stone-700 border border-stone-200";
  }
};

export default function AdminOrdersPage() {
  // Using sampleOrders directly so you can see the UI immediately
  const [orders, setOrders] = useState(sampleOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  // Note: If you want to switch back to real backend data fetching later,
  // simply uncomment the useEffect block below and change `isLoading` initial state to `true`.
  /*
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
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setIsLoading(false);
        });
    }
  }, [isLoading]);
  */

  return (
    <div className="w-full min-h-full font-sans">
      <OrderModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => {
          setIsLoading(true);
          // Re-simulate fetching if refreshed
          setTimeout(() => setIsLoading(false), 500);
        }}
      />

      {/* Page container */}
      <div className="mx-auto max-w-7xl">
        {/* Card */}
        <div className="rounded-3xl border border-[#EAD7C2] bg-[#FFF9F0] shadow-sm overflow-hidden">
          {/* Header bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAD7C2] px-8 py-6 bg-[#FAF6EE]">
            <div>
              <h1 className="text-2xl font-bold text-[#3E2723] tracking-tight">
                Orders Management 📦
              </h1>
              <p className="text-xs sm:text-sm text-[#6D4C41] mt-1">
                Manage customer purchases, fulfillment status, and delivery
                details. Click any row to view details.
              </p>
            </div>
            <span className="rounded-full bg-[#5D4037] text-[#FFF9F0] px-4 py-2 text-xs font-semibold shadow-xs">
              {orders.length} Total Orders
            </span>
          </div>

          {/* Table wrapper for responsive scrolling */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-24 flex justify-center">
                <Loader />
              </div>
            ) : (
              <table className="w-full min-w-[1000px] text-left border-collapse">
                <thead className="bg-[#5D4037] text-[#FFF9F0]">
                  <tr>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Items
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Address
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Total
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                      Status
                    </th>
                    <th className="sticky top-0 z-10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EAD7C2]/60">
                  {orders.map((item) => {
                    return (
                      <tr
                        key={item.orderID}
                        className="bg-[#FFF9F0] hover:bg-[#FAF6EE] transition-colors cursor-pointer group"
                        onClick={() => {
                          setSelectedOrder(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <td className="px-6 py-4 font-mono text-xs font-bold text-[#5D4037]">
                          #{item.orderID}
                        </td>
                        <td className="px-6 py-4 font-medium text-[#3E2723]">
                          <span className="bg-[#EAD7C2]/50 text-[#5D4037] px-3 py-1 rounded-xl text-xs font-semibold shadow-2xs">
                            {item.items?.length || 0} items
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-[#3E2723] group-hover:text-[#5D4037] transition-colors">
                          {item.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6D4C41]">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6D4C41]">
                          {item.phone}
                        </td>
                        <td
                          className="px-6 py-4 text-sm text-[#6D4C41] max-w-[200px] truncate"
                          title={item.address}
                        >
                          {item.address}
                        </td>
                        <td className="px-6 py-4 font-bold text-[#5D4037]">
                          LKR{" "}
                          {Number(item.total).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-2xs capitalize ${getStatusBadge(item.status)}`}
                          >
                            {item.status || "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-center font-medium text-[#6D4C41]">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr>
                      <td
                        className="px-6 py-20 text-center text-[#6D4C41]"
                        colSpan={9}
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-4xl">🧶</span>
                          <p className="text-base font-semibold text-[#3E2723]">
                            No orders available to display
                          </p>
                          <p className="text-xs text-[#6D4C41]">
                            Customer checkouts will automatically show up here.
                          </p>
                        </div>
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

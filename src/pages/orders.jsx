import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load only the logged-in user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      // User is not logged in
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        // Backend should return only this user's orders
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error loading orders:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  function calculateOrderTotal(order) {
    if (order.total != null) {
      return Number(order.total);
    }

    if (order.totalAmount != null) {
      return Number(order.totalAmount);
    }

    if (!Array.isArray(order.items)) {
      return 0;
    }

    return order.items.reduce((total, item) => {
      return total + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
  }

  if (loading) {
    return (
      <div className="w-full min-h-[calc(100vh-100px)] bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-secondary border-t-transparent animate-spin"></div>

          <p className="text-secondary">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary py-10 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary">My Orders</h1>

          <p className="text-secondary/70 mt-2">
            View the orders you have placed.
          </p>
        </div>

        {/* NO ORDERS */}
        {orders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🛍️</div>

            <h2 className="text-xl font-semibold text-secondary">
              No orders yet
            </h2>

            <p className="text-secondary/70 mt-2">
              You have not placed any orders yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/80"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* ORDERS LIST */}
        <div className="flex flex-col gap-6">
          {orders.map((order, orderIndex) => {
            const orderTotal = calculateOrderTotal(order);

            return (
              <div
                key={order._id || order.id || order.orderID || orderIndex}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-secondary/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-secondary">
                      Order #
                      {order.orderID || order._id || order.id || orderIndex + 1}
                    </h2>

                    {order.createdAt && (
                      <p className="text-sm text-secondary/60 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold self-start ${
                      String(order.status).toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : String(order.status).toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>

                {/* CUSTOMER DETAILS */}
                <div className="py-4 border-b border-secondary/10">
                  <div className="mb-2">
                    <span className="font-semibold text-secondary">Name:</span>{" "}
                    <span className="text-secondary/70">
                      {order.customerName || "Not provided"}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-secondary">
                      Shipping Address:
                    </span>{" "}
                    <span className="text-secondary/70">
                      {order.address || "Not provided"}
                    </span>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="py-5">
                  <h3 className="font-semibold text-secondary mb-4">
                    Ordered Items
                  </h3>

                  <div className="flex flex-col gap-3">
                    {Array.isArray(order.items) &&
                      order.items.map((item, itemIndex) => (
                        <div
                          key={item._id || item.id || itemIndex}
                          className="bg-primary rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                        >
                          <div>
                            <h4 className="font-semibold text-secondary">
                              {item.productName ||
                                item.name ||
                                item.productID ||
                                "Product"}
                            </h4>

                            {item.productID && (
                              <p className="text-sm text-secondary/60 mt-1">
                                Product ID: {item.productID}
                              </p>
                            )}

                            <p className="text-sm text-secondary/60">
                              Colour: {item.colour || "Pink"}
                            </p>

                            <p className="text-sm text-secondary/60">
                              Quantity: {item.quantity || 0}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-accent">
                              LKR {Number(item.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* ORDER TOTAL */}
                <div className="border-t border-secondary/10 pt-4 flex justify-end">
                  <div className="text-right">
                    <span className="text-sm text-secondary/70">
                      Order Total
                    </span>

                    <p className="text-2xl font-bold text-accent">
                      LKR {orderTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

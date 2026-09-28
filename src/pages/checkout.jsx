import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Store customer name
  const [name, setName] = useState("");

  // Store shipping address
  const [address, setAddress] = useState("");

  // Get cart data from previous page
  const [cart, setCart] = useState(location.state || []);

  // Calculate total price
  function getTotal() {
    let total = 0;

    cart.forEach((item) => {
      total += Number(item.price) * Number(item.quantity);
    });

    return total;
  }

  // Remove item from cart
  function removeItem(index) {
    const newCart = [...cart];

    newCart.splice(index, 1);

    setCart(newCart);
  }

  // Increase quantity
  function increaseQuantity(index) {
    const newCart = [...cart];

    newCart[index].quantity += 1;

    setCart(newCart);
  }

  // Decrease quantity
  function decreaseQuantity(index) {
    const newCart = [...cart];

    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    }

    setCart(newCart);
  }

  // Place order
  async function purchaseCart() {
    // Get login token
    const token = localStorage.getItem("token");

    // Check whether user is logged in
    if (token == null) {
      toast.error("Please login to place an order");

      navigate("/login");

      return;
    }

    // Check whether cart is empty
    if (cart.length === 0) {
      toast.error("Your cart is empty");

      return;
    }

    // Check shipping address
    if (address.trim() === "") {
      toast.error("Please enter your shipping address");

      return;
    }

    try {
      const items = [];

      // Create order items
      for (let i = 0; i < cart.length; i++) {
        items.push({
          productID: cart[i].productID,

          quantity: cart[i].quantity,

          // Use selected colour if available.
          // Temporarily use Pink if colour is not available.
          colour: cart[i].colour || "Pink",
        });
      }

      // Send order to backend
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,

          customerName: name.trim() === "" ? null : name,

          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Show success message
      toast.success("Order placed successfully");

      // Clear cart
      setCart([]);
    } catch (error) {
      console.error("Order error:", error);

      // Handle 400 errors
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Invalid order details");
      } else {
        toast.error("Failed to place order");
      }
    }
  }

  return (
    <div
      className="
        w-full
        lg:h-[calc(100vh-100px)]
        overflow-y-scroll
        bg-primary
        flex
        flex-col
        pt-[25px]
        items-center
      "
    >
      <div
        className="
          w-[400px]
          lg:w-[600px]
          flex
          flex-col
          gap-4
        "
      >
        {/* ============================= */}
        {/* CART ITEMS */}
        {/* ============================= */}

        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="
                w-full
                h-[300px]
                lg:h-[120px]
                bg-white
                flex
                flex-col
                lg:flex-row
                relative
                items-center
                p-3
                lg:p-0
              "
            >
              {/* DELETE BUTTON */}

              <button
                type="button"
                className="
                  absolute
                  text-red-500
                  right-[-40px]
                  text-2xl
                  rounded-full
                  aspect-square
                  hover:bg-red-500
                  hover:text-white
                  p-[5px]
                  font-bold
                "
                onClick={() => removeItem(index)}
              >
                <BiTrash />
              </button>

              {/* PRODUCT IMAGE */}

              <img
                className="
                  h-[100px]
                  lg:h-full
                  aspect-square
                  object-cover
                "
                src={item.image}
                alt={item.name}
              />

              {/* PRODUCT INFORMATION */}

              <div
                className="
                  w-full
                  text-center
                  lg:w-[200px]
                  h-[100px]
                  lg:h-full
                  flex
                  flex-col
                  justify-center
                  pl-[5px]
                "
              >
                {/* PRODUCT NAME */}

                <h1
                  className="
                    font-semibold
                    text-lg
                    w-full
                    text-wrap
                  "
                >
                  {item.name}
                </h1>

                {/* PRODUCT ID */}

                <span
                  className="
                    text-sm
                    text-secondary
                  "
                >
                  {item.productID}
                </span>

                {/* TEMPORARY COLOUR */}

                <span
                  className="
                    text-sm
                    text-secondary
                    mt-1
                  "
                >
                  Colour: {item.colour || "Pink"}
                </span>
              </div>

              {/* QUANTITY */}

              <div
                className="
                  w-[100px]
                  h-full
                  flex
                  flex-row
                  lg:flex-col
                  justify-center
                  items-center
                "
              >
                {/* INCREASE QUANTITY */}

                <CiCircleChevUp
                  className="
                    text-3xl
                    cursor-pointer
                  "
                  onClick={() => increaseQuantity(index)}
                />

                {/* CURRENT QUANTITY */}

                <span
                  className="
                    font-semibold
                    text-4xl
                  "
                >
                  {item.quantity}
                </span>

                {/* DECREASE QUANTITY */}

                <CiCircleChevDown
                  className="
                    text-3xl
                    cursor-pointer
                  "
                  onClick={() => decreaseQuantity(index)}
                />
              </div>

              {/* PRICE */}

              <div
                className="
                  w-full
                  lg:w-[180px]
                  lg:h-full
                  items-center
                  justify-center
                  flex
                  flex-row
                  lg:flex-col
                "
              >
                {/* OLD PRICE */}

                {Number(item.labelledPrice) > Number(item.price) && (
                  <span
                    className="
                      text-secondary
                      lg:w-full
                      text-center
                      lg:text-right
                      line-through
                      text-lg
                      pr-[10px]
                      lg:mt-[20px]
                    "
                  >
                    LKR {Number(item.labelledPrice).toFixed(2)}
                  </span>
                )}

                {/* CURRENT PRICE */}

                <span
                  className="
                    font-semibold
                    text-accent
                    lg:w-full
                    text-center
                    lg:text-right
                    text-2xl
                    pr-[10px]
                    lg:mt-[5px]
                  "
                >
                  LKR {Number(item.price).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}

        {/* ============================= */}
        {/* CUSTOMER DETAILS */}
        {/* ============================= */}

        {cart.length > 0 && (
          <div
            className="
              w-full
              border
              lg:w-full
              bg-white
              flex
              flex-col
              items-center
              relative
            "
          >
            {/* NAME */}

            <div
              className="
                w-full
                flex
                justify-between
                items-center
                p-4
              "
            >
              <label
                htmlFor="name"
                className="
                  text-sm
                  text-secondary
                  mr-2
                "
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-[400px]
                  h-[50px]
                  border
                  border-secondary
                  rounded-md
                  px-3
                  text-center
                "
                placeholder="Enter your name"
              />
            </div>

            {/* SHIPPING ADDRESS */}

            <div
              className="
                w-full
                flex
                justify-between
                items-center
                p-4
              "
            >
              <label
                htmlFor="address"
                className="
                  text-sm
                  text-secondary
                  mr-2
                "
              >
                Shipping Address
              </label>

              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
                  w-[400px]
                  h-[150px]
                  border
                  border-secondary
                  rounded-md
                  px-3
                  text-center
                  resize-none
                "
                placeholder="Enter your shipping address"
              />
            </div>
          </div>
        )}

        {/* ============================= */}
        {/* TOTAL AND ORDER BUTTON */}
        {/* ============================= */}

        {cart.length > 0 && (
          <div
            className="
              w-full
              lg:w-full
              h-[120px]
              bg-white
              flex
              flex-col-reverse
              lg:flex-row
              justify-end
              items-center
              relative
            "
          >
            {/* ORDER BUTTON */}

            <button
              type="button"
              onClick={purchaseCart}
              className="
                lg:absolute
                left-0
                bg-accent
                text-white
                px-6
                py-3
                lg:ml-[20px]
                hover:bg-accent/80
              "
            >
              Order
            </button>

            {/* TOTAL */}

            <div
              className="
                h-[50px]
                flex
                items-center
              "
            >
              <span
                className="
                  font-semibold
                  text-accent
                  w-full
                  text-right
                  text-2xl
                  pr-[10px]
                  mt-[5px]
                "
              >
                Total: LKR {getTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

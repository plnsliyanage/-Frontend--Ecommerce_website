import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 lg:h-[450px] bg-[#F3E8D8] rounded-3xl flex items-center justify-center text-[#6D4C41]">
        No Image Available
      </div>
    );
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4">
      <div className="w-full h-80 lg:h-[420px] rounded-3xl overflow-hidden bg-[#F3E8D8] border border-[#EAD7C2] shadow-md">
        <img
          src={images[currentIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 h-16 rounded-2xl overflow-hidden border-2 ${
                index === currentIndex
                  ? "border-[#5D4037] scale-105"
                  : "border-[#EAD7C2] opacity-70"
              }`}
            >
              <img
                src={img}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductOverview() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + id)
      .then((res) => {
        setProduct(res.data);

        // Automatically select first colour if available
        if (res.data.colors?.length > 0) {
          setSelectedColor(res.data.colors[0]);
        }

        setStatus("success");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, [id]);

  function addToCart() {
    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Please select a colour");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(
      (item) =>
        item.productID === product.productID && item.color === selectedColor,
    );

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productID: product.productID,
        name: product.name,
        price: product.price,
        labelledPrice: product.labelledPrice,
        image: product.images?.[0] || "",
        color: selectedColor,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added to cart successfully!");
  }

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#FAF6EE] text-[#3E2723] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Loading */}
      {status === "loading" && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      )}

      {/* Product */}
      {status === "success" && product && (
        <div className="max-w-6xl w-full bg-[#FFF9F0] rounded-3xl border border-[#EAD7C2] shadow-lg overflow-hidden flex flex-col lg:flex-row p-6 lg:p-12 gap-8 lg:gap-12">
          {/* Images */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              {/* ID & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-3 py-1 bg-[#EAD7C2]/60 text-[#5D4037] rounded-full">
                  ID: {product.productID}
                </span>

                <span className="text-xs font-semibold px-3 py-1 bg-[#5D4037] text-[#FFF9F0] rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#3E2723] mb-2">
                {product.name}
              </h1>

              {/* Alternative Names */}
              {product.altNames?.length > 0 && (
                <p className="text-sm text-[#6D4C41] italic mb-4">
                  Also known as: {product.altNames.join(" | ")}
                </p>
              )}

              {/* Price */}
              <div className="my-4 pt-4 border-t border-[#EAD7C2]">
                {product.labelledPrice > product.price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[#6D4C41] line-through">
                      LKR {Number(product.labelledPrice).toLocaleString()}
                    </span>

                    <span className="text-2xl font-bold text-[#5D4037]">
                      LKR {Number(product.price).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-[#5D4037]">
                    LKR {Number(product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#6D4C41] text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Colour Selection */}
              {product.colors?.length > 0 && (
                <div className="border-t border-[#EAD7C2] pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[#3E2723]">
                      Select Colour
                    </h3>

                    <span className="text-sm text-[#6D4C41]">
                      {selectedColor || "Choose a colour"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        title={color}
                        className={`
                          flex items-center gap-2
                          px-3 py-2
                          rounded-full
                          border-2
                          transition-all
                          ${
                            selectedColor === color
                              ? "border-[#5D4037] bg-[#EAD7C2]/50 scale-105"
                              : "border-[#EAD7C2] bg-white hover:border-[#8D6E63]"
                          }
                        `}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />

                        <span className="text-xs font-medium text-[#5D4037]">
                          {color}
                        </span>

                        {selectedColor === color && (
                          <span className="text-[#5D4037] font-bold">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-[#EAD7C2]">
              <button
                onClick={addToCart}
                className="flex-1 py-3 px-6 bg-[#5D4037] text-[#FFF9F0] font-semibold rounded-xl shadow-md hover:bg-[#4E342E] transition"
              >
                Add to Cart
              </button>

              <Link
                to="/checkout"
                state={[
                  {
                    image: product.images?.[0] || "",
                    productID: product.productID,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    color: selectedColor,
                    quantity: 1,
                  },
                ]}
                onClick={(e) => {
                  if (product.colors?.length > 0 && !selectedColor) {
                    e.preventDefault();
                    toast.error("Please select a colour");
                  }
                }}
                className="flex-1 py-3 px-6 border-2 border-[#5D4037] text-[#5D4037] font-semibold rounded-xl hover:bg-[#5D4037] hover:text-[#FFF9F0] transition text-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="text-center py-20">
          <h1 className="text-xl font-bold text-red-600 mb-2">
            Failed to load product details
          </h1>

          <p className="text-[#6D4C41]">
            Please check your connection or return to the products.
          </p>

          <Link
            to="/products"
            className="inline-block mt-4 px-6 py-2 bg-[#5D4037] text-[#FFF9F0] rounded-xl text-sm"
          >
            Back to Products
          </Link>
        </div>
      )}
    </div>
  );
}

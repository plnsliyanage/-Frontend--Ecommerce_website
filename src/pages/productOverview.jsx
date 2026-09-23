import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";

// Sample fallback product overview data matching your exact categories and theme
const sampleProductsData = {
  "LNL-001": {
    productID: "LNL-001",
    name: "Cozy Daisy Granny Square Cardigan",
    altNames: ["Handmade Floral Cardigan", "Crochet Sweater"],
    description:
      "Handcrafted with premium milk cotton yarn featuring vibrant daisy granny squares. Perfect for chilly evenings, offering a timeless aesthetic and maximum comfort.",
    category: "Women",
    price: 8500,
    labelledPrice: 10500,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    ],
  },
  "LNL-002": {
    productID: "LNL-002",
    name: "Pastel Dream Crochet Top",
    altNames: ["Summer Halter", "Lace Beach Top"],
    description:
      "A lightweight, breathable lace-stitch halter top designed for summer outings and beach days. Made with soft bamboo-cotton yarn.",
    category: "Women",
    price: 4500,
    labelledPrice: 5500,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    ],
  },
  "LNL-003": {
    productID: "LNL-003",
    name: "Sunflower Amigurumi Plushie",
    altNames: ["Happy Flower Toy", "Plush Doll"],
    description:
      "Adorable handmade plush toy crafted with soft velvet yarn. Brings instant warmth and happiness to any room or nursery.",
    category: "Toys",
    price: 2800,
    labelledPrice: 3500,
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800",
    ],
  },
  "LNL-004": {
    productID: "LNL-004",
    name: "Boho Fringe Crossbody Bag",
    altNames: ["Macrame Purse", "Yarn Tassel Bag"],
    description:
      "Sturdy macrame-style crochet bag complete with cute tassel details and secure magnetic button closure.",
    category: "Accessories",
    price: 3600,
    labelledPrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
    ],
  },
  "LNL-005": {
    productID: "LNL-005",
    name: "Baby Bear Ear Bonnet & Booties Set",
    altNames: ["Newborn Knit Set", "Infant Gift Package"],
    description:
      "Incredibly soft baby wool bonnet featuring adorable bear ears paired with matching snug booties. Gentle on newborn skin.",
    category: "Baby",
    price: 3900,
    labelledPrice: 4800,
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=800",
    ],
  },
};

// Simple image slider sub-component for the overview page
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
          alt="Product view"
          className="w-full h-full object-cover transition duration-300"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition ${
                idx === currentIndex
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
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Attempt backend fetch, fallback to sample data if offline/development
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        // Fallback to sample data matching the requested ID or default to LNL-001
        const found =
          sampleProductsData[params.id] || sampleProductsData["LNL-001"];
        if (found) {
          setProduct(found);
          setStatus("success");
        } else {
          toast.error("Failed to fetch product details");
          setStatus("error");
        }
      });
  }, [params.id]);

  const addToCart = (prod, qty) => {
    // Cart logic placeholder or localStorage implementation
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex(
      (item) => item.productID === prod.productID,
    );
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += qty;
    } else {
      existingCart.push({
        productID: prod.productID,
        name: prod.name,
        price: prod.price,
        labelledPrice: prod.labelledPrice,
        image: prod.images?.[0] || "",
        quantity: qty,
      });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#FAF6EE] text-[#3E2723] py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {status === "loading" && (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      )}

      {status === "success" && product && (
        <div className="max-w-6xl w-full bg-[#FFF9F0] rounded-3xl border border-[#EAD7C2] shadow-lg overflow-hidden flex flex-col lg:flex-row p-6 lg:p-12 gap-8 lg:gap-12">
          {/* Left Column: Image Slider */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Right Column: Details & Actions */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              {/* Product ID & Category */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-3 py-1 bg-[#EAD7C2]/60 text-[#5D4037] rounded-full">
                  ID: {product.productID}
                </span>
                <span className="text-xs font-semibold px-3 py-1 bg-[#5D4037] text-[#FFF9F0] rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Title & Alt Names */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#3E2723] mb-2">
                {product.name}
              </h1>
              {product.altNames && product.altNames.length > 0 && (
                <p className="text-sm text-[#6D4C41] italic mb-4">
                  Also known as: {product.altNames.join(" | ")}
                </p>
              )}

              {/* Price Tag */}
              <div className="my-4 pt-4 border-t border-[#EAD7C2]">
                {product.labelledPrice &&
                product.labelledPrice > product.price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-base text-[#6D4C41] font-medium line-through">
                      LKR {product.labelledPrice.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-[#5D4037]">
                      LKR {product.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-[#5D4037]">
                    LKR {product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#6D4C41] text-sm sm:text-base leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#EAD7C2]">
              <button
                className="flex-1 py-3 px-6 bg-[#5D4037] text-[#FFF9F0] font-semibold rounded-xl shadow-md hover:bg-[#4E342E] transition text-center"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart successfully!");
                }}
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
                    quantity: 1,
                  },
                ]}
                className="flex-1 py-3 px-6 border-2 border-[#5D4037] text-[#5D4037] font-semibold rounded-xl hover:bg-[#5D4037] hover:text-[#FFF9F0] transition text-center flex items-center justify-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="text-center py-20">
          <h1 className="text-xl font-bold text-red-600 mb-2">
            Failed to load product details
          </h1>
          <p className="text-[#6D4C41]">
            Please check your connection or return to the product catalog.
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

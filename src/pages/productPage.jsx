import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Simple local fallback sample data matching the exact categories
const fallbackProducts = [
  {
    productID: 1,
    name: "Cozy Daisy Granny Square Cardigan",
    price: 8500,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    description:
      "Handcrafted with premium milk cotton yarn featuring vibrant daisy granny squares. Perfect for chilly evenings.",
  },
  {
    productID: 2,
    name: "Pastel Dream Crochet Top",
    price: 4500,
    category: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800",
    description:
      "A lightweight, breathable lace-stitch halter top designed for summer outings and beach days.",
  },
  {
    productID: 3,
    name: "Sunflower Amigurumi Plushie",
    price: 2800,
    category: "Toys",
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800",
    description:
      "Adorable handmade plush toy crafted with soft velvet yarn. Brings warmth and happiness to any room.",
  },
  {
    productID: 4,
    name: "Boho Fringe Crossbody Bag",
    price: 3600,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    description:
      "Sturdy macrame-style crochet bag complete with cute tassel details and secure magnetic button closure.",
  },
  {
    productID: 5,
    name: "Tiny Tots Organic Booties & Bonnet Set",
    price: 3400,
    category: "Baby",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    description:
      "Supersoft, skin-friendly cotton crochet booties and bonnet set designed for comfort for little ones.",
  },
  {
    productID: 6,
    name: "Curated Warmth Gift Bundle",
    price: 6500,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    description:
      "A beautifully packaged gift box featuring a handmade pastel beanie, mini amigurumi keychain, and scented candle.",
  },
];

const categories = [
  "All",
  "Women",
  "Baby",
  "Accessories",
  "Toys",
  "Gifts",
  "New Arrivals",
];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (isLoading) {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        // Fallback directly if VITE_API_URL is not set in development
        setTimeout(() => {
          setProducts(fallbackProducts);
          setIsLoading(false);
        }, 500);
        return;
      }

      axios
        .get(apiUrl + "/api/products")
        .then((response) => {
          setProducts(
            response.data && response.data.length > 0
              ? response.data
              : fallbackProducts,
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products, using fallback data:", error);
          setProducts(fallbackProducts);
          setIsLoading(false);
          toast.error(
            "Failed to load products from server. Showing local collection.",
          );
        });
    }
  }, [isLoading]);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (item) =>
            item.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#FAF6EE] py-10 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Catalog Title Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-2">
              Our Crochet Collection
            </h1>
            <p className="text-[#6D4C41] text-sm sm:text-base">
              Explore our handmade cardigans, plushies, and cozy yarn treasures.
            </p>
            <div className="w-16 h-1 bg-[#D7C3A8] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#5D4037] text-[#FFF9F0] shadow-sm"
                    : "bg-[#FFF9F0] text-[#6D4C41] border border-[#EAD7C2] hover:bg-[#EAD7C2]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid Layout */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#FFF9F0] rounded-3xl border border-[#EAD7C2] max-w-xl mx-auto">
              <span className="text-4xl block mb-2">🧶</span>
              <h3 className="text-lg font-semibold text-[#3E2723]">
                No items found in this category
              </h3>
              <p className="text-sm text-[#6D4C41] mt-1">
                Try selecting another category or view all.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => {
                return (
                  <div
                    key={item.productID || item.id}
                    className="bg-[#FFF9F0] rounded-3xl overflow-hidden border border-[#EAD7C2] shadow-sm hover:shadow-lg transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-60 w-full overflow-hidden relative bg-[#F3E8D8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#5D4037] text-[#FFF9F0] text-xs px-3 py-1 rounded-full font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-[#3E2723] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[#6D4C41] text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EAD7C2]/60 mt-auto">
                      <span className="text-lg font-bold text-[#5D4037]">
                        LKR {Number(item.price).toLocaleString()}
                      </span>
                      <a
                        href={`#/overview/${item.productID || item.id}`}
                        className="px-4 py-2 bg-[#5D4037] text-[#FFF9F0] text-sm font-medium rounded-xl hover:bg-[#4E342E] transition"
                      >
                        View Item
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

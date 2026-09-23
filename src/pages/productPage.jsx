import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-[#FAF6EE] py-10 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader />
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

          {/* Products Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => {
              return <ProductCard key={item.productID} product={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

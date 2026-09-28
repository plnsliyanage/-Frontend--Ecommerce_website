import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Women",
  "Baby",
  "Accessories",
  "Toys",
  "Gift",
  "New Arrival",
];

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  function getImage(product) {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }

    return product.image || "https://via.placeholder.com/600x700?text=Crochet";
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#EAD7C2]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8D6E63] font-semibold mb-4">
            Handmade With Love
          </p>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#3E2723]">
            Our Crochet Collection
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-[#6D4C41] leading-7">
            Discover beautiful handmade crochet pieces, carefully crafted stitch
            by stitch to bring warmth, comfort and charm to your life.
          </p>

          <div className="w-20 h-1 bg-[#8D6E63] rounded-full mx-auto mt-7" />
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#FFF9F0]/40" />
        <div className="absolute -bottom-16 -right-10 w-40 h-40 rounded-full bg-[#FFF9F0]/40" />
      </section>

      {/* Category Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-6 py-3 rounded-full text-sm font-medium
                transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-[#5D4037] text-white shadow-lg scale-105"
                    : "bg-white text-[#6D4C41] border border-[#E5D5C3] hover:bg-[#EAD7C2]"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category title */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A1887F] font-semibold">
              Explore
            </p>

            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#3E2723] mt-1">
              {selectedCategory === "All" ? "All Creations" : selectedCategory}
            </h2>
          </div>

          {!loading && (
            <p className="text-sm text-[#8D6E63]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#EAD7C2] border-t-[#5D4037] animate-spin" />

            <p className="mt-4 text-sm text-[#6D4C41]">
              Loading our handmade collection...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Empty */
          <div className="bg-white rounded-3xl border border-[#EAD7C2] py-20 text-center">
            <div className="text-6xl mb-5">🧶</div>

            <h3 className="text-xl font-semibold text-[#3E2723]">
              No products found
            </h3>

            <p className="text-sm text-[#8D6E63] mt-2">
              There are no products in this category yet.
            </p>

            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-6 px-6 py-3 rounded-full bg-[#5D4037] text-white text-sm font-medium hover:bg-[#4E342E] transition"
            >
              View All Products
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredProducts.map((product) => {
              const image = getImage(product);

              return (
                <div
                  key={product.productID}
                  className="
                    group bg-white rounded-3xl overflow-hidden
                    border border-[#EAD7C2]
                    shadow-sm hover:shadow-xl
                    transition-all duration-300
                  "
                >
                  {/* Image */}
                  <div className="relative h-[320px] overflow-hidden bg-[#F3E8D8]">
                    <img
                      src={image}
                      alt={product.name}
                      className="
                        w-full h-full object-cover
                        group-hover:scale-105
                        transition-transform duration-700
                      "
                    />

                    {/* Category */}
                    <span
                      className="
                        absolute top-4 left-4
                        bg-white/90 backdrop-blur-sm
                        text-[#5D4037]
                        px-3 py-1.5
                        rounded-full
                        text-xs font-semibold
                        shadow-sm
                      "
                    >
                      {product.category}
                    </span>

                    {/* New Arrival badge */}
                    {product.category?.toLowerCase() === "new arrival" && (
                      <span
                        className="
                          absolute top-4 right-4
                          bg-[#5D4037] text-white
                          px-3 py-1.5 rounded-full
                          text-xs font-semibold
                        "
                      >
                        New
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3
                      className="
                        text-lg font-semibold
                        text-[#3E2723]
                        line-clamp-1
                        group-hover:text-[#795548]
                        transition
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                        text-sm text-[#8D6E63]
                        mt-2 line-clamp-2
                        min-h-[40px]
                        leading-5
                      "
                    >
                      {product.description}
                    </p>

                    {/* Colours */}
                    {product.colors?.length > 0 && (
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-[#A1887F]">Colours:</span>

                        <div className="flex gap-1">
                          {product.colors.slice(0, 5).map((color) => (
                            <span
                              key={color}
                              title={color}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: color,
                              }}
                            />
                          ))}

                          {product.colors.length > 5 && (
                            <span className="text-xs text-[#8D6E63] ml-1">
                              +{product.colors.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bottom */}
                    <div
                      className="
                        flex items-center justify-between
                        mt-5 pt-4
                        border-t border-[#EAD7C2]
                      "
                    >
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#A1887F]">
                          Price
                        </p>

                        <p className="text-xl font-bold text-[#5D4037]">
                          LKR {Number(product.price).toLocaleString()}
                        </p>
                      </div>

                      <Link
                        to={`/overview/${product.productID}`}
                        className="
                          px-4 py-2.5
                          rounded-xl
                          bg-[#5D4037]
                          text-white
                          text-sm font-semibold
                          hover:bg-[#4E342E]
                          transition
                        "
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

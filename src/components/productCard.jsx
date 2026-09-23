import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  // Fallback image in case product.images is empty or undefined
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/300?text=No+Image";

  return (
    <div className="bg-[#FFF9F0] rounded-3xl overflow-hidden border border-[#EAD7C2] shadow-sm hover:shadow-lg transition group flex flex-col w-full max-w-[320px] mx-auto">
      {/* Image & Category Badge Container */}
      <div className="h-64 w-full overflow-hidden relative bg-[#F3E8D8]">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          src={displayImage}
          alt={product.name}
        />
        <span className="absolute top-3 left-3 bg-[#5D4037] text-[#FFF9F0] text-xs px-3 py-1 rounded-full font-medium shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Content Details Container */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#3E2723] mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#6D4C41]/70 mb-3">
            ID: {product.productID}
          </p>
        </div>

        {/* Pricing & Button Section */}
        <div className="pt-3 border-t border-[#EAD7C2] flex items-center justify-between">
          <div>
            {product.labelledPrice && product.labelledPrice > product.price ? (
              <div className="flex flex-col">
                <span className="text-xs text-[#6D4C41] line-through">
                  LKR {product.labelledPrice.toLocaleString()}
                </span>
                <span className="text-base font-bold text-[#5D4037]">
                  LKR {product.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-base font-bold text-[#5D4037]">
                LKR {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            to={"/overview/" + product.productID}
            className="px-4 py-2 bg-[#5D4037] text-[#FFF9F0] text-sm font-medium rounded-xl hover:bg-[#4E342E] transition shadow-sm"
          >
            View Item
          </Link>
        </div>
      </div>
    </div>
  );
}

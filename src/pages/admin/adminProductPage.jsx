import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader.jsx";
import toast from "react-hot-toast";

// Sample mock products data matching your crochet store theme
const sampleProducts = [
  {
    productID: "PRD-001",
    name: "Cozy Daisy Granny Square Cardigan",
    price: 8500.0,
    labelledPrice: 10000.0,
    stock: 12,
    category: "Women",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    productID: "PRD-002",
    name: "Sunflower Amigurumi Plushie",
    price: 2800.0,
    labelledPrice: 3500.0,
    stock: 25,
    category: "Toys",
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    productID: "PRD-003",
    name: "Boho Fringe Crossbody Bag",
    price: 3600.0,
    labelledPrice: 4200.0,
    stock: 8,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    productID: "PRD-004",
    name: "Pastel Dream Crochet Top",
    price: 4500.0,
    labelledPrice: 5500.0,
    stock: 4,
    category: "New Arrivals",
    images: [
      "https://images.unsplash.com/photo-1534961895780-8443ae7c98c0?auto=format&fit=crop&w=300&q=80",
    ],
  },
  {
    productID: "PRD-005",
    name: "Curated Warmth Gift Bundle",
    price: 6500.0,
    labelledPrice: 7500.0,
    stock: 15,
    category: "Gifts",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80",
    ],
  },
];

function ProductDeleteConfirm(props) {
  const productID = props.productID;
  const close = props.close;
  const refresh = props.refresh;

  function deleteProduct() {
    const token = localStorage.getItem("token");

    // If testing without a backend, you can uncomment this block later:
    /*
        axios
            .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                close();
                toast.success("Product deleted successfully");
                refresh();
            }).catch(() => {
                toast.error("Failed to delete product");
            });
        */

    // Mock deletion for sample data testing:
    toast.success(`Product ${productID} deleted successfully`);
    refresh(productID);
    close();
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center font-sans">
      <div className="w-[450px] bg-[#FFF9F0] border border-[#EAD7C2] p-8 rounded-3xl shadow-xl relative flex flex-col justify-center items-center gap-6">
        <button
          onClick={close}
          className="absolute right-4 top-4 w-8 h-8 bg-[#5D4037] text-[#FFF9F0] rounded-full flex justify-center items-center font-bold hover:bg-[#3E2723] transition"
        >
          ✕
        </button>
        <div className="text-center">
          <span className="text-3xl">⚠️</span>
          <p className="text-lg font-bold text-[#3E2723] mt-2">
            Confirm Deletion
          </p>
          <p className="text-sm text-[#6D4C41] mt-1">
            Are you sure you want to delete product ID:{" "}
            <span className="font-mono font-bold text-[#5D4037]">
              {productID}
            </span>
            ?
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <button
            onClick={close}
            className="flex-1 bg-[#EAD7C2]/60 py-2.5 rounded-xl font-semibold text-[#3E2723] hover:bg-[#EAD7C2] transition"
          >
            Cancel
          </button>
          <button
            onClick={deleteProduct}
            className="flex-1 bg-rose-600 py-2.5 rounded-xl font-semibold text-white hover:bg-rose-700 transition shadow-xs"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductPage() {
  // Initialized with sampleProducts for instant preview
  const [products, setProducts] = useState(sampleProducts);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /* 
      Uncomment when connecting to your live backend:
      useEffect(() => {
          if (isLoading) {
              axios
                  .get(import.meta.env.VITE_API_URL + "/api/products")
                  .then((response) => {
                      setProducts(response.data);
                      setIsLoading(false);
                  });
          }
      }, [isLoading]);
    */

  const handleRefreshAfterDelete = (deletedID) => {
    setProducts(products.filter((p) => p.productID !== deletedID));
  };

  return (
    <div className="w-full min-h-full font-sans pb-20">
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          refresh={handleRefreshAfterDelete}
          productID={productToDelete}
          close={() => {
            setIsDeleteConfirmVisible(false);
          }}
        />
      )}

      {/* Floating Add Product Button */}
      <Link
        to="/admin/add-product"
        className="fixed right-8 bottom-8 z-30 bg-[#5D4037] text-[#FFF9F0] p-4 rounded-full shadow-lg hover:bg-[#3E2723] transition flex items-center justify-center text-3xl"
        title="Add New Product"
      >
        <IoMdAddCircleOutline />
      </Link>

      {/* Page Card Container */}
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-[#EAD7C2] bg-[#FFF9F0] shadow-sm overflow-hidden">
          {/* Header bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EAD7C2] px-8 py-6 bg-[#FAF6EE]">
            <div>
              <h1 className="text-2xl font-bold text-[#3E2723] tracking-tight">
                Products Management 🧶
              </h1>
              <p className="text-xs sm:text-sm text-[#6D4C41] mt-1">
                Manage your catalog items, track stock levels, and update
                pricing.
              </p>
            </div>
            <span className="rounded-full bg-[#5D4037] text-[#FFF9F0] px-4 py-2 text-xs font-semibold shadow-xs">
              {products.length} Active Items
            </span>
          </div>

          {/* Table wrapper */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-24 flex justify-center">
                <Loader />
              </div>
            ) : (
              <table className="w-full min-w-[950px] text-left border-collapse">
                <thead className="bg-[#5D4037] text-[#FFF9F0]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Product ID
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Labeled Price
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAD7C2]/60">
                  {products.map((item) => {
                    return (
                      <tr
                        key={item.productID}
                        className="bg-[#FFF9F0] hover:bg-[#FAF6EE] transition-colors"
                      >
                        <td className="px-6 py-3">
                          <img
                            src={item.images?.[0] || "/placeholder.png"}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-xl border border-[#EAD7C2] shadow-2xs"
                          />
                        </td>
                        <td className="px-6 py-3 font-mono text-xs font-bold text-[#5D4037]">
                          {item.productID}
                        </td>
                        <td className="px-6 py-3 font-semibold text-[#3E2723]">
                          {item.name}
                        </td>
                        <td className="px-6 py-3 font-bold text-[#5D4037]">
                          LKR{" "}
                          {Number(item.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-6 py-3 text-sm text-[#6D4C41] line-through">
                          LKR{" "}
                          {Number(item.labelledPrice).toLocaleString(
                            undefined,
                            { minimumFractionDigits: 2 },
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                              item.stock > 5
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.stock} left
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-[#6D4C41]">
                          {item.category}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <div className="flex flex-row gap-4 justify-center items-center text-lg text-[#5D4037]">
                            <button
                              title="Delete Product"
                              className="p-2 hover:bg-rose-100 hover:text-rose-700 rounded-xl transition"
                              onClick={() => {
                                setProductToDelete(item.productID);
                                setIsDeleteConfirmVisible(true);
                              }}
                            >
                              <FaRegTrashCan />
                            </button>
                            <button
                              title="Edit Product"
                              className="p-2 hover:bg-[#EAD7C2] rounded-xl transition"
                              onClick={() => {
                                navigate("/admin/update-product", {
                                  state: item,
                                });
                              }}
                            >
                              <BiSolidEdit />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td
                        className="px-6 py-20 text-center text-[#6D4C41]"
                        colSpan={8}
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-4xl">🧶</span>
                          <p className="text-base font-semibold text-[#3E2723]">
                            No products found
                          </p>
                          <p className="text-xs text-[#6D4C41]">
                            Click the add button in the corner to create a new
                            crochet item.
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

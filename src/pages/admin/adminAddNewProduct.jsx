import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [category, setCategory] = useState("women");
  const [stock, setStock] = useState(0);

  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate();

  const categories = [
    "Women",
    "Baby",
    "Accessories",
    "Toys",
    "Gift",
    "New Arrival",
  ];

  const colorOptions = [
    "Black",
    "White",
    "Red",
    "Pink",
    "Baby Pink",
    "Rose Pink",
    "Blue",
    "Light Blue",
    "Navy Blue",
    "Green",
    "Sage Green",
    "Mint Green",
    "Yellow",
    "Orange",
    "Purple",
    "Lavender",
    "Brown",
    "Beige",
    "Cream",
    "Grey",
    "Maroon",
  ];

  function addColor() {
    if (!selectedColor) {
      toast.error("Please select a colour");
      return;
    }

    if (colors.includes(selectedColor)) {
      toast.error("This colour is already added");
      return;
    }

    setColors([...colors, selectedColor]);
    setSelectedColor("");
  }

  function removeColor(color) {
    setColors(colors.filter((c) => c !== color));
  }

  async function addProduct() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (colors.length === 0) {
      toast.error("Please select at least one available colour");
      return;
    }

    try {
      const urls = await Promise.all(
        Array.from(images).map((image) => mediaUpload(image)),
      );

      const product = {
        productID: productId,
        name,
        altNames: altNames.split(","),
        description,
        images: urls,
        colors,
        price,
        labelledPrice,
        category,
        stock,
      };

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }

  return (
    <div className="min-h-screen w-full bg-primary/70 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-2xl border border-accent/30 bg-white shadow-xl">
        {/* Header */}
        <div className="border-b border-accent/20 px-6 py-5">
          <h1 className="text-xl font-semibold text-secondary">Add Product</h1>
          <p className="text-sm text-secondary/70">Create a new product.</p>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Product ID */}
            <label>
              <span className="text-sm font-medium text-secondary">
                Product ID
              </span>
              <input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="e.g. PR-001"
                className="input"
              />
            </label>

            {/* Name */}
            <label>
              <span className="text-sm font-medium text-secondary">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product name"
                className="input"
              />
            </label>

            {/* Alternative Names */}
            <label className="md:col-span-2">
              <span className="text-sm font-medium text-secondary">
                Alternative Names
              </span>
              <input
                value={altNames}
                onChange={(e) => setAltNames(e.target.value)}
                placeholder="Comma-separated names"
                className="input"
              />
            </label>

            {/* Description */}
            <label className="md:col-span-2">
              <span className="text-sm font-medium text-secondary">
                Description
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                className="input min-h-[100px] py-2"
              />
            </label>

            {/* Images */}
            <label className="md:col-span-2">
              <span className="text-sm font-medium text-secondary">Images</span>
              <input
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="block w-full mt-1 rounded-xl border border-secondary/20"
              />
            </label>

            {/* Price */}
            <label>
              <span className="text-sm font-medium text-secondary">Price</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="input"
              />
            </label>

            {/* Labelled Price */}
            <label>
              <span className="text-sm font-medium text-secondary">
                Labelled Price
              </span>
              <input
                type="number"
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(e.target.value)}
                placeholder="MRP"
                className="input"
              />
            </label>

            {/* Category */}
            <label>
              <span className="text-sm font-medium text-secondary">
                Category
              </span>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input"
              >
                {categories.map((item) => (
                  <option key={item} value={item.toLowerCase()}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {/* Stock */}
            <label>
              <span className="text-sm font-medium text-secondary">Stock</span>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
                className="input"
              />
            </label>

            {/* Colours */}
            <div className="md:col-span-2">
              <span className="text-sm font-medium text-secondary">
                Available Colours
              </span>

              <div className="flex gap-2 mt-1">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="input flex-1"
                >
                  <option value="">Select a colour</option>

                  {colorOptions.map((color) => (
                    <option key={color}>{color}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={addColor}
                  className="h-11 px-5 rounded-xl bg-accent/15 text-secondary"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="flex items-center gap-2 rounded-full bg-accent/10 px-3 py-2 text-sm"
                  >
                    <span
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color }}
                    />

                    {color}

                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-accent/20 px-6 py-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-full bg-red-100 px-6 h-10 text-secondary"
          >
            Cancel
          </button>

          <button
            onClick={addProduct}
            className="rounded-full bg-accent/15 px-6 h-10 text-secondary"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Reusable input styling */}
      <style>{`
        .input {
          width: 100%;
          height: 44px;
          margin-top: 6px;
          padding: 0 12px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 12px;
          outline: none;
          color: #333;
        }

        .input:focus {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
}

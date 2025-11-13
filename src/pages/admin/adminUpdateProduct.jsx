import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import mediaUpload from "../../utils/mediaUpload"
import toast from "react-hot-toast"
import axios from "axios"

export default function UpdateProductPage() {
    const location = useLocation();

    const [productId, setProductId] = useState(location.state?.productID || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altNames, setAltNames] = useState(
        location.state?.altNames ? location.state.altNames.join(",") : ""
    );
    const [description, setDescription] = useState(location.state?.description || "");
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || "");
    const [category, setCategory] = useState(location.state?.category || "");
    const [stock, setStock] = useState(location.state?.stock || "");

    const navigate = useNavigate();

    async function updateProduct() {
        const token = localStorage.getItem("token");
        if (token == null) {
            navigate("/login");
            return;
        }

        const promises = [];
        for (let i = 0; i < images.length; i++) {
            promises[i] = mediaUpload(images[i]);
        }

        try {
            let urls = await Promise.all(promises);

            if (urls.length == 0) {
                urls = location.state.images
            }
            const alternativeNames = altNames.split(",");

            const product = {
                productID: productId,
                name: name,
                altNames: alternativeNames,
                description: description,
                images: urls,
                price: price,
                labelledPrice: labelledPrice,
                category: category,
                stock: stock
            };

            // ✅ Changed POST → PUT for update
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/products/${productId}`,
                product,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            toast.success("Product Updated successfully");
            navigate("/admin/products");

        } catch {
            toast.error("An error occurred");
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-primary/40 p-6">
            <div className="w-full max-w-lg bg-primary text-secondary shadow-lg rounded-2xl border border-accent p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-accent text-center mb-2">
                    Update New Product
                </h2>

                <input
                    disabled
                    className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                    placeholder="Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                />

                <input
                    className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                    placeholder="Alternate Names (comma separated)"
                    value={altNames}
                    onChange={(e) => setAltNames(e.target.value)}
                />

                <textarea
                    className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80 h-24 resize-none"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="file"
                    multiple
                    className="border border-secondary/40 rounded-lg p-2 bg-primary/60 text-secondary"
                    onChange={(e) => setImages([...e.target.files])}
                />

                <div className="flex gap-2">
                    <div className="w-1/2 flex flex-col">
                        <label className="text-secondary font-medium mb-1">Price</label>
                        <input
                            type="number"
                            className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <label className="text-secondary font-medium mb-1">Labelled Price</label>
                        <input
                            type="number"
                            className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                            placeholder="Labelled Price"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="w-1/2 flex flex-col">
                        <label className="text-secondary font-medium mb-1">Category</label>
                        <select
                            className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="cream">Cream</option>
                            <option value="lotion">Lotion</option>
                            <option value="serum">Serum</option>
                        </select>
                    </div>

                    <div className="w-1/2 flex flex-col">
                        <label className="text-secondary font-medium mb-1">Stock</label>
                        <input
                            type="number"
                            className="border border-secondary/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent bg-white/80"
                            placeholder="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-2 mt-4 justify-end">
                    <button
                        onClick={updateProduct}
                        className="w-1/4 bg-accent hover:bg-secondary text-primary rounded-lg py-2 font-semibold transition-colors"
                    >
                        Submit
                    </button>
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="w-1/4 bg-accent hover:bg-secondary text-primary rounded-lg py-2 font-semibold transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
}

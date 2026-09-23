import { useState } from "react"
import { useNavigate } from "react-router-dom"
import mediaUpload from "../../utils/mediaUpload"
import toast from "react-hot-toast"
import axios from "axios"

export default function AddProductPage() {
    const [productId, setProductId] = useState("")
    const [name, setName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [description, setDescription] = useState("") // <-- added missing state
    const [images, setImages] = useState([])
    const [price, setPrice] = useState(0)
    const [labelledPrice, setLabelledPrice] = useState(0)
    const [category, setCategory] = useState("tops")
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()


    async function addProduct() {
        const token = localStorage.getItem("token");
        if (token == null) {
            navigate("/login");
            return
        }

        const promises = []
        for (let i = 0; i < images.length; i++) {
            promises[i] = mediaUpload(images[i])
        }
        try {
            const urls = await Promise.all(promises);
            const alternativeNames = altNames.split(",")

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
            }

            await axios.post(import.meta.env.VITE_API_URL + "/api/products", product, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            toast.success("Product added successfully");
            navigate("/admin/products");

        } catch {
            toast.error("An error occurred");
        }



    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-primary/40 p-6">
            <div className="w-full max-w-lg bg-primary text-secondary shadow-lg rounded-2xl border border-accent p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-accent text-center mb-2">
                    Add New Product
                </h2>

                <input
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
                            <option value="tops">Tops</option>
                            <option value="outerwear">Outerwear</option>
                            <option value="accessories">Accessories</option>
                            <option value="dresses">Dresses</option>
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
                        onClick={addProduct}
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

    )
}

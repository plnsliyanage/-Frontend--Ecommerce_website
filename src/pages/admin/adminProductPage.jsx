import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader.jsx";
import toast from "react-hot-toast"






function ProductDeleteConfirm(props) {
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh
    function deleteProduct() {
        const token = localStorage.getItem("token");
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
            })
    }

    return (<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
        <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
            <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                X
            </button>
            <p className="text-xl font-semibold">Are you sure you want to delete the product with product ID : {productID}?</p>
            <div className="flex gap-[40px]">
                <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent">
                    Cancel
                </button>
                <button onClick={deleteProduct} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent">
                    Yes
                </button>
            </div>

        </div>
    </div>)
}


export default function AdminProductPage() {



    const [products, setProducts] = useState([]);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/products")
                .then((response) => {
                    console.log(response.data);
                    setProducts(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);



    return (
        <div className="w-full h-full p-[10px]">
            {
                isDeleteConfirmVisible && <ProductDeleteConfirm refresh={() => { setIsLoading(true) }} productID={productToDelete} close={() => { setIsDeleteConfirmVisible(false) }} />
            }
            <Link
                to="/admin/add-product"
                className="absolute right-[200px] bottom-[30px] text-5xl hover:text-accent"
            >
                <IoMdAddCircleOutline />
            </Link>


            <div className="overflow-x-auto">
                {isLoading ? <Loader /> :
                    <table className="border w-full text-center">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Labeled Price</th>
                                <th>Stock</th>

                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => {
                                return (
                                    <tr key={item.productID}>
                                        <td><img src={item.images[0]} className="w-16 h-16 object-cover" /></td>
                                        <td>{item.productID}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.labelledPrice}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <div className="flex flex-row gap-[20px] justify-center items-center">
                                                <FaRegTrashCan className="hover:text-accent" onClick={() => {
                                                    setProductToDelete(item.productID);
                                                    setIsDeleteConfirmVisible(true)
                                                }} />
                                                <BiSolidEdit className="hover:text-accent" onClick={() => {
                                                    navigate("/admin/update-product", {
                                                        state: item
                                                    })
                                                }} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>}
            </div>
        </div>
    );
}

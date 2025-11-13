import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io"
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function AdminProductPage() {
    const location = useLocation()
    console.log(location)

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
            (response) => {
                console.log(response.data);
                setProducts(response.data);
            });
    }, []);

    console.log(products);

    return (
        <div className="w-full h-full p-[10px]">
            <Link
                to="/admin/add-product"
                className="absolute right-[200px] bottom-[30px] text-5xl hover:text-accent"
            >
                <IoMdAddCircleOutline />
            </Link>

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
                                        <FaRegTrashCan className="hover:text-accent" />
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
            </table>
        </div>
    );
}

import { Routes, Route } from "react-router-dom";

export default function AdminPage() {
    return (
        <div className="W-full h-full bg-primary flex p-2">
            <div className="w-[300px] h-full bg-primary">

            </div>
            <div className="w-[calc(100%-300px)] h-full border-[2px] border-accent  rounded-2xl">
                <Routes>
                    <Route path="/" element={<h1>dash board</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />



                </Routes>

            </div>
        </div>
    )
}
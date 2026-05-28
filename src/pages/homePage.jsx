import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";

export default function HomePage() {
    return (
        <div className="w-full h-full bg-primary">
            <Header />
            <Routes>
                <Route path="/" element={<h1>welcome to the Home Page</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/contacts" element={<h1>Contact</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
                <Route path="*" element={<h1>404 Element Not Found</h1>} />
            </Routes>
        </div>
    );
}

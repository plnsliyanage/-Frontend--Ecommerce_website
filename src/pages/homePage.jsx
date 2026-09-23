import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";

import hero1 from "../assets/hero1.jfif";
import hero2 from "../assets/hero2.jfif";
import hero3 from "../assets/hero3.jfif";
import hero4 from "../assets/hero4.jfif";
import hero5 from "../assets/hero5.jfif";

import { useEffect, useState } from "react";

// Sample product data
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 2500,
    category: "Clothing",
    image: "https://via.placeholder.com/300",
    description: "A comfortable cotton T-shirt for everyday use.",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 8500,
    category: "Shoes",
    image: "https://via.placeholder.com/300",
    description: "Lightweight running shoes suitable for daily workouts.",
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 6500,
    category: "Bags",
    image: "https://via.placeholder.com/300",
    description: "A stylish and durable backpack for work and travel.",
  },
];

// Hero images
const heroImages = [hero1, hero2, hero3, hero4, hero5];

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  // Automatically change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Images */}
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Hero ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>

          <p className="text-xl mb-6">Discover products you'll love</p>

          <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-primary">
      <Header />

      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <div>
              <HeroSection />

              {/* Products preview */}
              <section className="py-12 px-6">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Our Products
                </h2>

                <p className="text-center">
                  Available Products: {products.length}
                </p>
              </section>
            </div>
          }
        />

        {/* Product page */}
        <Route path="/products" element={<ProductPage products={products} />} />

        {/* Contact page */}
        <Route path="/contacts" element={<h1>Contact</h1>} />

        {/* About page */}
        <Route path="/about" element={<h1>About</h1>} />

        {/* Product overview */}
        <Route
          path="/overview/:id"
          element={<ProductOverview products={products} />}
        />

        {/* 404 page */}
        <Route path="*" element={<h1>404 Element Not Found</h1>} />
      </Routes>
    </div>
  );
}

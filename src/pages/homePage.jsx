import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

import hero1 from "../assets/hero1.jfif";
import hero2 from "../assets/hero2.jfif";
import hero3 from "../assets/hero3.jfif";
import hero4 from "../assets/hero4.jfif";
import hero5 from "../assets/hero5.jfif";

import { useEffect, useState } from "react";

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: "Crochet Summer Top",
    price: 2500,
    category: "Tops",
    image: "https://via.placeholder.com/300",
    description: "Breathable handmade crochet top for everyday comfort.",
  },
  {
    id: 2,
    name: "Crochet Cardigan",
    price: 8500,
    category: "Outerwear",
    image: "https://via.placeholder.com/300",
    description: "Soft, warm cardigan crafted with textured yarn patterns.",
  },
  {
    id: 3,
    name: "Crochet Tote Bag",
    price: 6500,
    category: "Accessories",
    image: "https://via.placeholder.com/300",
    description: "Durable handwoven tote for market days and travel.",
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
          <h1 className="text-5xl font-bold mb-4">Welcome to Loop & Lace</h1>

          <p className="text-xl mb-6">Cozy handmade crochet clothing and accessories</p>

          <a
            href="/products"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Shop Now
          </a>
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
    <div className="w-full min-h-screen bg-primary text-secondary">
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
                  Featured Crochet Picks
                </h2>
                <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProducts.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-secondary/10 bg-white p-4 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-secondary/70">{item.description}</p>
                      <p className="mt-2 text-sm font-medium text-accent">{item.category}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          }
        />

        {/* Product page */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Contact page */}
        <Route
          path="/contacts"
          element={
            <div className="mx-auto max-w-3xl px-6 py-10">
              <h1 className="text-2xl font-semibold">Contact Us</h1>
              <p className="mt-2 text-secondary/80">
                Need sizing help or custom crochet requests? Email us at
                support@loopandlace.com.
              </p>
            </div>
          }
        />

        {/* About page */}
        <Route
          path="/about"
          element={
            <div className="mx-auto max-w-3xl px-6 py-10">
              <h1 className="text-2xl font-semibold">About Loop & Lace</h1>
              <p className="mt-2 text-secondary/80">
                We craft crochet clothing with soft yarn, timeless patterns, and
                comfortable fits for every season.
              </p>
            </div>
          }
        />

        {/* Product overview */}
        <Route
          path="/overview/:id"
          element={<ProductOverview />}
        />

        {/* 404 page */}
        <Route path="*" element={<h1>404 Element Not Found</h1>} />
      </Routes>
    </div>
  );
}

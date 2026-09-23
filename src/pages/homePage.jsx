import { Routes, Route, Link } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";

import hero1 from "../assets/hero1.jfif";
import hero2 from "../assets/hero2.jfif";
import hero3 from "../assets/hero3.jfif";
import hero4 from "../assets/hero4.jfif";
import hero5 from "../assets/hero5.jfif";

import { useEffect, useState } from "react";

// Realistic crochet and handmade knit collection sample data
const products = [
  {
    id: 1,
    name: "Cozy Daisy Granny Square Cardigan",
    price: 8500,
    category: "Cardigans",
    image: hero1,
    description:
      "Handcrafted with premium milk cotton yarn featuring vibrant daisy granny squares. Perfect for chilly evenings.",
  },
  {
    id: 2,
    name: "Pastel Dream Crochet Top",
    price: 4500,
    category: "Tops",
    image: hero2,
    description:
      "A lightweight, breathable lace-stitch halter top designed for summer outings and beach days.",
  },
  {
    id: 3,
    name: "Sunflower Amigurumi Plushie",
    price: 2800,
    category: "Plushies",
    image: hero3,
    description:
      "Adorable handmade plush toy crafted with soft velvet yarn. Brings instant warmth and happiness to any room.",
  },
  {
    id: 4,
    name: "Boho Fringe Crossbody Bag",
    price: 3600,
    category: "Bags",
    image: hero4,
    description:
      "Sturdy macrame-style crochet bag complete with cute tassel details and secure magnetic button closure.",
  },
  {
    id: 5,
    name: "Autumn Rust Bucket Hat",
    price: 3200,
    category: "Accessories",
    image: hero5,
    description:
      "Whip-stitched textured bucket hat made with rich earthy tones to elevate your everyday street style.",
  },
  {
    id: 6,
    name: "Chunky Knit Pastel Beanie",
    price: 2500,
    category: "Accessories",
    image: hero1,
    description:
      "Supersoft ribbed crochet beanie offering maximum warmth and ultimate cozy aesthetics.",
  },
];

// Hero images rotation
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
    <section className="relative w-full h-[520px] sm:h-[600px] overflow-hidden bg-[#FAF6EE]">
      {/* Hero Images Slideshow */}
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Crochet Collection ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Subtle warm overlay */}
      <div className="absolute inset-0 bg-[#3E2723]/15"></div>

      {/* Slider dots indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-[#FFF9F0] w-6" : "bg-[#FFF9F0]/60"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF6EE] text-[#3E2723] font-sans">
      <Header />

      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <div>
              <HeroSection />

              {/* Welcome Banner Quote Section */}
              <section className="py-12 px-6 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#3E2723] tracking-tight mb-3">
                  Crafted with love. Wrapped in warmth.
                </h1>
                <p className="text-[#6D4C41] text-base sm:text-lg">
                  Explore our exclusive collection of handmade crochet garments,
                  cute plushies, and timeless yarn accessories made entirely
                  stitch by stitch.
                </p>
                <div className="w-16 h-1 bg-[#D7C3A8] mx-auto mt-6 rounded-full"></div>
              </section>

              {/* Featured Categories */}
              <section className="px-6 py-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md transition">
                    <span className="text-2xl mb-2 block">🧶</span>
                    <h3 className="font-semibold text-[#3E2723]">Cardigans</h3>
                    <p className="text-xs text-[#6D4C41] mt-1">
                      Cozy & Aesthetic
                    </p>
                  </div>
                  <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md transition">
                    <span className="text-2xl mb-2 block">✨</span>
                    <h3 className="font-semibold text-[#3E2723]">
                      Tops & Halters
                    </h3>
                    <p className="text-xs text-[#6D4C41] mt-1">
                      Trendy Designs
                    </p>
                  </div>
                  <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md transition">
                    <span className="text-2xl mb-2 block">🧸</span>
                    <h3 className="font-semibold text-[#3E2723]">Plushies</h3>
                    <p className="text-xs text-[#6D4C41] mt-1">
                      Soft & Huggable
                    </p>
                  </div>
                  <div className="bg-[#FFF9F0] p-6 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md transition">
                    <span className="text-2xl mb-2 block">👜</span>
                    <h3 className="font-semibold text-[#3E2723]">
                      Bags & Hats
                    </h3>
                    <p className="text-xs text-[#6D4C41] mt-1">
                      Everyday Essentials
                    </p>
                  </div>
                </div>
              </section>

              {/* Products Preview Grid */}
              <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#3E2723]">
                    Featured Creations
                  </h2>
                  <Link
                    to="/products"
                    className="text-sm font-semibold text-[#5D4037] hover:underline underline-offset-4"
                  >
                    View All ({products.length}) &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FFF9F0] rounded-3xl overflow-hidden border border-[#EAD7C2] shadow-sm hover:shadow-lg transition group flex flex-col"
                    >
                      <div className="h-64 w-full overflow-hidden relative bg-[#F3E8D8]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#5D4037] text-[#FFF9F0] text-xs px-3 py-1 rounded-full font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[#3E2723] mb-1">
                            {item.name}
                          </h3>
                          <p className="text-[#6D4C41] text-sm line-clamp-2 mb-4">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-[#EAD7C2]">
                          <span className="text-lg font-bold text-[#5D4037]">
                            LKR {item.price.toLocaleString()}
                          </span>
                          <Link
                            to={`/overview/${item.id}`}
                            className="px-4 py-2 bg-[#5D4037] text-[#FFF9F0] text-sm font-medium rounded-xl hover:bg-[#4E342E] transition"
                          >
                            View Item
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Newsletter / Custom Order CTA */}
              <section className="bg-[#EAD7C2]/40 py-16 px-6 mt-12 border-t border-b border-[#EAD7C2]">
                <div className="max-w-xl mx-auto text-center">
                  <h3 className="text-2xl font-bold text-[#3E2723] mb-2">
                    Want a Custom Color Combination?
                  </h3>
                  <p className="text-[#6D4C41] text-sm mb-6">
                    We accept custom requests for cardigans, tops, and plushies.
                    Tell us your favorite colors and size!
                  </p>
                  <Link
                    to="/contacts"
                    className="inline-block px-6 py-3 bg-[#5D4037] text-[#FFF9F0] font-semibold rounded-xl shadow-md hover:bg-[#4E342E] transition"
                  >
                    Request Custom Order
                  </Link>
                </div>
              </section>
            </div>
          }
        />

        {/* Product page */}
        <Route path="/products" element={<ProductPage products={products} />} />

        {/* Contact page */}
        <Route
          path="/contacts"
          element={
            <div className="p-12 max-w-xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-[#3E2723] mb-4">
                Get in Touch
              </h1>
              <p className="text-[#6D4C41]">
                Have questions regarding custom orders or sizing? Drop us a
                message!
              </p>
            </div>
          }
        />

        {/* About page */}
        <Route
          path="/about"
          element={
            <div className="p-12 max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-[#3E2723] mb-4">
                About Loop & Lace
              </h1>
              <p className="text-[#6D4C41] leading-relaxed">
                Loop & Lace is a cozy haven for handmade crochet pieces. Every
                single item is carefully created with high-quality yarn to bring
                comfort, style, and a personal handmade touch to your wardrobe.
              </p>
            </div>
          }
        />

        {/* Product overview */}
        <Route
          path="/overview/:id"
          element={<ProductOverview products={products} />}
        />

        {/* 404 page */}
        <Route
          path="*"
          element={
            <div className="p-20 text-center">
              <h1 className="text-3xl font-bold text-[#3E2723] mb-2">404</h1>
              <p className="text-[#6D4C41]">
                The page you are looking for could not be found.
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

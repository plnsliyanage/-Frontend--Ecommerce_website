import { Routes, Route, Link } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import AboutPage from "./about";
import ContactPage from "./contacts";

import hero1 from "../assets/hero1.jfif";
import hero2 from "../assets/hero2.jfif";
import hero3 from "../assets/hero3.jfif";
import hero4 from "../assets/hero4.jfif";
import hero5 from "../assets/hero5.jfif";

import { useEffect, useState } from "react";

// Updated crochet collection sample data matching the exact categories
const products = [
  {
    id: 1,
    name: "Cozy Daisy Granny Square Cardigan",
    price: 8500,
    category: "Women",
    image: hero1,
    description:
      "Handcrafted with premium milk cotton yarn featuring vibrant daisy granny squares. Perfect for chilly evenings.",
  },
  {
    id: 2,
    name: "Pastel Dream Crochet Top",
    price: 4500,
    category: "New Arrivals",
    image: hero2,
    description:
      "A lightweight, breathable lace-stitch halter top designed for summer outings and beach days.",
  },
  {
    id: 3,
    name: "Sunflower Amigurumi Plushie",
    price: 2800,
    category: "Toys",
    image: hero3,
    description:
      "Adorable handmade plush toy crafted with soft velvet yarn. Brings instant warmth and happiness to any room.",
  },
  {
    id: 4,
    name: "Boho Fringe Crossbody Bag",
    price: 3600,
    category: "Accessories",
    image: hero4,
    description:
      "Sturdy macrame-style crochet bag complete with cute tassel details and secure magnetic button closure.",
  },
  {
    id: 6,
    name: "Tiny Tots Organic Booties & Bonnet Set",
    price: 3400,
    category: "Baby",
    image: hero1,
    description:
      "Supersoft, skin-friendly cotton crochet booties and bonnet set designed for ultimate comfort and warmth for little ones.",
  },
  {
    id: 7,
    name: "Curated Warmth Gift Bundle",
    price: 6500,
    category: "Gifts",
    image: hero3,
    description:
      "A beautifully packaged gift box featuring a handmade pastel beanie, mini amigurumi keychain, and scented candle.",
  },
];

const heroImages = [hero1, hero2, hero3, hero4, hero5];

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] overflow-hidden bg-[#FAF6EE]">
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

      <div className="absolute inset-0 bg-[#3E2723]/15"></div>

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

function Footer() {
  return (
    <footer className="bg-[#3E2723] text-[#FFF9F0] pt-16 pb-12 mt-20 border-t border-[#5D4037]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-2xl">🧶</span>
            <span className="text-xl font-bold tracking-tight text-[#FFF9F0]">
              Loop & Lace
            </span>
          </div>
          <p className="text-[#D7C3A8] text-sm leading-relaxed mb-4">
            Creating mindful, heirloom-quality crochet garments, plushies, and
            gifts stitch by stitch with sustainable, premium yarns.
          </p>
          <div className="flex gap-3 text-lg">
            <span className="w-9 h-9 rounded-full bg-[#5D4037] flex items-center justify-center cursor-pointer hover:bg-[#6D4C41] transition">
              ✨
            </span>
            <span className="w-9 h-9 rounded-full bg-[#5D4037] flex items-center justify-center cursor-pointer hover:bg-[#6D4C41] transition">
              🧶
            </span>
            <span className="w-9 h-9 rounded-full bg-[#5D4037] flex items-center justify-center cursor-pointer hover:bg-[#6D4C41] transition">
              🤎
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#EAD7C2]">Explore</h4>
          <ul className="space-y-2.5 text-sm text-[#D7C3A8]">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Full Collection
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-white transition">
                Custom Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#EAD7C2]">
            Categories
          </h4>
          <ul className="space-y-2.5 text-sm text-[#D7C3A8]">
            <li>
              <Link to="/products" className="hover:text-white transition">
                Women & Baby
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Accessories & Toys
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                Gifts & Bundles
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#EAD7C2]">
            Stay Connected
          </h4>
          <p className="text-sm text-[#D7C3A8] mb-4">
            Join our cozy newsletter for early drops, pattern sneak peeks, and
            custom slots.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to Loop & Lace!");
            }}
            className="flex flex-col gap-2.5"
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="bg-[#4E342E] text-white placeholder-[#D7C3A8]/70 px-4 py-2.5 rounded-xl border border-[#5D4037] text-sm focus:outline-none focus:border-[#EAD7C2]"
            />
            <button
              type="submit"
              className="bg-[#EAD7C2] text-[#3E2723] font-semibold py-2.5 rounded-xl text-sm hover:bg-[#FFF9F0] transition shadow-sm cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#5D4037] text-center text-xs text-[#D7C3A8]">
        <p>
          &copy; {new Date().getFullYear()} Loop & Lace. Handcrafted with love
          in every single stitch.
        </p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF6EE] text-[#3E2723] font-sans flex flex-col justify-between">
      <div>
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
                    Explore our exclusive collection of handmade crochet
                    garments, cute plushies, and timeless yarn accessories made
                    entirely stitch by stitch.
                  </p>
                  <div className="w-16 h-1 bg-[#D7C3A8] mx-auto mt-6 rounded-full"></div>
                </section>

                {/* Featured Categories */}
                <section className="px-6 py-6 max-w-7xl mx-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        👗
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        Women
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Garments & Tops
                      </p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        🍼
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        Baby
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Booties & Sets
                      </p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        👜
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        Accessories
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Bags & Hats
                      </p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        🧸
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        Toys
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Plushies & Amigurumi
                      </p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        🎁
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        Gifts
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Curated Bundles
                      </p>
                    </Link>
                    <Link
                      to="/products"
                      className="bg-[#FFF9F0] p-5 rounded-2xl border border-[#EAD7C2] text-center shadow-sm hover:shadow-md hover:border-[#5D4037] transition group"
                    >
                      <span className="text-2xl mb-2 block group-hover:scale-110 transition">
                        ✨
                      </span>
                      <h3 className="font-semibold text-[#3E2723] text-sm">
                        New Arrivals
                      </h3>
                      <p className="text-[10px] text-[#6D4C41] mt-0.5">
                        Latest Drops
                      </p>
                    </Link>
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

                {/* Customer Testimonials Section */}
                <section className="py-16 px-6 max-w-7xl mx-auto">
                  <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="text-xs font-bold text-[#A1887F] uppercase tracking-widest block mb-2">
                      Customer Love
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#3E2723]">
                      What Warmth Collectors Say
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] shadow-sm flex flex-col justify-between">
                      <p className="text-[#6D4C41] text-sm italic mb-6 leading-relaxed">
                        &quot;The daisy cardigan is even more breathtaking in
                        person! The stitches are so neat, and it keeps me warm
                        on chilly coffee dates.&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAD7C2] flex items-center justify-center font-bold text-[#3E2723]">
                          SA
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#3E2723]">
                            Shenali A.
                          </h4>
                          <span className="text-xs text-[#A1887F]">
                            Verified Collector
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] shadow-sm flex flex-col justify-between">
                      <p className="text-[#6D4C41] text-sm italic mb-6 leading-relaxed">
                        &quot;I ordered the sunflower plushie for my niece and
                        she refuses to let go of it! Super soft velvet yarn and
                        incredible attention to detail.&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAD7C2] flex items-center justify-center font-bold text-[#3E2723]">
                          DK
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#3E2723]">
                            Dinithi K.
                          </h4>
                          <span className="text-xs text-[#A1887F]">
                            Verified Collector
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] shadow-sm flex flex-col justify-between">
                      <p className="text-[#6D4C41] text-sm italic mb-6 leading-relaxed">
                        &quot;Amazing customer service! They customized the
                        colors of my halter top just how I wanted. Will
                        definitely order again!&quot;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#EAD7C2] flex items-center justify-center font-bold text-[#3E2723]">
                          TP
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#3E2723]">
                            Tanya P.
                          </h4>
                          <span className="text-xs text-[#A1887F]">
                            Verified Collector
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Newsletter / Custom Order CTA */}
                <section className="bg-[#EAD7C2]/40 py-16 px-6 mt-12 border-t border-b border-[#EAD7C2]">
                  <div className="max-w-xl mx-auto text-center">
                    <h3 className="text-2xl font-bold text-[#3E2723] mb-2">
                      Want a Custom Color Combination?
                    </h3>
                    <p className="text-[#6D4C41] text-sm mb-6">
                      We accept custom requests for cardigans, tops, and
                      plushies. Tell us your favorite colors and size!
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
          <Route
            path="/products"
            element={<ProductPage products={products} />}
          />

          {/* Contact page */}
          <Route path="/contacts" element={<ContactPage />} />

          {/* About page */}
          <Route path="/about" element={<AboutPage />} />

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

      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-bold text-[#A1887F] uppercase tracking-widest block mb-2">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-4">
          About Loop & Lace
        </h1>
        <p className="text-[#6D4C41] text-base sm:text-lg leading-relaxed">
          Loop & Lace is a cozy haven for handmade crochet pieces. Every single
          item is carefully created with high-quality yarn to bring comfort,
          style, and a personal handmade touch to your wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] text-center shadow-sm">
          <span className="text-3xl mb-3 block">🧶</span>
          <h3 className="font-bold text-lg text-[#3E2723] mb-2">
            Sustainable Yarns
          </h3>
          <p className="text-[#6D4C41] text-sm leading-relaxed">
            We use premium, skin-friendly milk cotton and velvet yarns that are
            gentle on you and kind to the earth.
          </p>
        </div>

        <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] text-center shadow-sm">
          <span className="text-3xl mb-3 block">✨</span>
          <h3 className="font-bold text-lg text-[#3E2723] mb-2">
            Heirloom Quality
          </h3>
          <p className="text-[#6D4C41] text-sm leading-relaxed">
            Every cardigan, top, and plushie is crafted stitch by stitch to last
            for years as a cherished wardrobe favorite.
          </p>
        </div>

        <div className="bg-[#FFF9F0] p-8 rounded-3xl border border-[#EAD7C2] text-center shadow-sm">
          <span className="text-3xl mb-3 block">🤎</span>
          <h3 className="font-bold text-lg text-[#3E2723] mb-2">
            Made with Love
          </h3>
          <p className="text-[#6D4C41] text-sm leading-relaxed">
            Infused with genuine passion and care, bringing warmth and happiness
            straight from our hands to yours.
          </p>
        </div>
      </div>
    </div>
  );
}

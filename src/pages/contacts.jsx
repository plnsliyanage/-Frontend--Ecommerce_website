import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-16 px-6 max-w-2xl mx-auto min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#3E2723] mb-3">
          Get in Touch
        </h1>
        <p className="text-[#6D4C41] text-base">
          Have questions regarding custom orders, sizing, or yarn availability?
          Drop us a message below!
        </p>
      </div>

      <div className="bg-[#FFF9F0] p-8 sm:p-10 rounded-3xl border border-[#EAD7C2] shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-3 block">💌</span>
            <h3 className="text-xl font-bold text-[#3E2723] mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-[#6D4C41] text-sm">
              Thank you for reaching out. We will get back to you within 24-48
              hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-sm font-semibold text-[#3E2723] mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Miller"
                className="w-full bg-[#FAF6EE] text-[#3E2723] px-4 py-3 rounded-xl border border-[#EAD7C2] text-sm focus:outline-none focus:border-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3E2723] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. sarah@example.com"
                className="w-full bg-[#FAF6EE] text-[#3E2723] px-4 py-3 rounded-xl border border-[#EAD7C2] text-sm focus:outline-none focus:border-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3E2723] mb-1.5">
                Your Message / Custom Request Details
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell us what colors, sizes, or custom items you are looking for..."
                className="w-full bg-[#FAF6EE] text-[#3E2723] px-4 py-3 rounded-xl border border-[#EAD7C2] text-sm focus:outline-none focus:border-[#5D4037]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#5D4037] text-[#FFF9F0] font-semibold py-3 rounded-xl text-sm hover:bg-[#4E342E] transition shadow-sm cursor-pointer mt-2"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

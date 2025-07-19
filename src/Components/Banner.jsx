import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Share Food, Spread Love",
    subtitle: "Join our community to reduce food waste and help others.",
    image: "https://source.unsplash.com/1600x900/?food,donate",
    ctaLink: "/foods",
    ctaText: "Explore Foods",
  },
  {
    id: 2,
    title: "Donate Excess Food Easily",
    subtitle: "Help those in need by sharing your extra meals.",
    image: "https://source.unsplash.com/1600x900/?meal,help",
    ctaLink: "/donate",
    ctaText: "Donate Now",
  },
  {
    id: 3,
    title: "Connect & Make a Difference",
    subtitle: "Together, we can fight hunger and reduce waste.",
    image: "https://source.unsplash.com/1600x900/?community,food",
    ctaLink: "/community",
    ctaText: "Join Us",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center flex flex-col justify-center items-center text-white px-6"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 max-w-3xl text-center">
                  <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="mb-8 text-lg drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.ctaLink}
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
                  >
                    {slide.ctaText}
                  </a>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full ${
              idx === current ? "bg-green-500" : "bg-white bg-opacity-50"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

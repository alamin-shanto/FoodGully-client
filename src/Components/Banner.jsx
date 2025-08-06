import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "🍱 Share Food, Spread Love",
    subtitle: "Join a mission to reduce waste and uplift lives.",
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Browse Foods",
    ctaLink: "/foods",
  },
  {
    id: 2,
    title: "🍽️ Donate Excess Meals",
    subtitle: "Your leftovers can be someone’s lifeline.",
    image:
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Donate Now",
    ctaLink: "/add-food",
  },
  {
    id: 3,
    title: "🤝 Join Hands to End Hunger",
    subtitle: "Together, we can make a difference in every bite.",
    image:
      "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ctaText: "Join Us",
    ctaLink: "/my-requests",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [scope, animate] = useAnimate();
  const intervalRef = useRef(null);

  useEffect(() => {
    const runSlider = async () => {
      if (!scope.current) return;
      await animate(scope.current, { opacity: 0, x: -30 }, { duration: 0.3 });
      setCurrent((prev) => (prev + 1) % slides.length);
      await animate(scope.current, { opacity: 1, x: 0 }, { duration: 0.6 });
    };

    intervalRef.current = setInterval(runSlider, 3500);
    return () => clearInterval(intervalRef.current);
  }, [animate, scope]);

  const slide = slides[current];

  return (
    <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full bg-black">
      <div className="h-full w-full overflow-hidden rounded-none sm:rounded-xl shadow-lg">
        <div
          ref={scope}
          key={slide.id}
          className="relative h-full w-full flex items-center justify-center text-white px-4 sm:px-6"
        >
          {/* Background Image with Blur */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 brightness-75 transition-all duration-700"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-xl text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 drop-shadow-lg leading-snug sm:leading-tight">
              {slide.title}
            </h1>
            <p className="mb-4 sm:mb-6 text-sm sm:text-lg drop-shadow-md">
              {slide.subtitle}
            </p>
            <a
              href={slide.ctaLink}
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 sm:py-3 px-5 sm:px-8 text-sm sm:text-base rounded-lg shadow-lg transition"
            >
              {slide.ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
              idx === current ? "bg-green-500" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;

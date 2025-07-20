// ShortQuotes.jsx - Stunning Quote Cards Component
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const quotes = [
  {
    id: 1,
    quote: "One kind word can warm three winter months.",
    author: "Japanese Proverb",
  },
  {
    id: 2,
    quote:
      "We make a living by what we get, but we make a life by what we give.",
    author: "Winston Churchill",
  },
  {
    id: 3,
    quote:
      "The best way to find yourself is to lose yourself in the service of others.",
    author: "Mahatma Gandhi",
  },
  {
    id: 4,
    quote: "Sharing food is the most intimate act of kindness.",
    author: "Unknown",
  },
];

const ShortQuotes = () => {
  return (
    <div className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] py-16 px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        ✨ Inspiring Thoughts
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {quotes.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-xl shadow-xl p-6 border-l-8 border-indigo-500 relative overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <FaQuoteLeft className="text-indigo-400 text-2xl mb-3" />
            <p className="text-gray-700 text-md leading-relaxed italic">
              "{q.quote}"
            </p>
            <p className="mt-4 text-right font-semibold text-indigo-600">
              - {q.author}
            </p>
            <div className="absolute w-24 h-24 bg-indigo-100 rounded-full -top-6 -right-6 opacity-20 transform rotate-45" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortQuotes;

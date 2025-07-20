import React from "react";
import CountUp from "react-countup";
import { FaUtensils, FaLeaf } from "react-icons/fa";

const CountUpCard = () => {
  return (
    <div className="py-12 px-5 text-center">
      <h2 className="text-4xl font-extrabold mb-10 text-[var(--n)] drop-shadow-sm">
        🌍 Our Impact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center max-w-5xl mx-auto">
        {/* Meals Shared */}
        <div className="bg-white/60 backdrop-blur-md border border-blue-100 shadow-xl p-6 rounded-3xl hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
          <div className="flex justify-center mb-4 text-indigo-600 text-5xl">
            <FaUtensils />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--n)]">
            Meals Shared
          </h3>
          <p className="text-4xl font-bold text-indigo-700">
            <CountUp end={120} duration={3} suffix="k+" enableScrollSpy />
          </p>
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Over 120,000 home-cooked meals shared within our caring community.
          </p>
        </div>

        {/* Food Saved */}
        <div className="bg-white/60 backdrop-blur-md border border-green-100 shadow-xl p-6 rounded-3xl hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
          <div className="flex justify-center mb-4 text-green-600 text-5xl">
            <FaLeaf />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-[var(--n)]">
            Food Saved
          </h3>
          <p className="text-4xl font-bold text-green-700">
            <CountUp end={85} duration={3} suffix="k+" enableScrollSpy />
          </p>
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Rescued more than 85,000 meals from going to waste through sharing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountUpCard;

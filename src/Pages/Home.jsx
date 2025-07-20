import React from "react";
import Banner from "../Components/Banner";

import FeaturedSection from "../Components/FeaturedSection";
import CountUpCard from "../Components/CountUpCard";
import ShortQuotes from "../Components/ShortQuotes";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedSection />
      <CountUpCard />
      <ShortQuotes />
    </div>
  );
};

export default Home;

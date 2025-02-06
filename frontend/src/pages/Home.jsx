import React from "react";
import CategoryCarousel from "../components/shared/CategoryCarousel";
import LatestJob from "../components/shared/LatestJob";
import HeroSection from "../components/shared/HeroSection";


function Home() {
  return (
    <>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJob/>
    </>
  );
}

export default Home;

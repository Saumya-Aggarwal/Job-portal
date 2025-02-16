import React from "react";
import CategoryCarousel from "../components/shared/CategoryCarousel";
import LatestJob from "../components/shared/LatestJob";
import HeroSection from "../components/shared/HeroSection";
import useGetAllJobs from "../hooks/useGetAllJobs";


function Home() {
  useGetAllJobs();
  return (
    <>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJob/>
    </>
  );
}

export default Home;

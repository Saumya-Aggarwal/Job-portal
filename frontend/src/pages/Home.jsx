import React, { useEffect } from "react";
import CategoryCarousel from "../components/shared/CategoryCarousel";
import LatestJob from "../components/shared/LatestJob";
import HeroSection from "../components/shared/HeroSection";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate = "/admin/companies";
    }
  }, [user, navigate]);
  // Fetch all jobs when the component mounts
  useGetAllJobs();
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
    </>
  );
}

export default Home;

import React, { useEffect } from "react";
import CategoryCarousel from "../components/shared/CategoryCarousel";
import LatestJob from "../components/shared/LatestJob";
import HeroSection from "../components/shared/HeroSection";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHomeSearchJobByText } from "../store/jobSlice";

function Home() {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHomeSearchJobByText(""));
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");  // Correct - calling the function
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

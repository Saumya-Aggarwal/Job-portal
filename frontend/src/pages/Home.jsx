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
  const { allJobs, jobError } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useGetAllJobs();
  
  useEffect(() => {
    dispatch(setHomeSearchJobByText(""));
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate, dispatch]);
  
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      {isLoading ? (
        <div className="text-center my-10">
          <p className="text-lg">Loading jobs...</p>
        </div>
      ) : jobError ? (
        <div className="text-center my-10">
          <p className="text-lg text-red-500">{jobError}</p>
        </div>
      ) : (
        <LatestJob />
      )}
    </>
  );
}

export default Home;

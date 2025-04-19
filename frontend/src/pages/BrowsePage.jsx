import React, { useEffect } from "react";
import Job from "../components/shared/Job";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setHomeSearchJobByText } from "../store/jobSlice";

function BrowsePage() {
  const dispatch = useDispatch();
  const { allJobs, jobError } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setHomeSearchJobByText(""));
    };
  }, [dispatch]);
  
  useGetAllJobs();

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      <h1 className="mb-4 font-medium text-lg">
        Search Results ({allJobs.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length > 0 ? (
          allJobs.map((job) => <Job key={job._id} job={job} />)
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700">
              {jobError || "No jobs found"}
            </h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your search criteria or browse all available jobs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowsePage;

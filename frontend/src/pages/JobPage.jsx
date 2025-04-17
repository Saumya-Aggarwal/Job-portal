import React from "react";
import FilterCard from "../components/shared/FilterCard";
import Job from "../components/shared/Job";
import { useSelector } from "react-redux";

function JobPage() {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <div className="flex max-w-7xl mx-auto p-5 gap-4">
      <FilterCard />
      <div className="flex flex-wrap gap-5">
        {allJobs.length === 0 ? (
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold">No Jobs Found</h1>
          </div>
        ) : (
          allJobs.map((job) => <Job key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default JobPage;

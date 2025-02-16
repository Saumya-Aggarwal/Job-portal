import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const categories = [
  "Engineering",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Design",
  "Sales",
  "Technology",
  "Management",
];
function LatestJob() {
  const { allJobs } = useSelector((state) => state.job);
  console.log(allJobs);
  return (
    <div className="text-center max-w-7xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-left">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-8">
        {allJobs.slice(0, 8).map((job, index) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div> 
  );
}

export default LatestJob;

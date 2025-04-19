import React, { useEffect } from "react";
import FilterCard from "../components/shared/FilterCard";
import Job from "../components/shared/Job";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHomeSearchJobByText } from "../store/jobSlice";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { motion } from "framer-motion";
function JobPage() {
  useGetAllJobs();
  const { allJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHomeSearchJobByText(""));
  }, [dispatch]);
  return (
    <div className="flex max-w-7xl mx-auto p-5 gap-4">
      <FilterCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {allJobs.length === 0 ? (
          <div className="text-center w-full col-span-full">
            <h1 className="text-3xl font-bold">No Jobs Found</h1>
          </div>
        ) : (
          allJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Job key={job._id} job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default JobPage;

import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/const.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAllAdminJobs, setJobError } from "../store/jobSlice.js";

function useGetAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/created`, {
          withCredentials: true,
        });
        
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobsCreated));
          dispatch(setJobError(null)); // Clear any previous errors
        } else {
          dispatch(setJobError(res.data.message));
        }
      } catch (error) {
        dispatch(setJobError(error.response?.data?.message || "Failed to fetch jobs"));
      }
    };
    fetchAllJobs();
  }, [dispatch]);

  return null; 
}

export default useGetAdminJobs;

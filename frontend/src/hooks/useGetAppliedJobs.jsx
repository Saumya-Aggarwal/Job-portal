import { useEffect, useCallback } from "react";
import { APPLICATION_API_END_POINT } from "../utils/const.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAppliedJobs } from "../store/jobSlice.js";

function useGetAppliedJobs() {
  const dispatch = useDispatch();

  const fetchAppliedJobs = useCallback(async () => {
    let isMounted = true; // Flag to track component mount status

    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/applied`, {
        withCredentials: true,
      });
      if (isMounted && res.data.success) {
        dispatch(setAppliedJobs(res.data.jobs));
      }
    } catch (error) {
      console.error("Failed to fetch applied jobs:", error);
    }

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, [dispatch]);

  useEffect(() => {
    fetchAppliedJobs();
  }, [fetchAppliedJobs]);

  return null;
}

export default useGetAppliedJobs;

import { useEffect, useCallback } from "react";
import { APPLICATION_API_END_POINT } from "../utils/const.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setApplicants, setError } from "../store/applicationSlice.js"; // Import setError action

function useGetApplicants(jobId) {
  const dispatch = useDispatch();

  const fetchApplicants = useCallback(async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/applicants/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setApplicants(res.data.applicants)); // Store applicants in Redux
        dispatch(setError(null)); // Clear any previous errors
        
      } else {
        dispatch(setError("No applicants found.")); // Handle empty state gracefully
        dispatch(setApplicants([])); // Clear applicants in Redux
      }
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
      dispatch(setError("Failed to fetch applicants. Please try again later.")); // Handle API error
    }
  }, [dispatch, jobId]);

  useEffect(() => {
    if (jobId) {
      fetchApplicants();
    }
  }, [fetchApplicants, jobId]);

  return null; 
}

export default useGetApplicants;
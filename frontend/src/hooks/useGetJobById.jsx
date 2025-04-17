import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleJob } from "../store/jobSlice";
import { JOB_API_END_POINT } from "../utils/const.js";

function useGetJobById(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id, dispatch]);

  return null;
}

export default useGetJobById;

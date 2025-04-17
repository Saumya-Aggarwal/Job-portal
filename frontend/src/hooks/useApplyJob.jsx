import axios from "axios";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from "../utils/const";
import { toast } from "sonner";

function useApplyJob(id) { 
  useEffect(() => {
    const applyJob = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${id}`);
        if (res.data.success) {
          toast.success("Applied Successfully");
          useGetJobById(id);
        } else {
          toast.error("Failed to apply"); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    applyJob();
  }, []);
  return null;
}

export default useApplyJob;

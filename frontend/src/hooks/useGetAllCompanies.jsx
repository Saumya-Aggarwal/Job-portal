import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../store/companySlice";
import { COMPANY_API_END_POINT } from "../utils/const.js";
function useGetCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/all`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Error fetching Company:", error);
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return null;
}

export default useGetCompanies;

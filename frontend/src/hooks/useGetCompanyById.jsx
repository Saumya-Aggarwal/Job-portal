import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../store/companySlice";
import { COMPANY_API_END_POINT } from "../utils/const.js";
function useGetCompanyById(id) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    
    let isMounted = true;
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/${id}`, {
          withCredentials: true,
        });
        if (isMounted && res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        if (isMounted) {
          console.log("Error fetching Company:", error);
        }
      }
    };

    fetchCompany();
    
    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);

  return null;
}

export default useGetCompanyById;

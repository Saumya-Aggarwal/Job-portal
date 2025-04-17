import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/const.js";
// import { setSingleJob } from "../store/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import useGetJobById from "../hooks/useGetJobById.jsx";

const JobDescriptionPage = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  useGetJobById(jobId);
  const singleJob = useSelector((state) => state.job.singleJob);
  const { user } = useSelector((state) => state.auth);
  const [isApplied, setIsApplied] = useState(
    singleJob?.applications?.includes(user?._id) || false
  );
  const applyJobHandler = async()=>{
    setIsApplied(true);
    try {
      await axios.post(APPLICATION_API_END_POINT, { jobId });
      toast.success("Applied Successfully");
    } catch (error) {
      setIsApplied(false);
      toast.error("Failed to apply");
    } 
  }
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
                <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                <div className='flex items-center gap-2 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                    <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                </div>
            </div>
            <Button
            onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                {isApplied ? 'Already Applied' : 'Apply Now'}
            </Button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
        <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
        </div>
    </div>
)
}
export default JobDescriptionPage;

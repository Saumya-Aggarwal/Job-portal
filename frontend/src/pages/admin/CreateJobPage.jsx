import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/const.js";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetCompanies from "../../hooks/useGetAllCompanies.jsx";

const PostJob = () => {
  // Get job ID from URL params if in edit mode
  const params = useParams();
  const jobId = params.id;
  const isEditMode = !!jobId;

  useGetCompanies();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  // Fetch job data if in edit mode
  useEffect(() => {
    const fetchJobData = async () => {
      if (jobId) {
        try {
          setFetchLoading(true);
          const response = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {
            withCredentials: true,
          });

          if (response.data.success) {
            const jobData = response.data.job;
            setInput({
              title: jobData.title || "",
              description: jobData.description || "",
              requirements: Array.isArray(jobData.requirements)
                ? jobData.requirements.join(", ")
                : jobData.requirements || "",
              salary: jobData.salary || "",
              location: jobData.location || "",
              jobType: jobData.jobType || "",
              experience: jobData.experience || "",
              position: jobData.position || 0,
              companyId: jobData.company._id || jobData.company || "",
            });
          }
        } catch (error) {
          console.error("Error fetching job:", error);
          toast.error("Failed to fetch job details");
        } finally {
          setFetchLoading(false);
        }
      }
    };

    fetchJobData();
  }, [jobId]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const jobData = {
        title: input.title,
        description: input.description,
        requirements: input.requirements,
        salary: Number(input.salary),
        location: input.location,
        jobType: input.jobType,
        experience: input.experience,
        position: Number(input.position),
        company: input.companyId,
      };

      let response;

      if (isEditMode) {
        // Update existing job
        response = await axios.put(
          `${JOB_API_END_POINT}/update/${jobId}`,
          jobData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
      } else {
        // Create new job
        response = await axios.post(`${JOB_API_END_POINT}/create`, jobData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }

      if (response.data.success) {
        toast.success(
          isEditMode ? "Job updated successfully" : "Job created successfully"
        );
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (isEditMode ? "Failed to update job" : "Failed to create job")
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete job handler
  const handleDeleteJob = async () => {
    setShowDeleteModal(false);
    try {
      setLoading(true);
      const res = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success("Job deleted successfully");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Failed to delete job");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    } finally {
      setLoading(false);
    }
  };

  // Show loading indicator while fetching job data
  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex items-center gap-5 ">
            <Button
              type="button" 
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h2 className="text-2xl font-bold mb-6 text-center mt-5">
              {isEditMode ? "Update Job" : "Create New Job"}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select
                onValueChange={selectChangeHandler}
                defaultValue={
                  isEditMode &&
                  companies
                    .find((c) => c._id === input.companyId)
                    ?.name?.toLowerCase()
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                {isEditMode ? "Update Job" : "Post New Job"}
              </Button>
            )}
            {isEditMode && (
              <Button
                type="button"
                variant="destructive"
                className="w-full my-2"
                onClick={() => setShowDeleteModal(true)}
                disabled={loading}
              >
                Delete Job
              </Button>
            )}
          </div>
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Delete Job</h3>
            <p className="mb-4">
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteJob}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostJob;

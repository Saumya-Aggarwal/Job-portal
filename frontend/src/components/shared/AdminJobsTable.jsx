import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Eye, MoreHorizontal, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAdminJobs from "../../hooks/useGetAdminJobs";

const AdminJobsTable = () => {
  useGetAdminJobs();
  const { allAdminJobs, searchJobByText, jobError } = useSelector(
    (store) => store.job
  );
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs) {
      setFilterJobs([]);
      return;
    }
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  // Show error message if there's an error
  if (jobError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-lg font-medium">No Jobs Available</h3>
        <p className="text-gray-500 mt-2">{jobError}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => navigate("/admin/jobs/create")}
        >
          Create a Job
        </button>
      </div>
    );
  }

  // Show message when jobs array is empty
  if (!filterJobs || filterJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium">No Jobs Found</h3>
        <p className="text-gray-500 mt-2">
          {searchJobByText
            ? "No jobs match your search criteria"
            : "You haven't created any jobs yet"}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => navigate("/admin/jobs/create")}
        >
          Create Your First Job
        </button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;

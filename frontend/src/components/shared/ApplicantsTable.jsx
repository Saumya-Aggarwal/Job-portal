import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import { APPLICATION_API_END_POINT } from "../../utils/const";
import axios from "axios";
import { setApplicants } from "../../store/applicationSlice";

function ApplicantsTable() {
  const dispatch = useDispatch();
  const { applicants, error } = useSelector((store) => store.application);
  console.log(applicants, "applicants from redux store");

  const statusHandler = async (status, applicationId) => {
    try {
      dispatch(
        setApplicants(
          applicants.map((app) =>
            app.applicationId === applicationId
              ? { ...app, status: status.toLowerCase() }
              : app
          )
        )
      );
      const res = await axios.put(
        `${APPLICATION_API_END_POINT}/status/${applicationId}`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // If you still want to sync with server data:
        // dispatch(setApplicants(res.data.applicants));
      } else {
        // Revert to original state if the API call fails
        toast.error("Failed to update status");
        // Re-fetch the original data
        fetchApplicants(); // You would need to implement this function
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Error updating status:", error);
      // Revert optimistic update on error
      fetchApplicants(); // You would need to implement this function
    }
  };

  // Status color mapping
  const statusColors = {
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  if (error) {
    return (
      <div className="text-center text-yellow-500 mt-4 font-semibold">
        {error}
      </div>
    );
  }

  if (!applicants || applicants.length === 0) {
    return (
      <div className="text-center text-yellow-500 mt-4">
        No applicants available for this job.
      </div>
    );
  }

  return (
    <div className="max-w-[75rem] mx-auto my-6 p-4 border rounded-lg shadow-sm bg-white">
      <Table className="w-full border-collapse">
        <TableCaption>Applicants</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants.map(({ applicationId, applicant, status }) => (
            <TableRow key={applicationId}>
              <TableCell>{applicant?.fullName}</TableCell>
              <TableCell>{applicant?.email}</TableCell>
              <TableCell>{applicant?.phoneNumber}</TableCell>
              <TableCell>
                <a
                  href={applicant?.profile?.resume}
                  target="blank"
                  className="underline text-blue-600"
                >
                  Resume
                </a>
              </TableCell>
              <TableCell>
                {new Date(applicant?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  className={`${
                    statusColors[status] || "bg-gray-100"
                  } pointer-events-none`}
                >
                  {status || "pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {["Accepted", "Rejected"].map((stat) => (
                      <div
                        onClick={() => statusHandler(stat, applicationId)}
                        key={stat}
                        className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <span>{stat}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;

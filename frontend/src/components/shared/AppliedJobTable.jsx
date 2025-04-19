import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";

export default function JobPortalTable() {
  useGetAppliedJobs();
  const { appliedJobs } = useSelector((store) => store.job);
  const statusColors = {
    accepted: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    rejected: "bg-red-100 text-red-800 hover:bg-red-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  };

  return (
    <div className="max-w-6xl mx-auto my-6 p-4 border rounded-lg shadow-sm bg-white">
      <Table className="w-full border-collapse">
        <TableCaption>Your applied jobs list.</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.map((appliedJob, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <TableCell>{appliedJob?.job?.title}</TableCell>
              <TableCell className="font-medium">
                {appliedJob?.job?.jobType}
              </TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell>
                <Badge
                  className={`px-2 py-1 rounded-md ${
                    statusColors[appliedJob?.status]
                  }`}
                >
                  {appliedJob?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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

// Example data
const jobApplications = [
  {
    date: "2025-02-01",
    role: "Frontend Developer",
    company: "Tech Solutions Inc.",
    status: "Interview Scheduled",
  },
  {
    date: "2025-01-25",
    role: "Backend Engineer",
    company: "DataFlow Ltd.",
    status: "Rejected",
  },
  {
    date: "2025-01-15",
    role: "Full Stack Developer",
    company: "Innovatech",
    status: "Pending Review",
  },
];

const postedJobs = [
  {
    jobId: "J101",
    role: "Data Scientist",
    applicants: ["Alice Johnson", "Bob Smith"],
  },
  {
    jobId: "J102",
    role: "DevOps Engineer",
    applicants: ["Charlie Brown", "David Lee"],
  },
];

export default function JobPortalTable({ userRole }) {
  const statusColors = {
    "Interview Scheduled": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "Rejected": "bg-red-100 text-red-800 hover:bg-red-200",
    "Pending Review" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  };

  return (
    <div className="max-w-6xl mx-auto my-6 p-4 border rounded-lg shadow-sm bg-white">
      {userRole === "jobSeeker" && (
        <Table className="w-full border-collapse">
          <TableCaption>Your applied jobs list.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobApplications.map((application, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <TableCell>{application.date}</TableCell>
                <TableCell className="font-medium">{application.role}</TableCell>
                <TableCell>{application.company}</TableCell>
                <TableCell>
                  <Badge
                    className={`px-2 py-1 rounded-md ${
                      statusColors[application.status]
                    }`}
                  >
                    {application.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {userRole === "recruiter" && (
        <Table className="w-full border-collapse mt-6">
          <TableCaption>Your created jobs and applicants list.</TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Applicants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postedJobs.map((job) => (
              <TableRow key={job.jobId} className="bg-white">
                <TableCell className="font-medium">{job.jobId}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>
                  {job.applicants.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {job.applicants.map((applicant, index) => (
                        <li key={index}>{applicant}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No Applicants Yet</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// Usage example:
// <JobPortalTable userRole="jobSeeker" />
// <JobPortalTable userRole="recruiter" />

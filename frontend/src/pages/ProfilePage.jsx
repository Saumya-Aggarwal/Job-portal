import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Pen, Contact, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppliedJobTable from "../components/shared/AppliedJobTable";

function ProfilePage() {
  const [resumeUrl, setResumeUrl] = useState(""); // Initially no resume
  const skills = ["React", "Node", "Express", "MongoDB"];
  const role = "Candidate";
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const resumeLink = URL.createObjectURL(file); // Generate a temporary file URL
      setResumeUrl(resumeLink);
    }
  };

  return (
    <>
      <div className="relative max-w-7xl mx-auto border border-gray-300 rounded-xl shadow-md p-6 my-5">
        {/* Profile Header */}
        <div className="flex items-center gap-4 relative">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-left">Full Name</h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, asperiores!
            </p>
          </div>

          <Button className="absolute top-4 right-4" variant="outline">
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span className="text-gray-700">ssaumya@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-gray-700">9990327894</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} className="text-gray-100 bg-gray-800">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No skills added</p>
          )}
        </div>

        {/* Resume Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Resume</h2>
          {resumeUrl ? (
            <div className="flex items-center gap-4">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Resume
              </a>
              <Button variant="outline" onClick={() => setResumeUrl("")}>
                Remove Resume
              </Button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept=".pdf"
                id="resume-upload"
                className="hidden"
                onChange={handleResumeUpload}
              />
              <label htmlFor="resume-upload">
                <Button variant="outline" className="flex items-center gap-2">
                  <UploadCloud />
                  Upload Resume
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>
      
      {/* Applied Jobs */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-semibold"> <span className="border-b-2"> Applied Jobs </span></h2>
        <AppliedJobTable userRole="recruiter"></AppliedJobTable>
      </div>
    </>
  );
}

export default ProfilePage;

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Pen, Contact, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppliedJobTable from "../components/shared/AppliedJobTable";
import UpdateProfileModal from "../components/shared/UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../store/authSlice";
import { toast } from "sonner"; // assuming you're using sonner for toast notifications
import { USER_API_END_POINT } from "../utils/const";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file); // Append the file to the "file" field

        const response = await axios.put(
          `${USER_API_END_POINT}/profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (response) {
          dispatch(setUser(response.data.data));
          toast.success("Resume updated successfully!");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update resume. Please try again.");
      }
    }
  };
  const inlineUrl = `${user.profile.resume}?fl_attachment=false`;

  // Optionally, you can handle loading state if user data might be undefined
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative max-w-7xl mx-auto border border-gray-300 rounded-xl shadow-md p-6 my-5">
        {/* Profile Header */}
        <div className="flex items-center gap-4 relative">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.profile.profileImage} alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-left">
              {user.fullName || "Unnamed User"}
            </h1>
            <p className="text-gray-600">
              {user?.profile?.bio || "No bio available"}
            </p>
          </div>
          <Button
            className="absolute top-4 right-4"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span className="text-gray-700">{user.email || "No email"}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-gray-700">
              {user.phoneNumber || "No phone number"}
            </span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          {user?.profile?.skills && user.profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.profile.skills.map((skill, index) => (
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
          {user?.profile?.resumeOriginalName ? (
            <div className="flex items-center gap-4">
              <a href={inlineUrl} target="_blank" rel="noopener noreferrer">
                {user.profile.resumeOriginalName}
              </a>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept=".pdf"
                id="file"
                className="hidden"
                onChange={handleResumeUpload}
              />
              <label htmlFor="file">
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
        <h2 className="text-2xl font-semibold">
          <span className="border-b-2">Applied Jobs</span>
        </h2>
        <AppliedJobTable userRole="recruiter" />
      </div>
      <UpdateProfileModal open={open} setOpen={setOpen} />
    </>
  );
}

export default ProfilePage;

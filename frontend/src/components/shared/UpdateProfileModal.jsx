import React, { useRef } from "react"; // Add useRef
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/const";
import { toast } from "sonner";
import { setUser } from "../../store/authSlice";

function UpdateProfileModal({ open, setOpen }) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Create a ref

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
      file: null,
    },
  });

  const selectedFile = watch("file");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("bio", data.bio);
      formData.append("skills", data.skills);

      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }

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
      dispatch(setUser(response.data.data));
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const updateFile = () => {
    // Clear the file value (if needed)
    setValue("file", null);
    // Trigger the hidden file input's click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Name", key: "fullName", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Phone No.", key: "phoneNumber", type: "text" },
              { label: "Bio", key: "bio", type: "text" },
              { label: "Skills", key: "skills", type: "text" },
            ].map(({ label, key, type }) => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={key} className="text-right">
                  {label}
                </Label>
                <Input
                  id={key}
                  type={type}
                  {...register(key, { required: `${label} is required` })}
                  className="col-span-3"
                />
                {errors[key] && (
                  <p className="text-red-500 text-sm col-span-3">
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Resume Section */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <div className="col-span-3">
                {user?.profile?.resume && !selectedFile ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 truncate">
                      {user.profile.resumeOriginalName}
                    </span>
                  </div>
                ) : (
                  <div>
                    {/* Optionally, you can show the name of the selected file */}
                    {selectedFile && selectedFile[0]?.name}
                    {/* Or a placeholder message */}
                    {!selectedFile && (
                      <p className="text-sm text-gray-600">No file selected</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Hidden file input always present */}
            <Input
              id="resume"
              type="file"
              accept="application/pdf"
              {...register("file")}
              style={{ display: "none" }}
              ref={(e) => {
                fileInputRef.current = e;
                register("file").ref(e);
              }}
            />
            <Button
              type="button"
              className="text-white px-2 py-1 w-1/3"
              onClick={updateFile}
            >
              Update File
            </Button>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#6A38C2] hover:bg-[#522b95] w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileModal;
``;

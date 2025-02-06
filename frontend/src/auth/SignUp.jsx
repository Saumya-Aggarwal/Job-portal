import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { USER_API_END_POINT } from "../utils/const";
import axios from "axios";
import React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setLoading } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "applicant",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    // Convert phone number to integer if it's valid
    if (data.phoneNumber) {
      const trimmedPhoneNumber = data.phoneNumber.trim(); // Trim spaces
      const phoneNumberInt = parseInt(trimmedPhoneNumber, 10);
      if (!isNaN(phoneNumberInt)) {
        data.phoneNumber = phoneNumberInt;
      } else {
        console.log("Invalid phone number");
      }
    }
  
    Object.keys(data).forEach((key) => {
      // Check if profileImage exists and append it, otherwise append null
      if (key === "profileImage") {
        if (data[key]?.[0]) {
          formData.append(key, data[key][0]);  // Append the file if it exists
        } else {
          formData.append(key, null);  // Append null if no file is selected
        }
      } else {
        formData.append(key, data[key] || ""); // Append other fields as usual
      }
    });
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        withCredentials: true,
      });
      console.log("Response:", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data.errors) {
        const errorMessages = err.response.data.errors
          .map((error) => error.message)
          .join(", ");
        toast.error(errorMessages);
      } else {
        toast.error(err.response.data.message);
      }
    }finally{
      dispatch(setLoading(false));
    }
  };
  
  
  
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 shadow-md rounded-lg max-w-md w-full space-y-6 my-20"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Register</h1>
            <div className="mt-2 border-t-2 border-gray-200 mx-auto"></div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              {...register("fullName", { required: "Full Name is required" })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone</Label>
            <Input
              type="tel"
              id="phoneNumber"
              placeholder="Enter your phone number"
              {...register("phoneNumber", { required: "Phone is required" })}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <Input
              type="file"
              id="profileImage"
              accept="image/*"
              {...register("profileImage")}
            />
            {errors.profileImage && (
              <span className="text-red-500 text-sm">
                {errors.profileImage.message}
              </span>
            )}
          </div>

          <div>
            <Label>Role</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="applicant"
                  {...register("role", { required: true })}
                />
                <span>Applicant</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  {...register("role", { required: true })}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {loading ? (
            <Button className = "bg-[#6A38C2] hover:bg-[#522b95] w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin "></Loader2>
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[#6A38C2] hover:bg-[#522b95] w-full"
            >
              Login
            </Button>
          )}


          <span className="text-sm">
            Already have an Account?{" "}
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default SignUp;

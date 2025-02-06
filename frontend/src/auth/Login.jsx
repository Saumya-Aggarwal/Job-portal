import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { USER_API_END_POINT } from "../utils/const";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/authSlice.js";
import { Loader2 } from "lucide-react";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Process the data (e.g., API call)
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/home");
      }
    } catch (error) {
      console.log("error :", error);
      if (error.response && error.response.data) {
        const errorMessages = error.response.data.message;
        toast.error(errorMessages);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 shadow-md rounded-lg max-w-md w-full space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
            <div className="mt-2 border-t-2 border-gray-200  mx-auto"></div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Role */}
          <div>
            <Label>Role</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="applicant"
                  {...register("role", { required: true })}
                  defaultChecked
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

          {/* Submit */}
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
            Don't have an Account? &nbsp;
            <Link to={"/signUp"} className="text-blue-500">
              Register
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;

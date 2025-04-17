import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useToast } from "@/components/hooks/use-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/const";

function LoggedUser({ user }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(logout());
        toast({
          title: "Logout Successful",
          description: "You have been successfully logged out.",
          variant: "default",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <ul className="flex gap-5 font-medium items-center">
      {user && user.role === "recruiter" ? (
        <>
          <Link to="/admin/companies">
            <li>Companies</li>
          </Link>
          <Link to="/admin/jobs">
            <li>Jobs</li>
          </Link>
        </>
      ) : (
        <>
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/jobs">
            <li>Jobs</li>
          </Link>
          <Link to="/browse">
            <li>Browse</li>
          </Link>
        </>
      )}

      <Popover>
        <PopoverTrigger>
          <Avatar className="ms-6 cursor-pointer">
            <AvatarImage src={user.profile.profileImage} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={user.profile.profileImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg"> {user.fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {user.profile.bio}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-5">
            {user.role === "recruiter" ? null : (
              <Link to="/profile">
                <Button
                  variant="link"
                  className="text-md flex items-center gap-2"
                >
                  <FaUser />
                  View Profile
                </Button>
              </Link>
            )}

            <Button
              variant="link"
              className="text-md flex items-center gap-2"
              onClick={handleLogout}
            >
              <IoLogOut />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </ul>
  );
}

export default LoggedUser;

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useToast } from "@/components/hooks/use-toast"

function LoggedUser() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logout Successful",
      description: "You have been successfully logged out.",
      variant: "default",
    });
  };

  return (
    <ul className="flex gap-5 font-medium items-center">
      <Link to="/home">
        <li>Home</li>
      </Link>
      <Link to="/jobs">
        <li>Jobs</li>
      </Link>
      <Link to="/browse">
        <li>Browse</li>
      </Link>

      <Popover>
        <PopoverTrigger>
          <Avatar className="ms-6 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-4">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">Shadow</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-5">
            <Link to="/profile">
              <Button variant="link" className="text-md flex items-center gap-2">
                <FaUser />
                View Profile
              </Button>
            </Link>

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

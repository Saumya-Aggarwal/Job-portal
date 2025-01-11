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
function LoggedUser() {
  return (
    <ul className="flex gap-5 font-medium items-center">
      <li>Home</li>
      <li>Jobs</li>
      <li>Browse </li>
      <Popover>
        <PopoverTrigger>
          <Avatar className="ms-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3 pe-5  ">
          <div className="flex gap-4 ">
            <Avatar className="ms-6">
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
          <div className=" flex justify-center mt-4 gap-5 justify-items-center ">
            <Button variant="link" className="text-md">
              <FaUser className="size-6" />
              View Profile
            </Button>

            <Button variant="link" className="text-md">
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

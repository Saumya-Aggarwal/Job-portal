import React from "react";
import LoggedUser from "./Popover";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Navbar() {
  const user = false;
  return (
    <div className="bg-white navbar">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-3xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div>
          {user ? (
            <LoggedUser />
          ) : (
            <div className="flex gap-3">
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
              
              <Link to={"/signUp"}>
                <Button className="bg-[#6A38C2] hover:bg-[#522b95]">
                  SignUp
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

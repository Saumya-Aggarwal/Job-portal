import React, { useEffect, useState } from "react";
import LoggedUser from "./Popover";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  // State to track if the navbar should be visible
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show the navbar if scrolling up or at the top of the page
      if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full transition-transform duration-300 bg-white shadow-md z-10 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
          {/* Logo */}
          <div>
            <h1 className="text-3xl font-bold">
              <Link to={"/home"} className="cursor-pointer">
                Job <span className="text-[#F83002]">Portal</span>
              </Link>
            </h1>
          </div>

          {/* Navigation Links */}
          <div>
            {user ? (
              <LoggedUser user = {user} />
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
      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>{" "}
    </>
  );
}

export default Navbar;

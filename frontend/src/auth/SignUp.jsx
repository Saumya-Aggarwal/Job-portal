import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "applicant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    // Add registration logic here (e.g., API call)
  };

  return (
    <>
      <Navbar></Navbar>
      {/* <div className=" max-w-7xl mx-auto ">
        <form
          action=""
          className="mt-20 w-1/2 border mx-auto border-gray-200 rounded-md p-5"
        >
          <h1 className="font-bold text-2xl ">SignUp</h1>
          <hr className="mt-1 mb-5" />
          <div >
            <Label className="text-md">Full Name</Label>
            <Input className="mt-1" type="text" placeholder="Full Name" />
          </div>
          <div className="my-2">
            <Label className="text-md">Email</Label>
            <Input className="mt-1" type="Email" placeholder="Email" />
          </div>
          <div className="my-2">
            <Label className="text-md">Phone Number</Label>
            <Input className="mt-1" type="number" placeholder="Phone Number" />
          </div>
        </form>
      </div> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-md rounded-lg max-w-md w-full space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800">Register</h1>
            <div className="mt-2 border-t-2 border-gray-200  mx-auto"></div>
          </div>
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Role</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={form.role === "applicant"}
                  onChange={handleChange}
                />
                <span>Applicant</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === "recruiter"}
                  onChange={handleChange}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </>
  );
}

export default SignUp;

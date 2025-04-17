import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "../../components/shared/AdminJobsTable";
import { setSearchJobByText } from "../../store/jobSlice";
function AdminJobPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  },[input]);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/job/create")}>
        New Job
        </Button>
      </div>
      <AdminJobsTable />
    </div>
  );
}

export default AdminJobPage;

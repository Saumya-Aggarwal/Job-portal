import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CompaniesTable from "../../components/shared/CompaniesTable";
function CompaniesPage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between my-5">
        <Input
          className="w-fit"
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
}

export default CompaniesPage;

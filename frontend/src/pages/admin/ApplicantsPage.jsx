import React from "react";
import ApplicantsTable from "../../components/shared/ApplicantsTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useGetApplicants from "../../hooks/useGetApplicants";
function ApplicantsPage() {
  const navigate = useNavigate();
  const params = useParams();
  useGetApplicants(params.id); 
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mx-7">
          <h1 className="text-2xl font-semibold ml-5 underline">Applicants</h1>
          <Button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
        </div>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default ApplicantsPage;

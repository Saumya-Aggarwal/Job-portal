import React from "react";
import Job from "../components/shared/Job";
const randomJob = [1, 2, 3];
function BrowsePage() {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="mb-4 font-medium text-lg">Search Results ({randomJob.length})</h1>
      <div className="grid grid-cols-3 gap-4">
        {randomJob.map((job, index) => (
          <Job></Job>
        ))}
      </div>
    </div>
  );
}

export default BrowsePage;

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-[#6a38c2]">404</h1>
        
        {/* Job-themed illustration */}
        <div className="my-8 flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-20 w-20 text-gray-400" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute top-0 -right-4 h-16 w-16 bg-[#F83002] rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute bottom-4 -left-4 h-12 w-12 bg-[#6a38c2] rounded-full opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
        
        {/* Message */}
        <h2 className="text-3xl font-semibold mb-3">Job Not Found</h2>
        <p className="text-gray-600 text-lg mb-8">
          The position you're looking for seems to have been filled or moved.
          <br />Don't worry, we have plenty of other opportunities!
        </p>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-2 border-[#6a38c2] text-[#6a38c2] hover:bg-[#6a38c2] hover:text-white"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          
          <Link to="/browse">
            <Button className="bg-[#6a38c2] hover:bg-[#522b95] text-white">
              Browse Jobs
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
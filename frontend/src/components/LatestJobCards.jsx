import React from "react";
import { Badge } from "./ui/badge";

function LatestJobCards() {
  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className = "font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet.</p>        
      </div>
      <div className="flex gap-2 my-2">
        <Badge className = "text-pink-500" variant="ghost">Position</Badge>
        <Badge className = "text-red-600" variant="ghost">Part Time</Badge>
        <Badge className = "text-purple-700" variant="ghost">24 LPA</Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;

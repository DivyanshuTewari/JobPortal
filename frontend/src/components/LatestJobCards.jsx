import React from "react";
import { Badge } from "./ui/badge";

function LatestJobCards({job}) {
  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className = "font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>        
      </div>
      <div className="flex gap-2 my-2">
        <Badge className = "text-pink-500" variant="ghost">{job?.position} Positions</Badge>
        <Badge className = "text-red-600" variant="ghost">{job?.jobType}</Badge>
        <Badge className = "text-purple-700" variant="ghost">{job?.salary} LPA</Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;

import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { setAllAppliedJobs } from '@/redux/jobSlice';

function LatestJobCards({job}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const { allAppliedJobs } = useSelector(store => store.job);
  const [isApplying, setIsApplying] = useState(false);

  const isBookmarked = user?.bookmarks?.includes(job?._id);
  
  // Check if applied logic (reused from Job.jsx)
  const isApplied = allAppliedJobs?.some(appliedJob => {
    const appliedJobId = appliedJob?.job?._id || appliedJob?.job;
    return appliedJobId === job?._id;
  }) || job?.applications?.some(app => app.applicant === user?._id) || false;

  const saveJobHandler = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.get(`${USER_API_END_POINT}/bookmark/${job?._id}`, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        
        let updatedBookmarks;
        if (isBookmarked) {
            updatedBookmarks = user.bookmarks.filter(id => id !== job._id);
        } else {
            updatedBookmarks = [...(user.bookmarks || []), job._id];
        }
        dispatch(setUser({...user, bookmarks: updatedBookmarks}));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const handleApply = async (e) => {
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }
    
    if (isApplied) {
      return;
    }
    
    setIsApplying(true);
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${job?._id}`, {
        withCredentials: true
      });
      
      if (res.data.success) {
        toast.success(res.data.message);
        // Refresh applied jobs
        try {
          const appliedRes = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
            withCredentials: true
          });
          if (appliedRes.data.success) {
            dispatch(setAllAppliedJobs(appliedRes.data.application));
          }
        } catch (error) {
          console.log('Error refreshing applied jobs:', error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to apply for job');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div onClick={()=> navigate(`/description/${job._id}`)} className="p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="p-6" variant="outline" size="icon">
                <Avatar>
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
            </Button>
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">{job?.location}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="rounded-full" 
            size="icon"
            onClick={saveJobHandler}
          >
            <Bookmark className={isBookmarked ? "fill-black" : ""} />
          </Button>
      </div>
      <div>
        <h1 className = "font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>        
      </div>
      <div className="flex gap-2 my-2">
        <Badge className = "text-pink-500" variant="ghost">{job?.position} Positions</Badge>
        <Badge className = "text-red-600" variant="ghost">{job?.jobType}</Badge>
        <Badge className = "text-purple-700" variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button 
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/description/${job?._id}`);
            }} 
            variant='outline'
            className='hover:scale-105 transition-all duration-300'
        >
            Details
        </Button>
        <Button 
            onClick={handleApply}
            disabled={isApplied || isApplying}
            className={`${
            isApplied 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all duration-300'
            } text-white`}
        >
            {isApplying ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>
    </div>
  );
}

export default LatestJobCards;

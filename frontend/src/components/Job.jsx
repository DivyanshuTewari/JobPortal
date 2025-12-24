import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage } from './ui/avatar'
import { Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { setAllAppliedJobs } from '@/redux/jobSlice'
import { toast } from 'sonner'

function Job({job}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const { allAppliedJobs } = useSelector(store => store.job);
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  
  // Check if user has already applied to this job
  useEffect(() => {
    if (!job?._id || !user?._id) {
      setIsApplied(false);
      return;
    }

    // Primary method: Check if this job ID exists in the applied jobs list
    if (allAppliedJobs && allAppliedJobs.length > 0) {
      const hasApplied = allAppliedJobs.some(appliedJob => {
        // Handle both cases: job as ObjectId string or populated object
        const appliedJobId = appliedJob?.job?._id || appliedJob?.job;
        const jobId = job._id;
        
        // Compare as strings to handle ObjectId comparison
        return (
          appliedJobId === jobId || 
          appliedJobId?.toString() === jobId?.toString() ||
          String(appliedJobId) === String(jobId)
        );
      });
      setIsApplied(hasApplied);
      return;
    }
    
    // Fallback: Check if applications array contains user's ID
    if (job?.applications && Array.isArray(job.applications)) {
      const hasApplied = job.applications.some(application => {
        if (typeof application === 'string') {
          return false;
        }
        const applicantId = application?.applicant?._id || application?.applicant;
        return (
          applicantId === user._id || 
          applicantId?.toString() === user._id?.toString() ||
          String(applicantId) === String(user._id)
        );
      });
      setIsApplied(hasApplied);
    } else {
      setIsApplied(false);
    }
  }, [job?._id, job?.applications, allAppliedJobs, user?._id]);
  
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or interactive elements
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    navigate(`/description/${job?._id}`);
  };
  
  const handleApply = async (e) => {
    e.stopPropagation(); // Prevent card click when clicking Apply button
    
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }
    
    if (isApplied) {
      return; // Already applied, do nothing
    }
    
    setIsApplying(true);
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${job?._id}`, {
        withCredentials: true
      });
      
      if (res.data.success) {
        setIsApplied(true);
        toast.success(res.data.message);
        
        // Refresh applied jobs list to update all job cards
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
    <div 
      onClick={handleCardClick}
      className="p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <p className = 'text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button 
          variant="outline" 
          className="rounded-full" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking bookmark
          }}
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src= {job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className = 'font-medium text-lg'>{job?.company?.name}</h1>
          <p className ='text-sm text-gray-500'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm  text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex gap-2 my-2">
        <Badge className="text-pink-500" variant="ghost">{job?.position} position</Badge>
        <Badge className="text-red-600" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-purple-700" variant="ghost">{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click when clicking Details button
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
          {isApplying ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply'}
        </Button>
      </div>
    </div>
  );
}

export default Job
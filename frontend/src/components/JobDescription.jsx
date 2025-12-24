import React, { use, useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { calculateMatchScore } from '@/utils/matchScore';

function JobDescription() {
  const {singleJob} = useSelector(store => store.job);
  const {user} = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false; ;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [matchScore, setMatchScore] = useState(0);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const isBookmarked = user?.bookmarks?.includes(jobId);

  const saveJobHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/bookmark/${jobId}`, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        let updatedBookmarks;
        if (isBookmarked) {
            updatedBookmarks = user.bookmarks.filter(id => id !== jobId);
        } else {
            updatedBookmarks = [...(user.bookmarks || []), jobId];
        }
        dispatch(setUser({...user, bookmarks: updatedBookmarks}));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
  
  const applyJobHandler = async () => {
    try{
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true});
      console.log(res.data);
      if(res.data.success){
        setIsApplied(true); //update the local state
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]};
        dispatch(setSingleJob(updatedSingleJob)); //update the real time UI
        toast.success(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    if (singleJob && user) {
        const score = calculateMatchScore(user, singleJob);
        setMatchScore(score);
    }
  }, [singleJob, user]);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job?.applications?.some(application => application.applicant == user?._id) || false);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className = 'flex items-center justify-between' >
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
          <div className="flex gap-2 my-2">
            <Badge className="text-pink-500" variant="ghost">{singleJob?.position} positions</Badge>
            <Badge className="text-red-600" variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className="text-purple-700" variant="ghost">{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <Button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className ={`rounded-lg ${isApplied ? 'bg-gray-600' : 'bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all duration-300'}`}>{isApplied ? 'Already Applied' : 'Apply Now' }</Button>
            <Button onClick={saveJobHandler} variant="outline" size="icon" className="rounded-full hover:scale-105 transition-all duration-300">
                <Bookmark className={isBookmarked ? "fill-purple-600 text-purple-600" : ""} />
            </Button>
        </div>
      </div>
      <h1 className = 'border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      
      {/* Match Score Indicator */}
      {user && (
        <div className="my-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h2 className="font-bold text-lg mb-2">Profile Match Score</h2>
          <div className="flex items-center gap-4">
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  matchScore >= 70 ? 'bg-green-500' : 
                  matchScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`} 
                style={{ width: `${matchScore}%` }}
              ></div>
            </div>
            <span className="font-bold text-xl min-w-[3ch]">{matchScore}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {matchScore >= 70 ? "Excellent match! Your skills align well with this job." : 
             matchScore >= 40 ? "Good match. You have some relevant skills." : 
             "Low match. You might need to upskill for this role."}
          </p>
        </div>
      )}

      <div className = 'my-4'>
        <h1 className='font-bold my-1'>Role: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted On: <span className = 'pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>


      </div>
      
    </div>
  );
}

export default JobDescription
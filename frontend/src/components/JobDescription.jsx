import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button';

function JobDescription() {
  const isApplied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className = 'flex items-center justify-between' >
        <div>
          <h1 className="font-bold text-xl ">Frontend Developer</h1>
          <div className="flex gap-2 my-2">
            <Badge className="text-pink-500" variant="ghost"> Position</Badge>
            <Badge className="text-red-600" variant="ghost"> Part Time</Badge>
            <Badge className="text-purple-700" variant="ghost">24 LPA</Badge>
          </div>
        </div>
        
        <Button disabled={isApplied} className ={`rounded-lg ${isApplied ? 'bg-gray-600' : 'bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all duration-300'}`}>{isApplied ? 'Already Applied' : 'Apply Now' }</Button>
           
      </div>
      <h1 className = 'border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className = 'my-4'>
        <h1 className='font-bold my-1'>Role: <span className = 'pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
        <h1 className='font-bold my-1'>Location: <span className = 'pl-4 font-normal text-gray-800'>Remote</span></h1>
        <h1 className='font-bold my-1'>Description: <span className = 'pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className = 'pl-4 font-normal text-gray-800'>2 yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className = 'pl-4 font-normal text-gray-800'>24 LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>5</span></h1>
        <h1 className='font-bold my-1'>Posted On: <span className = 'pl-4 font-normal text-gray-800'>15-05-2025</span></h1>


      </div>
      
    </div>
  );
}

export default JobDescription
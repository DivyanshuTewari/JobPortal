import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage } from './ui/avatar'
import { Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDifference = currentDate - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  }
  return (
    <div className="p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className = 'text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
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
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className='hover:scale-105 transition-all duration-300' >
          Details
        </Button>
        <Button className='bg-pink-500 hover:bg-pink-600 hover:scale-105 transition-all duration-300 text-white' >
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default Job
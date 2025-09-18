import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { AvatarImage } from './ui/avatar'
import { Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job() {
  const navigate = useNavigate();
  const jobId ="fdsf3df";
  return (
    <div className="p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className = 'text-sm text-gray-500'>2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1420804.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className = 'font-medium text-lg'>Company Name</h1>
          <p className ='text-sm text-gray-500'>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm  text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          dignissimos eligendi deleniti molestiae numquam cum.
        </p>
      </div>
      <div className="flex gap-2 my-2">
        <Badge className="text-pink-500" variant="ghost"> Position</Badge>
        <Badge className="text-red-600" variant="ghost"> Part Time</Badge>
        <Badge className="text-purple-700" variant="ghost">24 LPA </Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={()=>navigate(`/description/${jobId}`)} variant='outline' className='hover:scale-105 transition-all duration-300' >
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
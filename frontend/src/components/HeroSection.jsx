import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <div className="text-center">
    <div className="flex flex-col gap-6 my-12">    
    <span className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white font-semibold shadow-md">
       Power Your Career Journey
    </span>
    
    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
      Find. Apply. <br /> 
      Build Your{" "}
      <span className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
        Future
      </span>
    </h1>
    
    <p className="max-w-2xl mx-auto text-gray-600 text-lg">
      Join thousands of professionals taking the next step in their careers. 
      Explore opportunities, connect with top recruiters, and land the job that matches your passion.
    </p>

    <div className = 'flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
      <input type = 'text' placeholder='Find your dream job' onChange={(e) => setQuery(e.target.value)} className = 'outline-none border-none w-full'></input>
      <Button onClick={searchJobHandler}>
        <Search/>
      </Button> 
    </div>
  </div>
</div>

     
  )
}
 
export default HeroSection
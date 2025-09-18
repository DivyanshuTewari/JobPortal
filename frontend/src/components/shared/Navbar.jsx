import React from 'react'
import { Popover, PopoverTrigger , PopoverContent } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import store from '@/redux/store'


function Navbar() {
    
    const {user} = useSelector(store=>store.auth);
    return (
    <div className='bg-white'>
        <div className = "flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
            <h1 className='text-2xl font-bold'>Hire<span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">Sphere</span></h1>
            </div>
            <div className = "flex items-center gap-12">         
                <ul className="flex font-medium items-center gap-5">
                    <li>
                    <NavLink to="/" className={({ isActive }) =>
                    isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"}>
                    Home </NavLink>
                    </li>
                    <li>
                    <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600" } >
                    Jobs </NavLink>
                    </li>
                    <li>
                    <NavLink to="/browse" className={({ isActive }) =>isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600" }>
                    Browse
                    </NavLink>
                    </li>
                </ul>

                {
                    !user ? (
                        <div className = 'flex items-center gap-2'>
                            <Link to = '/login'>                            
                            <Button variant="outline"> Login </Button>
                            </Link>
                            <Link to = '/signup'>
                            <Button className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white hover:from-purple-700 hover:via-pink-600 hover:to-red-600"> Sign Up </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover >
                            <PopoverTrigger asChild>
                                <Avatar className = "cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className = "cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>Divyanshu Tewari</h4>
                                        <p className='text-sm text-muted-foreground'>Lorem ipsum, dolor sit amet </p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <User2/>
                                        <Button  variant="link"  className="!border-none !shadow-none !bg-transparent hover:!bg-transparent focus:!ring-0">
                                            <Link to='/profile'>View Profile</Link>
                                        </Button>
                                    </div>
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut/>
                                        <Button  variant="link"  className="!border-none !shadow-none !bg-transparent hover:!bg-transparent focus:!ring-0">
                                            Logout
                                        </Button>
                                    </div>                            
                                </div>                        
                            </PopoverContent>
                        </Popover>
                )}               
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
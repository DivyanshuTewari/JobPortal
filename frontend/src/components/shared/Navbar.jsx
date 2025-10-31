import React from 'react'
import { Popover, PopoverTrigger , PopoverContent } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'



function Navbar() {
     
    const {user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try{
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if(res.data.success)
            {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
    <div className='bg-white'>
        <div className = "flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
            <h1 className='text-2xl font-bold'>Hire<span className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">Sphere</span></h1>
            </div>
            <div className = "flex items-center gap-12">         
                <ul className="flex font-medium items-center gap-5">
                    {
                        user && user.role == "recruiter" ? (
                                <>
                                    <li>
                                        <NavLink to="/admin/companies" className={({ isActive }) =>
                                            isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"}>
                                            Companies</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/jobs" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"} >
                                            Jobs </NavLink>
                                    </li>
                                </>
                            ) : (

                                <>
                                    <li>
                                        <NavLink to="/" className={({ isActive }) =>
                                            isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"}>
                                            Home </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/jobs" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"} >
                                            Jobs </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/browse" className={({ isActive }) => isActive ? "text-red-600 font-semibold" : "text-gray-700 hover:text-pink-600"}>
                                            Browse
                                        </NavLink>
                                    </li>
                                </>

                            )
                    }
                    
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
                                <AvatarImage src= {user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className='flex gap-4 space-y-2'>
                                    <Avatar className = "cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium'>{user?.fullname}</h4>
                                        <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col my-2 text-gray-600'>
                                    
                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                        <LogOut/>
                                        <Button onClick={logoutHandler} variant="link"  className="cursor-pointer !border-none !shadow-none !bg-transparent hover:!bg-transparent focus:!ring-0">
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
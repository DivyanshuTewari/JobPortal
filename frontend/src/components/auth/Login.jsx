import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";


const Login = ()=> {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();    
    try{
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    }
    catch(error)
    {
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/3 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-3">
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            />
          </div>

          <div className="my-3">
            <Label className="my-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="student"
              className="flex items-center gap-4 my-3"
            >
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <label htmlFor="r1" className="cursor-pointer">
                  Student
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> : <Button type="submit"
            className="w-full my-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white hover:from-pink-600 hover:via-red-600 hover:to-purple-700">
            Log In </Button>                        
          }
          
          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 mx-2">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;

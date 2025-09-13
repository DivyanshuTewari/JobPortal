import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file", input.file);
    }
    try{
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login");
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
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>
          <div className="my-3">
            <Label className="my-2">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your name"
            />
          </div>
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
            <Label className="my-2 ">Phone number</Label>
            <Input
              type="number"
              placeholder="Enter your mobile number "
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
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

          <div className="flex items-center gap-2"></div>
          <Label className="my-2">Profile</Label>
          <Input
            accept="image/*"
            type="file"
            onChange={changeFileHandler}
            className="cursor-pointer"
          />
          {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button> : <Button type="submit"
            className="w-full my-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white hover:from-pink-600 hover:via-red-600 hover:to-purple-700">
            Sign Up </Button>                        
          }
          <span className="text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-600 mx-2">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;

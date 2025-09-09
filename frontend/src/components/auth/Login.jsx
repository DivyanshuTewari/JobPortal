import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
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

          <Button
            type="submit"
            className="w-full my-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white hover:from-pink-600 hover:via-red-600 hover:to-purple-700"
          >
            Log In
          </Button>
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

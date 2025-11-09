import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'



const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  })
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const {companies} = useSelector(store => store.company);
  const changeEventHandler = (e) => { setInput({ ...input, [e.target.name]: e.target.value }) };
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(company => company.name.toLowerCase() == value);
    setInput({ ...input, companyId: selectedCompany._id });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type' : 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    }
    catch(error){
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />


      <div className="max-w-3xl mx-auto px-6 py-12">

        <div className="bg-white rounded-2xl shadow-md px-8 py-10">

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
            Post a New Job
          </h2>

          <form onSubmit = {submitHandler}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Description
                </Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Requirements
                </Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Salary
                </Label>
                <Input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Job Type
                </Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Experience Level
                </Label>
                <Input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>


              <div>
                <Label className="block mb-2 text-gray-700 text-sm font-medium">
                  Number of Positions
                </Label>
                <Input
                  type="number"
                  min="0"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {
                  companies.length > 0 && (
                    <Select onValueChange ={selectChangeHandler}>
                      <SelectTrigger className = "w-[180px]">
                        <SelectValue placeholder = "Select a Company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {
                            companies.map((company) => {
                              return(
                                <SelectItem value = {company?.name?.toLowerCase()}>
                                  {company.name}
                                </SelectItem>
                              )
                            })
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) 
              }
            </div>
            {
            loading ? <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>: <Button type= "submit" className="w-full my-4">Post New Job</Button>
            }
            {
              companies.length == 0 && <p className = 'text-xs font-bold text-red-600 text-center my-3'>*Please register a company first, before posting jobs</p>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostJob

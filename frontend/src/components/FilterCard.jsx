import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
const filterData = [
  {
    filterType: 'Location',
    array:["Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Kolkata", "Jaipur"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer", "Product Manager", "Designer", "QA Engineer"]
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15-20 LPA", "20-30 LPA", "30+ LPA"]
  }

]

function FilterCard() {
  return (
    <div className= 'w-full bg-white p-3 rounded-md'>
      
      <h1 className='font-bold text-lg '>Filter Jobs</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div>
              <h1 className = 'font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index)=>{
                  return (
                    <div className='flex items-center space-x-2 my-2 '>
                      <RadioGroupItem value = {item}/>
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>

          )) 
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
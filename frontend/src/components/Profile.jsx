import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './Footer'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';

const skills =["Html" , "Css" , "JavaScript" , "React" , "NodeJs" , "ExpressJs" , "MongoDB" , "MySQL" ]
function Profile() {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4 ">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1420804.jpg" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias non debitis perspiciatis, sapiente adipisci illo!
              </p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen></Pen>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>divyanshutiwari@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>7505738477</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="my-2">Skills</h1>
          <div className="flex items-center gap-1">
            {skills.length != 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>No Skills Added</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a target="blank" href="https://youtube.com" className="">
              {" "}
              DivyanshuResume
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl ">
        <h1 className = ' font-bold text-lg mt-8 mb-4'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <Footer />
    </div>
  );
}

export default Profile
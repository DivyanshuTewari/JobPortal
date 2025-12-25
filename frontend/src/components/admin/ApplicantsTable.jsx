import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = ["Viewed", "Shortlisted", "Interview", "Offer", "Rejected"]; 

const ApplicantsTable = () => {
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const payloadStatus = status === "Offer" ? "Accepted" : status;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, {status: payloadStatus}, {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }            
        } catch (error) {
            toast.error(error.response.data.message);            
        }
    }
    const {applicants} = useSelector( store => store.application);
    return (
    <div>
        <Table>
            <TableCaption>
                List of all applicants for the job
            </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((application) =>(
                            <TableRow key={application._id}>
                                <TableCell>{application?.applicant?.fullname}</TableCell>
                                <TableCell>{application?.applicant?.email}</TableCell>
                                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 cursor-pointer">
                                    {application?.applicant?.profile?.resume ? (
                                        <a
                                            href={application.applicant.profile.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                        >
                                            {application.applicant.profile.resumeOriginalName || "View Resume"}
                                        </a>
                                    ) : (
                                        <span className="text-gray-500 italic">No Resume</span>
                                    )}
                                </TableCell>

                                <TableCell>{application?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, application?._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </TableRow>
                        ))
                    }                    
                </TableBody>

            
        </Table>
    </div>
  )
}

export default ApplicantsTable

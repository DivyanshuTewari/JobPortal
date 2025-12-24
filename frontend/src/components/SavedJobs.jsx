import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import Job from './Job';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/bookmarks`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setSavedJobs(res.data.bookmarks);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSavedJobs();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <h1 className='font-bold text-xl my-5'>Saved Jobs</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                    {
                        savedJobs.length <= 0 ? <span>No Saved Jobs Found</span> : savedJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SavedJobs;
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  You haven't applied for any job
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className='text-right'>
                          <Badge
                              className={
                                  appliedJob.status === 'accepted'
                                      ? 'bg-pink-500 text-white shadow-md hover:opacity-90'
                                      : appliedJob.status === 'rejected'
                                          ? 'bg-destructive text-white'
                                          : 'bg-secondary text-black'
                              }
                          >
                              {appliedJob.status}
                          </Badge>

                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable

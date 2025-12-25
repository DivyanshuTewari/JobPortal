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
            <TableHead>Timeline</TableHead>
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
                  <TableCell>
                    {(() => {
                      const order = ["pending","viewed","shortlisted","interview","accepted","rejected"];
                      const idx = order.indexOf(appliedJob?.status);
                      const isRejected = appliedJob?.status === "rejected";
                      return (
                        <div className="flex items-center gap-1">
                          {order.map((step, i) => {
                            const active = (idx >= i && !isRejected) || (isRejected && step === "rejected");
                            return (
                              <div key={step} className="flex items-center gap-1">
                                <div className={`${active ? 'bg-gradient-to-br from-purple-600 to-pink-500' : 'bg-gray-200'} w-4 h-4 rounded-full`} />
                                {i < order.length - 1 && <div className={`${active ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-gray-300'} w-6 h-0.5 rounded`} />}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })()}
                  </TableCell>
                  <TableCell className='text-right'>
                          <Badge
                              className={
                                  appliedJob.status === 'accepted'
                                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                                      : appliedJob.status === 'rejected'
                                          ? 'bg-red-600 text-white'
                                          : appliedJob.status === 'shortlisted'
                                              ? 'bg-blue-600 text-white'
                                              : appliedJob.status === 'interview'
                                                  ? 'bg-amber-500 text-white'
                                                  : appliedJob.status === 'viewed'
                                                      ? 'bg-gray-700 text-white'
                                                      : 'bg-gray-300 text-black'
                              }
                          >
                              {appliedJob.status === 'accepted' ? 'Offer' : appliedJob.status}
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

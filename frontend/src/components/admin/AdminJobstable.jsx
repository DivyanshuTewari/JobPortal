import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector((store) => store.job || {})
  const [filterJobs, setFilterJobs] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const filteredJobs =
      Array.isArray(allAdminJobs) && allAdminJobs.length > 0
        ? allAdminJobs.filter((job) => {
            if (!searchJobByText) return true
            return (
              job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
              job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            )
          })
        : []

    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>List of all recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job.company?.name}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent>
                    <Edit2
                      onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                      style={{ cursor: 'pointer' }}
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable

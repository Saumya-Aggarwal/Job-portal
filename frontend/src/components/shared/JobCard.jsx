import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'

function JobCard({job}) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/description/${job._id}`)
  }
  return (

    <div className='border px-4 py-3 rounded-md shadow-lg border-gray-100 cursor-pointer' onClick={handleClick}> 
      <h3 className='font-medium text-lg uppercase'>{job.company.name}</h3>
      <p className='text-sm text-gray-500'>{job.location}</p>
       <div><h3 className='font-bold text-lg my-1'>{job.title}</h3>
       <p className='text-sm text-gray-500'>{job.description} </p></div>
       <div className=' space-x-2 mt-2'>
       <Badge className = "text-blue-400" variant = "ghost">{job.position} Positions</Badge>
       <Badge className = "text-red-500" variant = "ghost">{job.jobType}</Badge>
       <Badge className = "text-[#6a38c2]" variant = "ghost">{job.salary} LPA</Badge>

       </div>
      </div>
  )
}

export default JobCard
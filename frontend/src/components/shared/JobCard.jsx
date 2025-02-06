import React from 'react'
import { Badge } from "@/components/ui/badge"

function JobCard({job}) {
  return (

    <div className='border px-4 py-3 rounded-md shadow-lg border-gray-100 cursor-pointer' >
      <h3 className='font-medium text-lg'>Company Name</h3>
      <p className='text-sm text-gray-500'>Country</p>
       <div><h3 className='font-bold text-lg my-1'>Job title</h3>
       <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p></div>
       <div className=' space-x-2 mt-2'>
       <Badge className = "text-blue-400" variant = "ghost">12 Positions</Badge>
       <Badge className = "text-red-500" variant = "ghost">Part Time</Badge>
       <Badge className = "text-[#6a38c2]" variant = "ghost">24 LPA</Badge>

       </div>
      </div>
  )
}

export default JobCard
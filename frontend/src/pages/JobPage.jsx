import React from 'react'
import FilterCard from '../components/shared/FilterCard'
import Job from '../components/shared/Job'

function JobPage() {
  return (
    <div className='flex max-w-7xl mx-auto p-5'>
      <FilterCard/>
      <Job></Job>
    </div>
  )
}

export default JobPage
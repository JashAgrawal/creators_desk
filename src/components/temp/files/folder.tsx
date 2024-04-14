import React from 'react'
import { FaFolder } from 'react-icons/fa6'

const Folder = () => {
  return (
    <div className='flex rounded-lg overflow-hidden'>
       <div className='h-48 w-48'>
        
        </div> 
    <div className='flex p-3 items-center space-x-3'>
        <FaFolder/>
        <p>My Folder</p>
        <div>

        </div>
    </div>
    </div>
  )
}

export default Folder
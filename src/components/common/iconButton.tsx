import React from 'react'

const IconButton = ({handleClick, children}: {handleClick: any, children: any}) => {
  return (
    <div onClick={handleClick} className='p-1 hover:bg-gray-200 rounded-full'>
        {children}
    </div>
  )
}

export default IconButton
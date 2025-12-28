import React from 'react'

const Data = ({icon, data, title}) => {
  return (
    <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all'>
      <img className='w-14' src={icon} alt="" />
      <div>
        <p className='text-xl font-semibold text-gray-600'>
            {data}
        </p>
        <p className='text-gray-400'>{title}</p>
      </div>
    </div>
  )
}

export default Data

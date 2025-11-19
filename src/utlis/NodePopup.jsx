import React from 'react'

const NodePopup = ({id, onClose}) => {
  return (
    <div className='fixed inset-0 bg-black/30 flex items-center justify-center'>
      <div className='bg-white rounded-xl p-6 w-96'>
        <div className='flex justify-between items-start'>
          <div>
            <div className='text-sm text-gray-400'>Member</div>
            <div className='text-lg font-semibold'>{id}</div>
          </div>
          <button onClick={onClose} className='text-gray-400'>Close</button>
        </div>
        <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
          <div>
            <div className='text-xs text-gray-400'>Package</div>
            <div className='font-medium'>$50,000</div>
          </div>
          <div>
            <div className='text-xs text-gray-400'>Status</div>
            <div className='font-medium text-green-600'>Active</div>
          </div>
          <div>
            <div className='text-xs text-gray-400'>Total Earnings</div>
            <div className='font-medium'>$1,250</div>
          </div>
          <div>
            <div className='text-xs text-gray-400'>Downlines</div>
            <div className='font-medium'>3</div>
          </div>
        </div>
        <div className='mt-6 flex gap-3'>
          <button className='px-4 py-2 bg-velox-900 text-white rounded'>View Profile</button>
          <button className='px-4 py-2 border rounded' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default NodePopup

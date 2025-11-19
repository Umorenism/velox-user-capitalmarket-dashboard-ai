import React from 'react'

const MatrixSidebar = () => {
  return (
    <aside className='w-72 bg-white border-r p-6'>
      <h3 className='text-sm text-gray-500'>My Matrix</h3>
      <div className='mt-4'>
        <div className='text-xs text-gray-400'>Rank</div>
        <div className='font-semibold text-velox-900'>VIP</div>
        <div className='mt-4 text-xs text-gray-400'>User ID</div>
        <div className='text-sm font-medium'>123456</div>
        <div className='mt-4'>
          <div className='text-xs text-gray-400'>Wallet Balance</div>
          <div className='text-xl font-semibold'>250 USDT</div>
        </div>
        <div className='mt-4'>
          <div className='text-xs text-gray-400'>Active Package</div>
          <div className='text-lg font-medium'>$50,000</div>
        </div>
        <div className='mt-6'>
          <div className='text-xs text-gray-400'>Referral Link</div>
          <input readOnly value={'https://velox.io/ref/abc123'} className='mt-2 text-xs p-2 w-full border rounded' />
        </div>
        <div className='mt-4'>
          <div className='text-xs text-gray-400'>QR Code (USDT)</div>
          <div className='w-24 h-24 bg-gray-100 mt-2 flex items-center justify-center text-xs text-gray-400'>QR</div>
        </div>
        <div className='mt-4 text-sm'>
          <div>KYC Status: <span className='font-medium text-green-600'>Verified</span></div>
        </div>
      </div>
    </aside>
  )
}

export default MatrixSidebar

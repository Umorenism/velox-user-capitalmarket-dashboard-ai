import React, {useState} from 'react'
import NodePopup from './NodePopup'


const MatrixGrid = () => {
  // We'll render first 4 levels (1 + 3 + 9 + 27) as a preview for desktop
  const levels = [1,3,9,27]
  const [selected, setSelected] = useState(null)
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm'>
      <h2 className='text-xl font-semibold text-velox-900'>3x10 Forced Matrix</h2>
      <p className='text-sm text-gray-500'>Click a node to view member details</p>
      <div className='mt-6 flex flex-col gap-6 items-center'>
        {levels.map((count, li) => (
          <div key={li} className='flex gap-4 justify-center flex-wrap'>
            {[...Array(count)].map((_, i) => {
              const id = `L${li+1}-N${i+1}`
              return (
                <button key={i}
                  onClick={() => setSelected(id)}
                  className='w-20 h-20 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center hover:shadow cursor-pointer'>
                  <div className='w-10 h-10 rounded-full bg-gray-200 mb-1' />
                  <div className='text-xs text-gray-600'>{id}</div>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {selected && <NodePopup id={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default MatrixGrid

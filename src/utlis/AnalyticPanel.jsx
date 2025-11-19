import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  {month: 'Jan', roi: 5.2},
  {month: 'Feb', roi: 6.1},
  {month: 'Mar', roi: 7.5},
  {month: 'Apr', roi: 6.8},
  {month: 'May', roi: 7.2},
  {month: 'Jun', roi: 7.5},
]

const AnalyticsPanel = () => {
  return (
    <div className='bg-white rounded-2xl p-6 shadow-sm'>
      <h3 className='text-lg font-semibold text-velox-900'>AI Trading</h3>
      <div className='text-sm text-gray-500 mt-1'>Monthly ROI</div>
      <div className='mt-4 h-40'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data}>
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='roi' stroke='#0B4FA6' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-4 text-sm space-y-2'>
        <div>Equity Growth: <span className='font-medium'>18.2%</span></div>
        <div>Drawdown: <span className='font-medium'>5.7%</span></div>
        <div>Profit Share: <span className='font-medium'>50/50</span></div>
      </div>
    </div>
  )
}

export default AnalyticsPanel

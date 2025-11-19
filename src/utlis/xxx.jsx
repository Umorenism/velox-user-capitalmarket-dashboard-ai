'use client';

import React from 'react';
import { QrCode, CheckCircle, ChevronDown } from 'lucide-react';

export default function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* My Matrix Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">MY MATRIX</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-amber-500">Rank</span>
                  <span className="text-2xl font-bold text-gray-900">VIP</span>
                </div>
                <p className="text-sm text-gray-500 mb-1">User ID: 123456</p>
                
                <div className="space-y-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Wallet Balance</p>
                    <p className="text-2xl font-bold text-gray-900">250 USDT</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Active Package</p>
                    <p className="text-2xl font-bold text-green-600">$50 K</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Total Team</p>
                    <p className="text-2xl font-bold text-gray-900">2,756</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Referral Link</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value="https://example.com/refcode"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    />
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                      Copy
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-3">QR Code</p>
                  <p className="text-xs text-gray-400 mb-3">for direct deposit</p>
                  <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
                    <div className="w-32 h-32 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-3">KYC Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Matrix Tree */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex-1"></div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-end">
                    <h3 className="text-lg font-bold text-gray-900">AI TRADING</h3>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Level 1 */}
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>

                  {/* Level 2 */}
                  <div className="flex justify-center gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>

                  {/* Level 3 */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <div key={i} className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>

                  {/* Level 4 */}
                  <div className="flex justify-center gap-4 flex-wrap">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                      <div key={i} className="w-12 h-12 bg-gray-100 rounded-full"></div>
                    ))}
                  </div>
                </div>

                {/* AI Trading Stats */}
                <div className="mt-8 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Monthly ROI</p>
                    <p className="text-2xl font-bold text-gray-900">7.5%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Equity Growth</p>
                    <p className="text-2xl font-bold text-green-600">18.2%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Drawdown</p>
                    <p className="text-xl font-bold text-red-600">5.7%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Profit Share</p>
                    <p className="text-xl font-bold text-gray-900">50/50</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Team Performance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6">TEAM PERFORMANCE</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b border-gray-200">
                        <th className="text-left py-3 font-medium">Level</th>
                        <th className="text-center py-3 font-medium">Members</th>
                        <th className="text-right py-3 font-medium">Total Deposit (USDT)</th>
                        <th className="text-center py-3 font-medium">Active %</th>
                        <th className="text-right py-3 font-medium">Active Per Level</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Level 1</td>
                        <td className="text-center py-3">3</td>
                        <td className="text-right py-3">150,000</td>
                        <td className="text-center py-3">100%</td>
                        <td className="text-right py-3 text-green-600 font-medium">8.2%</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Level 2</td>
                        <td className="text-center py-3">9</td>
                        <td className="text-right py-3">420,000</td>
                        <td className="text-center py-3">95%</td>
                        <td className="text-right py-3 text-green-600 font-medium">7.5%</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Level 3</td>
                        <td className="text-center py-3">27</td>
                        <td className="text-right py-3">1,080,000</td>
                        <td className="text-center py-3">90%</td>
                        <td className="text-right py-3 text-green-600 font-medium">7.5%</td>
                      </tr>
                      <tr>
                        <td className="py-3">Level 4</td>
                        <td className="text-center py-3">5</td>
                        <td className="text-right py-3">150,000</td>
                        <td className="text-center py-3">80%</td>
                        <td className="text-right py-3 text-green-600 font-medium">7.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Earnings Summary */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">$1,250</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Withdrawable Profit</p>
                    <p className="text-2xl font-bold text-green-600">$890</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Active Investment</p>
                    <p className="text-xl font-bold text-gray-900">$500</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">RebaCoates</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
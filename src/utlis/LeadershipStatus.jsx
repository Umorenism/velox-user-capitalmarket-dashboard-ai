import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowRight } from "lucide-react";

const LeadershipStatus = () => {
  // Pie chart data
  const data = [
    { name: "Achieved Volume", value: 68000 },
    { name: "Remaining Volume", value: 32000 },
  ];

  const COLORS = ["#16A34A", "#E5E7EB"]; // green + light gray

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
            <span className="text-yellow-500 text-lg">👑</span> Leadership Status
          </h2>

          {/* Rank Info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Current Rank</p>
              <p className="font-semibold text-gray-800">Manager</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Next Rank</p>
              <p className="font-semibold text-blue-600">Director</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Eligibility</p>
              <p className="font-semibold text-green-600">Eligible</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Next Bonus</p>
              <p className="font-semibold text-yellow-600">
                $10,000 <span className="text-gray-500 text-xs">• Regional Retreat</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-700 mb-1">Progress to Next Rank:</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div
                className="bg-gray-800 h-2.5 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">68% Completed</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-5">
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2">
              🏆 View Rank Rewards
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm px-4 py-2 rounded-md flex items-center gap-1">
              Action Steps
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          {/* Performance Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-gray-800 font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-600 text-lg">🎯</span> Performance Progress
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Action Steps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-gray-800 font-semibold mb-3">
              Action Required to Reach Next Rank
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-4 list-disc pl-5">
              <li>Enroll 2 new direct partners with active trading contracts.</li>
              <li>Achieve $100,000 in total team trading volume.</li>
              <li>Support 2 Managers to reach Director qualification.</li>
              <li>Maintain active participation in the Academy plan.</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
              Start   
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipStatus;

// src/pages/dashboard/Risk.jsx
import React from "react";
import { AlertTriangle } from "lucide-react";

const riskLevels = [
  {
    level: "Low",
    daily: "1%",
    weekly: "up to 10%",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    desc: "Average 1% daily (Mon–Fri), max 10% monthly drawdown.",
  },
  {
    level: "Medium",
    daily: "1–2%",
    weekly: "up to 20%",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    desc: "Average 1–2% daily (Mon–Fri), max 20% monthly drawdown.",
  },
  {
    level: "High",
    daily: "2–5%",
    weekly: "up to 50%",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    desc: "Average 2–5% daily (Mon–Fri), max 50% monthly drawdown.",
  },
];

export default function Risk() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <AlertTriangle size={28} />
        Risk Levels
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {riskLevels.map((risk) => (
          <div
            key={risk.level}
            className={`p-6 rounded-xl shadow-md ${risk.color} border border-transparent hover:shadow-xl transition`}
          >
            <h3 className="text-xl font-bold mb-2">{risk.level} Risk</h3>
            <p className="text-sm mb-3 opacity-80">{risk.desc}</p>
            <div className="flex justify-between text-sm font-medium">
              <span>Daily:</span>
              <span>{risk.daily}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Max Monthly:</span>
              <span>{risk.weekly}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
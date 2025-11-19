

import React, { useState } from "react";
const CompoundCalculator = () => {
  const [startingBalance, setStartingBalance] = useState("");
  const [periods, setPeriods] = useState("");
  const [gainPercent, setGainPercent] = useState("");
  const [results, setResults] = useState([]);
  const [endingBalance, setEndingBalance] = useState(null);
  const [totalGain, setTotalGain] = useState(null);
  const calculate = () => {
    if (!startingBalance || !periods || !gainPercent) return;
    const balance = parseFloat(startingBalance);
    const rate = parseFloat(gainPercent) / 100;
    const totalPeriods = parseInt(periods);
    let data = [];
    let currentBalance = balance;
    for (let i = 1; i <= totalPeriods; i++) {
      const gain = currentBalance * rate;
      const previousBalance = currentBalance;
      currentBalance += gain;
      data.push({
        period: i,
        starting: previousBalance,
        gainPercent: ((currentBalance - balance) / balance) * 100,
        ending: currentBalance,
      });
    }
    const totalGainPercent = ((currentBalance - balance) / balance) * 100;
    setEndingBalance(currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    setTotalGain(totalGainPercent.toFixed(2));
    setResults(data);
  };
  return (
    <div className="flex flex-col dark:bg-neutral-900 dark:text-white items-center py-10 bg-white text-gray-900">
      <h1 className="md:text-4xl text-3xl p-4 md:p-0 font-extrabold tracking-widest mb-8 text-[#0c0c18] italic">
        COMPOUNDING CALCULATOR
      </h1>
      <div className="border rounded-md p-6 w-full max-w-6xl shadow-sm">
        <h2 className="text-center text-gray-600 font-semibold tracking-widest mb-4">
          COMPOUNDING CALCULATOR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Starting balance</label>
            <input
              type="number"
              value={startingBalance}
              onChange={(e) => setStartingBalance(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="20000"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Number of months</label>
            <input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="12"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Gain % per month</label>
            <input
              type="number"
              value={gainPercent}
              onChange={(e) => setGainPercent(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="5"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Calculate
        </button>
        <div className="text-center mt-6 text-gray-600 italic tracking-widest">
          <p>
            <span className="font-semibold">STARTING BALANCE:</span>{" "}
            {startingBalance ? `$${startingBalance}` : "-"}
          </p>
          <p>
            <span className="font-semibold">ENDING BALANCE:</span>{" "}
            {endingBalance ? `$${endingBalance}` : "-"}
          </p>
          <p>
            <span className="font-semibold">TOTAL GAIN:</span>{" "}
            {totalGain ? `${totalGain}%` : "-"}
          </p>
        </div>
        {results.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Period</th>
                  <th className="p-2 border">Starting Balance</th>
                  <th className="p-2 border">Total Gain %</th>
                  <th className="p-2 border">Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.period} className="hover:bg-gray-50">
                    <td className="p-2 border">{row.period}</td>
                    <td className="p-2 border">
                      ${row.starting.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2 border">
                      {row.gainPercent.toFixed(2)}%
                    </td>
                    <td className="p-2 border">
                      ${row.ending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default CompoundCalculator;
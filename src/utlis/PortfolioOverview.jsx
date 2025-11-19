// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "1", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "2", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "3", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "4", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "5", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "6", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "7", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "8", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "9", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "10", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "11", deposit: 200, usd: 250, ib: 300, mt5: 250 },
//   { name: "12", deposit: 200, usd: 250, ib: 300, mt5: 250 },
// ];

// const PortfolioOverview = () => {
//   return (
//     <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-[10px] p-6 shadow-sm border border-gray-100">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         Portfolio Overview
//       </h2>
//       <hr />
//       <div className="w-full h-[400px] ">
//         <ResponsiveContainer>
//           <BarChart
//             data={data}
//             margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" tickLine={false} />
//             <YAxis
//               tickFormatter={(value) => `${value.toFixed(2)}`}
//               tickLine={false}
//               axisLine={false}
//             />
//             <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} />
//             <Legend
//               verticalAlign="top"
//               align="center"
//               radius="10px"
//               iconType="circle"
//               wrapperStyle={{ paddingBottom: 20 }}
//             />
//             <Bar dataKey="deposit wallet" stackId="a" fill="#028176" name="Deposit Wallet"  />
//             <Bar dataKey="usd" stackId="a" fill="#66C2B9" name="Bear Wallet" />
//             <Bar dataKey="Bull Wallet" stackId="a" fill="#B7E1DB" name="bull Wallet" />
//             <Bar dataKey="Accoun bal" stackId="a" fill="#E6F4F1" name="Account Balance" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default PortfolioOverview;









// src/components/charts/PortfolioOverview.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { apiClient } from "../api/apiClient";

// ────────────────────── HELPER FUNCTIONS (inside the file) ──────────────────────
const generateMonthLabels = () => {
  const months = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.toLocaleString("default", { month: "short" }));
  }
  return months;
};

const processWalletHistory = (walletHistory = [], months) => {
  const monthlyData = months.map(() => ({ deposit: 0, usd: 0, ib: 0, mt5: 0 }));

  if (walletHistory.length === 0) return monthlyData;

  const now = new Date();
  const monthRanges = months.map((_, idx) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (11 - idx), 1);
    return {
      start: date,
      end: new Date(date.getFullYear(), date.getMonth() + 1, 0),
    };
  });

  let runningDeposit = 0;
  const depositByMonth = new Array(12).fill(0);

  walletHistory.forEach((tx) => {
    const txDate = new Date(tx.date);
    if (isNaN(txDate.getTime())) return;

    for (let i = 0; i < monthRanges.length; i++) {
      const { start, end } = monthRanges[i];
      if (txDate >= start && txDate <= end && tx.wallet === "deposit") {
        if (tx.credit) runningDeposit += Number(tx.credit);
        if (tx.debit) runningDeposit -= Number(tx.debit);
        depositByMonth[i] = runningDeposit;
        break;
      }
    }
  });

  let lastKnown = 0;
  return depositByMonth.map((balance) => {
    if (balance > 0) lastKnown = balance;
    else balance = lastKnown;
    return { deposit: balance, usd: 0, ib: 0, mt5: balance };
  });
};
// ──────────────────────────────────────────────────────────────────────────────

const PortfolioOverview = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await apiClient.get("/api/users/profile");

        const months = generateMonthLabels();                 // now defined
        let processed = processWalletHistory(data.walletHistory || [], months);

        // Inject live wallet balances into the latest month
        if (data.wallets) {
          const { deposit = 0, bull = 0, bear = 0 } = data.wallets;
          const total = deposit + bull + bear;

          processed[processed.length - 1] = {
            deposit,
            usd: bear,
            ib: bull,
            mt5: total,
          };
        }

        const finalData = months.map((month, i) => ({
          name: month,
          "Deposit Wallet": processed[i].deposit,
          "Bear Wallet": processed[i].usd,
          "Bull Wallet": processed[i].ib,
          "Total Balance": processed[i].mt5,
        }));

        setChartData(finalData);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Custom Tooltip – colored text matching each bar
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    const colorMap = {
      "Deposit Wallet": "#028176",
      "Bear Wallet": "#ef4444",
      "Bull Wallet": "#3b82f6",
      "Total Balance": "#10b981",
    };

    return (
      <div className="bg-white/98 dark:bg-neutral-800/98 backdrop-blur-md border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-2xl p-6">
        <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">{label}</p>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-3 py-1.5">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colorMap[entry.name] }}
            />
            <span
              className="font-semibold text-sm"
              style={{ color: colorMap[entry.name] }}
            >
              {entry.name}:
            </span>
            <span className="font-bold text-gray-900 dark:text-white">
              ${Number(entry.value || 0).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900/90 backdrop-blur-sm border border-gray-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-16 text-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-[#00A991] mx-auto" />
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">Loading Portfolio...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900/95 backdrop-blur-sm border border-gray-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-8 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Portfolio Growth Overview</h2>
        <p className="mt-2 text-lg opacity-90">Last 12 Months • Live Data</p>
      </div>

      <div className="p-6 md:p-10">
        <div className="w-full h-[620px] bg-gray-50/70 dark:bg-neutral-800/60 rounded-3xl border border-gray-200 dark:border-neutral-700">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 30, right: 40, left: 40, bottom: 60 }}>
              <CartesianGrid horizontal vertical={false} stroke="#e0e0e0" strokeDasharray="6 8" strokeOpacity={0.6} />

              <XAxis
                dataKey="name"
                tick={{ fill: "#444", fontSize: 15, fontWeight: 600 }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${v.toLocaleString()}`}
                tick={{ fill: "#444", fontSize: 14 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,169,145,0.08)" }} />

              <Legend
                verticalAlign="top"
                align="center"
                height={60}
                iconType="circle"
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(v) => (
                  <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">{v}</span>
                )}
              />

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="d" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#028176" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#028176" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="be" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="bu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="to" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.5} />
                </linearGradient>
              </defs>

              <Bar dataKey="Deposit Wallet" stackId="a" fill="url(#d)" />
              <Bar dataKey="Bear Wallet" stackId="a" fill="url(#be)" />
              <Bar dataKey="Bull Wallet" stackId="a" fill="url(#bu)" />
              <Bar dataKey="Total Balance" stackId="a" fill="url(#to)" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Updated {new Date().toLocaleDateString("en-NG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • Velox Capital
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;


// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { apiClient } from "../api/apiClient";

// const PortfolioOverview = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       try {
//         const response = await apiClient.get("/api/users/profile");
//         const data = response.data;
//         console.log("✅ Portfolio Data:", data);

//         if (data && data.wallets) {
//           const { deposit = 0, bull = 0, bear = 0 } = data.wallets;

//           // Create chart dataset (single bar showing each wallet)
//           const formattedData = [
//             {
//               name: "Wallets",
//               "Deposit Wallet": deposit,
//               "Bear Wallet": bear,
//               "Bull Wallet": bull,
//             },
//           ];

//           setChartData(formattedData);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching wallet data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPortfolio();
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-[10px] p-6 shadow-sm border border-gray-100 text-center">
//         <p>Loading portfolio...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-neutral-900 dark:text-white rounded-[10px] p-6 shadow-sm border border-gray-100">
//       <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
//         Portfolio Overview
//       </h2>
//       <hr />
//       <div className="w-full h-[400px]">
//         <ResponsiveContainer>
//           <BarChart
//             data={chartData}
//             margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" tickLine={false} />
//             <YAxis
//               tickFormatter={(value) => `$${value}`}
//               tickLine={false}
//               axisLine={false}
//             />
//             <Tooltip
//               cursor={{ fill: "rgba(0,0,0,0.05)" }}
//               formatter={(value) => `$${value}`}
//             />
//             <Legend
//               verticalAlign="top"
//               align="center"
//               iconType="circle"
//               wrapperStyle={{ paddingBottom: 20 }}
//             />

//             {/* Wallet Bars */}
//             <Bar dataKey="Deposit Wallet" fill="#028176" barSize={60} radius={[6, 6, 0, 0]} />
//             <Bar dataKey="Bear Wallet" fill="#ef4444" barSize={60} radius={[6, 6, 0, 0]} />
//             <Bar dataKey="Bull Wallet" fill="#3b82f6" barSize={60} radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
//         <p>
//           Deposit Wallet: <span className="font-semibold text-emerald-600">${chartData[0]?.["Deposit Wallet"]}</span> |{" "}
//           Bear Wallet: <span className="font-semibold text-red-500">${chartData[0]?.["Bear Wallet"]}</span> |{" "}
//           Bull Wallet: <span className="font-semibold text-blue-500">${chartData[0]?.["Bull Wallet"]}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PortfolioOverview;

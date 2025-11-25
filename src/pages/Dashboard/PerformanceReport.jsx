import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Package,
  Activity,
  Wallet,
  Receipt,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { useUser } from "../../routes/UserContext";
import { useNavigate } from "react-router-dom";

export default function PerformanceReport() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [roiData, setRoiData] = useState([]);

  // Extract data safely
  const profile = user || {};
  const pkg = profile.packageROI || {};
  const wallets = profile.wallets || {};
  const bonus = profile.bonusBreakdown || {};
  const fastStart = profile.fastStartPerformance || {};
  const bonusHistory = profile.bonusHistory || [];
  const walletHistory = profile.walletHistory || [];

  // Calculations
  const totalProfit = (wallets.bull || 0) + (wallets.bear || 0);
  const roiEarned = pkg.earned || 0;
  const roiCap = pkg.cap || 0;
  const roiPercent = roiCap > 0 ? ((roiEarned / roiCap) * 100).toFixed(2) : "0.00";
  const daysActive = pkg.daysActive || 0;
  const activePackageName = pkg.name?.replace(/_/g, " ") || "Free Plan";
  const totalBonus = bonus.total || 0;
  const fastStartEarned = fastStart.totalEarned || 0;
  const totalTransactions = bonusHistory.length + walletHistory.length;

  // ROI progress data generation
  useEffect(() => {
    const dataPoints = Math.min(daysActive, 10);
    if (dataPoints > 0) {
      const dailyEarn = roiCap > 0 ? roiEarned / dataPoints : 0;
      const data = Array.from({ length: dataPoints }, (_, i) => ({
        day: `Day ${i + 1}`,
        earned: Math.min((i + 1) * dailyEarn, roiEarned),
        percent: roiCap > 0 ? (((i + 1) * dailyEarn) / roiCap) * 100 : 0,
      }));
      setRoiData(data);
    } else setRoiData([]);
  }, [roiEarned, roiCap, daysActive]);

  const handleViewTransactions = () => {
    if (totalTransactions > 0) navigate("/reportshistory");
    else alert("No transactions yet! Start trading to see history.");
  };

  const kpiCards = [
    {
      title: "Active Package",
      value: activePackageName,
      icon: <Package className="text-indigo-500" />,
      color: "bg-indigo-100 dark:bg-indigo-900/40",
    },
    {
      title: "Total Profit",
      value: `$${totalProfit.toLocaleString()}`,
      icon: <DollarSign className="text-green-500" />,
      growth: totalProfit > 0 ? `+$${totalProfit}` : "No profit yet",
      color: "bg-green-100 dark:bg-green-900/40",
    },
    {
      title: "ROI Progress",
      value: `${roiPercent}%`,
      icon: <Percent className="text-blue-500" />,
      growth: roiCap > 0 ? `of $${roiCap.toLocaleString()}` : "Upgrade to earn",
      color: "bg-blue-100 dark:bg-blue-900/40",
    },
    {
      title: "Transactions",
      value: totalTransactions,
      icon: <Receipt className="text-purple-500" />,
      growth: totalTransactions > 0 ? `${totalTransactions} items` : "No activity",
      color: "bg-purple-100 dark:bg-purple-900/40",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">
          VeloxCapital Market
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Real-time insights into your trading performance
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        {kpiCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.04 }}
            className="p-5 bg-white dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm text-gray-600 dark:text-gray-300">
                {card.title}
              </h2>
              <div className={`p-2 rounded-lg ${card.color}`}>{card.icon}</div>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {card.growth}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Wallet Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md mb-12 border border-gray-200 dark:border-neutral-700"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-600 dark:text-green-400">
          <Wallet /> Wallet Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Bull Wallet",
              value: wallets.bull,
              color: "text-green-500 dark:text-green-400",
              bg: "bg-green-50 dark:bg-green-900/20",
              label: "Withdrawable",
            },
            {
              name: "Bear Wallet",
              value: wallets.bear,
              color: "text-red-500 dark:text-red-400",
              bg: "bg-red-50 dark:bg-red-900/20",
              label: "Locked Profit",
            },
            {
              name: "Total Bonus",
              value: totalBonus,
              color: "text-blue-500 dark:text-blue-400",
              bg: "bg-blue-50 dark:bg-blue-900/20",
              label: "All bonuses",
            },
          ].map((w, i) => (
            <div
              key={i}
              className={`text-center p-5 rounded-xl ${w.bg} shadow-inner`}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">{w.name}</p>
              <p className={`text-2xl font-bold ${w.color}`}>
                ${w.value?.toLocaleString() || 0}
              </p>
              <p className="text-xs text-gray-500">{w.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ROI Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <TrendingUp /> Cash back Growth Over Time
        </h2>

        <div className="h-[380px] md:h-[420px] w-full">
          {roiData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={roiData}
                margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  fontSize={12}
                  angle={-35}
                  textAnchor="end"
                  height={70}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="earned" radius={[6, 6, 0, 0]}>
                  {roiData.map((entry, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={entry.percent >= 100 ? "#10b981" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
              <p>No ROI data yet – upgrade your package to start earning!</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Earned: ${roiEarned.toLocaleString()}</span>
          <span>Target: ${roiCap.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Fast Start Bonus */}
      {fastStartEarned > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mt-10 bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg"
        >
          <h3 className="text-lg font-bold mb-2">Fast Start Bonus Earned!</h3>
          <p className="text-3xl font-bold">${fastStartEarned.toLocaleString()}</p>
          <p className="text-sm opacity-90">
            Academy: ${fastStart.academy30} | Trade Pool: ${fastStart.tradePool70}
          </p>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto mt-12 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-1 text-blue-600 dark:text-blue-400">
            Your Trading Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {daysActive > 0
              ? `You've been active for ${daysActive} days. Keep growing your ROI!`
              : "Start your investment to see performance insights."}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all text-sm">
            Export Report
          </button>
          <button
            onClick={handleViewTransactions}
            className="px-5 py-2 rounded-xl border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all text-sm"
          >
            View Transactions
          </button>
        </div>
      </motion.div>
    </div>
  );
}

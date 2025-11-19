
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CheckCircle, Clock, DollarSign, TrendingUp, History, Moon, Sun } from "lucide-react";
import { getUserProfile } from "../../api/authApi";

const COLORS = ["#22c55e", "#facc15", "#3b82f6", "#a78bfa"];

const PersonalMatchingBonus = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        if (!token) throw new Error("No auth token found");

        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading Matching Bonus…</span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="text-center p-8 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg">
          <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error || "No data"}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ————— REAL DATA FROM YOUR API ————— */
  const bonusBreakdown = profile.bonusBreakdown || {};
  const fastStartBonus = Number(bonusBreakdown.fast_start_bonus || 0);
  const unilevelBonus = Number(bonusBreakdown.unilevel_bonus || 0);
  const matrixBonus = Number(bonusBreakdown.matrix_bonus || 0);
  const leadershipBonus = Number(bonusBreakdown.leadership_bonus || 0);
  const roiEarnings = Number(bonusBreakdown.roi_earnings || 0);

  const totalEarned = fastStartBonus + unilevelBonus + matrixBonus + leadershipBonus + roiEarnings;

  const formatCurrency = (val) => {
    const num = Number(val || 0);
    return `$${num.toLocaleString()}`;
  };

  // Pie Chart: Real bonus sources
  const pieData = [
    { name: "Fast Start", value: fastStartBonus },
    { name: "Unilevel", value: unilevelBonus },
    { name: "Matrix", value: matrixBonus },
    { name: "Leadership", value: leadershipBonus },
    { name: "ROI Earnings", value: roiEarnings },
  ].filter(item => item.value > 0);

  // Bar Chart: Simulated matching levels (since real data isn't split by level yet)
  const barData = [
    { level: "Level 1", amount: Math.floor(unilevelBonus * 0.6 + fastStartBonus) },
    { level: "Level 2", amount: Math.floor(unilevelBonus * 0.3) },
    { level: "Level 3", amount: Math.floor(unilevelBonus * 0.1) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-4 md:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Velox Capital <span className="text-[#00A991]">Personal Matching Bonus</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Earn from your team's trading profits & referrals
            </p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
          >
            {darkMode ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-600" />}
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Total Earned", value: formatCurrency(totalEarned), color: "from-emerald-500 to-teal-600", icon: DollarSign },
            { label: "Fast Start", value: formatCurrency(fastStartBonus), color: "from-yellow-500 to-amber-600", icon: TrendingUp },
            { label: "Unilevel Bonus", value: formatCurrency(unilevelBonus), color: "from-blue-500 to-indigo-600", icon: CheckCircle },
            { label: "Available Now", value: formatCurrency(totalEarned), color: "from-[#00A991] to-emerald-600", icon: DollarSign },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent bg-clip-text`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Pie Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Bonus Sources Breakdown</h3>
            {pieData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <p>No bonus earned yet. Start building your team!</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Right: Bar Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Estimated Matching by Level
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={barData} margin={{ top: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="amount" fill="#00A991" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Based on Unilevel + Fast Start distribution
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Your team is your greatest asset.
              <br />
              <strong className="text-[#00A991]">Every referral earns you passive income.</strong>
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#00A991] to-emerald-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-3">
              <DollarSign className="h-6 w-6" />
              Share Your Link & Grow Your Income
            </button>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>VeloxCapitalMarkets.ai | Personal Matching Bonus Dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalMatchingBonus;

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import Tree from "react-d3-tree";
import { getUserProfile } from "../../api/authApi";
import {
  AlertCircle,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Network,
  Clock,
  CheckCircle,
} from "lucide-react";

/* ---- Reusable Card ---- */
const Card = ({ title, subtitle, children, className = "" }) => (
  <div
    className={`bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-2xl shadow-sm p-6 transition-colors ${className}`}
  >
    {title && (
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-[#00A991] dark:text-[#00D4B2]">{title}</h3>
        {subtitle && <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>}
      </div>
    )}
    {children}
  </div>
);

const Unilevel = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ────── FETCH PROFILE ────── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No auth token found. Please log in.");
      setLoading(false);
      return;
    }

    getUserProfile(token)
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load profile.");
        setLoading(false);
      });
  }, []);

  /* ────── LOADING STATE ────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Loading Velox Capital Dashboard…
          </span>
        </div>
      </div>
    );
  }

  /* ────── ERROR STATE ────── */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6 transition-colors">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center">
          <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
          <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          {error.includes("Unauthorized") && (
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">
        <p>No user data found. Please log in again.</p>
      </div>
    );
  }

  /* ────── DERIVED DATA ────── */
  const uni = userData.unilevelBonusPerformance || {};
  const bonusBreakdown = userData.bonusBreakdown || {};
  const bonusHistory = userData.bonusHistory || [];

  const unilevelLevels = Object.keys(uni)
    .filter((k) => k.startsWith("level"))
    .map((k) => {
      const lvl = uni[k];
      return {
        level: parseInt(k.replace("level", ""), 10),
        members: lvl.members ?? 0,
        activeMembers: lvl.activeMembers ?? 0,
        totalDeposit: lvl.totalDeposit ?? 0,
        bonusEarned: lvl.bonusEarned ?? 0,
      };
    })
    .sort((a, b) => a.level - b.level);

  // Tree Data for Network
  const treeData = {
    name: userData.name,
    attributes: { rank: userData.rank, volume: `$${userData.groupVolume?.toLocaleString()}` },
    children: unilevelLevels.map((lvl) => ({
      name: `Level ${lvl.level}`,
      attributes: {
        members: lvl.members,
        active: lvl.activeMembers,
        volume: `$${lvl.totalDeposit.toLocaleString()}`,
        bonus: `$${lvl.bonusEarned.toLocaleString()}`,
      },
    })),
  };

  // Bonus Breakdown for Pie Chart
  const pieData = Object.entries(bonusBreakdown)
    .filter(([key]) => key !== "total")
    .map(([key, value]) => ({
      name:
        key === "roi_earnings"
          ? "ROI Earnings"
          : key === "weekly_roi"
          ? "Weekly ROI"
          : key === "unilevel_bonus"
          ? "Unilevel Bonus"
          : key === "fast_start_bonus"
          ? "Fast Start"
          : key === "matrix_bonus"
          ? "Matrix Bonus"
          : key === "leadership_bonus"
          ? "Leadership Bonus"
          : key === "matching_bonus"
          ? "Matching Bonus"
          : key,
      value,
    }));

  const COLORS = ["#00A991", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#DCFCE7", "#F0FDF4"];

  const formatCurrency = (val) => `$${val?.toLocaleString() ?? 0}`;

  /* ────── RENDER UI ────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4 md:p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Velox Capital <span className="text-[#00A991] dark:text-[#00D4B2]">Unilevel Dashboard</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your network growth, bonuses, and performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Total Unilevel Bonus */}
            <Card title="Total Unilevel Bonus" subtitle="All Levels Combined">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-[#00A991] dark:text-[#00D4B2]">
                    {formatCurrency(userData.totalUnilevelBonus)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    From {unilevelLevels.length} Levels
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                  <TrendingUp className="h-8 w-8 text-[#00A991] dark:text-[#00D4B2]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
                <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Your Rank</p>
                  <p className="font-bold text-gray-900 dark:text-white capitalize">{userData.rank}</p>
                </div>
                <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Personal Volume</p>
                  <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(userData.personalVolume)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Group Volume</p>
                  <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(userData.groupVolume)}</p>
                </div>
                <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-400">Efficiency</p>
                  <p className="font-bold text-[#00A991] dark:text-[#00D4B2]">
                    {userData.groupVolume > 0
                      ? `${((bonusBreakdown.unilevel_bonus / userData.groupVolume) * 100).toFixed(1)}%`
                      : "0.0%"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Bonus by Level Bar Chart */}
            <Card title="Bonus Earned per Level">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={unilevelLevels} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="level"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    className="dark:fill-gray-400"
                    tickFormatter={(v) => `L${v}`}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} className="dark:fill-gray-400" />
                  <Tooltip
                    formatter={(v) => formatCurrency(v)}
                    cursor={{ fill: "rgba(0,169,145,0.1)" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                    className="dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <Bar dataKey="bonusEarned" radius={[8, 8, 0, 0]}>
                    {unilevelLevels.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Network Tree */}
            <Card title="Your Network Tree" className="h-[380px]">
              <div className="h-full rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-neutral-700 dark:to-neutral-800">
                {unilevelLevels.length > 0 ? (
                  <Tree
                    data={treeData}
                    translate={{ x: 150, y: 180 }}
                    zoom={0.75}
                    zoomable={false}
                    orientation="vertical"
                    pathFunc="step"
                    separation={{ siblings: 1, nonSiblings: 1.5 }}
                    nodeSize={{ x: 180, y: 90 }}
                    styles={{
                      links: { stroke: "#00A991", strokeWidth: 2.5 },
                      nodes: {
                        node: {
                          circle: { fill: "#00A991" },
                          name: { fill: "#111", fontWeight: "600", fontSize: 13 },
                        },
                        leafNode: { circle: { fill: "#34D399" } },
                      },
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <Network className="h-12 w-12 mb-3" />
                    <p className="text-sm">No downline yet</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-6">
            {/* Bonus Breakdown Pie Chart */}
            <Card title="Overall Bonus Breakdown" subtitle={`Total Earnings: ${formatCurrency(Object.values(bonusBreakdown).reduce((a, b) => a + b, 0) - (bonusBreakdown.total || 0))}`}>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => formatCurrency(v)}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="font-medium ml-auto text-gray-900 dark:text-white">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Volume Performance */}
            <Card title="Downline Volume Performance">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={unilevelLevels}>
                  <XAxis
                    dataKey="level"
                    tickFormatter={(v) => `L${v}`}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    className="dark:fill-gray-400"
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} className="dark:fill-gray-400" />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Bar dataKey="totalDeposit" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Leadership Progress */}
            <Card title="Leadership Progress">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Rank</span>
                  <span className="text-lg font-bold text-[#00A991] dark:text-[#00D4B2] capitalize">
                    {userData.leadershipBonus?.currentRank || "Member"}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1 text-gray-600 dark:text-gray-400">
                    <span>Progress to Next Rank</span>
                    <span>{userData.leadershipBonus?.progressToNextRank?.progressPercent || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#00A991] to-[#10B981] h-3 rounded-full transition-all"
                      style={{ width: `${userData.leadershipBonus?.progressToNextRank?.progressPercent || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatCurrency(userData.leadershipBonus?.progressToNextRank?.groupVolume || 0)} /{" "}
                    {formatCurrency(userData.leadershipBonus?.progressToNextRank?.required || 0)} GV
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Detailed Level Table */}
            <Card title="Unilevel Level Details">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gradient-to-r from-[#00A991] to-[#10B981] text-white">
                    <tr>
                      <th className="p-3 text-left">Level</th>
                      <th className="p-3 text-left">Members</th>
                      <th className="p-3 text-left">Active</th>
                      <th className="p-3 text-left">Volume</th>
                      <th className="p-3 text-left">Bonus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
                    {unilevelLevels.map((lvl) => (
                      <tr key={lvl.level} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition">
                        <td className="p-3 font-medium text-gray-900 dark:text-gray-200">Level {lvl.level}</td>
                        <td className="p-3 text-gray-700 dark:text-gray-300">{lvl.members}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            {lvl.activeMembers}
                          </span>
                        </td>
                        <td className="p-3 font-medium text-gray-700 dark:text-gray-300">{formatCurrency(lvl.totalDeposit)}</td>
                        <td className="p-3 font-bold text-[#00A991] dark:text-[#00D4B2]">{formatCurrency(lvl.bonusEarned)}</td>
                      </tr>
                    ))}
                    <tr className="bg-yellow-50 dark:bg-yellow-900/20 font-bold">
                      <td colSpan={4} className="p-3 text-right text-gray-800 dark:text-gray-200">
                        Total Unilevel Bonus
                      </td>
                      <td className="p-3 text-[#00A991] dark:text-[#00D4B2]">{formatCurrency(userData.totalUnilevelBonus)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Bonus History */}
            <Card title="Recent Bonuses">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {bonusHistory.length > 0 ? (
                  bonusHistory.slice(0, 5).map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-600 transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            h.status === "approved" ? "bg-green-100 dark:bg-green-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"
                          }`}
                        >
                          {h.status === "approved" ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {h.type.replace(/_/g, " ")}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(h.date).toLocaleDateString()} at{" "}
                            {new Date(h.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#00A991] dark:text-[#00D4B2]">+{formatCurrency(h.amount)}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            h.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {h.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-6 text-sm">
                    No bonus activity yet
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Velox Capital © 2025 | Powered by Unilevel Network Engine</p>
        </div>
      </div>
    </div>
  );
};

export default Unilevel;
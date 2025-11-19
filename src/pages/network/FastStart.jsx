// import React from "react";
// import { Trophy, Clock, DollarSign } from "lucide-react";

// export default function FastStart() {
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex items-center gap-3 mb-6">
//         <Trophy className="text-yellow-500" size={32} />
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Fast Start Bonus</h1>
//       </div>

//       <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-xl mb-6">
//         <p className="text-lg font-semibold text-orange-700 dark:text-orange-300">
//           Earn up to $5,000 in your first 30 days!
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
//           <div className="flex items-center gap-2 mb-2">
//             <Clock size={20} className="text-blue-600" />
//             <h3 className="font-semibold">Time Frame</h3>
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-300">First 30 days from registration</p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow">
//           <div className="flex items-center gap-2 mb-2">
//             <DollarSign size={20} className="text-green-600" />
//             <h3 className="font-semibold">Reward</h3>
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-300">Up to $5,000 cash bonus</p>
//         </div>
//       </div>

//       <div className="mt-8 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
//         <h3 className="font-semibold mb-3">How to Qualify:</h3>
//         <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
//           <li>Enroll 5 active traders</li>
//           <li>Achieve $50,000 in team volume</li>
//           <li>Maintain personal volume of $10,000</li>
//         </ul>
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// const FastStart = () => {
//   const barData = [
//     { week: "Week 1", earnings: 1200 },
//     { week: "Week 2", earnings: 3800 },
//     { week: "Week 3", earnings: 1600 },
//   ];

//   const pieData = [
//     { name: "1 - 3", value: 50 },
//     { name: "Pending", value: 30 },
//     { name: "Paid", value: 20 },
//   ];

//   const COLORS = ["#FACC15", "#E5E7EB", "#1E3A8A"];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Overview Cards */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {[
//           { title: "Total Referrals", value: "48" },
//           { title: "Active Referrals", value: "36" },
//           { title: "Total Earned", value: "$42,600" },
//           { title: "Pending / Withdrawn", value: "$2,000 / $40,600" },
//         ].map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white border border-yellow-200 rounded-xl shadow-sm p-5 text-center"
//           >
//             <p className="text-sm text-gray-500">{card.title}</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-2">{card.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* Fast Start Bonus Section */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">
//         Fast Start Bonus Calculation
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Section */}
//         <div>
//           <p className="text-sm text-gray-600 mb-4 leading-relaxed">
//             Each Velox Capital package is divided into 30% Academy and 70% Trade
//             Pool. The Fast Start Bonus equals 50% of the Academy portion.
//           </p>

//           {/* First Table */}
//           <div className="overflow-x-auto h-auto border border-gray-200 rounded-lg mb-5">
//             <table className="w-full text-sm text-left text-gray-600">
//               <thead className="bg-gray-100 text-gray-700 font-semibold">
//                 <tr>
//                   <th className="px-4 py-3">Package</th>
//                   <th className="px-4 py-3">Academy (30%)</th>
//                   <th className="px-4 py-3">Trade Pool (70%)</th>
//                   <th className="px-4 py-3">Bonus (50%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-t">
//                   <td className="px-4 py-3">$2,000</td>
//                   <td className="px-4 py-3">$600</td>
//                   <td className="px-4 py-3">$1,400</td>
//                   <td className="px-4 py-3">$300</td>
//                 </tr>
//                 <tr className="border-t">
//                   <td className="px-4 py-3">$10,000</td>
//                   <td className="px-4 py-3">$3,000</td>
//                   <td className="px-4 py-3">$7,000</td>
//                   <td className="px-4 py-3">$1,500</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

         
//         </div>

//         {/* Right Section (Charts) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
//           {/* Bar Chart */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Weekly Fast Start Earnings
//             </h3>
//             <div className="w-full h-52">
//               <ResponsiveContainer>
//                 <BarChart data={barData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="week" tick={{ fontSize: 12 }} />
//                   <YAxis tick={{ fontSize: 12 }} />
//                   <Tooltip />
//                   <Bar dataKey="earnings" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Chart */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Bonus Distribution by Package
//             </h3>
//             <div className="w-full h-52">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={60}
//                     dataKey="value"
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend verticalAlign="bottom" height={36} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FastStart;






// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import {  getUserPackages } from "../../api/userPackageApi";
// import { getUserProfile } from "../../api/authApi";

// const FastStart = () => {
//   const [profile, setProfile] = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken") || "";

//     Promise.all([getUserProfile(token), getUserPackages(token)])
//       .then(([profileData, packagesData]) => {
//         setProfile(profileData);
//         setPackages(packagesData);
//         setLoading(false);
       
        
//       })
      
//       .catch((err) => {
//         setError("Failed to load data.");
//         setLoading(false);
//       });
//   }, []);

//   // ———————————————————————
//   // 1. TABLE: Real packages (from /api/users/packages)
//   // ———————————————————————
//   const paidPackages = packages.filter((pkg) => !pkg.isFree);
//   const packageRows = paidPackages.map((pkg) => {
//     const price = pkg.price;
//     const academy = Math.round(price * 0.3);
//     const tradePool = Math.round(price * 0.7);
//     const bonus = Math.round(academy * 0.5);
//     return { id: pkg.id, name: pkg.name, academy, tradePool, bonus };
//   });

//   // ———————————————————————
//   // 2. BAR CHART: Real earnings from fastStartPerformance
//   // ———————————————————————
//   const fastStart = profile?.fastStartPerformance || {};
//   const barData = [
//     { name: "Academy (30%)", value: fastStart.academy30 || 0 },
//     { name: "Trade Pool (70%)", value: fastStart.tradePool70 || 0 },
//     { name: "Fast Start Bonus", value: fastStart.bonus50PerPackage || 0 },
//   ];

//   // ———————————————————————
//   // 3. PIE CHART: Real distribution of the 3 components
//   // ———————————————————————
//   const total = (fastStart.academy30 || 0) + (fastStart.tradePool70 || 0) + (fastStart.bonus50PerPackage || 0);
//   const pieData = [
//     { name: "Academy", value: fastStart.academy30 || 0 },
//     { name: "Trade Pool", value: fastStart.tradePool70 || 0 },
//     { name: "Bonus", value: fastStart.bonus50PerPackage || 0 },
//   ].filter((item) => item.value > 0);

//   const COLORS = ["#FACC15", "#1E3A8A", "#10B981"]; // Yellow, Navy, Green

//   // ———————————————————————
//   // 4. Overview totals
//   // ———————————————————————
//   const totalEarned = fastStart.bonus50PerPackage || 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-500"></div>
//         <span className="ml-3 text-lg text-gray-700">Loading...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center text-red-600">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* ==================== Overview Cards ==================== */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {[
//           { title: "Total Referrals", value: profile?.totalReferral || 0 },
//           { title: "Active Referrals", value: profile?.totalDownline || 0 },
//           { title: "Total Earned", value: `$${totalEarned.toLocaleString()}` },
//           { title: "Pending / Withdrawn", value: "$0 / $0" },
//         ].map((card, idx) => (
//           <div
//             key={idx}
//             className="bg-white border border-yellow-200 rounded-xl shadow-sm p-5 text-center"
//           >
//             <p className="text-sm text-gray-500">{card.title}</p>
//             <h3 className="text-2xl font-bold text-gray-900 mt-2">{card.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* ==================== Fast Start Bonus Section ==================== */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">
//         Fast Start Bonus Calculation
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* ——————— Left: Real Package Table ——————— */}
//         <div>
//           <p className="text-sm text-gray-600 mb-4 leading-relaxed">
//             Each Velox Capital package is divided into 30% Academy and 70% Trade
//             Pool. The Fast Start Bonus equals 50% of the Academy portion.
//           </p>

//           <div className="overflow-x-auto border border-gray-200 rounded-lg mb-5">
//             <table className="w-full text-sm text-left text-gray-600">
//               <thead className="bg-gray-100 text-gray-700 font-semibold">
//                 <tr>
//                   <th className="px-4 py-3">Package</th>
//                   <th className="px-4 py-3">Academy (30%)</th>
//                   <th className="px-4 py-3">Trade Pool (70%)</th>
//                   <th className="px-4 py-3">Bonus (50%)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {packageRows.length > 0 ? (
//                   packageRows.map((pkg) => (
//                     <tr key={pkg.id} className="border-t hover:bg-yellow-50">
//                       <td className="px-4 py-3 font-medium">{pkg.name}</td>
//                       <td className="px-4 py-3">${pkg.academy.toLocaleString()}</td>
//                       <td className="px-4 py-3">${pkg.tradePool.toLocaleString()}</td>
//                       <td className="px-4 py-3">${pkg.bonus.toLocaleString()}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
//                       No paid packages.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ——————— Right: Real Charts ——————— */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
//           {/* Bar Chart – Real breakdown */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Fast Start Breakdown
//             </h3>
//             <div className="w-full h-52">
//               <ResponsiveContainer>
//                 <BarChart data={barData}>
//                   <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
//                   <YAxis tick={{ fontSize: 12 }} />
//                   <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                   <Bar dataKey="value" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Chart – Real distribution */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
//             <h3 className="text-sm font-semibold text-gray-800 mb-3">
//               Earnings Distribution
//             </h3>
//             <div className="w-full h-52">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={60}
//                     dataKey="value"
//                     label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                   >
//                     {pieData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                   <Legend verticalAlign="bottom" height={36} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FastStart;






// import React, { useEffect, useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import {  getUserPackages } from "../../api/userPackageApi";
// import { getUserProfile } from "../../api/authApi";
// import { Package, AlertCircle, TrendingUp } from "lucide-react";

// const FastStart = React.memo(() => {
//   const [profile, setProfile] = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken") || "";
//     Promise.all([getUserProfile(token), getUserPackages(token)])
//       .then(([p, pkgs]) => {
//         setProfile(p);
//         setPackages(pkgs);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load data.");
//         setLoading(false);
//       });
//   }, []);

//   // ——————————————————— DATA CALC ———————————————————
//   const paidPackages = useMemo(
//     () =>
//       packages
//         .filter((pkg) => !pkg.isFree)
//         .map((pkg) => {
//           const academy = Math.round(pkg.price * 0.3);
//           const tradePool = Math.round(pkg.price * 0.7);
//           const bonus = Math.round(academy * 0.5);
//           return { id: pkg.id, name: pkg.name, academy, tradePool, bonus };
//         }),
//     [packages]
//   );

//   const fastStart = profile?.fastStartPerformance || {};
//   const totalEarned = fastStart.bonus50PerPackage || 0;

//   const barData = useMemo(
//     () => [
//       { name: "Academy (30%)", value: fastStart.academy30 || 0 },
//       { name: "Trade Pool (70%)", value: fastStart.tradePool70 || 0 },
//       { name: "Fast Start Bonus", value: fastStart.bonus50PerPackage || 0 },
//     ],
//     [fastStart]
//   );

//   const pieData = useMemo(() => {
//     const total =
//       (fastStart.academy30 || 0) +
//       (fastStart.tradePool70 || 0) +
//       (fastStart.bonus50PerPackage || 0);
//     return total > 0
//       ? [
//           { name: "Academy", value: fastStart.academy30 || 0 },
//           { name: "Trade Pool", value: fastStart.tradePool70 || 0 },
//           { name: "Bonus", value: fastStart.bonus50PerPackage || 0 },
//         ]
//       : [];
//   }, [fastStart]);

//   const COLORS = ["#FACC15", "#1E3A8A", "#10B981"];

//   // ——————————————————— RENDER ———————————————————
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-500"></div>
//         <span className="ml-3 text-lg text-gray-700">Loading your dashboard...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
//           <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
//           <p className="text-red-800 font-medium">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
//       {/* ==================== Overview Cards ==================== */}
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
//           <TrendingUp className="mr-2 h-6 w-6 text-yellow-600" />
//           Fast Start Overview
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {[
//             { title: "Total Referrals", value: profile?.totalReferral || 0, icon: "users" },
//             { title: "Active Downline", value: profile?.totalDownline || 0, icon: "network" },
//             { title: "Total Earned", value: `$${totalEarned.toLocaleString()}`, icon: "dollar" },
//             { title: "Pending / Withdrawn", value: "$0 / $0", icon: "clock" },
//           ].map((card, i) => (
//             <div
//               key={i}
//               className="bg-white/80 backdrop-blur-sm border border-yellow-200 rounded-xl shadow-md p-5 text-center transform transition hover:scale-105"
//             >
//               <p className="text-sm text-gray-500 flex items-center justify-center">
//                 <Package className="h-4 w-4 mr-1 text-yellow-600" />
//                 {card.title}
//               </p>
//               <h3 className="text-2xl font-bold text-gray-900 mt-2">{card.value}</h3>
//             </div>
//           ))}
//         </div>

//         {/* ==================== Fast Start Bonus Section ==================== */}
//         <h2 className="text-xl font-bold text-gray-800 mb-5">Fast Start Bonus Calculation</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* ——————— Left: Package Table ——————— */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5">
//             <p className="text-sm text-gray-600 mb-4 leading-relaxed">
//               Each Velox Capital package is split: <strong>30% Academy</strong> + <strong>70% Trade Pool</strong>.  
//               You earn <strong>50% of Academy</strong> as Fast Start Bonus.
//             </p>

//             <div className="overflow-x-auto rounded-lg border border-gray-200">
//               <table className="w-full text-sm text-left text-gray-700">
//                 <thead className="bg-gradient-to-r from-yellow-50 to-yellow-100 text-gray-800 font-semibold sticky top-0 z-10">
//                   <tr>
//                     <th className="px-4 py-3">Package</th>
//                     <th className="px-4 py-3">Academy (30%)</th>
//                     <th className="px-4 py-3">Trade Pool (70%)</th>
//                     <th className="px-4 py-3">Bonus (50%)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paidPackages.length > 0 ? (
//                     paidPackages.map((pkg) => (
//                       <tr
//                         key={pkg.id}
//                         className="border-t hover:bg-yellow-50 transition"
//                         role="row"
//                       >
//                         <td className="px-4 py-3 font-medium">{pkg.name}</td>
//                         <td className="px-4 py-3">${pkg.academy.toLocaleString()}</td>
//                         <td className="px-4 py-3">${pkg.tradePool.toLocaleString()}</td>
//                         <td className="px-4 py-3 font-semibold text-green-600">
//                           ${pkg.bonus.toLocaleString()}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
//                         <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
//                         <p>No paid packages yet.</p>
//                         <button className="mt-2 text-yellow-600 underline text-sm">
//                           Explore Packages →
//                         </button>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* ——————— Right: Charts ——————— */}
//           <div className="grid grid-cols-1 gap-6">
//             {/* Bar Chart */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5">
//               <h3 className="text-sm font-semibold text-gray-800 mb-3">
//                 Earnings Breakdown
//               </h3>
//               {barData.every((d) => d.value === 0) ? (
//                 <div className="h-52 flex items-center justify-center text-gray-400">
//                   <p>No earnings data</p>
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={208}>
//                   <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis
//                       dataKey="name"
//                       tick={{ fontSize: 11 }}
//                       angle={-20}
//                       textAnchor="end"
//                       height={60}
//                     />
//                     <YAxis tick={{ fontSize: 12 }} />
//                     <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                     <Bar dataKey="value" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>

//             {/* Pie Chart */}
//             <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-5">
//               <h3 className="text-sm font-semibold text-gray-800 mb-3">
//                 Distribution
//               </h3>
//               {pieData.length === 0 ? (
//                 <div className="h-52 flex items-center justify-center text-gray-400">
//                   <p>No data</p>
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={208}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={38}
//                       outerRadius={68}
//                       dataKey="value"
//                       label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                     >
//                       {pieData.map((_, i) => (
//                         <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
//                     <Legend verticalAlign="bottom" height={36} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* CTA */}
//         <div className="mt-8 text-center">
//           <button className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
//             <Package className="mr-2 h-5 w-5" />
//             Upgrade Your Package
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default FastStart;







// import React, { useEffect, useState, useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { getUserProfile } from "../../api/authApi";
// import { getUserPackages } from "../../api/userPackageApi";
// import { motion } from "framer-motion";
// import {
//   Package,
//   AlertCircle,
//   TrendingUp,
//   Users,
//   DollarSign,
//   Trophy,
//   Wallet,
// } from "lucide-react";

// const COLORS = ["#FACC15", "#1E3A8A", "#10B981"]; // Academy, Trade Pool, Bonus

// const FastStart = React.memo(() => {
//   const [profile, setProfile] = useState(null);
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* ------------------- FETCH DATA ------------------- */
//   useEffect(() => {
//     const token = localStorage.getItem("authToken") || "";

//     Promise.all([getUserProfile(token), getUserPackages(token)])
//       .then(([p, pkgs]) => {
//         setProfile(p);
//         setPackages(pkgs);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Load error:", err);
//         setError("Failed to load dashboard data.");
//         setLoading(false);
//       });
//   }, []);

//   /* ------------------- DERIVED DATA ------------------- */
//   const fastStart = profile?.fastStartPerformance || {};
//   const totalEarned = fastStart.bonus50PerPackage || 0;

//   // Bar chart data
//   const barData = useMemo(
//     () => [
//       { name: "Academy (30%)", value: fastStart.academy30 || 0 },
//       { name: "Trade Pool (70%)", value: fastStart.tradePool70 || 0 },
//       { name: "Fast Start Bonus", value: fastStart.bonus50PerPackage || 0 },
//     ],
//     [fastStart]
//   );

//   // Pie chart data
//   const pieData = useMemo(() => {
//     const total = Object.values(fastStart).reduce((a, b) => a + b, 0);
//     return total > 0
//       ? [
//           { name: "Academy", value: fastStart.academy30 || 0 },
//           { name: "Trade Pool", value: fastStart.tradePool70 || 0 },
//           { name: "Bonus", value: fastStart.bonus50PerPackage || 0 },
//         ]
//       : [];
//   }, [fastStart]);

//   // Paid packages breakdown
//   const paidPackages = useMemo(
//     () =>
//       packages
//         .filter((pkg) => !pkg.isFree)
//         .map((pkg) => {
//           const academy = Math.round(pkg.price * 0.3);
//           const tradePool = Math.round(pkg.price * 0.7);
//           const bonus = Math.round(academy * 0.5);
//           return { id: pkg.id, name: pkg.name, academy, tradePool, bonus };
//         }),
//     [packages]
//   );

//   /* ------------------- LOADING STATE ------------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6 transition-colors">
//         <div className="flex items-center space-x-3">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-500" />
//           <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
//             Loading Fast Start...
//           </span>
//         </div>
//       </div>
//     );
//   }

//   /* ------------------- ERROR STATE ------------------- */
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6 transition-colors">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center">
//           <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
//           <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /* ------------------- MAIN UI ------------------- */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4 sm:p-6 lg:p-8 transition-colors">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <header className="text-center mb-10">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3"
//           >
//             <Trophy className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
//             Fast Start Performance
//           </motion.h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
//             Welcome back, <strong className="text-gray-800 dark:text-gray-200">{profile.name}</strong> • Rank:{" "}
//             <strong className="text-yellow-600 dark:text-yellow-400">{profile.rank}</strong>
//           </p>
//         </header>

//         {/* OVERVIEW CARDS */}
//         <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
//           {[
//             { title: "Total Referrals", value: profile.totalReferral, icon: Users, color: "text-blue-600 dark:text-blue-400" },
//             { title: "Active Downline", value: profile.totalDownline, icon: Users, color: "text-indigo-600 dark:text-indigo-400" },
//             { title: "Fast Start Earned", value: `$${totalEarned.toLocaleString()}`, icon: DollarSign, color: "text-green-600 dark:text-green-400" },
//             { title: "Group Volume", value: `$${profile.groupVolume.toLocaleString()}`, icon: Wallet, color: "text-teal-600 dark:text-teal-400" },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-xl dark:hover:shadow-2xl transition-all"
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
//                   <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
//                 </div>
//                 <card.icon className={`h-8 w-8 ${card.color}`} />
//               </div>
//             </motion.div>
//           ))}
//         </section>

//         {/* FAST START BREAKDOWN */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
//           {/* LEFT: Package Table */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
//           >
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
//               <Package className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
//               Package Breakdown
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//               30% → Academy | 70% → Trade Pool | <strong className="text-green-600 dark:text-green-400">50% of Academy = Fast Start Bonus</strong>
//             </p>

//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 text-gray-700 dark:text-gray-300">
//                   <tr>
//                     <th className="px-4 py-3 text-left font-medium">Package</th>
//                     <th className="px-4 py-3 text-left font-medium">Academy</th>
//                     <th className="px-4 py-3 text-left font-medium">Trade Pool</th>
//                     <th className="px-4 py-3 text-left font-medium">Bonus</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
//                   {paidPackages.length > 0 ? (
//                     paidPackages.map((pkg) => (
//                       <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition">
//                         <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{pkg.name}</td>
//                         <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${pkg.academy.toLocaleString()}</td>
//                         <td className="px-4 py-3 text-gray-700 dark:text-gray-300">${pkg.tradePool.toLocaleString()}</td>
//                         <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">
//                           ${pkg.bonus.toLocaleString()}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="px-4 py-6 text-center text-gray-400 dark:text-gray-500">
//                         <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
//                         <p>No paid packages</p>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>

//           {/* RIGHT: Charts */}
//           <div className="space-y-6">
//             {/* Bar Chart */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Earnings Breakdown</h3>
//               {barData.every((d) => d.value === 0) ? (
//                 <div className="h-52 flex items-center justify-center text-gray-400 dark:text-gray-500">No data</div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={208}>
//                   <BarChart data={barData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-neutral-700" />
//                     <XAxis
//                       dataKey="name"
//                       angle={-15}
//                       textAnchor="end"
//                       height={60}
//                       tick={{ fontSize: 11, fill: "#6b7280" }}
//                       className="dark:fill-gray-400"
//                     />
//                     <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} className="dark:fill-gray-400" />
//                     <Tooltip
//                       formatter={(v) => `$${v.toLocaleString()}`}
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                         border: "1px solid #e5e7eb",
//                         borderRadius: "8px",
//                       }}
//                       className="dark:bg-neutral-800 dark:border-neutral-700"
//                     />
//                     <Bar dataKey="value" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </motion.div>

//             {/* Pie Chart */}
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
//             >
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Distribution</h3>
//               {pieData.length === 0 ? (
//                 <div className="h-52 flex items-center justify-center text-gray-400 dark:text-gray-500">No data</div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={208}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={40}
//                       outerRadius={70}
//                       dataKey="value"
//                       label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                     >
//                       {pieData.map((_, i) => (
//                         <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(v) => `$${v.toLocaleString()}`}
//                       contentStyle={{
//                         backgroundColor: "rgba(255, 255, 255, 0.95)",
//                         border: "1px solid #e5e7eb",
//                         borderRadius: "8px",
//                       }}
//                     />
//                     <Legend verticalAlign="bottom" height={36} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               )}
//             </motion.div>
//           </div>
//         </section>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mt-10"
//         >
//           <button className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
//             <Package className="mr-2 h-5 w-5" />
//             Upgrade Package Now
//           </button>
//         </motion.div>

//         {/* FOOTER */}
//         <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">
//           <p>Velox Capital © 2025 | Fast Start Engine v1.0</p>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default FastStart;





import React, { useEffect, useState, useMemo } from "react";
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
  Legend,
} from "recharts";
import { getUserProfile } from "../../api/authApi";
import { getUserPackages } from "../../api/userPackageApi";
import { motion } from "framer-motion";
import {
  Package,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Trophy,
  Wallet,
} from "lucide-react";

const COLORS = ["#FACC15", "#1E3A8A", "#10B981"];

// Safe currency formatter
const formatCurrency = (amount) => {
  const num = Number(amount ?? 0);
  return `$${num.toLocaleString()}`;
};

const FastStart = React.memo(() => {
  const [profile, setProfile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken") || "";

    Promise.all([getUserProfile(token), getUserPackages(token)])
      .then(([p, pkgs]) => {
        setProfile(p);
        setPackages(pkgs || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Load error:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      });
  }, []);

  // Safe data extraction
  const fastStart = profile?.fastStartPerformance || {};
  const leadership = profile?.leadershipTraction || {};

  const fastStartBonus = fastStart.totalEarned || 0;
  const groupVolume = leadership.groupVolume || 0;
  const totalReferrals = profile?.totalReferral || 0;
  const totalDownline = profile?.totalDownline || 0;

  // Bar & Pie chart data – only show what actually exists
  const chartData = useMemo(() => {
    return fastStartBonus > 0
      ? [{ name: "Fast Start Bonus", value: fastStartBonus }]
      : [];
  }, [fastStartBonus]);

  // Paid packages breakdown (if you ever get real package data)
  const paidPackages = useMemo(
    () =>
      packages
        .filter((pkg) => !pkg.isFree && pkg.price > 0)
        .map((pkg) => {
          const academy = Math.round(pkg.price * 0.3);
          const tradePool = Math.round(pkg.price * 0.7);
          const bonus = Math.round(academy * 0.5);
          return { id: pkg.id, name: pkg.name || "Unknown", academy, tradePool, bonus };
        }),
    [packages]
  );

  /* ------------------- LOADING STATE ------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-500" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
            Loading Fast Start...
          </span>
        </div>
      </div>
    );
  }

  /* ------------------- ERROR STATE ------------------- */
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center">
          <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
          <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ------------------- MAIN UI ------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3"
          >
            <Trophy className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
            Fast Start Performance
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            Welcome back, <strong className="text-gray-800 dark:text-gray-200">{profile?.name || "User"}</strong> • Rank:{" "}
            <strong className="text-yellow-600 dark:text-yellow-400">{profile?.rank || "None"}</strong>
          </p>
        </header>

        {/* OVERVIEW CARDS – NOW SAFE */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { title: "Total Referrals", value: totalReferrals, icon: Users, color: "text-blue-600 dark:text-blue-400" },
            { title: "Active Downline", value: totalDownline, icon: Users, color: "text-indigo-600 dark:text-indigo-400" },
            { title: "Fast Start Earned", value: formatCurrency(fastStartBonus), icon: DollarSign, color: "text-green-600 dark:text-green-400" },
            { title: "Group Volume", value: formatCurrency(groupVolume), icon: Wallet, color: "text-teal-600 dark:text-teal-400" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                </div>
                <card.icon className={`h-8 w-8 ${card.color}`} />
              </div>
            </motion.div>
          ))}
        </section>

        {/* FAST START BREAKDOWN */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* LEFT: Package Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              Package Breakdown (Your Referrals)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              30% → Academy | 70% → Trade Pool | <strong className="text-green-600 dark:text-green-400">50% of Academy = Fast Start Bonus</strong>
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Package</th>
                    <th className="px-4 py-3 text-left font-medium">Academy (30%)</th>
                    <th className="px-4 py-3 text-left font-medium">Trade Pool (70%)</th>
                    <th className="px-4 py-3 text-left font-medium">Your Bonus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-700">
                  {paidPackages.length > 0 ? (
                    paidPackages.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700/50">
                        <td className="px-4 py-3 font-medium">{pkg.name}</td>
                        <td className="px-4 py-3">${pkg.academy.toLocaleString()}</td>
                        <td className="px-4 py-3">${pkg.tradePool.toLocaleString()}</td>
                        <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">
                          ${pkg.bonus.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-gray-400">
                        <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>No paid referrals yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* RIGHT: Charts */}
          <div className="space-y-6">

            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Fast Start Earnings</h3>
              {chartData.length === 0 ? (
                <div className="h-52 flex items-center justify-center text-gray-400">
                  No Fast Start earnings yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="value" fill="#FACC15" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Earnings Distribution</h3>
              {chartData.length === 0 ? (
                <div className="h-52 flex items-center justify-center text-gray-400">
                  Start referring to see distribution
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all">
            <Package className="mr-3 h-6 w-6" />
            Share Your Link & Start Earning
          </button>
        </motion.div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Velox Capital © 2025 | Fast Start Dashboard v2.1</p>
        </div>
      </div>
    </div>
  );
});

FastStart.displayName = "FastStart";

export default FastStart;







// import React, { useEffect, useState } from "react";
// import DonutProgress from "./PieChartIcons"; // Donut chart
// import { apiClient } from "../api/apiClient";

// const PackageSummary = () => {
//   const [packageROI, setPackageROI] = useState({
//     name: "$0_Package",
//     price: 0,
//     cap: 0,
//     earned: 0,
//     percent: 0,
//     status: "active",
//     daysActive: 0,
//   });

//   const [bullChart, setBullChart] = useState(null);
//   const [bearChart, setBearChart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await apiClient.get("/api/users/profile");
//         const data = response.data;
//         console.log("✅ User Profile Data:", data);

//         if (data) {
//           // Extract ROI data
//           const roi = data.packageROI || {};
//           setPackageROI({
//             name: roi.name || "$0_Package",
//             price: roi.price || 0,
//             cap: roi.cap || 0,
//             earned: roi.earned || 0,
//             percent: isNaN(parseFloat(roi.percent)) ? 0 : parseFloat(roi.percent),
//             status: roi.status || "inactive",
//             daysActive: roi.daysActive || 0,
//           });

//           // Set Bull & Bear chart data
//           if (data.bullChart) setBullChart(data.bullChart);
//           if (data.bearChart) setBearChart(data.bearChart);
//         }
//       } catch (error) {
//         console.error("❌ Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="h-auto w-full max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-teal-200 dark:border-teal-700 p-6 flex flex-col items-center">
//       {loading ? (
//         <div className="text-gray-500 dark:text-gray-300">Loading...</div>
//       ) : (
//         <>
//           {/* ─── BULL CHART ───────────────────────────── */}
//           {bullChart && (
//             <div className="w-full mb-10">
//               <div className="text-center mb-5">
//                 <h1 className="text-2xl font-semibold text-teal-700 dark:text-teal-300">
//                   Bull Chart
//                 </h1>
//                 <p className="mt-1 text-sm">
//                   Status:{" "}
//                   <span
//                     className={`font-semibold px-2 py-1 rounded-md ${
//                       packageROI.status === "active"
//                         ? "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
//                         : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
//                     }`}
//                   >
//                     {packageROI.status}
//                   </span>
//                 </p>
//               </div>

//               <div className="w-full flex justify-center mb-6">
//                 <DonutProgress
//                   percentage={packageROI.percent || 0}
//                   label={bullChart.labels?.[0] || "Bull Wallet"}
//                 />
//               </div>

//               <div className="w-full bg-gradient-to-br from-teal-50 to-amber-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-4 text-center shadow-inner">
//                 <div className="grid grid-cols-2 gap-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
//                   <div className="text-start text-teal-700 dark:text-teal-300">
//                     Locked Trading Profit:
//                   </div>
//                   <div className="text-end text-amber-600 dark:text-amber-400">
//                     ${bullChart.datasets?.[0]?.data?.[0] ?? 0}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <hr className="h-[0.1px] w-full bg-gray-500 mb-5" />

//           {/* ─── BEAR CHART ───────────────────────────── */}
//           {bearChart && (
//             <div className="w-full mb-10">
//               <div className="text-center mb-5">
//                 <h1 className="text-2xl font-semibold text-red-700 dark:text-red-300">
//                   Bear Chart
//                 </h1>
//                 <p className="mt-1 text-sm">
//                   Locked Profit from Bear Wallet
//                 </p>
//               </div>

//               <div className="w-full flex justify-center mb-6">
//                 <DonutProgress
//                   percentage={bearChart.datasets?.[0]?.data?.[0] || 0}
//                   label={bearChart.labels?.[0] || "Bear Wallet"}
//                 />
//               </div>

//               <div className="w-full bg-gradient-to-br from-red-50 to-amber-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-4 text-center shadow-inner">
//                 <div className="grid grid-cols-2 gap-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
//                   <div className="text-start text-red-700 dark:text-red-300">
//                     Locked Trading Profit:
//                   </div>
//                   <div className="text-end text-amber-600 dark:text-amber-400">
//                     ${bearChart.datasets?.[0]?.data?.[0] ?? 0}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <hr className="h-[0.1px] w-full bg-gray-500 mb-5" />

//           {/* ─── ROI SUMMARY ───────────────────────────── */}
//           {/* <div className="text-center mb-5">
//             <h1 className="text-2xl font-semibold text-teal-700 dark:text-teal-300">
//               {packageROI.name}
//             </h1>
//             <p className="mt-1 text-sm">
//               Status:{" "}
//               <span
//                 className={`font-semibold px-2 py-1 rounded-md ${
//                   packageROI.status === "active"
//                     ? "bg-teal-100 text-teal-700 dark:bg-teal-800 dark:text-teal-200"
//                     : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
//                 }`}
//               >
//                 {packageROI.status}
//               </span>
//             </p>
//           </div>

//           <div className="w-full flex justify-center mb-6">
//             <DonutProgress percentage={packageROI.percent} />
//           </div>

//           <div className="w-full bg-gradient-to-br from-teal-50 to-amber-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl p-4 text-center shadow-inner">
//             <div className="grid grid-cols-2 gap-y-3 text-sm font-medium text-gray-700 dark:text-gray-300">
//               <div className="text-start text-teal-700 dark:text-teal-300">
//                 Price:
//               </div>
//               <div className="text-end text-amber-600 dark:text-amber-400">
//                 ${packageROI.price}
//               </div>

//               <div className="text-start text-teal-700 dark:text-teal-300">
//                 Cap:
//               </div>
//               <div className="text-end text-amber-600 dark:text-amber-400">
//                 ${packageROI.cap}
//               </div>

//               <div className="text-start text-teal-700 dark:text-teal-300">
//                 Earned:
//               </div>
//               <div className="text-end text-amber-600 dark:text-amber-400">
//                 ${packageROI.earned}
//               </div>

//               <div className="text-start text-teal-700 dark:text-teal-300">
//                 Days Active:
//               </div>
//               <div className="text-end text-amber-600 dark:text-amber-400">
//                 {packageROI.daysActive}
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 text-sm font-semibold text-teal-600 dark:text-teal-400 tracking-wide">
//             ROI Progress
//           </div> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default PackageSummary;







// // src/components/roi/PackageSummary.jsx
// import React, { useEffect, useState } from "react";
// import DonutProgress from "./PieChartIcons";
// import { TrendingUp, TrendingDown, Package, Calendar, DollarSign, Trophy } from "lucide-react";
// import { apiClient } from "../api/apiClient";

// const PackageSummary = () => {
//   const [roiData, setRoiData] = useState(null);
//   const [bullWallet, setBullWallet] = useState(0);
//   const [bearWallet, setBearWallet] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await apiClient.get("/api/users/profile");
//       const d = res.data;
//       setRoiData(d.roiData || {});
//       setBullWallet(Number(d.bullWallet || 0));
//       setBearWallet(Number(d.bearWallet || 0));
//       setLoading(false);
//     };
//     fetch();
//   }, []);

//   if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00A991]" /></div>;

//   const totalEarned = bullWallet + bearWallet;
//   const progress = roiData?.cap > 0 ? (totalEarned / roiData.cap) * 100 : 0;

//   const formatCurrency = (v) => `$${Number(v || 0).toLocaleString()}`;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden">
//         <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-8 text-white">
//           <h1 className="text-3xl font-bold flex items-center gap-3"><Package className="h-8 w-8" />{roiData?.name?.replace(/_/g, " ") || "Your Package"}</h1>
//           <p className="text-4xl font-extrabold mt-4">{progress.toFixed(1)}% Complete</p>
//         </div>

//         <div className="p-8 grid md:grid-cols-2 gap-10">
//           <div className="text-center">
//             <h3 className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2"><TrendingUp className="h-7 w-7" />Bull Wallet</h3>
//             <DonutProgress percentage={roiData?.cap ? (bullWallet / roiData.cap) * 100 : 0} color="#10B981" />
//             <p className="text-3xl font-bold text-green-700 mt-4">{formatCurrency(bullWallet)}</p>
//           </div>

//           <div className="text-center">
//             <h3 className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2"><TrendingDown className="h-7 w-7" />Bear Wallet</h3>
//             <DonutProgress percentage={roiData?.cap ? (bearWallet / roiData.cap) * 100 : 0} color="#EF4444" />
//             <p className="text-3xl font-bold text-red-700 mt-4">{formatCurrency(bearWallet)}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 dark:bg-neutral-700">
//           <div className="text-center"><DollarSign className="h-8 w-8 mx-auto text-[#00A991]" /><p className="text-2xl font-bold">{formatCurrency(roiData?.price)}</p><p className="text-xs">Price</p></div>
//           <div className="text-center"><Trophy className="h-8 w-8 mx-auto text-amber-600" /><p className="text-2xl font-bold">{formatCurrency(roiData?.cap)}</p><p className="text-xs">Cap</p></div>
//           <div className="text-center"><TrendingUp className="h-8 w-8 mx-auto text-green-600" /><p className="text-2xl font-bold">{formatCurrency(totalEarned)}</p><p className="text-xs">Earned</p></div>
//           <div className="text-center"><Calendar className="h-8 w-8 mx-auto text-purple-600" /><p className="text-2xl font-bold">{roiData?.daysActive || 0}</p><p className="text-xs">Days</p></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageSummary;





// src/components/roi/PackageSummary.jsx
import React, { useEffect, useState } from "react";
import DonutProgress from "./PieChartIcons";
import {
  TrendingUp,
  TrendingDown,
  Package,
  Calendar,
  DollarSign,
  Trophy,
} from "lucide-react";
import { apiClient } from "../api/apiClient";

const PackageSummary = () => {
  const [roiData, setRoiData] = useState(null);
  const [bullWallet, setBullWallet] = useState(0);
  const [bearWallet, setBearWallet] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/users/profile");
        const d = res.data; // ← this is the correct variable

        // Safe extraction with fallbacks
        setRoiData(d.roiData || {});
        setBullWallet(Number(d.bullWallet) || 0);
        setBearWallet(Number(d.bearWallet) || 0);

        console.log("ROI Data loaded successfully:", d); // ← now works
      } catch (err) {
        console.error("Failed to load ROI data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-[#00A991]" />
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
          Loading your ROI...
        </p>
      </div>
    );
  }

  const totalEarned = bullWallet + bearWallet;
  const progress = roiData?.cap > 0 ? (totalEarned / roiData.cap) * 100 : 0;
  const formatCurrency = (v) => `$${Number(v || 0).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-center">
          <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-10 text-white">
            <Package className="h-14 w-14 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold">
              {roiData?.name?.replace(/_/g, " ") || "Your Package"}
            </h1>
            <p className="text-6xl font-extrabold mt-6">{progress.toFixed(1)}%</p>
            <p className="text-xl opacity-90 mt-2">Cash back Progress</p>
          </div>
        </div>

        {/* Bull Wallet */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-8 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <TrendingUp className="h-12 w-12 text-green-600" />
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              Bull Wallet
            </h3>
          </div>
          <DonutProgress
            percentage={roiData?.cap ? (bullWallet / roiData.cap) * 100 : 0}
            color="#10B981"
            size={200}
          />
          <p className="text-4xl font-extrabold text-green-700 dark:text-green-300 mt-8">
            {formatCurrency(bullWallet)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Locked Trading Profit</p>
        </div>

        {/* Bear Wallet */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-8 text-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <TrendingDown className="h-12 w-12 text-red-600" />
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
              Bear Wallet
            </h3>
          </div>
          <DonutProgress
            percentage={roiData?.cap ? (bearWallet / roiData.cap) * 100 : 0}
            color="#EF4444"
            size={200}
          />
          <p className="text-4xl font-extrabold text-red-700 dark:text-red-300 mt-8">
            {formatCurrency(bearWallet)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">Locked Trading Profit</p>
        </div>

        {/* Stats Section */}
        {/* <div className="space-y-6">
          <div className="bg-gradient-to-r from-[#00A991]/10 to-emerald-100 dark:from-[#00A991]/20 dark:to-emerald-900/20 rounded-3xl p-8 text-center border border-[#00A991]/20">
            <DollarSign className="h-12 w-12 mx-auto text-[#00A991] mb-3" />
            <p className="text-3xl font-bold">{formatCurrency(roiData?.price)}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">Package Price</p>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20 rounded-3xl p-8 text-center border border-amber-300 dark:border-amber-800">
            <Trophy className="h-12 w-12 mx-auto text-amber-600 mb-3" />
            <p className="text-3xl font-bold">{formatCurrency(roiData?.cap)}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">Total Cap</p>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/20 rounded-3xl p-8 text-center border border-green-300 dark:border-green-800">
            <TrendingUp className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <p className="text-3xl font-bold">{formatCurrency(totalEarned)}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">Total Earned</p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20 rounded-3xl p-8 text-center border border-purple-300 dark:border-purple-800">
            <Calendar className="h-12 w-12 mx-auto text-purple-600 mb-3" />
            <p className="text-3xl font-bold">{roiData?.daysActive || 0}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">Days Active</p>
          </div>
        </div> */}

        {/* Progress Bar */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl p-5">
          <p className="text-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
            Overall cash back Progress
          </p>
          <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#00A991] to-emerald-500 flex items-center justify-center text-white text-2xl font-bold transition-all duration-1000"
              style={{ width: `${progress}%` }}
            >
              {progress.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSummary;
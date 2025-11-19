
// import React, { useEffect, useState } from "react";
// import { Check, Crown } from "lucide-react";
// import { getUserProfile } from "../../api/authApi";

// const LeadershipBonus = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* ────── FETCH USER PROFILE ────── */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // ✅ Try all possible token keys
//         const token =
//           localStorage.getItem("authToken") ||
//           localStorage.getItem("token") ||
//           sessionStorage.getItem("authToken");

//         if (!token) {
//           setError("No auth token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         // ✅ Fetch profile with proper Authorization header
//         const data = await getUserProfile(token);

//         if (!data || !data.userId) {
//           throw new Error("Invalid user profile response");
//         }

//         setProfile(data);
//       } catch (err) {
//         setError(err.message || "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   /* ────── LOADING UI ────── */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]"></div>
//         <span className="ml-3 text-lg text-gray-700">
//           Loading Leadership Bonus…
//         </span>
//       </div>
//     );
//   }

//   /* ────── ERROR UI ────── */
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//         <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
//           <p className="text-red-800 font-medium">{error}</p>
//           <button
//             onClick={() => (window.location.href = "/login")}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         <p>No user data found. Please log in again.</p>
//       </div>
//     );
//   }

//   /* ────── EXTRACT DATA FROM PROFILE ────── */
//   const lb = profile.leadershipBonus || {};
//   const progress = lb.progressToNextRank || {};

//   const currentRank = lb.currentRank ?? "Unknown";
//   const currentBonus = lb.currentBonus ?? 0;
//   const nextRank = progress.nextRank ?? "—";
//   const groupVolume = progress.groupVolume ?? 0;
//   const required = progress.required ?? 0;
//   const progressPercent = parseFloat(progress.progressPercent ?? "0");
//   const nextBonus = 10000; // optional placeholder if backend doesn’t provide

//   /* ────── MAIN UI (UNCHANGED LAYOUT) ────── */
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Top Section */}
//       <h1 className="text-gray-800 text-lg mb-4 font-bold">
//         Velox Leadership Bonus
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* ── Current Rank ── */}
//         <div className="border border-blue-200 rounded-xl bg-white shadow-sm p-6 text-center">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="text-yellow-500 text-lg">
//               <Crown />
//             </span>
//             <h2 className="text-gray-800 font-semibold text-lg">
//               Current Rank
//             </h2>
//           </div>
//           <h3 className="text-blue-600 text-2xl font-bold mb-1">
//             {currentRank}
//           </h3>
//           <p className="text-gray-500 text-sm mb-4">
//             Current Bonus: ${currentBonus.toLocaleString()}
//           </p>

//           <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-md flex items-center justify-center gap-1 mx-auto">
//             Eligible for Weekly Bonus: Yes
//             <Check size={16} className="text-green-600" />
//           </button>
//         </div>

//         {/* ── Progress to Next Rank ── */}
//         <div className="border border-green-300 rounded-xl bg-white shadow-sm p-6 text-center">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="text-green-600 text-sm">Chart Up</span>
//             <h2 className="text-gray-800 font-semibold text-sm">
//               Progress to Next Rank
//             </h2>
//           </div>
//           <p className="text-gray-700 text-sm mb-1">
//             Next Rank: <span className="font-medium">{nextRank}</span>
//           </p>

//           <div className="w-full bg-gray-200 h-3 rounded-full mt-2 mb-2">
//             <div
//               className="bg-green-600 h-3 rounded-full transition-all duration-500"
//               style={{ width: `${progressPercent}%` }}
//             />
//           </div>

//           <div className="flex justify-between text-xs text-gray-500 mb-4">
//             <span>Group Volume: ${groupVolume.toLocaleString()}</span>
//             <span>Required: ${required.toLocaleString()}</span>
//           </div>

//           <button className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-md mx-auto">
//             View Team Growth Plan
//           </button>
//         </div>

//         {/* ── Next Bonus Unlock ── */}
//         <div className="border border-yellow-300 rounded-xl bg-white shadow-sm p-6 text-center">
//           <div className="flex items-center justify-center gap-2 mb-3">
//             <span className="text-yellow-500 text-lg">Medal</span>
//             <h2 className="text-gray-800 font-semibold text-lg">
//               Next Bonus Unlock
//             </h2>
//           </div>
//           <h3 className="text-orange-500 text-2xl font-bold mb-1">
//             ${nextBonus.toLocaleString()}
//           </h3>
//           <p className="text-gray-600 text-sm mb-4">
//             Upon reaching {nextRank} rank
//           </p>

//           <button className="border border-yellow-400 hover:bg-yellow-50 text-yellow-700 text-sm font-medium px-4 py-1.5 rounded-md mx-auto">
//             View Qualification Requirements
//           </button>
//         </div>
//       </div>

//       {/* ── Rank Badge Section ── */}
//       <div className="bg-white border border-gray-100 rounded-xl shadow-sm py-10 text-center">
//         <h2 className="text-gray-800 font-semibold mb-6">Your Rank Badge</h2>
//         <div className="w-24 h-24 rounded-full border-4 border-blue-400 flex items-center justify-center mx-auto">
//           <span className="text-blue-500 text-4xl">
//             <Crown />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadershipBonus;








// import React, { useEffect, useState } from "react";
// import { Check, Crown, TrendingUp, Award, Target, Star, Sun, Moon } from "lucide-react";
// import { getUserProfile } from "../../api/authApi";

// const LeadershipBonus = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   // ────── THEME HANDLING ──────
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

//     if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     if (newMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   /* ────── FETCH USER PROFILE ────── */
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token =
//           localStorage.getItem("authToken") ||
//           localStorage.getItem("token") ||
//           sessionStorage.getItem("authToken");

//         if (!token) {
//           setError("No auth token found. Please log in.");
//           setLoading(false);
//           return;
//         }

//         const data = await getUserProfile(token);
//         if (!data?.userId) throw new Error("Invalid profile data");
//         setProfile(data);
//       } catch (err) {
//         setError(err.message || "Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   /* ────── LOADING STATE ────── */
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6 transition-colors">
//         <div className="flex items-center space-x-3">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]" />
//           <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
//             Loading Leadership Dashboard…
//           </span>
//         </div>
//       </div>
//     );
//   }

//   /* ────── ERROR STATE ────── */
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6 transition-colors">
//         <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center">
//           <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
//           <button
//             onClick={() => (window.location.href = "/login")}
//             className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">
//         <p>No user data found. Please log in again.</p>
//       </div>
//     );
//   }

//   /* ────── EXTRACT LEADERSHIP DATA ────── */
//   const lb = profile.leadershipBonus || {};
//   const progress = lb.progressToNextRank || {};

//   const currentRank = lb.currentRank || "Unknown";
//   const currentBonus = lb.currentBonus || 0;
//   const nextRank = progress.nextRank || "—";
//   const groupVolume = progress.groupVolume || 0;
//   const required = progress.required || 0;
//   const progressPercent = parseFloat(progress.progressPercent || "0");
//   const volumeNeeded = required - groupVolume;

//   const formatCurrency = (val) => `$${val?.toLocaleString() ?? 0}`;

//   /* ────── MAIN UI ────── */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-4 md:p-6 lg:p-8 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto">
//         {/* Header + Theme Toggle */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
//           <div className="text-center sm:text-left">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//               Velox Capital <span className="text-[#00A991]">Leadership Bonus</span>
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Track your rank, bonus, and path to the top
//             </p>
//           </div>

//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleDarkMode}
//             className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200 group"
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? (
//               <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
//             ) : (
//               <Moon className="h-5 w-5 text-gray-700 group-hover:rotate-12 transition-transform" />
//             )}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           {/* ── CURRENT RANK CARD ── */}
//           <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-md dark:hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Current Rank</h3>
//               <Crown className="h-7 w-7 text-amber-500" />
//             </div>

//             <div className="text-center">
//               <p className="text-3xl font-bold text-[#00A991] capitalize">{currentRank}</p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Leadership Level</p>
//             </div>

//             <div className="mt-5 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
//               <p className="text-sm text-gray-600 dark:text-gray-300">Current Monthly Bonus</p>
//               <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
//                 {formatCurrency(currentBonus)}
//               </p>
//             </div>

//             <div className="mt-4 flex items-center justify-center gap-2 text-sm">
//               <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
//               <span className="text-green-600 dark:text-green-400 font-medium">
//                 Weekly Bonus Eligible
//               </span>
//             </div>
//           </div>

//           {/* ── PROGRESS TO NEXT RANK ── */}
//           <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-md dark:hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
//                 Next Rank: {nextRank}
//               </h3>
//               <TrendingUp className="h-7 w-7 text-[#00A991]" />
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-600 dark:text-gray-400">Group Volume</span>
//                   <span className="font-medium text-gray-900 dark:text-white">{progressPercent}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-4 overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-[#00A991] to-[#10B981] rounded-full transition-all duration-700"
//                     style={{ width: `${progressPercent}%` }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   <span>{formatCurrency(groupVolume)}</span>
//                   <span>{formatCurrency(required)}</span>
//                 </div>
//               </div>

//               <div className="p-3 bg-gradient-to-r from-[#00A991]/10 to-[#10B981]/10 dark:from-[#00A991]/20 dark:to-[#10B981]/20 rounded-lg border border-[#00A991]/20 dark:border-[#00A991]/40">
//                 <p className="text-xs text-gray-600 dark:text-gray-400">You need</p>
//                 <p className="text-lg font-bold text-[#00A991]">{formatCurrency(volumeNeeded)}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">more in Group Volume</p>
//               </div>
//             </div>

//             <button className="mt-4 w-full py-2 bg-[#00A991] hover:bg-[#009981] text-white font-medium rounded-lg transition text-sm">
//               View Team Growth Plan
//             </button>
//           </div>

//           {/* ── NEXT BONUS UNLOCK ── */}
//           <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-md dark:hover:shadow-xl transition-all">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Next Bonus Unlock</h3>
//               <Award className="h-7 w-7 text-purple-600" />
//             </div>

//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 mb-3">
//                 <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
//               </div>
//               <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
//                 {formatCurrency(currentBonus * 3)}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Estimated at {nextRank}</p>
//             </div>

//             <div className="mt-5 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
//               <p className="text-sm text-gray-600 dark:text-gray-300">Unlock Conditions</p>
//               <ul className="text-xs text-gray-700 dark:text-gray-300 mt-1 space-y-1">
//                 <li>Reach {nextRank} rank</li>
//                 <li>Maintain active status</li>
//                 <li>Group Volume ≥ {formatCurrency(required)}</li>
//               </ul>
//             </div>

//             <button className="mt-4 w-full py-2 border border-purple-400 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium rounded-lg transition text-sm">
//               View Full Requirements
//             </button>
//           </div>
//         </div>

//         {/* ── RANK BADGE SHOWCASE ── */}
//         <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-8 text-center border border-gray-200 dark:border-neutral-700">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
//             Your Leadership Badge
//           </h2>
//           <div className="inline-block relative">
//             <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00A991] to-[#10B981] p-1">
//               <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
//                 <Crown className="h-16 w-16 text-[#00A991]" />
//               </div>
//             </div>
//             <div className="absolute -top-1 -right-1 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
//               <Star className="h-6 w-6 text-white" />
//             </div>
//           </div>
//           <p className="mt-5 text-lg font-bold text-[#00A991] capitalize">{currentRank}</p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">Leadership Achievement</p>
//         </div>

//         {/* ── MOTIVATIONAL FOOTER ── */}
//         <div className="mt-10 text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             <Target className="inline h-4 w-4 text-[#00A991] mr-1" />
//             Keep growing your team —{" "}
//             <strong className="text-[#00A991]">
//               {volumeNeeded > 0 ? `${formatCurrency(volumeNeeded)} to go!` : "You're ready for promotion!"}
//             </strong>
//           </p>
//         </div>

//         {/* Footer */}
//         <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
//           <p>Velox Capital © 2025 | Leadership Engine v3.0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadershipBonus;







import React, { useEffect, useState } from "react";
import { Check, Crown, TrendingUp, Award, Target, Star, Sun, Moon } from "lucide-react";
import { getUserProfile } from "../../api/authApi";

const LeadershipBonus = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // ────── THEME HANDLING ──────
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  /* ────── FETCH USER PROFILE ────── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("authToken") ||
          localStorage.getItem("token") ||
          sessionStorage.getItem("authToken");

        if (!token) {
          setError("No auth token found. Please log in.");
          setLoading(false);
          return;
        }

        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err) {
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ────── LOADING & ERROR STATES ────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading Leadership Dashboard…
          </span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 max-w-md text-center">
          <p className="text-red-800 dark:text-red-300 font-medium">{error || "No profile data"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ────── EXTRACT REAL LEADERSHIP DATA FROM API ────── */
  const traction = profile.leadershipTraction || {};

  const currentRank = traction.currentRank || "None";
  const nextRank = traction.nextRank || "Bronze";
  const groupVolume = Number(traction.groupVolume || 0);
  const requiredGV = Number(traction.requiredGV || 5000);
  const progressPercent = parseFloat(traction.gvProgress || "0");
  const missingGV = Number(traction.missingGV || requiredGV);

  const formatCurrency = (val) => {
    const num = Number(val || 0);
    return `$${num.toLocaleString()}`;
  };

  // Estimate next bonus (common pattern: higher ranks = 2x–5x bonus)
  const estimatedNextBonus = currentRank === "none" ? 250 : groupVolume > 50000 ? 5000 : 1000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-4 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Velox Capital <span className="text-[#00A991]">Leadership Bonus</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Build your team. Climb the ranks. Earn generational wealth.
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all group"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-180 transition" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 group-hover:-rotate-12 transition" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {/* Current Rank */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Current Rank</h3>
              <Crown className="h-8 w-8 text-amber-500" />
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-extrabold text-[#00A991] capitalize">{currentRank}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Leadership Status</p>
            </div>
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-700 dark:text-amber-300">Monthly Leadership Bonus</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {currentRank === "none" ? "$0" : formatCurrency(250)}
              </p>
            </div>
          </div>

          {/* Progress to Next Rank */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Next Rank: <span className="text-[#00A991]">{nextRank}</span>
              </h3>
              <TrendingUp className="h-8 w-8 text-[#00A991]" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Group Volume Progress</span>
                  <span className="font-bold">{progressPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-5">
                  <div
                    className="h-full bg-gradient-to-r from-[#00A991] to-emerald-500 rounded-full transition-all duration-1000 shadow-lg"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-2 text-gray-600 dark:text-gray-400">
                  <span>{formatCurrency(groupVolume)}</span>
                  <span>{formatCurrency(requiredGV)}</span>
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">You need</p>
                <p className="text-2xl font-bold text-[#00A991] font-extrabold">
                  {formatCurrency(missingGV)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">more GV for {nextRank}</p>
              </div>
            </div>
          </div>

          {/* Next Bonus Unlock */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">Next Bonus Unlock</h3>
              <Award className="h-8 w-8 text-purple-600" />
            </div>

            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/40 mb-4 shadow-inner">
                <Star className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(estimatedNextBonus)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Estimated at {nextRank}</p>
            </div>

            <div className="mt-5 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Requirements:</p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>Active personal package</li>
                <li>2+ active direct referrals</li>
                <li>Group Volume ≥ ${requiredGV.toLocaleString()}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rank Badge */}
        <div className="text-center py-12">
          <div className="inline-block relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00A991] to-emerald-600 p-2 shadow-2xl">
              <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                <Crown className="h-20 w-20 text-[#00A991]" />
              </div>
            </div>
            {currentRank !== "none" && (
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <Star className="h-7 w-7 text-white" />
              </div>
            )}
          </div>
          <h2 className="mt-6 text-3xl font-bold text-[#00A991] capitalize">{currentRank} Leader</h2>
          <p className="text-gray-600 dark:text-gray-400">Keep building — your empire awaits</p>
        </div>

        {/* Motivational CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <Target className="inline h-5 w-5 text-[#00A991] mr-2" />
            {missingGV <= 0 ? (
              <span className="text-emerald-600 font-bold">Congratulations! You're qualified for {nextRank}!</span>
            ) : (
              <span>
                Just <strong className="text-[#00A991]">{formatCurrency(missingGV)}</strong> more in Group Volume
              </span>
            )}
          </p>
        </div>

        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-500">
          <p>Velox Capital © 2025 | Leadership Dashboard v3.2 – Powered by Real Data</p>
        </div>
      </div>
    </div>
  );
};

export default LeadershipBonus;
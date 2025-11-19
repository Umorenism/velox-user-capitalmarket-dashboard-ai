
// // src/components/Header.jsx
// import React, { useState, useContext } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../routes/UserContext";
// import {
//   Sun,
//   Moon,
//   Bell,
//   MessageSquare,
//   Settings,
//   Search,
//   User,
//   LogOut,
//   Menu,
// } from "lucide-react";
// import profilePic from "../../assets/profile.svg";
// import { useNavigate } from "react-router-dom";

// const DropdownItem = ({ icon, label, route, danger, onClick }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     } else if (route) {
//       const fullPath = route.startsWith("/") ? route : `/dashboard/${route}`;
//       navigate(fullPath);
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left ${
//         danger
//           ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
//           : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
//       } transition`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );
// };

// export default function Header({ toggleSidebar }) {
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);

//   return (
//     <header className="flex items-center justify-between px-4 md:px-6 py-2 bg-white dark:bg-neutral-900 dark:text-white shadow-md relative">
//       <div className="flex items-center gap-3 w-full max-w-md">
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
//           aria-label="Toggle sidebar"
//         >
//           <Menu size={22} />
//         </button>
//         <div className="relative w-full hidden sm:block">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full pl-9 pr-4 py-2 rounded-md bg-transparent text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />
//         </div>
//       </div>
//       <div className="flex items-center sm:space-x-5">
//         <button
//           onClick={toggleTheme}
//           className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
//           aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//         >
//           <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
//             {theme === "dark" ? "Dark" : "Light"}
//           </span>
//           <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1">
//             <span
//               className={`absolute top-0.5 left-0.5 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
//                 theme === "dark" ? "translate-x-5" : "translate-x-0"
//               }`}
//             >
//               {theme === "dark" ? (
//                 <Moon size={12} className="text-gray-700" />
//               ) : (
//                 <Sun size={12} className="text-yellow-500" />
//               )}
//             </span>
//           </div>
//         </button>
//         <div className="flex items-center space-x-3 sm:space-x-4 text-gray-500 dark:text-gray-300">
//           <MessageSquare
//             className="cursor-pointer hover:text-[#00A991]"
//             size={20}
//             aria-label="Messages"
//           />
//           <Bell
//             className="cursor-pointer hover:text-[#00A991]"
//             size={20}
//             aria-label="Notifications"
//           />
//           <Settings
//             className="hidden sm:block cursor-pointer hover:text-[#00A991]"
//             size={20}
//             aria-label="Settings"
//           />
//         </div>
//         <div
//           className="relative"
//           onMouseEnter={() => setShowDropdown(true)}
//           onMouseLeave={() => setShowDropdown(false)}
//         >
//           <img
//             src={user?.profilePic || profilePic}
//             alt={user?.name || "User"}
//             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#00A991] cursor-pointer object-cover transition-transform hover:scale-105"
//           />
//           <AnimatePresence>
//             {showDropdown && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-3 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-100 dark:border-neutral-700 py-2 z-50"
//               >
//                 <DropdownItem
//                   icon={<User size={16} />}
//                   label="Profile"
//                   route="companyprofile"
//                 />
                
//                 <hr className="border-gray-200 dark:border-neutral-700 my-1" />
//                 <DropdownItem
//                   icon={<LogOut size={16} className="text-red-500" />}
//                   label="Logout"
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   danger
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </header>
//   );
// }









// src/components/Header.jsx
// src/components/Header.jsx
// import React, { useState, useContext, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../routes/UserContext";

// import {
//   Sun,
//   Moon,
//   Bell,
//   MessageSquare,
//   Settings,
//   Search,
//   User,
//   LogOut,
//   Menu,
// } from "lucide-react";
// import profilePic from "../../assets/profile.svg";
// import { useNavigate } from "react-router-dom";

// // Notification Sound
// const NOTIFICATION_SOUND_URL =
//   "https://www.zedge.net/ringtones/f4e0a491-324c-39d5-b827-a543f6d78604";

// const DropdownItem = ({ icon, label, route, danger, onClick }) => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     if (onClick) onClick();
//     else if (route) {
//       const fullPath = route.startsWith("/") ? route : `/dashboard/${route}`;
//       navigate(fullPath);
//     }
//   };
//   return (
//     <button
//       onClick={handleClick}
//       className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition ${
//         danger
//           ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
//           : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
//       }`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );
// };

// // Generate initials from user profile data
// const getInitials = (user) => {
//   // Try username first (if available)
//   if (user?.username) {
//     const parts = user.username.trim().split(/\s+|_|-|\./);
//     return parts
//       .filter(Boolean)
//       .map((p) => p[0])
//       .slice(0, 2)
//       .join("")
//       .toUpperCase();
//   }
//   // Use name from profile (e.g., "John Doe Updated" → "JD")
//   if (user?.name) {
//     const parts = user.name.trim().split(/\s+/);
//     return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "U";
//   }
//   return "U";
// };

// const InitialsAvatar = ({ user, size = "w-10 h-10 sm:w-12 sm:h-12" }) => {
//   const initials = getInitials(user);
//   return (
//     <div
//       className={`${size} rounded-full bg-gradient-to-br from-[#00A991] to-[#00D4B2] flex items-center justify-center text-white font-bold text-sm sm:text-base border-2 border-white shadow-md`}
//     >
//       {initials}
//     </div>
//   );
// };

// export default function Header({ toggleSidebar }) {
//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(UserContext);
//   const navigate = useNavigate();

//   // State
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [notifications, setNotifications] = useState([
//     { id: 1, message: "Welcome back! You have 2 new tasks.", read: false, time: "2 min ago" },
//     { id: 2, message: "Your report was approved.", read: false, time: "10 min ago" },
//     { id: 3, message: "Meeting at 3 PM with team.", read: true, time: "1 hour ago" },
//   ]);

//   // Refs
//   const audioRef = useRef(null);
//   const prevUnreadCount = useRef(0);

//   // Play notification sound
//   useEffect(() => {
//     const unreadCount = notifications.filter((n) => !n.read).length;
//     if (unreadCount > prevUnreadCount.current && unreadCount > 0) {
//       if (audioRef.current) {
//         audioRef.current.currentTime = 0;
//         audioRef.current.play().catch(() => {});
//       }
//     }
//     prevUnreadCount.current = unreadCount;
//   }, [notifications]);

//   // Global Search
//   const handleGlobalSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     if (query.trim()) {
//       console.log("Global search:", query);
//     }
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//   };

//   // Full Name from user profile
//   const fullName = user?.name || user?.username || user?.email || "User";

//   return (
//     <header className="flex items-center justify-between px-4 md:px-6 py-2 bg-white dark:bg-neutral-900 dark:text-white shadow-md relative">
//       <audio ref={audioRef} src={NOTIFICATION_SOUND_URL} preload="auto" />

//       {/* Left: Menu + Search */}
//       <div className="flex items-center gap-3 w-full max-w-md">
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
//           aria-label="Toggle sidebar"
//         >
//           <Menu size={22} />
//         </button>
//         <div className="relative w-full">
//           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleGlobalSearch}
//             placeholder="Search tasks, users, projects..."
//             className="w-full pl-9 pr-4 py-2 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A991] transition"
//           />
//         </div>
//       </div>

//       {/* Right: Theme, Icons, Profile */}
//       <div className="flex items-center sm:space-x-5">
//         {/* Theme Toggle */}
//         <button
//           onClick={toggleTheme}
//           className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
//           aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//         >
//           <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
//             {theme === "dark" ? "Dark" : "Light"}
//           </span>
//           <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-1">
//             <span
//               className={`absolute top-0.5 left-0.5 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
//                 theme === "dark" ? "translate-x-5" : "translate-x-0"
//               }`}
//             >
//               {theme === "dark" ? (
//                 <Moon size={12} className="text-gray-700" />
//               ) : (
//                 <Sun size={12} className="text-yellow-500" />
//               )}
//             </span>
//           </div>
//         </button>

//         {/* Icons */}
//         <div className="flex items-center space-x-3 sm:space-x-4 text-gray-500 dark:text-gray-300">
//           <MessageSquare className="cursor-pointer hover:text-[#00A991]" size={20} aria-label="Messages" />
          
//           {/* Notifications */}
//           <div className="relative">
//             <button
//               onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
//               className="relative cursor-pointer hover:text-[#00A991] transition"
//               aria-label="Notifications"
//             >
//               <Bell size={20} />
//               {notifications.some((n) => !n.read) && (
//                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
//               )}
//             </button>
//             <AnimatePresence>
//               {showNotificationDropdown && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-3 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-700 py-2 z-50"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-neutral-700">
//                     <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
//                     {notifications.some((n) => !n.read) && (
//                       <button onClick={markAllAsRead} className="text-xs text-[#00A991] hover:underline">
//                         Mark all as read
//                       </button>
//                     )}
//                   </div>
//                   <div className="max-h-96 overflow-y-auto">
//                     {notifications.length > 0 ? (
//                       notifications.map((notif) => (
//                         <div
//                           key={notif.id}
//                           className={`px-4 py-3 flex items-start gap-3 border-b border-gray-50 dark:border-neutral-700 last:border-0 ${
//                             !notif.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
//                           }`}
//                         >
//                           <div className="mt-1 w-2 h-2 rounded-full bg-[#00A991] flex-shrink-0"></div>
//                           <div className="flex-1">
//                             <p className={`text-sm ${!notif.read ? "font-medium" : ""}`}>
//                               {notif.message}
//                             </p>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-center text-sm text-gray-500 py-6">No notifications</p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           <Settings className="hidden sm:block cursor-pointer hover:text-[#00A991]" size={20} aria-label="Settings" />
//         </div>

//         {/* Profile Dropdown */}
//         <div
//           className="relative"
//           onMouseEnter={() => setShowProfileDropdown(true)}
//           onMouseLeave={() => setShowProfileDropdown(false)}
//         >
//           {user?.profilePic ? (
//             <img
//               src={user.profilePic}
//               alt={fullName}
//               className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-[#00A991] cursor-pointer object-cover transition-transform hover:scale-105"
//             />
//           ) : (
//             <InitialsAvatar user={user} size="w-8 h-8 sm:w-8 sm:h-8" />
//           )}

//           <AnimatePresence>
//             {showProfileDropdown && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-0 mt-3 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-100 dark:border-neutral-700 py-2 z-50"
//               >
//                 <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-700">
//                   {/* Full Name from profile */}
//                   <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                     {fullName}
//                   </p>
                  
//                   {/* Email or Username */}
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {user?.username ? `@${user.username}` : user?.email}
//                   </p>
                  
//                   {/* USER ID FROM PROFILE - DIRECTLY FROM API RESPONSE */}
//                   {user?.userId && (
//                     <p className="text-xs text-gray-400 mt-1">
//                       ID: <span className="font-mono">{user.userId}</span>
//                     </p>
//                   )}
//                 </div>

//                 <DropdownItem icon={<User size={16} />} label="Profile" route="companyprofile" />
//                 <hr className="border-gray-200 dark:border-neutral-700 my-1" />
//                 <DropdownItem
//                   icon={<LogOut size={16} className="text-red-500" />}
//                   label="Logout"
//                   onClick={() => {
//                     logout();
//                     navigate("/login");
//                   }}
//                   danger
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </header>
//   );
// }






import React, { useState, useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { UserContext } from "../../routes/UserContext";
import { apiClient } from "../../api/apiClient";
import { Link, useNavigate } from "react-router-dom";

import {
  Sun, Moon, Bell, MessageSquare, Settings, Search, User, LogOut, Menu,
} from "lucide-react";

// -------------------------------------------------------------------
// Notification Sound
// -------------------------------------------------------------------
const NOTIFICATION_SOUND_URL =
  "https://www.zedge.net/ringtones/f4e0a491-324c-39d5-b827-a543f6d78604";

// -------------------------------------------------------------------
// Helper: Generate initials from user
// -------------------------------------------------------------------
const getInitials = (user) => {
  if (user?.username) {
    const parts = user.username.trim().split(/\s+|_|-|\./);
    return parts
      .filter(Boolean)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  if (user?.name) {
    const parts = user.name.trim().split(/\s+/);
    return `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "U";
  }
  return "U";
};

// -------------------------------------------------------------------
// Component: Initials Avatar
// -------------------------------------------------------------------
const InitialsAvatar = ({ user, size = "w-10 h-10 sm:w-12 sm:h-12" }) => {
  const initials = getInitials(user);
  return (
    <div
      className={`${size} rounded-full bg-gradient-to-br from-[#00A991] to-[#00D4B2] flex items-center justify-center text-white font-bold text-sm sm:text-base border-2 border-white shadow-md`}
    >
      {initials}
    </div>
  );
};

// -------------------------------------------------------------------
// Component: Dropdown Item (No hooks inside!)
// -------------------------------------------------------------------
const DropdownItem = ({ icon, label, route, danger, onClick, navigate }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route && navigate) {
      const fullPath = route.startsWith("/") ? route : `/dashboard/${route}`;
      navigate(fullPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// -------------------------------------------------------------------
// Main Header Component
// -------------------------------------------------------------------
export default function Header({ toggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Refs
  const audioRef = useRef(null);
  const prevUnreadCount = useRef(0);
  const prevProfileSnapshot = useRef(null);

  // -----------------------------------------------------------------
  // 1. Fetch profile & generate notifications
  // -----------------------------------------------------------------
  const fetchProfile = async () => {
    try {
      const res = await apiClient.get("/api/users/profile");
      const profile = res.data;

      // First load: store snapshot, no notifications
      if (!prevProfileSnapshot.current) {
        prevProfileSnapshot.current = profile;
        if (setUser) setUser(profile);
        return;
      }

      const prev = prevProfileSnapshot.current;
      const next = profile;
      const newNotifs = [];

      const push = (msg) => {
        newNotifs.push({
          id: Date.now() + Math.random(),
          message: msg,
          read: false,
          time: "just now",
        });
      };

      // Referral changes
      if (next.totalReferral !== prev.totalReferral) {
        const diff = next.totalReferral - prev.totalReferral;
        push(`You have ${diff > 0 ? "gained" : "lost"} ${Math.abs(diff)} referral${Math.abs(diff) > 1 ? "s" : ""}.`);
      }

      // Downline
      if (next.totalDownline !== prev.totalDownline) {
        const diff = next.totalDownline - prev.totalDownline;
        push(`${Math.abs(diff)} new downline member${Math.abs(diff) > 1 ? "s" : ""} ${diff > 0 ? "joined" : "left"}.`);
      }

      // Volumes
      if (next.personalVolume !== prev.personalVolume) {
        push(`Personal volume updated: $${next.personalVolume.toLocaleString()}.`);
      }
      if (next.groupVolume !== prev.groupVolume) {
        push(`Group volume updated: $${next.groupVolume.toLocaleString()}.`);
      }

      // Investment & Profit
      if (next.totalInvestment !== prev.totalInvestment) {
        push(`Total investment changed to $${next.totalInvestment.toLocaleString()}.`);
      }
      if (next.withdrawableProfit !== prev.withdrawableProfit) {
        push(`Withdrawable profit: $${next.withdrawableProfit.toLocaleString()}.`);
      }

      // ROI / Bonuses
      const roiDiff = (next.bonusBreakdown?.roi_earnings || 0) - (prev.bonusBreakdown?.roi_earnings || 0);
      if (roiDiff !== 0) {
        push(`ROI earnings ${roiDiff > 0 ? "increased" : "decreased"} by $${Math.abs(roiDiff).toLocaleString()}.`);
      }

      const uniDiff = (next.totalUnilevelBonus || 0) - (prev.totalUnilevelBonus || 0);
      if (uniDiff !== 0) {
        push(`Unilevel bonus ${uniDiff > 0 ? "increased" : "decreased"} by $${Math.abs(uniDiff).toLocaleString()}.`);
      }

      // Active Package
      const prevPkg = prev.activePackage?.name;
      const nextPkg = next.activePackage?.name;
      if (prevPkg !== nextPkg) {
        push(`Active package changed to **${nextPkg || "None"}**.`);
      }

      // Add new notifications
      if (newNotifs.length > 0) {
        setNotifications((curr) => [...newNotifs, ...curr]);
      }

      // Update snapshot & context
      prevProfileSnapshot.current = next;
      if (setUser) setUser(next);
    } catch (err) {
      console.error("Failed to fetch profile for notifications:", err);
    }
  };

  // -----------------------------------------------------------------
  // 2. Poll every 30 seconds
  // -----------------------------------------------------------------
  useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 30_000);
    return () => clearInterval(interval);
  }, []);

  // -----------------------------------------------------------------
  // 3. Play sound on new unread notification
  // -----------------------------------------------------------------
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    if (unread > prevUnreadCount.current && unread > 0 && document.visibilityState === "visible") {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    }
    prevUnreadCount.current = unread;
  }, [notifications]);

  // -----------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------
  const handleGlobalSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim()) {
      console.log("Global search:", q);
      // Add real search logic later
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const fullName = user?.name || user?.username || user?.email || "User";

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileDropdown(false);
      setShowNotificationDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // -----------------------------------------------------------------
  // JSX
  // -----------------------------------------------------------------
  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-2 bg-white dark:bg-neutral-900 dark:text-white shadow-md relative z-10">
      <audio ref={audioRef} src={NOTIFICATION_SOUND_URL} preload="auto" />

      {/* LEFT – MENU + SEARCH */}
      <div className="flex items-center gap-3 w-full max-w-md">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleGlobalSearch}
            placeholder="Search tasks, users, projects..."
            className="w-full pl-9 pr-4 py-2 rounded-md bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A991] transition"
          />
        </div>
      </div>

      {/* RIGHT – THEME, ICONS, PROFILE */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full transition duration-300"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
          <div className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full p-0.5">
            <span
              className={`absolute top-0.5 left-0.5 flex items-center justify-center w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {theme === "dark" ? (
                <Moon size={12} className="text-gray-700" />
              ) : (
                <Sun size={12} className="text-yellow-500" />
              )}
            </span>
          </div>
        </button>

        {/* ICONS */}
        <div className="flex items-center gap-3 sm:gap-4 text-gray-500 dark:text-gray-300">
          <MessageSquare className="cursor-pointer hidden sm:block hover:text-[#00A991] transition" size={20} aria-label="Messages" />

          {/* NOTIFICATIONS */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationDropdown(!showNotificationDropdown);
                setShowProfileDropdown(false);
              }}
              className="relative cursor-pointer hover:text-[#00A991] transition"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 w-2   h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            <AnimatePresence>
              {showNotificationDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-gray-100 dark:border-neutral-700 py-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-neutral-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifications</h3>
                    {notifications.some((n) => !n.read) && (
                      <button onClick={markAllAsRead} className="text-xs text-[#00A991] hover:underline">
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-3 flex items-start gap-3 border-b border-gray-50 dark:border-neutral-700 last:border-0 ${
                            !notif.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                          }`}
                        >
                          <div className="mt-1 w-2 h-2 rounded-full bg-[#00A991] flex-shrink-0"></div>
                          <div className="flex-1">
                            <p
                              className={`text-sm ${!notif.read ? "font-medium" : ""}`}
                              dangerouslySetInnerHTML={{ __html: notif.message }}
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-gray-500 py-6">No notifications</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="setting">
          <Settings  className="hidden sm:block cursor-pointer hover:text-[#00A991] transition" size={20} aria-label="Settings" />
          </Link>
          
        </div>

        {/* PROFILE DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={() => setShowProfileDropdown(true)}
          onMouseLeave={() => setShowProfileDropdown(false)}
          onClick={(e) => e.stopPropagation()}
        >
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={fullName}
              className="w-8 h-8 sm:w-8 sm:h-8 rounded-full border-2 border-[#00A991] cursor-pointer object-cover transition-transform hover:scale-105"
            />
          ) : (
            <InitialsAvatar user={user} size="w-8 h-8 sm:w-10 sm:h-10" />
          )}

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-100 dark:border-neutral-700 py-2 z-50"
              >
                <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-700">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{fullName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.username ? `@${user.username}` : user?.email}
                  </p>
                  {user?.userId && (
                    <p className="text-xs text-gray-400 mt-1">
                      ID: <span className="font-mono">{user.userId}</span>
                    </p>
                  )}
                </div>

                <DropdownItem
                  icon={<User size={16} />}
                  label="Profile"
                  route="companyprofile"
                  navigate={navigate}
                />
                <hr className="border-gray-200 dark:border-neutral-700 my-1" />
                <DropdownItem
                  icon={<LogOut size={16} className="text-red-500" />}
                  label="Logout"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  danger
                  navigate={navigate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
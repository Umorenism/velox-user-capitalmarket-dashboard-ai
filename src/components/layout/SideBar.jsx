// // import React, { useState, useContext } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   Users,
// //   CreditCard,
// //   ArrowDownCircle,
// //   Shield,
// //   LifeBuoy,
// //   LogOut,
// //   Search,
// //   X,
// //   ChevronDown,
// //   ChevronUp,
// //   Handshake,
// //   Sun,
// //   Moon,
// //   Calculator,
// //   BookOpen,
// //   LeafIcon,
// //   Copy,
// //   Network,
// //   Download,
// //   ClipboardList,
// //   Bell, // ← for Notifications
// // } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import logoimg from "../../assets/velox.svg";
// // import profilePic from "../../assets/profile.svg";
// // import { useTheme } from "../../context/ThemeContext";
// // import { UserContext } from "../../routes/UserContext";
// // import { useUserRole } from "../../routes/UserRoleContext"; // ← NEW

// // export default function SideBar({ closeSidebar }) {
// //   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
// //   const [isModulesOpen, setIsModulesOpen] = useState(false);
// //   const [isCopyTradingOpen, setIsCopyTradingOpen] = useState(false);
// //   const [isNetworkOpen, setIsNetworkOpen] = useState(false);

// //   const { theme, toggleTheme } = useTheme();
// //   const { user, logout } = useContext(UserContext);
// //   const { isAcademy } = useUserRole(); // ← NEW
// //   const navigate = useNavigate();

// //   /* ------------------- TOP LINKS (Only for Trading) ------------------- */
// //   const topLinks = [
// //     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
// //     { to: "/dashboard/users", label: "Packages", icon: <Users size={18} /> },
// //     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
// //     { to: "/dashboard/part", label: "Partners", icon: <Handshake size={18} /> },
// //     { to: "/dashboard/leaderboard", label: "LeaderBoard", icon: <LeafIcon size={18} /> },
// //     { to: "/dashboard/retirement-blog", label: "Retirement Blog", icon: <BookOpen size={18} /> },
// //   ];

// //   const copyTradingItems = [
// //     { to: "/dashboard/copy-trading", label: "Configure Copy Trading" },
// //   ];

// //   const networkItems = [
// //     { to: "/dashboard/network/fast-start", label: "Fast Start" },
// //     { to: "/dashboard/network/unilevel", label: "Unilevel" },
// //     { to: "/dashboard/network/matrix", label: "Matrix" },
// //     { to: "/dashboard/network/leadership-bonus", label: "Leadership Bonus" },
// //     { to: "/dashboard/network/personal-matching-bonus", label: "Personal Matching Bonus" },
// //   ];

// //   const academyItems = [
// //     { to: "/dashboard/academy/courses", label: "Master-class" },
// //     { to: "/dashboard/academy/market-overview", label: "Market Overview" },
// //     { to: "/dashboard/modules/compound-calculator", label: "Compound Calculator" },
// //     { to: "/dashboard/academy/signals", label: "Signals" },
// //     { to: "/dashboard/academy/book-a-call", label: "Live Mentorship" },
// //   ];

// //   const reportItems = [
// //     { to: "/dashboard/reports", label: "Performance Report" },
// //   ];

// //   const downloadItems = [
// //     { to: "/dashboard/downloads", label: "Course Materials" },
// //   ];

// //   const notificationItem = { to: "/dashboard/notifications", label: "Notifications", icon: <Bell size={18} /> };

// //   return (
// //     <motion.aside
// //       initial={{ x: -300 }}
// //       animate={{ x: 0 }}
// //       exit={{ x: -300 }}
// //       transition={{ duration: 0.3, ease: "easeInOut" }}
// //       className="w-72 bg-white dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
// //     >
// //       {/* Top Section */}
// //       <div>
// //         {/* Logo & Close Button */}
// //         <div className="flex justify-between items-center mb-4 md:hidden">
// //           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
// //           <button onClick={closeSidebar} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
// //             <X size={22} />
// //           </button>
// //         </div>

// //         <div className="hidden md:flex justify-start mb-6">
// //           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
// //         </div>

// //         {/* Search */}
// //         <div className="relative mb-6">
// //           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
// //           />
// //         </div>

// //         {/* Theme Toggle (Mobile) */}
// //         <div className="flex md:hidden justify-between items-center px-3 mb-6">
// //           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
// //             {theme === "dark" ? "Dark Mode" : "Light Mode"}
// //           </span>
// //           <button
// //             onClick={toggleTheme}
// //             className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
// //           >
// //             {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
// //           </button>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="space-y-2 pr-5">
// //           {/* === ACADEMY USER: Only show allowed items === */}
// //           {isAcademy() ? (
// //             <>
// //               {/* Academy Dashboard */}
// //               <DropdownSection
// //                 title="Academy Dashboard"
// //                 icon={<Calculator size={18} />}
// //                 isOpen={isModulesOpen}
// //                 toggle={() => setIsModulesOpen((prev) => !prev)}
// //                 items={academyItems}
// //                 closeSidebar={closeSidebar}
// //               />

// //               {/* Notifications */}
// //               <NavLink
// //                 to={notificationItem.to}
// //                 onClick={closeSidebar}
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                     isActive
// //                       ? "bg-[#FFECE5] text-black"
// //                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
// //                   }`
// //                 }
// //               >
// //                 {notificationItem.icon}
// //                 {notificationItem.label}
// //               </NavLink>

// //               {/* Reports */}
// //               <DropdownSection
// //                 title="Reports"
// //                 icon={<ClipboardList size={18} />}
// //                 isOpen={isSettingsOpen}
// //                 toggle={() => setIsSettingsOpen((prev) => !prev)}
// //                 items={reportItems}
// //                 closeSidebar={closeSidebar}
// //               />

// //               {/* Downloads */}
// //               <DropdownSection
// //                 title="Downloads"
// //                 icon={<Download size={18} />}
// //                 isOpen={isSettingsOpen}
// //                 toggle={() => setIsSettingsOpen((prev) => !prev)}
// //                 items={downloadItems}
// //                 closeSidebar={closeSidebar}
// //               />

// //               {/* Support */}
// //               <NavLink
// //                 to="/dashboard/support"
// //                 onClick={closeSidebar}
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                     isActive
// //                       ? "bg-[#FFECE5] text-black"
// //                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
// //                   }`
// //                 }
// //               >
// //                 <LifeBuoy size={18} />
// //                 Support
// //               </NavLink>
// //             </>
// //           ) : (
// //             <>
// //               {/* === TRADING USER: Full Access === */}
// //               {topLinks.map((link) => (
// //                 <NavLink
// //                   key={link.to}
// //                   to={link.to}
// //                   onClick={closeSidebar}
// //                   className={({ isActive }) =>
// //                     `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
// //                       isActive
// //                         ? "bg-[#FFECE5] text-black"
// //                         : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
// //                     }`
// //                   }
// //                 >
// //                   {link.icon}
// //                   {link.label}
// //                 </NavLink>
// //               ))}

// //               <DropdownSection
// //                 title="Copy Trading"
// //                 icon={<Copy size={18} />}
// //                 isOpen={isCopyTradingOpen}
// //                 toggle={() => setIsCopyTradingOpen((prev) => !prev)}
// //                 items={copyTradingItems}
// //                 closeSidebar={closeSidebar}
// //               />
// //               <DropdownSection
// //                 title="Network"
// //                 icon={<Network size={18} />}
// //                 isOpen={isNetworkOpen}
// //                 toggle={() => setIsNetworkOpen((prev) => !prev)}
// //                 items={networkItems}
// //                 closeSidebar={closeSidebar}
// //               />
// //               <DropdownSection
// //                 title="Academy Dashboard"
// //                 icon={<Calculator size={18} />}
// //                 isOpen={isModulesOpen}
// //                 toggle={() => setIsModulesOpen((prev) => !prev)}
// //                 items={academyItems}
// //                 closeSidebar={closeSidebar}
// //               />
// //               <DropdownSection
// //                 title="Reports"
// //                 icon={<ClipboardList size={18} />}
// //                 isOpen={isSettingsOpen}
// //                 toggle={() => setIsSettingsOpen((prev) => !prev)}
// //                 items={reportItems}
// //                 closeSidebar={closeSidebar}
// //               />
// //               <DropdownSection
// //                 title="Downloads"
// //                 icon={<Download size={18} />}
// //                 isOpen={isSettingsOpen}
// //                 toggle={() => setIsSettingsOpen((prev) => !prev)}
// //                 items={downloadItems}
// //                 closeSidebar={closeSidebar}
// //               />
// //             </>
// //           )}
// //         </nav>

// //         <hr className="mt-5 border-gray-200 dark:border-gray-700" />
// //       </div>

// //       {/* Bottom Section */}
// //       <div className="space-y-4 mb-20">
// //         {/* Profile & Logout */}
// //         <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg py-2 px-3">
// //           <div className="flex items-center gap-3">
// //             <img
// //               src={user?.profilePic || profilePic}
// //               alt={user?.name || "User"}
// //               className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
// //             />
// //             <div>
// //               <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
// //                 {user?.name || "User"}
// //               </p>
// //               <p className="text-xs text-gray-500 dark:text-gray-400">
// //                 {user?.email || "No email"}
// //               </p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={() => {
// //               logout();
// //               navigate("/login");
// //             }}
// //             className="text-red-500 ml-5 hover:text-red-600 transition"
// //           >
// //             <LogOut size={18} />
// //           </button>
// //         </div>
// //       </div>
// //     </motion.aside>
// //   );
// // }

// // /* ------------------- DROPDOWN COMPONENT ------------------- */
// // const DropdownSection = ({ title, icon, isOpen, toggle, items, closeSidebar }) => (
// //   <div>
// //     <button
// //       onClick={toggle}
// //       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
// //     >
// //       <div className="flex items-center gap-3">
// //         {icon}
// //         <span>{title}</span>
// //       </div>
// //       {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
// //     </button>

// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ height: 0, opacity: 0 }}
// //           animate={{ height: "auto", opacity: 1 }}
// //           exit={{ height: 0, opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
// //         >
// //           {items.map((item) => (
// //             <NavLink
// //               key={item.to}
// //               to={item.to}
// //               onClick={closeSidebar}
// //               className={({ isActive }) =>
// //                 `block px-2 py-1 rounded-md text-sm transition-all ${
// //                   isActive
// //                     ? "bg-[#FFECE5] text-black"
// //                     : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
// //                 }`
// //               }
// //             >
// //               {item.label}
// //             </NavLink>
// //           ))}
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   </div>
// // );

// import React, { useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   CreditCard,
//   ArrowDownCircle,
//   Shield,
//   LifeBuoy,
//   LogOut,
//   Search,
//   X,
//   ChevronDown,
//   ChevronUp,
//   Handshake,
//   Sun,
//   Moon,
//   Calculator,
//   BookOpen,
//   LeafIcon,
//   Copy,
//   Network,
//   Download,
//   ClipboardList,
//   Bell,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../routes/UserContext";
// import { useUserRole } from "../../routes/UserRoleContext";

// export default function SideBar({ closeSidebar }) {
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);
//   const [isSettingsOpenTwo, setIsSettingsOpenTwo] = useState(false);
//   const [isModulesOpen, setIsModulesOpen] = useState(false);
//   const [isCopyTradingOpen, setIsCopyTradingOpen] = useState(false);
//   const [isNetworkOpen, setIsNetworkOpen] = useState(false);

//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(UserContext);
//   const { isAcademy } = useUserRole(); // ← ROLE CHECK
//   const navigate = useNavigate();

//   /* ------------------- LINKS ------------------- */
//   const topLinks = [
//     {
//       to: "/dashboard",
//       label: "Dashboard",
//       icon: <LayoutDashboard size={18} />,
//     },
//     { to: "/dashboard/users", label: "Packages", icon: <Users size={18} /> },
//     {
//       to: "/dashboard/transactions",
//       label: "Transactions",
//       icon: <CreditCard size={18} />,
//     },
//     { to: "/dashboard/part", label: "Partners", icon: <Handshake size={18} /> },
//     {
//       to: "/dashboard/leaderboard",
//       label: "LeaderBoard",
//       icon: <LeafIcon size={18} />,
//     },
//     {
//       to: "/dashboard/retirement-blog",
//       label: "Retirement Blog",
//       icon: <BookOpen size={18} />,
//     },
//   ];

//   const copyTradingItems = [
//     { to: "/dashboard/copy-trading", label: "Configure Copy Trading" },
//   ];

//   const networkItems = [
//     { to: "/dashboard/network/fast-start", label: "Fast Start" },
//     { to: "/dashboard/network/unilevel", label: "Unilevel" },
//     { to: "/dashboard/network/matrix", label: "Matrix" },
//     { to: "/dashboard/network/leadership-bonus", label: "Leadership Bonus" },
//     {
//       to: "/dashboard/network/personal-matching-bonus",
//       label: "Personal Matching Bonus",
//     },
//     {
//       to:"/dashboard/support",
//       label:"Supports"
//     }
//   ];

//   const academyItems = [
//     { to: "/academy/courses", label: "Master-class" },
//     { to: "/academy/market-overview", label: "Market Overview" },
//     {
//       to: "/dashboard/modules/compound-calculator",
//       label: "Compound Calculator",
//     },
//     { to: "/academy/signals", label: "Signals" },
//     { to: "/academy/book-a-call", label: "Live Mentorship" },
//   ];

//   const reportItems = [
//     { to: "/dashboard/reports", label: "Performance Report" },
//   ];
//   const downloadItems = [
//     { to: "/dashboard/downloads", label: "Course Materials" },
//   ];
//   const notificationItem = {
//     to: "/dashboard/notifications",
//     label: "Notifications",
//     icon: <Bell size={18} />,
//   };
  

//   return (
//     <motion.aside
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="w-72 bg-white dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
//     >
//       {/* ────── TOP ────── */}
//       <div>
//         {/* Logo & Close */}
//         <div className="flex justify-between items-center mb-4 md:hidden">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//           <button
//             onClick={closeSidebar}
//             className="text-gray-600 dark:text-gray-300 hover:text-red-500"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         <div className="hidden md:flex justify-start mb-6">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />
//         </div>

//         {/* Theme Toggle (mobile) */}
//         <div className="flex md:hidden justify-between items-center px-3 mb-6">
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             {theme === "dark" ? "Dark Mode" : "Light Mode"}
//           </span>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* ────── NAVIGATION ────── */}
//         <nav className="space-y-2 pr-5">
//           {/* ── ACADEMY USER ── */}
//           {isAcademy() ? (
//             <>
//               {/* Academy Dashboard */}
//               <DropdownSection
//                 title="Academy Dashboard"
//                 icon={<Calculator size={18} />}
//                 isOpen={isModulesOpen}
//                 toggle={() => setIsModulesOpen((p) => !p)}
//                 items={academyItems}
//                 closeSidebar={closeSidebar}
//               />

//               {/* Notifications */}
//               <NavLink
//                 to={notificationItem.to}
//                 onClick={closeSidebar}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-[#FFECE5] text-black"
//                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                   }`
//                 }
//               >
//                 {notificationItem.icon}
//                 {notificationItem.label}
//               </NavLink>

//               {/* Reports & Downloads */}
//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isSettingsOpen}
//                 toggle={() => setIsSettingsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />
//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isSettingsOpenTwo}
//                 toggle={() => setIsSettingsOpenTwo((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />

//               {/* Support */}
//               <NavLink
//                 to="/dashboard/support"
//                 onClick={closeSidebar}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-[#FFECE5] text-black"
//                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                   }`
//                 }
//               >
//                 <LifeBuoy size={18} />
//                 Support
//               </NavLink>
//             </>
//           ) : (
//             <>
//               {/* ── TRADING USER ── */}
//               {topLinks.map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={closeSidebar}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                       isActive
//                         ? "bg-[#FFECE5] text-black"
//                         : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                     }`
//                   }
//                 >
//                   {link.icon}
//                   {link.label}
//                 </NavLink>
//               ))}

//               <DropdownSection
//                 title="Copy Trading"
//                 icon={<Copy size={18} />}
//                 isOpen={isCopyTradingOpen}
//                 toggle={() => setIsCopyTradingOpen((p) => !p)}
//                 items={copyTradingItems}
//                 closeSidebar={closeSidebar}
//               />
//               <DropdownSection
//                 title="Network"
//                 icon={<Network size={18} />}
//                 isOpen={isNetworkOpen}
//                 toggle={() => setIsNetworkOpen((p) => !p)}
//                 items={networkItems}
//                 closeSidebar={closeSidebar}
//               />
//               <DropdownSection
//                 title="Academy Dashboard"
//                 icon={<Calculator size={18} />}
//                 isOpen={isModulesOpen}
//                 toggle={() => setIsModulesOpen((p) => !p)}
//                 items={academyItems}
//                 closeSidebar={closeSidebar}
//               />
//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isSettingsOpen}
//                 toggle={() => setIsSettingsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />
//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isSettingsOpen}
//                 toggle={() => setIsSettingsOpen((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />
//             </>
//           )}
//         </nav>

//         <hr className="mt-5 border-gray-200 dark:border-gray-700" />
//       </div>

//       {/* ────── BOTTOM ────── */}
//       <div className="space-y-4 mb-20">
//         <div>support</div>
//         <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg py-2 px-3">
//           <div className="flex items-center gap-3">
//             <img
//               src={user?.profilePic || profilePic}
//               alt={user?.name || "User"}
//               className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
//             />
//             <div>
//               <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//                 {user?.name || "User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {user?.email || "No email"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               logout();
//               navigate("/login");
//             }}
//             className="text-red-500 ml-5 hover:text-red-600 transition"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }

// /* ────── DROPDOWN ────── */
// const DropdownSection = ({
//   title,
//   icon,
//   isOpen,
//   toggle,
//   items,
//   closeSidebar,
// }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//     >
//       <div className="flex items-center gap-3">
//         {icon}
//         <span>{title}</span>
//       </div>
//       {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//     </button>

//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//         >
//           {items.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `block px-2 py-1 rounded-md text-sm transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black"
//                     : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );











// import React, { useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   CreditCard,
//   Handshake,
//   LeafIcon,
//   BookOpen,
//   Copy,
//   Network,
//   Calculator,
//   ClipboardList,
//   Download,
//   LifeBuoy,
//   Bell,
//   LogOut,
//   Search,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../routes/UserContext";
// import { useUserRole } from "../../routes/UserRoleContext";

// export default function SideBar({ closeSidebar }) {
//   // separate dropdown states
//   const [isReportsOpen, setIsReportsOpen] = useState(false);
//   const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
//   const [isModulesOpen, setIsModulesOpen] = useState(false);
//   const [isCopyTradingOpen, setIsCopyTradingOpen] = useState(false);
//   const [isNetworkOpen, setIsNetworkOpen] = useState(false);

//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(UserContext);
//   const { isAcademy } = useUserRole();
//   const navigate = useNavigate();

//   /* ───────── LINKS ───────── */
//   const topLinks = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/dashboard/users", label: "Packages", icon: <Users size={18} /> },
//     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/part", label: "Partners", icon: <Handshake size={18} /> },
//     { to: "/dashboard/leaderboard", label: "LeaderBoard", icon: <LeafIcon size={18} /> },
//     { to: "/dashboard/retirement-blog", label: "Retirement Blog", icon: <BookOpen size={18} /> },
//   ];

//   const copyTradingItems = [{ to: "/dashboard/copy-trading", label: "Configure Copy Trading" }];

//   const networkItems = [
//     { to: "/dashboard/network/fast-start", label: "Fast Start" },
//     { to: "/dashboard/network/unilevel", label: "Unilevel" },
//     { to: "/dashboard/network/matrix", label: "Matrix" },
//     { to: "/dashboard/network/leadership-bonus", label: "Leadership Bonus" },
//     { to: "/dashboard/network/personal-matching-bonus", label: "Personal Matching Bonus" },
//   ];

//   const dashboardItems = [
//     { to: "/dashboard/courses", label: "Master-class" },
//     { to: "/academy/market-overview", label: "Market Overview" },
//     { to: "/dashboard/modules/compound-calculator", label: "Compound Calculator" },
//     { to: "/dashboard/signals", label: "Signals" },
//     { to: "/dashboard/book-a-call", label: "Live Mentorship" },
//   ];


//   const academyItems = [
//     { to: "/academy/courses", label: "Master-class" },
//     { to: "/academy/market-overview", label: "Market Overview" },
//     { to: "/dashboard/modules/compound-calculator", label: "Compound Calculator" },
//     { to: "/academy/signals", label: "Signals" },
//     { to: "/academy/book-a-call", label: "Live Mentorship" },
//   ];

//   const reportItems = [{ to: "/dashboard/reports", label: "Performance Report" }];
//   const downloadItems = [{ to: "/dashboard/downloads", label: "Course Materials" }];

//   const notificationItem = {
//     to: "/dashboard/notifications",
//     label: "Notifications",
//     icon: <Bell size={18} />,
//   };

//   return (
//     <motion.aside
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="w-72 bg-white dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
//     >
//       {/* ───────── TOP SECTION ───────── */}
//       <div>
//         {/* Logo */}
//         <div className="flex justify-between items-center mb-4 md:hidden">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//           <button
//             onClick={closeSidebar}
//             className="text-gray-600 dark:text-gray-300 hover:text-red-500"
//           >
//             <X size={22} />
//           </button>
//         </div>
//         <div className="hidden md:flex justify-start mb-6">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />
//         </div>

//         {/* Theme toggle (mobile) */}
//         <div className="flex md:hidden justify-between items-center px-3 mb-6">
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             {theme === "dark" ? "Dark Mode" : "Light Mode"}
//           </span>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* ───────── NAVIGATION ───────── */}
//         <nav className="space-y-2 pr-5">
//           {isAcademy() ? (
//             <>
//               <DropdownSection
//                 title="Academy Dashboard"
//                 icon={<Calculator size={18} />}
//                 isOpen={isModulesOpen}
//                 toggle={() => setIsModulesOpen((p) => !p)}
//                 items={academyItems}
//                 closeSidebar={closeSidebar}
//               />

//               {/* Notifications */}
//               <NavLink
//                 to={notificationItem.to}
//                 onClick={closeSidebar}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-[#FFECE5] text-black"
//                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                   }`
//                 }
//               >
//                 {notificationItem.icon}
//                 {notificationItem.label}
//               </NavLink>

//               {/* Reports & Downloads independent dropdowns */}
//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isReportsOpen}
//                 toggle={() => setIsReportsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isDownloadsOpen}
//                 toggle={() => setIsDownloadsOpen((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />
//             </>
//           ) : (
//             <>
//               {topLinks.map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={closeSidebar}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                       isActive
//                         ? "bg-[#FFECE5] text-black"
//                         : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                     }`
//                   }
//                 >
//                   {link.icon}
//                   {link.label}
//                 </NavLink>
//               ))}

//               <DropdownSection
//                 title="Copy Trading"
//                 icon={<Copy size={18} />}
//                 isOpen={isCopyTradingOpen}
//                 toggle={() => setIsCopyTradingOpen((p) => !p)}
//                 items={copyTradingItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Network"
//                 icon={<Network size={18} />}
//                 isOpen={isNetworkOpen}
//                 toggle={() => setIsNetworkOpen((p) => !p)}
//                 items={networkItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isReportsOpen}
//                 toggle={() => setIsReportsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isDownloadsOpen}
//                 toggle={() => setIsDownloadsOpen((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />
//             </>
//           )}
//         </nav>

//         <hr className="mt-5 border-gray-200 dark:border-gray-700" />

//         {/* Support link (immediately after line) */}
//         <div className="mt-3">
//           <NavLink
//             to="/dashboard/support"
//             onClick={closeSidebar}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                 isActive
//                   ? "bg-[#FFECE5] text-black"
//                   : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//               }`
//             }
//           >
//             <LifeBuoy size={18} />
//             Support
//           </NavLink>
//         </div>
//       </div>

//       {/* ───────── BOTTOM (Profile) ───────── */}
//       <div className="mt-6">
//         <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg py-2 px-3">
//           <div className="flex items-center gap-3">
//             <img
//               src={user?.profilePic || profilePic}
//               alt={user?.name || "User"}
//               className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
//             />
//             <div>
//               <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//                 {user?.name || "User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {user?.email || "No email"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               logout();
//               navigate("/login");
//             }}
//             className="text-red-500 ml-5 hover:text-red-600 transition"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }

// /* ───────── DROPDOWN COMPONENT ───────── */
// const DropdownSection = ({ title, icon, isOpen, toggle, items, closeSidebar }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//     >
//       <div className="flex items-center gap-3">
//         {icon}
//         <span>{title}</span>
//       </div>
//       {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//     </button>

//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//         >
//           {items.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `block px-2 py-1 rounded-md text-sm transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black"
//                     : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );










// import React, { useState, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   CreditCard,
//   Handshake,
//   LeafIcon,
//   BookOpen,
//   Copy,
//   Network,
//   Calculator,
//   ClipboardList,
//   Download,
//   LifeBuoy,
//   Bell,
//   LogOut,
//   Search,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import logoimg from "../../assets/velox.svg";
// import profilePic from "../../assets/profile.svg";
// import { useTheme } from "../../context/ThemeContext";
// import { UserContext } from "../../routes/UserContext";
// import { useUserRole } from "../../routes/UserRoleContext";

// export default function SideBar({ closeSidebar }) {
//   // separate dropdown states
//   const [isReportsOpen, setIsReportsOpen] = useState(false);
//   const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
//   const [isModulesOpen, setIsModulesOpen] = useState(false);
//   const [isCopyTradingOpen, setIsCopyTradingOpen] = useState(false);
//   const [isNetworkOpen, setIsNetworkOpen] = useState(false);
//   const [isAcademyDropdownOpen, setIsAcademyDropdownOpen] = useState(false);

//   const { theme, toggleTheme } = useTheme();
//   const { user, logout } = useContext(UserContext);
//   const { isAcademy } = useUserRole();
//   const navigate = useNavigate();

//   /* ───────── LINKS ───────── */
//   const topLinks = [
//     { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
//     { to: "/dashboard/users", label: "Packages", icon: <Users size={18} /> },
//     { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
//     { to: "/dashboard/part", label: "Partners", icon: <Handshake size={18} /> },
//     { to: "/dashboard/leaderboard", label: "LeaderBoard", icon: <LeafIcon size={18} /> },
//     { to: "/dashboard/retirement-blog", label: "Retirement Blog", icon: <BookOpen size={18} /> },
//   ];

//   const copyTradingItems = [{ to: "/dashboard/copy-trading", label: "Configure Copy Trading" }];

//   const networkItems = [
//     { to: "/dashboard/network/fast-start", label: "Fast Start" },
//     { to: "/dashboard/network/unilevel", label: "Unilevel" },
//     { to: "/dashboard/network/matrix", label: "Matrix" },
//     { to: "/dashboard/network/leadership-bonus", label: "Leadership Bonus" },
//     { to: "/dashboard/network/personal-matching-bonus", label: "Personal Matching Bonus" },
//   ];

//   // 🔹 Academy shown on dashboard (for trading users)
//   const dashboardItems = [
//     { to: "/dashboard/courses", label: "Master-class" },
//     { to: "/academy/market-overview", label: "Market Overview" },
//     { to: "/dashboard/modules/compound-calculator", label: "Compound Calculator" },
//     { to: "/dashboard/signals", label: "Signals" },
//     { to: "/dashboard/book-a-call", label: "Live Mentorship" },
//   ];

//   // 🔹 Academy-only UI (for Academy role)
//   const academyItems = [
//     { to: "/academy/courses", label: "Master-class" },
//     { to: "/academy/market-overview", label: "Market Overview" },
//     { to: "/academy/modules/compound-calculator", label: "Compound Calculator" },
//     { to: "/academy/signals", label: "Signals" },
//     { to: "/academy/book-a-call", label: "Live Mentorship" },
//   ];

//   const reportItems = [{ to: "/dashboard/reports", label: "Performance Report" }];
//   const downloadItems = [{ to: "/dashboard/downloads", label: "Course Materials" }];


//   const reportItemsacademy = [{ to: "/academy/reports", label: "Performance Report" }];
//   const downloadItemsdashboard = [{ to: "/academy/downloads", label: "Course Materials" }];

//   const notificationItem = {
//     to: "/dashboard/notifications",
//     label: "Notifications",
//     icon: <Bell size={18} />,
//   };

//   return (
//     <motion.aside
//       initial={{ x: -300 }}
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="w-72 bg-white dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
//     >
//       {/* ───────── TOP SECTION ───────── */}
//       <div>
//         {/* Logo */}
//         <div className="flex justify-between items-center mb-4 md:hidden">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//           <button
//             onClick={closeSidebar}
//             className="text-gray-600 dark:text-gray-300 hover:text-red-500"
//           >
//             <X size={22} />
//           </button>
//         </div>
//         <div className="hidden md:flex justify-start mb-6">
//           <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
//           />
//         </div>

//         {/* Theme toggle (mobile) */}
//         <div className="flex md:hidden justify-between items-center px-3 mb-6">
//           <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             {theme === "dark" ? "Dark Mode" : "Light Mode"}
//           </span>
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-gray-700" />
//             )}
//           </button>
//         </div>

//         {/* ───────── NAVIGATION ───────── */}
//         <nav className="space-y-2 pr-5">
//           {isAcademy() ? (
//             <>
//               <DropdownSection
//                 title="Academy Dashboard"
//                 icon={<Calculator size={18} />}
//                 isOpen={isModulesOpen}
//                 toggle={() => setIsModulesOpen((p) => !p)}
//                 items={academyItems}
//                 closeSidebar={closeSidebar}
//               />

//               {/* Notifications */}
//               <NavLink
//                 to={notificationItem.to}
//                 onClick={closeSidebar}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     isActive
//                       ? "bg-[#FFECE5] text-black"
//                       : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                   }`
//                 }
//               >
//                 {notificationItem.icon}
//                 {notificationItem.label}
//               </NavLink>

//               {/* Reports & Downloads independent dropdowns */}
//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isReportsOpen}
//                 toggle={() => setIsReportsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isDownloadsOpen}
//                 toggle={() => setIsDownloadsOpen((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />
//             </>
//           ) : (
//             <>
//               {topLinks.map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={closeSidebar}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                       isActive
//                         ? "bg-[#FFECE5] text-black"
//                         : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//                     }`
//                   }
//                 >
//                   {link.icon}
//                   {link.label}
//                 </NavLink>
//               ))}

//               {/* 🔹 Academy dropdown inside dashboard */}
//               <DropdownSection
//                 title="Academy"
//                 icon={<BookOpen size={18} />}
//                 isOpen={isAcademyDropdownOpen}
//                 toggle={() => setIsAcademyDropdownOpen((p) => !p)}
//                 items={dashboardItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Copy Trading"
//                 icon={<Copy size={18} />}
//                 isOpen={isCopyTradingOpen}
//                 toggle={() => setIsCopyTradingOpen((p) => !p)}
//                 items={copyTradingItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Network"
//                 icon={<Network size={18} />}
//                 isOpen={isNetworkOpen}
//                 toggle={() => setIsNetworkOpen((p) => !p)}
//                 items={networkItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Reports"
//                 icon={<ClipboardList size={18} />}
//                 isOpen={isReportsOpen}
//                 toggle={() => setIsReportsOpen((p) => !p)}
//                 items={reportItems}
//                 closeSidebar={closeSidebar}
//               />

//               <DropdownSection
//                 title="Downloads"
//                 icon={<Download size={18} />}
//                 isOpen={isDownloadsOpen}
//                 toggle={() => setIsDownloadsOpen((p) => !p)}
//                 items={downloadItems}
//                 closeSidebar={closeSidebar}
//               />
//             </>
//           )}
//         </nav>

//         <hr className="mt-5 border-gray-200 dark:border-gray-700" />

//         {/* Support link (immediately after line) */}
//         <div className="mt-3">
//           <NavLink
//             to="/dashboard/support"
//             onClick={closeSidebar}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                 isActive
//                   ? "bg-[#FFECE5] text-black"
//                   : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
//               }`
//             }
//           >
//             <LifeBuoy size={18} />
//             Support
//           </NavLink>
//         </div>
//       </div>

//       {/* ───────── BOTTOM (Profile) ───────── */}
//       <div className="mt-6">
//         <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg py-2 px-3">
//           <div className="flex items-center gap-3">
//             <img
//               src={user?.profilePic || profilePic}
//               alt={user?.name || "User"}
//               className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-700"
//             />
//             <div>
//               <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
//                 {user?.name || "User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {user?.email || "No email"}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => {
//               logout();
//               navigate("/login");
//             }}
//             className="text-red-500 ml-5 hover:text-red-600 transition"
//           >
//             <LogOut size={18} />
//           </button>
//         </div>
//       </div>
//     </motion.aside>
//   );
// }

// /* ───────── DROPDOWN COMPONENT ───────── */
// const DropdownSection = ({ title, icon, isOpen, toggle, items, closeSidebar }) => (
//   <div>
//     <button
//       onClick={toggle}
//       className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
//     >
//       <div className="flex items-center gap-3">
//         {icon}
//         <span>{title}</span>
//       </div>
//       {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//     </button>

//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
//         >
//           {items.map((item) => (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className={({ isActive }) =>
//                 `block px-2 py-1 rounded-md text-sm transition-all ${
//                   isActive
//                     ? "bg-[#FFECE5] text-black"
//                     : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
//                 }`
//               }
//             >
//               {item.label}
//             </NavLink>
//           ))}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );





import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Handshake,
  LeafIcon,
  BookOpen,
  Copy,
  Network,
  Calculator,
  ClipboardList,
  Download,
  LifeBuoy,
  Bell,
  LogOut,
  Search,
  X,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoimg from "../../assets/velox.svg";
import profilePic from "../../assets/veloximg1.jpeg";
import { useTheme } from "../../context/ThemeContext";
import { UserContext } from "../../routes/UserContext";
import { useUserRole } from "../../routes/UserRoleContext";

export default function SideBar({ closeSidebar }) {
  // Dropdown states
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isCopyTradingOpen, setIsCopyTradingOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isAcademyDropdownOpen, setIsAcademyDropdownOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useContext(UserContext);
  const { isAcademy } = useUserRole();
  const navigate = useNavigate();

  /* ───────── LINKS ───────── */
  const topLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/dashboard/users", label: "Packages", icon: <Users size={18} /> },
    { to: "/dashboard/transactions", label: "Transactions", icon: <CreditCard size={18} /> },
    { to: "/dashboard/part", label: "Partners", icon: <Handshake size={18} /> },
    { to: "/dashboard/leaderboard", label: "LeaderBoard", icon: <LeafIcon size={18} /> },
    { to: "/dashboard/retirement-blog", label: "Retirement Blog", icon: <BookOpen size={18} /> },
  ];

  const copyTradingItems = [{ to: "/dashboard/copy-trading", label: "Configure Copy Trading" }];

  const networkItems = [
    { to: "/dashboard/network/fast-start", label: "Fast Start" },
    { to: "/dashboard/network/unilevel", label: "Unilevel" },
    { to: "/dashboard/network/matrix", label: "Matrix" },
    { to: "/dashboard/network/leadership-bonus", label: "Leadership Bonus" },
    { to: "/dashboard/network/personal-matching-bonus", label: "Personal Matching Bonus" },
  ];

  // 🔹 Academy links under dashboard (for trading users)
  const dashboardItems = [
    { to: "/dashboard/courses", label: "Master-class" },
    { to: "/academy/market-overview", label: "Market Overview" },
    { to: "/dashboard/modules/compound-calculator", label: "Compound Calculator" },
    { to: "/dashboard/signals", label: "Signals" },
    { to: "/dashboard/book-a-call", label: "Live Mentorship" },
  ];

  // 🔹 Academy-only items (for academy users)
  const academyItems = [
    { to: "/academy/courses", label: "Master-class" },
    { to: "/academy/market-overview", label: "Market Overview" },
    { to: "/academy/modules/compound-calculator", label: "Compound Calculator" },
    { to: "/academy/signals", label: "Signals" },
    { to: "/academy/book-a-call", label: "Live Mentorship" },
  ];

  const reportItems = [{ to: "/dashboard/reports", label: "Performance Report" }];
  const downloadItems = [{ to: "/dashboard/downloads", label: "Course Materials" }];

  // 🔹 Academy-specific
  const reportItemsAcademy = [{ to: "/academy/reports", label: "Performance Report" }];
  const downloadItemsAcademy = [{ to: "/academy/downloads", label: "Course Materials" }];
  const academySupport = { to: "/academy/support", label: "Support", icon: <LifeBuoy size={18} /> };

  const notificationItem = {
    to: "/dashboard/notifications",
    label: "Notifications",
    icon: <Bell size={18} />,
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-72 bg-white dark:bg-neutral-900 dark:text-white shadow-md h-screen p-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden"
    >
      <div>
        {/* ───────── Logo Section ───────── */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
          <button onClick={closeSidebar} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
            <X size={22} />
          </button>
        </div>
        <div className="hidden md:flex justify-start mb-6">
          <img src={logoimg} alt="Velox Logo" className="w-20 object-contain" />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A991]"
          />
        </div>

        {/* Theme toggle (mobile only) */}
        <div className="flex md:hidden justify-between items-center px-3 mb-6">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "dark" ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-700" />}
          </button>
        </div>

        {/* ───────── NAVIGATION ───────── */}
        <nav className="space-y-2 pr-5">
          {isAcademy() ? (
            <>
              {/* Academy Dashboard Dropdown */}
              <DropdownSection
                title="Academy Dashboard"
                icon={<Calculator size={18} />}
                isOpen={isModulesOpen}
                toggle={() => setIsModulesOpen((p) => !p)}
                items={academyItems}
                closeSidebar={closeSidebar}
              />

              {/* Notifications */}
              <NavLink
                to="/academy/notifications"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FFECE5] text-black"
                      : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                  }`
                }
              >
                <Bell size={18} />
                Notifications
              </NavLink>

              {/* Reports */}
              <DropdownSection
                title="Reports"
                icon={<ClipboardList size={18} />}
                isOpen={isReportsOpen}
                toggle={() => setIsReportsOpen((p) => !p)}
                items={reportItemsAcademy}
                closeSidebar={closeSidebar}
              />

              {/* Downloads */}
              <DropdownSection
                title="Downloads"
                icon={<Download size={18} />}
                isOpen={isDownloadsOpen}
                toggle={() => setIsDownloadsOpen((p) => !p)}
                items={downloadItemsAcademy}
                closeSidebar={closeSidebar}
              />

              {/* Support */}
              <NavLink
                to={academySupport.to}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FFECE5] text-black"
                      : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                  }`
                }
              >
                {academySupport.icon}
                {academySupport.label}
              </NavLink>
            </>
          ) : (
            <>
              {/* Dashboard User Routes */}
              {topLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#FFECE5] text-black"
                        : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}

              {/* Academy (for trading users) */}
              <DropdownSection
                title="Academy"
                icon={<BookOpen size={18} />}
                isOpen={isAcademyDropdownOpen}
                toggle={() => setIsAcademyDropdownOpen((p) => !p)}
                items={dashboardItems}
                closeSidebar={closeSidebar}
              />

              <DropdownSection
                title="Copy Trading"
                icon={<Copy size={18} />}
                isOpen={isCopyTradingOpen}
                toggle={() => setIsCopyTradingOpen((p) => !p)}
                items={copyTradingItems}
                closeSidebar={closeSidebar}
              />

              <DropdownSection
                title="Network"
                icon={<Network size={18} />}
                isOpen={isNetworkOpen}
                toggle={() => setIsNetworkOpen((p) => !p)}
                items={networkItems}
                closeSidebar={closeSidebar}
              />

              <DropdownSection
                title="Reports"
                icon={<ClipboardList size={18} />}
                isOpen={isReportsOpen}
                toggle={() => setIsReportsOpen((p) => !p)}
                items={reportItems}
                closeSidebar={closeSidebar}
              />

              <DropdownSection
                title="Downloads"
                icon={<Download size={18} />}
                isOpen={isDownloadsOpen}
                toggle={() => setIsDownloadsOpen((p) => !p)}
                items={downloadItems}
                closeSidebar={closeSidebar}
              />


<hr />
              {/* Support (Dashboard) */}
              {/* <NavLink
                to="/dashboard/support"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FFECE5] text-black"
                      : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                  }`
                }
              >
                <LifeBuoy size={18} />
                Support
              </NavLink> */}
              {/* Support (academy) */}
              <NavLink
                to="/academy/support"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#FFECE5] text-black"
                      : "text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800"
                  }`
                }
              >
                <LifeBuoy size={18} />
                Support
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* ───────── Bottom Profile Section ───────── */}
     
<div className="mt-6">
  <div className="flex items-center justify-between dark:bg-gray-800 rounded-lg py-2 px-3">
    <div className="flex items-center gap-3">
      {user?.profilePic ? (
        <img
          src={user.profilePic}
          alt={user.name || "User"}
          className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
      ) : (
        // 🔹 Generate initials if no profile image
        <div className="w-8 h-8 rounded-full bg-[#00A991] flex items-center justify-center text-white text-lg font-semibold border border-gray-300 dark:border-gray-700">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {user?.name || "User"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {user?.email || "No email"}
        </p>
      </div>
    </div>

    <button
      onClick={() => {
        logout();
        navigate("/login");
      }}
      className="text-red-500 pr-3 ml-5 hover:text-red-600 transition"
    >
      <LogOut size={18} />
    </button>
  </div>
</div>

    </motion.aside>
  );
}

/* ───────── DROPDOWN COMPONENT ───────── */
const DropdownSection = ({ title, icon, isOpen, toggle, items, closeSidebar }) => (
  <div>
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-white hover:bg-[#FFECE5] dark:hover:bg-gray-800 transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-8 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-700 pl-3"
        >
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `block px-2 py-1 rounded-md text-sm transition-all ${
                  isActive
                    ? "bg-[#FFECE5] text-black"
                    : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

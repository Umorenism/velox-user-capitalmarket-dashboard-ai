
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const WalletTabs = () => {
//   const tabs = ["Deposit Wallet", "USD Wallet", "IB Wallet", "Credit Wallet"];
//   const [activeTab, setActiveTab] = useState("Deposit Wallet");

//   return (
//     <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-2xl shadow-sm p-4 md:p-4 w-full max-w-[1300px] mx-auto">
//       <h2 className="text-lg font-semibold mb-4">Packages</h2>
//       <div className=" mb-6 overflow-x-auto">
//         <div className="flex dark:bg-neutral-800 dark:text-white justify-between space-x-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`relative pb-2 text-sm md:text-base font-medium transition-colors duration-300 ${
//                 activeTab === tab ? "text-orange-500" : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="underline"
//                   className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-400 rounded-full"
//                 />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto dark:bg-neutral-800 dark:text-white">
//         <table className="min-w-full border border-gray-100">
//           <thead>
//             <tr className="text-left text-sm text-gray-600 bg-gray-50 dark:bg-neutral-800 dark:text-white">
//               <th className="py-3 px-4">Transaction ID ↕</th>
//               <th className="py-3 px-4">Date ↕</th>
//               <th className="py-3 px-4">Credit ↕</th>
//               <th className="py-3 px-4">Debit ↕</th>
//               <th className="py-3 px-4">Balance ↕</th>
//               <th className="py-3 px-4">Username ↕</th>
//               <th className="py-3 px-4">User ID ↕</th>
//               <th className="py-3 px-4">Remark ↕</th>
//             </tr>
//           </thead>
//         </table>

//         {/* Empty state */}
//         <div className="flex flex-col items-center justify-center py-16">
//           <div className="text-gray-400 text-5xl mb-2">⚠️</div>
//           <p className="text-gray-500 text-sm">No Data Available</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WalletTabs;








// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { apiClient } from "../api/apiClient"; // Adjust path if needed

// const WalletTabs = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("Deposit Wallet");

//   // Map wallet keys to display names and colors
//   const walletConfig = {
//     deposit: { name: "Deposit Wallet", color: "emerald" },
//     bull: { name: "Bull Wallet", color: "green" },
//     bear: { name: "Bear Wallet", color: "red" },
//   };

//   const tabs = Object.values(walletConfig).map((w) => w.name);

//   // Generate mock transaction history per wallet
//   const generateWalletHistory = (walletKey, balance) => {
//     const baseTxs = [
//       { type: "credit", amount: balance * 0.6, remark: "Initial Deposit" },
//       { type: "credit", amount: balance * 0.3, remark: "Referral Bonus" },
//       { type: "debit", amount: balance * 0.2, remark: "Investment" },
//       { type: "credit", amount: balance * 0.15, remark: "Cashback Earnings" },
//       { type: "debit", amount: balance * 0.1, remark: "Withdrawal" },
//     ];

//     let runningBalance = 0;
//     return baseTxs.map((tx, i) => {
//       const amount = Math.round(tx.amount);
//       runningBalance += tx.type === "credit" ? amount : -amount;
//       return {
//         id: `WL-${walletKey.slice(0, 1).toUpperCase()}${String(100 + i).padStart(3, "0")}`,
//         date: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
//         credit: tx.type === "credit" ? `$${amount}` : "-",
//         debit: tx.type === "debit" ? `$${amount}` : "-",
//         balance: `$${Math.max(0, runningBalance)}`,
//         username: userData?.name || "John Doe",
//         userId: userData?.userId?.slice(-6) || "9674",
//         remark: tx.remark,
//       };
//     });
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await apiClient.get("/api/users/profile");
//         const data = res.data;

//         console.log("Fetched User Profile for Wallets:", data);

//         setUserData(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load wallet data:", err);
//         setError("Failed to load wallet history.");
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Get active wallet key
//   const activeWalletKey = Object.entries(walletConfig).find(
//     ([, config]) => config.name === activeTab
//   )?.[0];

//   const activeBalance = userData?.wallets?.[activeWalletKey] || 0;
//   const transactions = userData
//     ? generateWalletHistory(activeWalletKey, activeBalance)
//     : [];

//   if (loading) {
//     return (
//       <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 animate-pulse">
//         <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
//         <div className="flex space-x-8 mb-6">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="h-8 bg-gray-200 rounded w-32"></div>
//           ))}
//         </div>
//         <div className="space-y-3">
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="h-10 bg-gray-50 rounded"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-2xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-2xl shadow-sm p-4 md:p-6 w-full max-w-[1300px] mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Wallet History</h2>
//         <div className="text-sm text-gray-500">
//           Balance:{" "}
//           <span className="font-bold text-lg text-emerald-600">
//             ${activeBalance}
//           </span>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="mb-6 overflow-x-auto">
//         <div className="flex justify-between space-x-8 border-b border-gray-200 dark:border-neutral-700">
//           {tabs.map((tab) => {
//             const walletKey = Object.entries(walletConfig).find(
//               ([, c]) => c.name === tab
//             )[0];
//             const balance = userData?.wallets?.[walletKey] || 0;
//             const config = walletConfig[walletKey];

//             return (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`relative pb-3 text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
//                   activeTab === tab
//                     ? "text-orange-500"
//                     : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                 }`}
//               >
//                 <span>{tab}</span>
//                 <span
//                   className={`text-xs font-bold px-2 py-0.5 rounded-full ${
//                     config.color === "emerald"
//                       ? "bg-emerald-100 text-emerald-700"
//                       : config.color === "green"
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   ${balance}
//                 </span>
//                 {activeTab === tab && (
//                   <motion.div
//                     layoutId="walletUnderline"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
//                   />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-100 dark:border-neutral-700">
//           <thead>
//             <tr className="text-left text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-neutral-700">
//               {[
//                 "Transaction ID",
//                 "Date",
//                 "Credit",
//                 "Debit",
//                 "Balance",
//                 "Username",
//                 "User ID",
//                 "Remark",
//               ].map((h) => (
//                 <th key={h} className="py-3 px-3 font-medium">
//                   {h}{" "}
//                   <span className="text-gray-400 cursor-pointer hover:text-gray-600">
//                     Up/Down
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-xs">
//             <AnimatePresence mode="wait">
//               {transactions.length > 0 ? (
//                 transactions.map((tx, i) => (
//                   <motion.tr
//                     key={tx.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: i * 0.05 }}
//                     className="border-b border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
//                   >
//                     <td className="py-3 px-3 font-mono text-orange-600">
//                       {tx.id}
//                     </td>
//                     <td className="py-3 px-3">{tx.date}</td>
//                     <td className="py-3 px-3 text-emerald-600 font-medium">
//                       {tx.credit}
//                     </td>
//                     <td className="py-3 px-3 text-red-600 font-medium">
//                       {tx.debit}
//                     </td>
//                     <td className="py-3 px-3 font-semibold">{tx.balance}</td>
//                     <td className="py-3 px-3">{tx.username}</td>
//                     <td className="py-3 px-3 font-mono">...{tx.userId}</td>
//                     <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
//                       {tx.remark}
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <motion.tr
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="border-b"
//                 >
//                   <td colSpan={8} className="text-center py-12">
//                     <div className="flex flex-col items-center">
//                       <div className="text-gray-400 text-5xl mb-2">Empty</div>
//                       <p className="text-gray-500 text-sm">
//                         No transactions yet for {activeTab}
//                       </p>
//                     </div>
//                   </td>
//                 </motion.tr>
//               )}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WalletTabs;




import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "../api/apiClient";

const WalletTabs = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Deposit Wallet");

  // Wallet configuration
  const walletConfig = {
    deposit: { name: "Deposit Wallet", color: "emerald", key: "DEPOSIT" },
    bull: { name: "Bull Wallet", color: "green", key: "BULL" },
    bear: { name: "Bear Wallet", color: "red", key: "BEAR" },
  };

  const tabs = Object.values(walletConfig).map((w) => w.name);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/users/profile");
        const data = res.data;

        console.log("Fetched User Profile:", data);
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load wallet data:", err);
        setError("Failed to load wallet history.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Map active tab to wallet key
  const activeWalletKey = Object.values(walletConfig).find(
    (config) => config.name === activeTab
  )?.key;

  // Current balance for active wallet
  const activeBalance =
    userData?.wallets?.[activeWalletKey.toLowerCase()] ||
    userData?.wallets?.deposit ||
    0;

  // Filter transactions for active wallet
  const transactions =
    userData?.walletHistory
      ?.filter((tx) => tx.wallet === activeWalletKey)
      ?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status badge
  const getStatusBadge = (status) => {
    const styles = {
      APPROVED: "bg-green-100 text-green-800",
      WAITING: "bg-yellow-100 text-yellow-800",
      EXPIRED: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="flex space-x-8 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded w-32"></div>
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-50 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-6 rounded-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-2xl shadow-sm p-4 md:p-6 w-full max-w-[1300px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Wallet History</h2>
        <div className="text-sm text-gray-500">
          Current Balance:{" "}
          <span className="font-bold text-xl text-emerald-600">
            ${activeBalance.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex justify-between space-x-8 border-b border-gray-200 dark:border-neutral-700">
          {tabs.map((tab) => {
            const config = Object.values(walletConfig).find((c) => c.name === tab);
            const walletKey = config.key.toLowerCase();
            const balance = userData?.wallets?.[walletKey] || 0;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-3 text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab
                    ? "text-orange-500"
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    config.color === "emerald"
                      ? "bg-emerald-100 text-emerald-700"
                      : config.color === "green"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  ${balance.toLocaleString()}
                </span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="walletUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-100 dark:border-neutral-700">
          <thead>
            <tr className="text-left text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-neutral-700">
              <th className="py-3 px-3 font-medium">Transaction ID</th>
              <th className="py-3 px-3 font-medium">Date</th>
              <th className="py-3 px-3 font-medium">Type</th>
              <th className="py-3 px-3 font-medium">Credit</th>
              <th className="py-3 px-3 font-medium">Debit</th>
              <th className="py-3 px-3 font-medium">Balance</th>
              <th className="py-3 px-3 font-medium">Status</th>
              <th className="py-3 px-3 font-medium">Remark</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <AnimatePresence mode="wait">
              {transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <motion.tr
                    key={tx.transactionId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                  >
                    <td className="py-3 px-3 font-mono text-orange-600">
                      {tx.transactionId}
                    </td>
  <td className="py-3 px-3">{formatDate(tx.date)}</td>
                    <td className="py-3 px-3 text-gray-700 dark:text-gray-300">
                      {tx.type.replace(/_/g, " ")}
                    </td>
                    <td className="py-3 px-3 text-emerald-600 font-medium">
                      {tx.credit > 0 ? `$${tx.credit.toLocaleString()}` : "-"}
                    </td>
                    <td className="py-3 px-3 text-red-600 font-medium">
                      {tx.debit > 0 ? `$${tx.debit.toLocaleString()}` : "-"}
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      ${tx.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">{getStatusBadge(tx.status)}</td>
                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                      {tx.remark}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan={8} className="text-center py-16 text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="text-6xl mb-4 opacity-20">Empty</div>
                      <p>No transactions found for {activeTab}</p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletTabs;
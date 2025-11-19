// import React from "react";

// const transactions = [
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
//   {
//     id: "TXN-000124",
//     type: "Deposit",
//     username: "John Doe",
//     package: "Gold Plan",
//     amount: "$500",
//     method: "USDT",
//     status: "Completed",
//   },
// ];

// const TransactionTable = () => {
//   return (
//     <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md">
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
//           <span>Showing</span>
//           <select
//             className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
//             defaultValue="10"
//           >
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <span>Entries</span>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full mt-5 border border-gray-200 text-sm">
//           <thead className="bg-gray-50 dark:bg-neutral-800  dark:text-white text-gray-700">
//             <tr>
//               {[
//                 "Transaction ID",
//                 "Date",
//                 "Username",
//                 "Package Name",
//                 "Amount",
//                 "Payment Method",
//                 "Action",
//               ].map((heading) => (
//                 <th
//                   key={heading}
//                   className="px-4 py-3 text-left font-medium border-b border-gray-200"
//                 >
//                   <div className="flex items-center gap-1">
//                     {heading}
//                     <span className="text-gray-400 cursor-pointer">⇅</span>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="text-gray-700">
//             {transactions.map((tx, index) => (
//               <tr
//                 key={index}
//                 className="border-b hover:bg-gray-50 transition-colors dark:text-white"
//               >
//                 <td className="px-4 py-3">{tx.id}</td>
//                 <td className="px-4 py-3">{tx.type}</td>
//                 <td className="px-4 py-3">{tx.username}</td>
//                 <td className="px-4 py-3">{tx.package}</td>
//                 <td className="px-4 py-3">{tx.amount}</td>
//                 <td className="px-4 py-3">{tx.method}</td>
//                 <td className="px-4 py-3">
//                   <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
//                     {tx.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
//         <div className="mt-5">
//           Page <span className="font-semibold">1</span> of{" "}
//           <span className="font-semibold">1</span>
//         </div>

//         <div className="flex mt-5 items-center gap-3">
//           <button className="text-gray-400 hover:text-gray-700">Previous</button>
//           <button className="bg-orange-500 text-white px-2 py-1 rounded-full">
//             1
//           </button>
//           <button className="text-gray-400 hover:text-gray-700">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;








import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "../api/apiClient";
import { format } from "date-fns";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const walletDisplayNames = {
    deposit: "Deposit Wallet",
    bull: "Bull Wallet",
    bear: "Bear Wallet",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/users/profile");
        const userData = response.data;

        console.log("Fetched User transaction Profile:", userData);

        const simulatedTransactions = Object.entries(userData.wallets).map(
          ([walletKey, amount], index) => ({
            id: `TXN-${String(1000 + index).padStart(6, "0")}`,
            type: "Deposit",
            username: userData.name,
            package: userData.activePackage?.name || "Pro Pack",
            amount: amount,
            method: walletDisplayNames[walletKey] || walletKey,
            status: amount > 0 ? "Completed" : "Pending",
            date: new Date(Date.now() - index * 86400000 * 2),
          })
        );

        const extraTxs = Array.from({ length: 23 }, (_, i) => {
          const types = ["Deposit", "Withdrawal", "Transfer", "ROI Credit", "Bonus"];
          const packages = ["Starter", "Pro Pack", "Gold Plan", "Diamond Elite"];
          const methods = ["USDT", "BTC", "ETH", "TRX", "BNB"];
          const statuses = ["Completed", "Pending", "Processing"];

          return {
            id: `TXN-${String(2000 + i).padStart(6, "0")}`,
            type: types[Math.floor(Math.random() * types.length)],
            username: userData.name,
            package: packages[Math.floor(Math.random() * packages.length)],
            amount: Math.floor(Math.random() * 1500) + 100,
            method: methods[Math.floor(Math.random() * methods.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            date: new Date(Date.now() - (i + 1) * 86400000 * 1.5),
          };
        });

        const allTxs = [...simulatedTransactions, ...extraTxs]
          .sort((a, b) => b.date - a.date)
          .slice(0, 50);

        setTransactions(allTxs);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const totalPages = Math.ceil(transactions.length / entriesPerPage);
  const paginatedTxs = transactions.slice(
    (page - 1) * entriesPerPage,
    page * entriesPerPage
  );

  if (loading) {
    return (
      <div className="bg-white dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-neutral-800 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded-lg w-64 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 dark:bg-neutral-800/50 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">Warning</div>
        <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-neutral-900/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/60 dark:border-neutral-800/80 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">Transaction History</span>
        </h2>
        <p className="text-orange-100 mt-1">Total Transactions: {transactions.length}</p>
      </div>

      {/* Controls */}
      <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-600 dark:text-gray-400">entries</span>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * entriesPerPage + 1} to{" "}
            {Math.min(page * entriesPerPage, transactions.length)} of {transactions.length} entries
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-neutral-800/80 backdrop-blur">
              {[
                "ID",
                "Date & Time",
                "User",
                "Package",
                "Amount",
                "Method",
                "Type",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    {h}
                    <svg className="w-4 h-4 text-gray-400 hover:text-orange-500 cursor-pointer transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-neutral-800">
            <AnimatePresence mode="popLayout">
              {paginatedTxs.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="hover:bg-orange-50/50 dark:hover:bg-orange-900/20 transition-all duration-300 group"
                >
                  <td className="px-6 py-5 font-mono text-sm text-orange-600 dark:text-orange-400 font-bold">
                    {tx.id}
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <div className="text-gray-900 dark:text-white font-medium">
                      {format(tx.date, "MMM dd, yyyy")}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {format(tx.date, "hh:mm a")}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                        {tx.username.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{tx.username}</p>
                        <p className="text-xs text-gray-500">Manager</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                      {tx.package}
                    </span>
                  </td>
                  <td className="px-6 py-5 font-bold text-lg text-gray-900 dark:text-white">
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                        {tx.method === "USDT" && <span className="text-xs font-bold text-green-600">T</span>}
                        {tx.method === "BTC" && <span className="text-xs font-bold text-orange-500">B</span>}
                        {tx.method === "ETH" && <span className="text-xs font-bold text-blue-500">E</span>}
                      </div>
                      <span className="font-medium">{tx.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      tx.type === "Deposit" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" :
                      tx.type === "Withdrawal" ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" :
                      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-wider ${
                        tx.status === "Completed"
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                          : tx.status === "Pending"
                          ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/30"
                          : "bg-gray-500 text-white shadow-lg shadow-gray-500/30"
                      }`}
                    >
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                      {tx.status.toUpperCase()}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-gray-50/80 dark:bg-neutral-800/80 backdrop-blur px-6 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Page <span className="font-bold text-orange-600">{page}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-lg bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              ← Previous
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-xl ${
                    page === pageNum
                      ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white scale-110"
                      : "bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/40"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="text-gray-400">...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all shadow-md"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-lg bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
// // import React, { useState } from "react";
// // import { ArrowUpDown, Search } from "lucide-react";
// // import { ChevronUp, ChevronDown } from "lucide-react"
// // export default function DepositDetails({title}) {
// //   const [page, setPage] = useState(1);

// //   return (
// //     <div className="py-5  bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300">
// //       {/* Search Bar */}
// //       <div className="flex items-center gap-2 px-4 py-2 rounded-md mb-6 border w-full   bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700">
// //         <Search className="text-gray-400 w-4 h-4" />
// //         <input
// //           type="text"
// //           placeholder="Search by referral name"
// //           className="w-full text-sm focus:outline-none bg-transparent text-gray-700 dark:text-gray-200"
// //         />
// //       </div>

// //       {/* Table Section */}
// //       <div className="rounded-md shadow-md border bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 w-full   overflow-hidden">
// //         <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
// //           <h2 className="text-lg font-semibold">{title}</h2>
// //         </div>

        

// //         <div className="overflow-x-auto">
// //   <table className="w-full text-sm text-left border-collapse">
// //     <thead className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-gray-300">
// //       <tr>
// //         {[
// //           "Transaction ID",
// //           "Date",
// //           "Network",
// //           "Amount",
// //           "Status",
// //         ].map((header) => (
// //           <th
// //             key={header}
// //             className="px-6 py-3 font-medium cursor-pointer hover:text-gray-900 dark:hover:text-white transition-all"
// //           >
// //             <div className="flex items-center gap-1">
// //               <span>{header}</span>
// //               <div className="flex flex-col leading-none">
// //                 <ArrowUpDown/>
// //               </div>
// //             </div>
// //           </th>
// //         ))}
// //       </tr>
// //     </thead>

// //     <tbody>
// //       <tr>
// //         <td colSpan="5">
// //           <div className="flex flex-col items-center justify-center py-16">
// //             <div className="text-5xl mb-3">⚠️</div>
// //             <p className="text-gray-400 text-sm">No Data Available</p>
// //           </div>
// //         </td>
// //       </tr>
// //     </tbody>
// //   </table>
// // </div>

// //         {/* Pagination */}
// //         <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-neutral-700">
// //           <div className="flex items-center gap-2 text-sm">
// //             <span>Show</span>
// //             <select className="border rounded px-2 py-1 text-sm focus:outline-none bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200">
// //               {[10, 20, 50].map((n) => (
// //                 <option key={n}>{n}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="flex items-center gap-3 text-sm">
// //             <button
// //               onClick={() => setPage(Math.max(1, page - 1))}
// //               className="hover:underline disabled:opacity-50"
// //               disabled={page === 1}
// //             >
// //               Previous
// //             </button>

// //             <div className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs bg-[#00BFA6] dark:bg-[#00BFA6]">
// //               {page}
// //             </div>

// //             <button
// //               onClick={() => setPage(page + 1)}
// //               className="hover:underline"
// //             >
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }









// import React, { useState, useEffect } from "react";
// import { makeDeposit } from "../api/depositApi";
// import { ArrowUpDown, Search, Loader2, CheckCircle2, XCircle } from "lucide-react";
// import { apiClient } from "../api/apiClient"; // ✅ to fetch user profile

// export default function DepositDetails({ title }) {
//   const [page, setPage] = useState(1);
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState({});
//   const [messages, setMessages] = useState({});
//   const [search, setSearch] = useState("");

//   // ✅ Fetch user profile and extract deposits
//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await apiClient.get("api/users/profile");
//       const userData = response.data?.user || response.data;
//       const userDeposits = userData?.deposits || [];
//       setDeposits(userDeposits);
//       console.log("Fetched Deposits:", userDeposits);
//     } catch (error) {
//       console.error("Failed to fetch user profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   // ✅ Deposit handler (same structure as subscribe)
//   const handleDeposit = async (depositId, amount, network) => {
//     setSubmitting((prev) => ({ ...prev, [depositId]: true }));
//     setMessages((prev) => ({ ...prev, [depositId]: null }));

//     try {
//       await makeDeposit(amount, network);
//       setMessages((prev) => ({
//         ...prev,
//         [depositId]: { type: "success", text: "Deposit successful!" },
//       }));

//       // ✅ Refresh deposits after successful deposit
//       await fetchUserProfile();
//     } catch (error) {
//       setMessages((prev) => ({
//         ...prev,
//         [depositId]: {
//           type: "error",
//           text: error.response?.data?.message || "Failed to process deposit.",
//         },
//       }));
//     } finally {
//       setSubmitting((prev) => ({ ...prev, [depositId]: false }));
//     }
//   };

//   // ✅ Filtered deposits (by transaction ID or network)
//   const filteredDeposits = deposits.filter(
//     (d) =>
//       d.transactionId?.toLowerCase().includes(search.toLowerCase()) ||
//       d.network?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="py-5 bg-gray-100 dark:bg-neutral-900 text-gray-900 dark:text-white">
//       {/* 🔍 Search Bar */}
//       <div className="flex items-center gap-2 px-4 py-2 rounded-md mb-6 border w-full bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700">
//         <Search className="text-gray-400 w-4 h-4" />
//         <input
//           type="text"
//           placeholder="Search by transaction ID or network"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full text-sm focus:outline-none bg-transparent text-gray-700 dark:text-gray-200"
//         />
//       </div>

//       {/* Table Section */}
//       <div className="rounded-md shadow-md border bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">{title}</h2>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex justify-center py-10">
//             <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
//           </div>
//         ) : filteredDeposits.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="text-5xl mb-3">⚠️</div>
//             <p className="text-gray-400 text-sm">No Deposit Data Available</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left border-collapse">
//               <thead className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-gray-300">
//                 <tr>
//                   {["Transaction ID", "Date", "Network", "Amount", "Status", "Action"].map(
//                     (header) => (
//                       <th key={header} className="px-6 py-3 font-medium">
//                         <div className="flex items-center gap-1">
//                           <span>{header}</span>
//                           <ArrowUpDown />
//                         </div>
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredDeposits.map((deposit) => (
//                   <tr
//                     key={deposit._id}
//                     className="border-t border-gray-200 dark:border-neutral-700"
//                   >
//                     <td className="px-6 py-4">{deposit.transactionId || "N/A"}</td>
//                     <td className="px-6 py-4">
//                       {new Date(deposit.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">{deposit.network}</td>
//                     <td className="px-6 py-4">
//                       ${deposit.amount?.toLocaleString() || "0"}
//                     </td>
//                     <td className="px-6 py-4 capitalize">{deposit.status}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         onClick={() =>
//                           handleDeposit(deposit._id, deposit.amount, deposit.network)
//                         }
//                         disabled={submitting[deposit._id]}
//                         className="px-4 py-1.5 text-sm rounded-md bg-[#00BFA6] text-white hover:bg-[#009e8d] flex items-center gap-1"
//                       >
//                         {submitting[deposit._id] ? (
//                           <>
//                             <Loader2 className="animate-spin w-4 h-4" />
//                             Processing...
//                           </>
//                         ) : (
//                           "Deposit"
//                         )}
//                       </button>

//                       {/* ✅ Success/Error messages */}
//                       {messages[deposit._id] && (
//                         <div
//                           className={`mt-2 text-sm flex items-center gap-1 ${
//                             messages[deposit._id].type === "success"
//                               ? "text-green-600"
//                               : "text-red-500"
//                           }`}
//                         >
//                           {messages[deposit._id].type === "success" ? (
//                             <CheckCircle2 size={14} />
//                           ) : (
//                             <XCircle size={14} />
//                           )}
//                           {messages[deposit._id].text}
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-neutral-700">
//           <div className="flex items-center gap-2 text-sm">
//             <span>Show</span>
//             <select className="border rounded px-2 py-1 text-sm bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200">
//               {[10, 20, 50].map((n) => (
//                 <option key={n}>{n}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <button
//               onClick={() => setPage(Math.max(1, page - 1))}
//               className="hover:underline disabled:opacity-50"
//               disabled={page === 1}
//             >
//               Previous
//             </button>
//             <div className="w-6 h-6 flex items-center justify-center rounded-full text-white text-xs bg-[#00BFA6]">
//               {page}
//             </div>
//             <button onClick={() => setPage(page + 1)} className="hover:underline">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { apiClient } from "../api/apiClient";

export default function DepositDetails() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");

  // ✅ Fetch user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("api/users/profile");
      setUserData(res.data);
      console.log("User Profile:", res.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ Filter deposits from transactions
  const deposits =
    userData?.transactions?.filter((tx) => tx.type === "deposit") || [];

  const filteredDeposits = deposits.filter(
    (tx) =>
      tx.orderId?.toLowerCase().includes(search.toLowerCase()) ||
      tx.network?.toLowerCase().includes(search.toLowerCase()) ||
      tx.status?.toLowerCase().includes(search.toLowerCase()) ||
      tx.paymentId?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-neutral-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Deposit Details</h1>

      {/* 💰 Wallet Summary */}
      {userData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(userData.wallets).map(([key, value]) => (
            <div
              key={key}
              className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow border border-gray-200 dark:border-neutral-700"
            >
              <p className="text-sm capitalize text-gray-500">{key} wallet</p>
              <h2 className="text-xl font-semibold mt-1">${value}</h2>
            </div>
          ))}
        </div>
      )}

      {/* 🔍 Search Bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-md mb-6 border w-full bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700">
        <Search className="text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search by Order ID, Status, or Network"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm focus:outline-none bg-transparent text-gray-700 dark:text-gray-200"
        />
      </div>

      {/* 🧾 Deposit Table */}
      <div className="rounded-md shadow-md border bg-white dark:bg-neutral-800 border-gray-200 dark:border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold">Deposit Transactions</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-gray-400 w-6 h-6" />
          </div>
        ) : filteredDeposits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-5xl mb-3">⚠️</div>
            <p className="text-gray-400 text-sm">No Deposit Transactions Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-neutral-900 text-gray-600 dark:text-gray-300">
                <tr>
                  {[
                    "Order ID",
                    "Amount",
                    "Network",
                    "Currency",
                    "Status",
                    "Payment ID",
                    "Created At",
                  ].map((header) => (
                    <th key={header} className="px-6 py-3 font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredDeposits.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-t border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors"
                  >
                    <td className="px-6 py-4">{tx.orderId}</td>
                    <td className="px-6 py-4">${tx.amount}</td>
                    <td className="px-6 py-4 uppercase">{tx.network}</td>
                    <td className="px-6 py-4">{tx.payCurrency}</td>
                    <td
                      className={`px-6 py-4 font-medium ${
                        tx.status === "success"
                          ? "text-green-600"
                          : tx.status === "waiting"
                          ? "text-yellow-600"
                          : "text-red-500"
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="px-6 py-4">{tx.paymentId}</td>
                    <td className="px-6 py-4">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

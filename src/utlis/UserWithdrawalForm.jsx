// import React from "react";

// const UserWithdrawalForm = ({title}) => {
//   return (
//     <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-xl shadow-sm border border-gray-200 w-full mx-auto  md:p-10">
//       <h2 className="text-lg font-semibold text-gray-900 mb-6 dark:bg-neutral-800 dark:text-white">{title}</h2>

//       {/* Withdraw to */}
//       <div className="mb-4">
//         <label className="dark:bg-neutral-800 dark:text-white block text-sm font-medium text-gray-700 mb-1">
//           Withdraw to :
//         </label>
//         <button className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-full dark:bg-neutral-800 dark:text-white cursor-pointer hover:bg-gray-200 transition">
//           Please click here to update your wallet address
//         </button>
//       </div>

//       {/* Withdrawal Amount */}
//       <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-3">
//         <label className="text-sm dark:bg-neutral-800 dark:text-white font-medium text-gray-700 mb-1 md:mb-0">
//           Withdrawal Amount :
//         </label>
//         <div className="flex items-center">
//           <input
//             type="text"
//             placeholder="0.00"
//             className="w-40 dark:bg-transparent dark:text-white text-gray-500 text-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
//           />
//           <span className="ml-1 text-sm text-gray-500">USD</span>
//         </div>
//       </div>

//       {/* Charges */}
//       <div className="mb-2 text-sm text-gray-700 dark:bg-neutral-800 dark:text-white">
//         <p className="dark:bg-neutral-800 dark:text-white">
//           Charges Amount : <span className="font-medium text-gray-900 dark:bg-neutral-800 dark:text-white">0 USD</span>
//         </p>
//       </div>

//       {/* Receive Amount */}
//       <div className="mb-6 text-sm text-gray-700 dark:bg-neutral-800 dark:text-white">
//         <p>
//           Receive Amount : <span className="font-medium text-gray-900 dark:bg-neutral-800 dark:text-white">0 USD</span>
//         </p>
//       </div>

//       {/* Remarks */}
//       <div className="text-sm text-gray-700 leading-relaxed space-y-2">
//         <p className="font-medium mb-1 dark:bg-neutral-800 dark:text-white">Remark</p>
//         <ol className="list-decimal dark:bg-neutral-800 dark:text-white ml-4 space-y-1">
//           <li>
//             Kindly ensure the accurate input of your USDT(TRC20) withdrawal address. 
//             We shall not assume liability for any potential losses or damages arising 
//             from the entry of an incorrect wallet address.
//           </li>
//           <li>
//             Please take note that a 3% processing fee will be levied for withdrawal.
//           </li>
//         </ol>
//       </div>

//       {/* Withdraw Button */}
//       <button className="mt-8 w-full bg-[#F8983B] text-white text-sm font-medium py-3 rounded-b-lg hover:bg-[#e1862f] transition">
//         Withdraw
//       </button>
//     </div>
//   );
// };

// export default UserWithdrawalForm;











import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/authApi";
import { Loader2, RefreshCcw } from "lucide-react";

const UserWithdrawalForm = ({ title }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      setRefreshing(true);
      const token =
        localStorage.getItem("user_token") ||
        localStorage.getItem("access_token");
      if (!token) throw new Error("No user token found");
      const data = await getUserProfile(token);
      setProfile(data);
    } catch (err) {
      console.error("Profile fetch error:", err);
      setError("Failed to load profile. Please log in again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-600 dark:text-gray-300">
        <Loader2 className="animate-spin mr-2 text-[#F8983B]" size={20} />
        Loading wallet details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  const depositBalance = profile?.wallets?.deposit ?? 0;

  return (
    <div className="bg-white dark:bg-neutral-800 dark:text-white rounded-xl shadow-sm border border-gray-200 w-full mx-auto md:p-10">
      {/* Title and Refresh */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <button
          onClick={fetchProfile}
          disabled={refreshing}
          className="flex items-center text-sm text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
        >
          <RefreshCcw
            size={16}
            className={`mr-1 ${refreshing ? "animate-spin text-[#F8983B]" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Wallet Balance */}
      <div className="mb-4 text-sm">
        <p className="font-medium">
          <span className="text-gray-600 dark:text-gray-300">
            Deposit Wallet Balance:
          </span>{" "}
          <span className="text-[#00A991] font-semibold">
            ${depositBalance.toFixed(2)}
          </span>
        </p>
      </div>

      {/* Withdraw to */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Withdraw to:
        </label>
        <button className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-full dark:bg-neutral-700 dark:text-gray-300 hover:bg-gray-200 transition">
          Click here to update your wallet address
        </button>
      </div>

      {/* Withdrawal Amount */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-0">
          Withdrawal Amount:
        </label>
        <div className="flex items-center">
          <input
            type="number"
            placeholder="0.00"
            className="w-40 text-gray-700 dark:text-white bg-gray-50 dark:bg-neutral-700 border border-gray-200 rounded-md px-3 py-2 text-sm text-center focus:outline-none focus:ring-1 focus:ring-[#F8983B]"
          />
          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
            USD
          </span>
        </div>
      </div>

      {/* Charges */}
      <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
        <p>
          Charges Amount:{" "}
          <span className="font-medium text-gray-900 dark:text-white">0 USD</span>
        </p>
      </div>

      {/* Receive Amount */}
      <div className="mb-6 text-sm text-gray-700 dark:text-gray-300">
        <p>
          Receive Amount:{" "}
          <span className="font-medium text-gray-900 dark:text-white">0 USD</span>
        </p>
      </div>

      {/* Remarks */}
      <div className="text-sm text-gray-700 leading-relaxed dark:text-gray-300 space-y-2">
        <p className="font-medium mb-1">Remark</p>
        <ol className="list-decimal ml-4 space-y-1">
          <li>
            Ensure the accurate input of your USDT(TRC20) withdrawal address.
            We will not be liable for losses from incorrect entries.
          </li>
          <li>A 3% processing fee will be applied to withdrawals.</li>
        </ol>
      </div>

      {/* Withdraw Button */}
      <button className="mt-8 w-full bg-[#F8983B] text-white text-sm font-medium py-3 rounded-lg hover:bg-[#e1862f] transition">
        Withdraw
      </button>
    </div>
  );
};

export default UserWithdrawalForm;

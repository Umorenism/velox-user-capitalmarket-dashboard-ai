













// import React, { useState, useEffect, useMemo } from "react";
// import { motion } from "framer-motion";
// import { RiMenuFoldLine, RiFileCopyLine } from "react-icons/ri";
// import {
//   DollarSign,
//   CreditCard,
//   ArrowRightLeft,
//   Wallet,
//   Loader2,
//   XCircle,
//   CheckCircle2,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import PortfolioOverview from "../../utlis/PortfolioOverview";
// import ReferralCard from "../../utlis/ReferralCard";
// import PackageSummary from "../../utlis/PackageSummary";
// import PackagesSection from "../../utlis/PackagesSection";
// import { apiClient } from "../../api/apiClient";
// import { getUserProfile } from "../../api/authApi";

// /* ─────────────────────── API FUNCTIONS ─────────────────────── */
// const initiateFund = async (data) => {
//   const res = await apiClient.post("/wallet/deposit", data);
//   return res.data;
// };

// const transferFunds = async (data) => {
//   const res = await apiClient.post("/wallet/transfer", data);
//   return res.data;
// };

// /* ─────────────────────── REFRESH HELPER ─────────────────────── */
// const useProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token found");

//       const data = await getUserProfile(token);
//       setUserData(data);
//       return data;
//     } catch (error) {
//       console.error("Profile load failed:", error);
//       toast.error("Failed to load profile");
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshProfile = async () => {
//     setLoading(true);
//     try {
//       await fetchProfile();
//       toast.success("Wallet updated");
//     } catch {
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return { userData, loading, refreshProfile };
// };

// /* ─────────────────────── MODALS ─────────────────────── */
// const DepositModal = ({ closeModal, onSuccess }) => {
//   const [fundData, setFundData] = useState({ amount: "", payCurrency: "USDTBSC" });
//   const [fundLoading, setFundLoading] = useState(false);
//   const [fundResult, setFundResult] = useState(null);

//   const handleFundWallet = async (e) => {
//     e.preventDefault();
//     setFundLoading(true);
//     setFundResult(null);
//     try {
//       const res = await initiateFund({
//         amount: Number(fundData.amount),
//         payCurrency: fundData.payCurrency,
//       });
//       setFundResult({ type: "success", data: res });
//       setFundData({ amount: "", payCurrency: "USDTBSC" });
//       await onSuccess(); // refresh
//     } catch (err) {
//       setFundResult({
//         type: "error",
//         message: err.response?.data?.message || "Failed to initiate payment.",
//       });
//     } finally {
//       setFundLoading(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     toast.success("Address copied!");
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-neutral-700"
//       >
//         <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Deposit to Wallet</h2>

//         <form onSubmit={handleFundWallet} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Amount (USD)
//             </label>
//             <input
//               type="number"
//               min="1"
//               required
//               value={fundData.amount}
//               onChange={(e) => setFundData({ ...fundData, amount: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A991] focus:border-transparent"
//               placeholder="100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Cryptocurrency
//             </label>
//             <select
//               value={fundData.payCurrency}
//               onChange={(e) => setFundData({ ...fundData, payCurrency: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A991] focus:border-transparent"
//             >
//               <option value="USDTBSC">USDT (BSC)</option>
//               <option value="BTC">BTC</option>
//               <option value="ETH">ETH</option>
//             </select>
//           </div>

//           {fundResult && (
//             <div
//               className={`p-3 rounded-lg text-sm font-medium ${
//                 fundResult.type === "success"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {fundResult.type === "success" ? (
//                 <>
//                   <CheckCircle2 size={18} className="inline mr-2" />
//                   {fundResult.data.message}
//                   <div className="mt-2 p-2 bg-white dark:bg-neutral-700 rounded border font-mono text-xs break-all">
//                     <p>
//                       Send <strong>{fundResult.data.payAmount} {fundResult.data.payCurrency}</strong> to:
//                     </p>
//                     <div className="flex items-center justify-between mt-1">
//                       <span>{fundResult.data.payAddress}</span>
//                       <button
//                         type="button"
//                         onClick={() => copyToClipboard(fundResult.data.payAddress)}
//                         className="ml-2 text-[#00A991] hover:text-[#008a77]"
//                       >
//                         <RiFileCopyLine size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <XCircle size={18} className="inline mr-2" />
//                   {fundResult.message}
//                 </>
//               )}
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-neutral-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={fundLoading}
//               className="px-5 py-2 bg-[#00A991] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#008a77] disabled:opacity-70"
//             >
//               {fundLoading ? <Loader2 size={18} className="animate-spin" /> : "Proceed"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// const TransferModal = ({ closeModal, onSuccess }) => {
//   const [transferData, setTransferData] = useState({ toUserId: "", amount: "" });
//   const [transferLoading, setTransferLoading] = useState(false);
//   const [transferResult, setTransferResult] = useState(null);

//   const handleTransfer = async (e) => {
//     e.preventDefault();
//     setTransferLoading(true);
//     setTransferResult(null);
//     try {
//       const res = await transferFunds({
//         toUserId: transferData.toUserId,
//         amount: Number(transferData.amount),
//       });
//       setTransferResult({ type: "success", data: res });
//       setTransferData({ toUserId: "", amount: "" });
//       await onSuccess();
//     } catch (err) {
//       setTransferResult({
//         type: "error",
//         message: err.response?.data?.message || "Transfer failed.",
//       });
//     } finally {
//       setTransferLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-neutral-700"
//       >
//         <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Transfer Funds</h2>

//         <form onSubmit={handleTransfer} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Recipient User ID
//             </label>
//             <input
//               type="text"
//               required
//               value={transferData.toUserId}
//               onChange={(e) => setTransferData({ ...transferData, toUserId: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#EE933C] focus:border-transparent"
//               placeholder="user_123"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Amount (USD)
//             </label>
//             <input
//               type="number"
//               min="1"
//               required
//               value={transferData.amount}
//               onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#EE933C] focus:border-transparent"
//               placeholder="50"
//             />
//           </div>

//           {transferResult && (
//             <div
//               className={`p-3 rounded-lg text-sm font-medium ${
//                 transferResult.type === "success"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {transferResult.type === "success" ? (
//                 <>
//                   <CheckCircle2 size={18} className="inline mr-2" />
//                   {transferResult.data.message}
//                 </>
//               ) : (
//                 <>
//                   <XCircle size={18} className="inline mr-2" />
//                   {transferResult.message}
//                 </>
//               )}
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-neutral-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={transferLoading}
//               className="px-5 py-2 bg-[#EE933C] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-[#d87a2a] disabled:opacity-70"
//             >
//               {transferLoading ? <Loader2 size={18} className="animate-spin" /> : "Send"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// const WithdrawalModal = ({ closeModal, onSuccess }) => {
//   const [withdrawalData, setWithdrawalData] = useState({ amount: "", withdrawalAddress: "" });
//   const [withdrawalLoading, setWithdrawalLoading] = useState(false);
//   const [withdrawalResult, setWithdrawalResult] = useState(null);

//   const handleWithdrawal = async (e) => {
//     e.preventDefault();
//     setWithdrawalLoading(true);
//     setWithdrawalResult(null);

//     try {
//       const res = await apiClient.post("/api/users/withdrawal", {
//         amount: Number(withdrawalData.amount),
//         withdrawalAddress: withdrawalData.withdrawalAddress.trim(),
//       });
//       setWithdrawalResult({ type: "success", message: res.data.message || "Withdrawal submitted." });
//       setWithdrawalData({ amount: "", withdrawalAddress: "" });
//       await onSuccess();
//     } catch (err) {
//       setWithdrawalResult({
//         type: "error",
//         message: err.response?.data?.message || "Withdrawal failed.",
//       });
//     } finally {
//       setWithdrawalLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         className="bg-white dark:bg-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-200 dark:border-neutral-700"
//       >
//         <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Withdraw Funds</h2>

//         <form onSubmit={handleWithdrawal} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Amount (USD)
//             </label>
//             <input
//               type="number"
//               min="1"
//               required
//               value={withdrawalData.amount}
//               onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="100"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Withdrawal Address
//             </label>
//             <input
//               type="text"
//               required
//               value={withdrawalData.withdrawalAddress}
//               onChange={(e) => setWithdrawalData({ ...withdrawalData, withdrawalAddress: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="0x..."
//             />
//           </div>

//           {withdrawalResult && (
//             <div
//               className={`p-3 rounded-lg text-sm font-medium ${
//                 withdrawalResult.type === "success"
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-red-50 text-red-700 border border-red-200"
//               }`}
//             >
//               {withdrawalResult.type === "success" ? (
//                 <>
//                   <CheckCircle2 size={18} className="inline mr-2" />
//                   {withdrawalResult.message}
//                 </>
//               ) : (
//                 <>
//                   <XCircle size={18} className="inline mr-2" />
//                   {withdrawalResult.message}
//                 </>
//               )}
//             </div>
//           )}

//           <div className="flex justify-end gap-3 mt-6">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-neutral-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={withdrawalLoading}
//               className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 disabled:opacity-70"
//             >
//               {withdrawalLoading ? <Loader2 size={18} className="animate-spin" /> : "Withdraw"}
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// /* ─────────────────────── MAIN COMPONENT ─────────────────────── */
// export default function PartnerPage() {
//   const { userData, loading, refreshProfile } = useProfile();

//   // Modal States
//   const [showDeposit, setShowDeposit] = useState(false);
//   const [showTransfer, setShowTransfer] = useState(false);
//   const [showWithdrawal, setShowWithdrawal] = useState(false);

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: (i = 1) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.2, ease: "easeOut" },
//     }),
//   };

//   const formatAmount = (amt) => {
//     const n = Number(amt);
//     return isNaN(n) ? "0.00" : n.toFixed(2);
//   };

//   const wallets = userData?.wallets || {};

//   const walletData = useMemo(() => [
//     {
//       title: "Deposit Wallet",
//       amount: formatAmount(wallets.deposit),
//       icon: <Wallet size={22} />,
//       buttons: ["deposit"],
//     },
//     {
//       title: "Bonus Wallet",
//       amount: formatAmount(wallets.bonus || 0),
//       icon: <DollarSign size={22} />,
//       buttons: ["transfer"],
//     },
//     {
//       title: "Referral Wallet",
//       amount: formatAmount(wallets.referral || 0),
//       icon: <CreditCard size={22} />,
//       buttons: ["transfer"],
//     },
//     {
//       title: "Earnings Wallet",
//       amount: formatAmount(wallets.earnings || 0),
//       icon: <ArrowRightLeft size={22} />,
//       buttons: ["withdraw", "transfer"],
//     },
//   ], [wallets]);

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen py-10"
//     >
//       {/* Wallet Section */}
//       <motion.div
//         variants={fadeUp}
//         className="w-[92%] lg:w-[80%] xl:w-[85%] bg-white dark:bg-neutral-800 rounded-xl shadow-md p-2 sm:p-3 mb-3 border border-gray-100/30"
//       >
//         {loading ? (
//           <div className="flex justify-center py-6">
//             <Loader2 className="animate-spin text-[#00A991]" size={28} />
//           </div>
//         ) : (
//           <div className="flex flex-col md:flex-row justify-between items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
//             {walletData.map((item, i) => (
//               <motion.div
//                 key={i}
//                 variants={fadeUp}
//                 custom={i}
//                 className="flex flex-col justify-center items-center w-full md:w-1/4 px-1 py-1.5 sm:px-2 sm:py-2 text-center space-y-1.5"
//               >
//                 <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
//                   <span className="text-[#00A991]">{item.icon}</span>
//                   <h1 className="text-[11px] sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
//                     {item.title}:
//                   </h1>
//                   <p className="text-sm font-bold text-gray-900 dark:text-white">
//                     {item.amount}
//                     <span className="text-[10px] font-medium ml-1 text-gray-600 dark:text-gray-400">USD</span>
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
//                   {item.buttons.includes("deposit") && (
//                     <button
//                       onClick={() => setShowDeposit(true)}
//                       className="px-3 py-1 rounded-full bg-[#00A991] text-white text-[10px] sm:text-[11px] font-medium hover:bg-[#008a77] transition"
//                     >
//                       Deposit
//                     </button>
//                   )}
//                   {item.buttons.includes("transfer") && (
//                     <button
//                       onClick={() => setShowTransfer(true)}
//                       className="px-3 py-1 rounded-full bg-[#EE933C] text-white text-[10px] sm:text-[11px] font-medium hover:bg-[#d87a2a] transition"
//                     >
//                       Transfer
//                     </button>
//                   )}
//                   {item.buttons.includes("withdraw") && (
//                     <button
//                       onClick={() => setShowWithdrawal(true)}
//                       className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-medium hover:bg-red-700 transition"
//                     >
//                       Withdraw
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>

//       {/* Header */}
//       <div className="space-y-2 max-w-[1400px] p-5 w-full">
//         <RiMenuFoldLine size={30} className="text-gray-700 dark:text-white" />
//         <h1 className="text-[20px] sm:text-[24px] font-[700] text-[#000000] dark:text-white">
//           IB Dashboard
//         </h1>
//       </div>

//       {/* Portfolio & Referral */}
//       <motion.div
//         variants={fadeUp}
//         className="py-6 flex flex-col lg:flex-row gap-4 w-full max-w-[1400px] px-4 sm:px-6"
//       >
//         <div className="w-full lg:w-1/2">
//           {userData && <PortfolioOverview userData={userData} />}
//         </div>
//         <div className="w-full lg:w-1/2">
//           <ReferralCard />
//         </div>
//       </motion.div>

//       {/* Package Summary & Packages */}
//       <motion.div
//         variants={fadeUp}
//         className="py-6 flex flex-col lg:flex-row gap-4 w-full max-w-[1400px] px-4 sm:px-6"
//       >
//         <div className="w-full lg:w-[50%]">
//           <PackageSummary />
//         </div>
//         <div className="w-full lg:w-[60%]">
//           <PackagesSection />
//         </div>
//       </motion.div>

//       {/* Risk Warning */}
//       <motion.div
//         variants={fadeUp}
//         className="flex flex-col md:flex-row gap-8 items-start bg-white dark:bg-neutral-800 rounded-xl p-6 sm:p-8 mx-auto mt-10 w-[95%] lg:w-[85%] xl:w-[95%]"
//       >
//         <div className="md:w-1/2 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
//           <h1 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-300 pb-2">
//             Risk Warning
//           </h1>
//           <p>
//             Trading forex, CFDs, and any financial derivative instruments on margin carries a high level of risk and may not be suitable for all investors, as you could sustain losses in excess of your deposits. Leverage can work for you as well as against you. Please carefully consider your financial situation and investment experience prior to trading products offered by{" "}
//             <span className="font-semibold text-[#00A991]">International Finance Asia</span>.
//           </p>
//           <p>
//             <span className="font-semibold text-[#00A991]">International Finance Asia Pty Ltd</span> is regulated by the Australian Securities and Investments Commission (ACN 670 137 345) under License No. 001305580.
//           </p>
//         </div>

//         <div className="md:w-1/2 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base border-t md:border-t-0 md:border-l border-gray-300 md:pl-8 pt-4 md:pt-14">
//           <p>
//             The contents in this site are provided only for informational purposes and should not be regarded as an offer or solicitation to any person in any jurisdiction where such an offer is unauthorized. Please read and understand the{" "}
//             <span className="text-[#00A991] font-medium">Terms and Conditions</span>,{" "}
//             <span className="text-[#00A991] font-medium">Risk Disclosure</span> and other legal documents on the{" "}
//             <span className="text-[#00A991] font-medium">International Finance Asia</span> website prior to initiating your leveraged investment.
//           </p>
//         </div>
//       </motion.div>

//       {/* MODALS */}
//       {showDeposit && (
//         <DepositModal
//           closeModal={() => setShowDeposit(false)}
//           onSuccess={refreshProfile}
//         />
//       )}
//       {showTransfer && (
//         <TransferModal
//           closeModal={() => setShowTransfer(false)}
//           onSuccess={refreshProfile}
//         />
//       )}
//       {showWithdrawal && (
//         <WithdrawalModal
//           closeModal={() => setShowWithdrawal(false)}
//           onSuccess={refreshProfile}
//         />
//       )}
//     </motion.div>
//   );
// }




'use client'; // <-- remove if you are not using Next.js App Router

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const partners = [
  {
    name: 'Stripe',
    logo: 'https://logo.clearbit.com/stripe.com',
    url: 'https://stripe.com',
  },
  {
    name: 'Plaid',
    logo: 'https://logo.clearbit.com/plaid.com',
    url: 'https://plaid.com',
  },
  {
    name: 'Coinbase',
    logo: 'https://logo.clearbit.com/coinbase.com',
    url: 'https://coinbase.com',
  },
  {
    name: 'AWS',
    logo: 'https://logo.clearbit.com/amazonaws.com',
    url: 'https://aws.amazon.com',
  },
  {
    name: 'Twilio',
    logo: 'https://logo.clearbit.com/twilio.com',
    url: 'https://twilio.com',
  },
  {
    name: 'Firestore',
    logo: 'https://logo.clearbit.com/firebase.google.com',
    url: 'https://firebase.google.com',
  },
];

export default function PartnershipsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            veloxcapitalmarket.ai partners with the best to deliver secure, scalable fintech solutions.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {partners.map((partner, idx) => (
            <PartnerCard key={idx} {...partner} />
          ))}
        </motion.div>

        {/* Call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="mailto:partnerships@veloxcapitalmarket.ai"
            className="inline-flex items-center gap-2 px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-teal-600 to-orange-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            Become a Partner
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Individual Card with hover animation ---------- */
function PartnerCard({ name, logo, url }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300"
      whileHover={{ scale: 1.08, y: -6 }}
      whileTap={{ scale: 0.98 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {/* Glow effect on hover */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <img
        src={logo}
        alt={`${name} logo`}
        className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
        loading="lazy"
      />
    </motion.a>
  );
}
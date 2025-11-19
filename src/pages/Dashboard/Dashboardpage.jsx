

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  CreditCard,
  ArrowRightLeft,
  Wallet,
  Loader2,
  XCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Hourglass,
  Copy,
} from "lucide-react";
import QRCode from "react-qr-code"; // ← NEW: QR Code Generator

import PortfolioOverview from "../../utlis/PortfolioOverview";
import ReferralCard from "../../utlis/ReferralCard";
import PackageSummary from "../../utlis/PackageSummary";
import PackagesSection from "../../utlis/PackagesSection";
import { getUserProfile } from "../../api/authApi";
import { initiateFund, transferFunds } from "../../api/walletApi";
import axios from "axios";

/* ====================== SUCCESS BANNER ====================== */
const SuccessBanner = ({ message = "Deposit successful! Your wallet has been credited.", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full"
    >
      <div className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
        <CheckCircle2 size={20} />
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-auto hover:opacity-70 transition-opacity">
          <XCircle size={20} />
        </button>
      </div>
    </motion.div>
  );
};

/* ====================== DEPOSIT REQUIREMENTS MODAL ====================== */
const DepositRequirementsModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-neutral-800 p-6 rounded-lg max-w-sm w-full shadow-2xl"
    >
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <AlertCircle className="text-yellow-500" size={20} />
        Deposit Requirements
      </h3>
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Network:</strong> Binance Smart Chain (BSC)</p>
        <p><strong>Coin:</strong> USDT</p>
        <p><strong>Minimum Deposit:</strong> 100 USDT</p>
      </div>
      <div className="flex justify-between gap-3 mt-5">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 dark:bg-neutral-600 rounded-md text-sm font-medium">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 bg-[#00A991] text-white rounded-md text-sm font-medium">
          I Understand
        </button>
      </div>
    </motion.div>
  </div>
);

/* ====================== STATUS BADGE ====================== */
const StatusBadge = ({ status }) => {
  const config = {
    waiting: { icon: <Hourglass size={14} />, color: "bg-orange-100 text-orange-700", label: "Waiting" },
    pending: { icon: <Clock size={14} />, color: "bg-yellow-100 text-yellow-700", label: "Pending" },
    confirmed: { icon: <CheckCircle2 size={14} />, color: "bg-emerald-100 text-emerald-700", label: "Confirmed" },
    partially_paid: { icon: <AlertCircle size={14} />, color: "bg-amber-100 text-amber-700", label: "Partially Paid" },
    expired: { icon: <XCircle size={14} />, color: "bg-red-100 text-red-700", label: "Expired" },
  };
  const { icon, color, label } = config[status] || config.waiting;
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {icon} {label}
    </div>
  );
};

/* ====================== DEPOSIT MODAL (WITH QR CODE) ====================== */
const DepositModal = ({
  fundData,
  setFundData,
  fundResult,
  fundLoading,
  handleFundWallet,
  closeModal,
  paymentId,
  paymentStatus,
  copyToClipboard,
  timeLeft,
}) => {
  const MIN_AMOUNT = 100;
  const handleMinClick = () => setFundData({ ...fundData, amount: MIN_AMOUNT.toString() });
  const currentStatus = paymentStatus?.transaction?.status || (paymentId ? "waiting" : null);
  const payAddress = fundResult?.data?.payAddress || paymentStatus?.payAddress;
  const payAmount = fundResult?.data?.payAmount || paymentStatus?.transaction?.amount;

  // BSC Payment URI for QR Code
  const bscUri = payAddress && payAmount ? `${payAddress}?amount=${payAmount}` : "";

  const formatTime = (seconds) => {
    if (seconds === null || seconds < 0) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-3">Fund Wallet</h2>
        <form onSubmit={handleFundWallet} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount (USDT)
            </label>
            <div className="relative">
              <input
                type="number"
                min={MIN_AMOUNT}
                required
                value={fundData.amount}
                onChange={(e) => setFundData({ ...fundData, amount: e.target.value })}
                className="w-full px-3 py-2 pr-16 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#00A991] focus:border-transparent"
                placeholder={`Min ${MIN_AMOUNT} USDT`}
                disabled={!!paymentId}
              />
              <button
                type="button"
                onClick={handleMinClick}
                disabled={!!paymentId}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-[#00A991] bg-[#00A991]/10 rounded hover:bg-[#00A991]/20 transition disabled:opacity-50"
              >
                Min
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum: 100 USDT</p>
            {fundData.amount && Number(fundData.amount) < MIN_AMOUNT && (
              <p className="text-red-500 text-xs mt-1">Minimum deposit is 100 USDT</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Network</label>
            <div className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-md text-sm">
              Binance Smart Chain (BSC)
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Coin</label>
            <div className="p-2 bg-gray-100 dark:bg-neutral-700 rounded-md text-sm">
              USDT
            </div>
          </div>

          {/* Payment Info + QR Code */}
          {(fundResult || paymentId) && (
            <div className="p-4 bg-gray-50 dark:bg-neutral-700 rounded-md text-sm space-y-4">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 size={16} /> Payment Initiated
              </div>

              {/* Countdown Timer */}
              {timeLeft !== null && (
                <div className={`flex items-center gap-2 font-medium ${timeLeft < 120 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
                  <Clock size={16} />
                  <span>
                    {timeLeft < 120 ? "Hurry! " : ""}Time remaining: {formatTime(timeLeft)}
                  </span>
                </div>
              )}

              {/* QR CODE */}
              {bscUri && (
                <div className="flex flex-col items-center gap-3 py-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Scan with any BSC wallet (MetaMask, Trust Wallet, etc.)
                  </p>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-white rounded-lg shadow-md border"
                  >
                    <QRCode
                      value={bscUri}
                      size={180}
                      level="M"
                      fgColor="#000"
                      bgColor="#fff"
                    />
                  </motion.div>
                  <p className="text-xs text-gray-500 text-center">
                    Opens wallet with address & amount pre-filled
                  </p>
                </div>
              )}

              {/* Manual Payment Details */}
              <div className="space-y-2">
                <p>Send exactly:</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono">{payAmount}</p>
                  <button onClick={() => copyToClipboard(payAmount)} className="text-[#00A991] hover:text-[#008a77]">
                    <Copy size={14} />
                  </button>
                </div>
                <p>To Address:</p>
                <div className="flex items-center gap-2 break-all">
                  <p className="font-mono text-xs">{payAddress}</p>
                  <button onClick={() => copyToClipboard(payAddress)} className="text-[#00A991] hover:text-[#008a77]">
                    <Copy size={14} />
                  </button>
                </div>
                <p className="text-xs">
                  Payment ID: <span className="font-mono">{fundResult?.data?.paymentId || paymentId}</span>
                </p>
              </div>

              {/* Status */}
              {paymentId && (
                <div className="mt-3 pt-3 border-t border-gray-300 dark:border-neutral-600">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <StatusBadge status={currentStatus} />
                  </div>
                  {currentStatus === "confirmed" && (
                    <p className="text-emerald-700 mt-2">
                      <CheckCircle2 size={16} className="inline mr-1" />
                      Deposit confirmed!
                    </p>
                  )}
                  {timeLeft === 0 && currentStatus !== "confirmed" && (
                    <p className="text-red-600 mt-2 text-xs">
                      <XCircle size={16} className="inline mr-1" />
                      Payment window expired. Please try again.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={closeModal} className="px-3 py-1 bg-gray-300 dark:bg-neutral-600 rounded-md text-sm">
              Close
            </button>
            {!paymentId && (
              <button
                type="submit"
                disabled={fundLoading || Number(fundData.amount) < MIN_AMOUNT}
                className="px-3 py-1 bg-[#00A991] text-white rounded-md text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {fundLoading ? <Loader2 size={14} className="animate-spin" /> : "Proceed"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

/* ====================== TRANSFER & WITHDRAWAL MODALS ====================== */
const TransferModal = ({
  transferData,
  setTransferData,
  transferResult,
  transferLoading,
  handleTransfer,
  closeModal,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-xl">
      <h2 className="text-lg font-semibold mb-3">Transfer Funds</h2>
      <form onSubmit={handleTransfer} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Recipient User ID</label>
          <input
            type="text"
            required
            value={transferData.toUserId}
            onChange={(e) => setTransferData({ ...transferData, toUserId: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Amount</label>
          <input
            type="number"
            min="1"
            required
            value={transferData.amount}
            onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-neutral-700"
          />
        </div>
        {transferResult && (
          <div className={`p-2 text-sm rounded-md ${transferResult.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {transferResult.type === "success" ? (
              <>
                <CheckCircle2 size={16} className="inline mr-1" />
                {transferResult.data.message}
              </>
            ) : (
              <>
                <XCircle size={16} className="inline mr-1" />
                {transferResult.message}
              </>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={closeModal} className="px-3 py-1 bg-gray-300 dark:bg-neutral-600 rounded-md text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={transferLoading}
            className="px-3 py-1 bg-[#EE933C] text-white rounded-md text-sm flex items-center gap-2"
          >
            {transferLoading ? <Loader2 size={14} className="animate-spin" /> : "Send"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const WithdrawalModal = ({
  withdrawalData,
  setWithdrawalData,
  withdrawalResult,
  withdrawalLoading,
  handleWithdrawal,
  closeModal,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg w-full max-w-md shadow-xl">
      <h2 className="text-lg font-semibold mb-3">Withdraw Funds</h2>
      <form onSubmit={handleWithdrawal} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Amount (USD)</label>
          <input
            type="number"
            min="1"
            required
            value={withdrawalData.amount}
            onChange={(e) => setWithdrawalData({ ...withdrawalData, amount: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-neutral-700"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Withdrawal Address</label>
          <input
            type="text"
            required
            placeholder="0x..."
            value={withdrawalData.withdrawalAddress}
            onChange={(e) => setWithdrawalData({ ...withdrawalData, withdrawalAddress: e.target.value })}
            className="w-full p-2 border rounded-md dark:bg-neutral-700"
          />
        </div>
        {withdrawalResult && (
          <div className={`p-2 text-sm rounded-md ${withdrawalResult.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {withdrawalResult.type === "success" ? (
              <>
                <CheckCircle2 size={16} className="inline mr-1" />
                {withdrawalResult.message}
              </>
            ) : (
              <>
                <XCircle size={16} className="inline mr-1" />
                {withdrawalResult.message}
              </>
            )}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={closeModal} className="px-3 py-1 bg-gray-300 dark:bg-neutral-600 rounded-md text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={withdrawalLoading}
            className="px-3 py-1 bg-[#00A991] text-white rounded-md text-sm flex items-center gap-2"
          >
            {withdrawalLoading ? <Loader2 size={14} className="animate-spin" /> : "Withdraw"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

/* ====================== MAIN DASHBOARD COMPONENT ====================== */
export default function Dashboardpage() {
  /* -------------------------- STATE -------------------------- */
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showRequirements, setShowRequirements] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [fundData, setFundData] = useState({ amount: "", payCurrency: "USDTBSC" });
  const [fundResult, setFundResult] = useState(null);
  const [fundLoading, setFundLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(() => localStorage.getItem("pendingPaymentId") || null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [transferData, setTransferData] = useState({ toUserId: "", amount: "" });
  const [transferResult, setTransferResult] = useState(null);
  const [transferLoading, setTransferLoading] = useState(false);
  const [withdrawalData, setWithdrawalData] = useState({ amount: "", withdrawalAddress: "" });
  const [withdrawalResult, setWithdrawalResult] = useState(null);
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const pollIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const PAYMENT_EXPIRY_SECONDS = 15 * 60; // 15 minutes

  /* -------------------------- COPY TO CLIPBOARD -------------------------- */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      alert("Failed to copy");
    }
  };

  /* -------------------------- COUNTDOWN TIMER -------------------------- */
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (!paymentId) {
      setTimeLeft(null);
      return;
    }
    const initiatedAt = localStorage.getItem("depositInitiatedAt");
    if (!initiatedAt) {
      setTimeLeft(null);
      return;
    }
    const startTime = parseInt(initiatedAt, 10);
    const expiryTime = startTime + PAYMENT_EXPIRY_SECONDS * 1000;
    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0 && paymentStatus?.transaction?.status !== "confirmed") {
        localStorage.removeItem("pendingPaymentId");
        localStorage.removeItem("depositInitiatedAt");
        setPaymentId(null);
        setPaymentStatus(null);
        setTimeLeft(null);
        setShowDeposit(false);
      }
    };
    updateTimer();
    timerIntervalRef.current = setInterval(updateTimer, 1000);
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [paymentId, paymentStatus]);

  /* -------------------------- SINGLE POLLING LOGIC -------------------------- */
  useEffect(() => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    const storedPaymentId = localStorage.getItem("pendingPaymentId");
    if (!storedPaymentId) {
      setPaymentId(null);
      setPaymentStatus(null);
      return;
    }
    setPaymentId(storedPaymentId);
    const checkPayment = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`/api/users/wallet/check-status/${storedPaymentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { transaction, user } = res.data;
        setPaymentStatus(res.data);
        if (transaction?.status === "confirmed") {
          clearInterval(pollIntervalRef.current);
          localStorage.removeItem("pendingPaymentId");
          localStorage.removeItem("depositInitiatedAt");
          if (user?.wallets?.deposit !== undefined) {
            setProfile((prev) => ({
              ...prev,
              wallets: { ...prev.wallets, deposit: user.wallets.deposit },
            }));
          }
          setSuccessMessage(`Deposit of ${transaction.amount} USDT confirmed!`);
          setShowSuccessBanner(true);
          setShowDeposit(false);
          setTimeLeft(null);
          getUserProfile(token).then(setProfile).catch(console.error);
          window.dispatchEvent(new Event("depositConfirmed"));
        }
      } catch (err) {
        console.error("Polling error:", err);
        if (err.response?.status === 401) {
          clearInterval(pollIntervalRef.current);
          localStorage.removeItem("pendingPaymentId");
          localStorage.removeItem("depositInitiatedAt");
        }
      }
    };
    checkPayment();
    pollIntervalRef.current = setInterval(checkPayment, 5000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  /* -------------------------- PROFILE LOAD -------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }
    getUserProfile(token)
      .then((data) => {
        setProfile(data);
        const pendingId = localStorage.getItem("pendingPaymentId");
        if (pendingId) setShowDeposit(true);
      })
      .catch((err) => setError(err.message || "Failed to load profile."))
      .finally(() => setLoading(false));
  }, []);

  /* -------------------------- DEPOSIT FLOW -------------------------- */
  const openDepositFlow = () => setShowRequirements(true);
  const confirmRequirements = () => {
    setShowRequirements(false);
    setShowDeposit(true);
    setFundData({ amount: "100", payCurrency: "USDTBSC" });
  };

  const handleFundWallet = async (e) => {
    e.preventDefault();
    if (Number(fundData.amount) < 100) return;
    setFundLoading(true);
    setFundResult(null);
    try {
      const res = await initiateFund({
        amount: Number(fundData.amount),
        payCurrency: "USDTBSC",
      });
      const payId = res.paymentId || res.data?.paymentId;
      if (!payId) throw new Error("No payment ID returned");
      localStorage.setItem("pendingPaymentId", payId);
      localStorage.setItem("depositInitiatedAt", Date.now().toString());
      setPaymentId(payId);
      setPaymentStatus({
        message: "Payment initiated",
        transaction: { status: "waiting", amount: Number(fundData.amount) },
      });
      setFundResult({ type: "success", data: res });
    } catch (err) {
      setFundResult({
        type: "error",
        message: err.response?.data?.message || "Failed to initiate payment.",
      });
    } finally {
      setFundLoading(false);
    }
  };

  const closeDepositModal = () => {
    setShowDeposit(false);
    setFundResult(null);
    setFundData({ amount: "", payCurrency: "USDTBSC" });
    if (paymentId && paymentStatus?.transaction?.status !== "confirmed") {
      localStorage.removeItem("pendingPaymentId");
      localStorage.removeItem("depositInitiatedAt");
    }
    setPaymentId(null);
    setPaymentStatus(null);
    setTimeLeft(null);
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setTransferLoading(true);
    setTransferResult(null);
    try {
      const res = await transferFunds({
        toUserId: transferData.toUserId,
        amount: Number(transferData.amount),
      });
      setTransferResult({ type: "success", data: res });
      setTransferData({ toUserId: "", amount: "" });
    } catch (err) {
      setTransferResult({
        type: "error",
        message: err.response?.data?.message || "Transfer failed.",
      });
    } finally {
      setTransferLoading(false);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();
    setWithdrawalLoading(true);
    setWithdrawalResult(null);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      const res = await axios.post(
        "/api/users/withdrawal",
        {
          amount: Number(withdrawalData.amount),
          withdrawalAddress: withdrawalData.withdrawalAddress.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWithdrawalResult({ type: "success", message: res.data.message || "Withdrawal request submitted." });
      setWithdrawalData({ amount: "", withdrawalAddress: "" });
    } catch (err) {
      setWithdrawalResult({
        type: "error",
        message: err.response?.data?.message || "Withdrawal failed.",
      });
    } finally {
      setWithdrawalLoading(false);
    }
  };

  /* -------------------------- RENDER HELPERS -------------------------- */
  const formatAmount = (amt, cur = "USD") => {
    const n = Number(amt);
    return isNaN(n) ? `0 ${cur}` : `${n.toFixed(2)} ${cur}`;
  };

  const wallets = profile?.wallets || {};
  const walletData = [
    { title: "Deposit Wallet", amount: formatAmount(wallets.deposit), icon: <Wallet size={20} />, buttons: ["deposit"] },
    { title: "Bear Wallet", amount: formatAmount(wallets.bear), icon: <DollarSign size={20} />, buttons: [] },
    { title: "Bull Wallet", amount: formatAmount(wallets.bull), icon: <CreditCard size={20} />, buttons: ["transfer"] },
    { title: "Account Balance", amount: formatAmount(profile?.activeInvestment), icon: <ArrowRightLeft size={20} />, buttons: ["withdraw", "transfer"] },
  ];

  const stats = [
    { title: "Total Balance", value: profile?.totalInvestment || 0, currency: "USD" },
    { title: "Personal Volume (PV)", value: profile?.personalVolume || 0, currency: "USD" },
    { title: "Group Volume (GV)", value: profile?.groupVolume || 0, currency: "USD" },
    { title: "Total Referrals", value: profile?.totalReferral || 0, currency: "" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.2 } }),
  };

  /* -------------------------- RENDER -------------------------- */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900">
        <Loader2 className="animate-spin text-[#00A991]" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-neutral-900 text-red-600">
        <p className="text-lg font-semibold">Error</p>
        <p className="mt-2">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* SUCCESS BANNER */}
      {showSuccessBanner && (
        <SuccessBanner message={successMessage} onClose={() => setShowSuccessBanner(false)} />
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center bg-gray-100 dark:bg-neutral-900 dark:text-white min-h-screen py-6 sm:py-10"
      >
        {/* WALLETS */}
        <motion.div
          variants={fadeUp}
          className="w-[92%] lg:w-[80%] xl:w-[85%] bg-white dark:bg-neutral-800 rounded-xl shadow-md p-3 mb-6 border border-gray-100/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {walletData.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex flex-col justify-center items-center w-full md:w-1/4 px-2 py-2 text-center space-y-1.5"
              >
                <div className="flex flex-col sm:flex-row justify-center items-center gap-1">
                  <span className="text-[#00A991]">{item.icon}</span>
                  <h1 className="text-sm font-semibold">{item.title}:</h1>
                  <p className="text-sm font-bold">{item.amount}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.buttons.includes("deposit") && (
                    <button
                      onClick={openDepositFlow}
                      className="px-3 py-1 rounded-full bg-[#00A991] text-white text-[11px] hover:opacity-90"
                    >
                      Deposit
                    </button>
                  )}
                  {item.buttons.includes("transfer") && (
                    <button
                      onClick={() => setShowTransfer(true)}
                      className="px-3 py-1 rounded-full bg-[#EE933C] text-white text-[11px] hover:opacity-90"
                    >
                      Transfer
                    </button>
                  )}
                  {item.buttons.includes("withdraw") && (
                    <button
                      onClick={() => setShowWithdrawal(true)}
                      className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] hover:opacity-90"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div variants={fadeUp} className="w-full max-w-[1400px] px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={idx}
                className="bg-white dark:bg-neutral-800 rounded-[10px] shadow-sm border border-gray-100 p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs sm:text-sm font-medium">{stat.title}</h3>
                  <DollarSign size={12} className="text-gray-600" />
                </div>
                <hr />
                <div className="text-[36px] sm:text-[50px] font-semibold text-emerald-600">
                  {stat.value}
                  {stat.currency && <span className="text-sm ml-1">{stat.currency}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PORTFOLIO & REFERRAL */}
        <motion.div
          variants={fadeUp}
          className="py-6 flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] px-4 sm:px-6"
        >
          <div className="w-full lg:w-[65%]">
            <PortfolioOverview userData={profile} />
          </div>
          <div className="w-full lg:w-[35%]">
            <ReferralCard profile={profile} />
          </div>
        </motion.div>

        {/* PACKAGES */}
        <motion.div
          variants={fadeUp}
          className="py-6 flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] px-4 sm:px-6"
        >
          <div className="w-full lg:w-[30%]">
            <PackageSummary packages={profile?.packages} />
          </div>
          <div className="w-full lg:w-[70%]">
            <PackagesSection packages={profile?.packages} />
          </div>
        </motion.div>

        {/* RISK WARNING */}
        <motion.div
                  variants={fadeUp}
                  className="flex flex-col md:flex-row gap-8 items-start bg-white dark:bg-neutral-800 rounded-xl p-6 sm:p-8 mx-auto mt-10 w-[95%] lg:w-[85%] xl:w-[95%]"
                >
                  <div className="md:w-1/2 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-300 pb-2">
                      Risk Warning
                    </h1>
                    <p>
                      Trading forex, CFDs, and any financial derivative instruments on margin carries a high level of risk and may not be suitable for all investors, as you could sustain losses in excess of your deposits. Leverage can work for you as well as against you. Please carefully consider your financial situation and investment experience prior to trading products offered by{" "}
                      <span className="font-semibold text-[#00A991]">International Finance Asia</span>.
                    </p>
                    <p>
                      <span className="font-semibold text-[#00A991]">International Finance Asia Pty Ltd</span> is regulated by the Australian Securities and Investments Commission (ACN 670 137 345) under License No. 001305580.
                    </p>
                  </div>
        
                  <div className="md:w-1/2 text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base border-t md:border-t-0 md:border-l border-gray-300 md:pl-8 pt-4 md:pt-14">
                    <p>
                      The contents in this site are provided only for informational purposes and should not be regarded as an offer or solicitation to any person in any jurisdiction where such an offer is unauthorized. Please read and understand the{" "}
                      <span className="text-[#00A991] font-medium">Terms and Conditions</span>,{" "}
                      <span className="text-[#00A991] font-medium">Risk Disclosure</span> and other legal documents on the{" "}
                      <span className="text-[#00A991] font-medium">International Finance Asia</span> website prior to initiating your leveraged investment.
                    </p>
                  </div>
                </motion.div>

        {/* MODALS */}
        {showRequirements && (
          <DepositRequirementsModal onConfirm={confirmRequirements} onCancel={() => setShowRequirements(false)} />
        )}
        {showDeposit && (
          <DepositModal
            fundData={fundData}
            setFundData={setFundData}
            fundResult={fundResult}
            fundLoading={fundLoading}
            handleFundWallet={handleFundWallet}
            closeModal={closeDepositModal}
            paymentId={paymentId}
            paymentStatus={paymentStatus}
            copyToClipboard={copyToClipboard}
            timeLeft={timeLeft}
          />
        )}
        {showTransfer && (
          <TransferModal
            transferData={transferData}
            setTransferData={setTransferData}
            transferResult={transferResult}
            transferLoading={transferLoading}
            handleTransfer={handleTransfer}
            closeModal={() => setShowTransfer(false)}
          />
        )}
        {showWithdrawal && (
          <WithdrawalModal
            withdrawalData={withdrawalData}
            setWithdrawalData={setWithdrawalData}
            withdrawalResult={withdrawalResult}
            withdrawalLoading={withdrawalLoading}
            handleWithdrawal={handleWithdrawal}
            closeModal={() => setShowWithdrawal(false)}
          />
        )}
      </motion.div>
    </>
  );
}
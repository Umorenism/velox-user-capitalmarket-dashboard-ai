import React from "react";
import { motion } from "framer-motion";
import { useUser } from "../routes/UserContext";
import { useNavigate } from "react-router-dom";

export default function ReportHistoryTransaction() {
  const { user } = useUser();
  const navigate = useNavigate();

  const profile = user || {};
  const bonusHistory = profile.bonusHistory || [];
  const walletHistory = profile.walletHistory || [];

  const goBack = () => navigate(-1); // Back to report

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Report
          </button>
        </div>

        {/* Bonus History Table */}
        {bonusHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6 mb-6"
          >
            <h2 className="text-lg font-semibold mb-4">Bonus Transactions</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bonusHistory.map((tx, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-2">{tx.date || "N/A"}</td>
                    <td className="py-2">{tx.type || "Bonus"}</td>
                    <td className="py-2 text-right">${tx.amount || 0}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        tx.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {tx.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Wallet History Table */}
        {walletHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Wallet Transactions</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Action</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-left py-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {walletHistory.map((tx, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-2">{tx.date || "N/A"}</td>
                    <td className="py-2">{tx.action || "Deposit"}</td>
                    <td className="py-2 text-right">${tx.amount || 0}</td>
                    <td className="py-2 text-right">${tx.balance || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* No Transactions */}
        {bonusHistory.length === 0 && walletHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 text-gray-500"
          >
            <p className="text-lg">No transactions yet.</p>
            <p>Complete your first trade to see details here.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
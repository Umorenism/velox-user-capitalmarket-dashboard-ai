// src/api/walletApi.js
import { apiClient } from "./apiClient";

// ──────────────────────── Fund Wallet ────────────────────────
export const initiateFund = async ({ amount, payCurrency }) => {
  const response = await apiClient.post("/api/users/wallet/initiate-fund", {
    amount,
    payCurrency,
  });
  console.log("Initiate Fund:", response.data);
  return response.data;
};

// ──────────────────────── Transfer ────────────────────────
export const transferFunds = async ({ toUserId, amount }) => {
  try {
    const response = await apiClient.post("/api/users/transfer", {
      toUserId,
      amount,
    });
    console.log("Transfer API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Transfer API error:", error.response?.data || error.message);
    throw error;
  }
};

// ──────────────────────── Withdraw ────────────────────────
export const withdrawal = (payload) =>
  apiClient.post("/api/users/withdrawal", payload);


// utils/paymentStatus.js


export async function checkPaymentStatus(paymentId, token) {
  if (!paymentId || !token) return null;
  try {
    const res = await apiClient.get(`/api/users/wallet/check-status/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Payment status check failed:", err);
    return null;
  }
}


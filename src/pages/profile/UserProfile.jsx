// src/components/profile/UserProfile.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Save,
  X,
  Trophy,
  Users,
  DollarSign,
  Wallet,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { getUserProfile } from "../../api/authApi";
import { apiClient } from "../../api/apiClient";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await getUserProfile(token);
        console.log("User Profile Data:", data);
        setUser(data);
        setName(data.name || "");
      } catch (err) {
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Auto-focus + scroll into view when editing starts
  useEffect(() => {
    if (editing && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }
  }, [editing]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("authToken") || localStorage.getItem("token");

      const res = await apiClient.put(
        "/api/users/profile",
        { name: name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setMessage("Name updated successfully!");
      setEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to update name");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00A991]" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center py-20 text-red-600">Failed to load profile</div>;
  }

  const totalBalance = Object.values(user.wallets || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 py-8 px-4 pb-32 md:pb-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Success / Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-6 py-4 rounded-2xl text-center font-medium border ${
              message.includes("success")
                ? "bg-green-100 dark:bg-green-900/30 border-green-300 text-green-800"
                : "bg-red-100 dark:bg-red-900/30 border-red-300 text-red-800"
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-6 md:p-10 text-white">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-10">

              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-5xl md:text-7xl font-bold border-4 border-white/40">
                  {user.name?.[0] || "U"}
                </div>
              </div>

              {/* Name + Edit Section */}
              <div className="flex-1 text-center md:text-left space-y-4">
                {editing ? (
                  <div className="space-y-4">
                    {/* Mobile-friendly full-width input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-5 text-3xl md:text-5xl font-extrabold bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                      placeholder="Enter your name"
                      autoFocus
                    />

                    {/* Action Buttons - Full width on mobile */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleSave}
                        disabled={saving || !name.trim()}
                        className="flex-1 py-4 bg-white/30 hover:bg-white/40 disabled:opacity-60 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3"
                      >
                        {saving ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Save className="w-6 h-6" />
                        )}
                        Save Name
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setName(user.name);
                        }}
                        className="flex-1 py-4 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3"
                      >
                        <X className="w-6 h-6" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl md:text-6xl font-extrabold flex items-center justify-center md:justify-start gap-4 flex-wrap">
                      <span>{user.name}</span>
                      <button
                        onClick={() => setEditing(true)}
                        className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition"
                      >
                        <Edit2 className="w-6 h-6 md:w-8 md:h-8" />
                      </button>
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 mt-3 break-all">{user.email}</p>
                  </div>
                )}
              </div>

              {/* Rank Badge */}
              <div className="text-center md:text-right">
                <div className="flex items-center gap-3 justify-center md:justify-end mb-2">
                  <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400" />
                  <span className="text-3xl md:text-5xl font-bold capitalize">
                    {user.rank || "Member"}
                  </span>
                </div>
                <p className="text-base md:text-lg opacity-90">Current Rank</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-[#00A991]/10 to-emerald-100 dark:from-[#00A991]/20 rounded-2xl p-5 md:p-6 border border-[#00A991]/20 text-center">
              <DollarSign className="w-10 h-10 md:w-12 md:h-12 text-[#00A991] mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold">${totalBalance.toLocaleString()}</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 rounded-2xl p-5 md:p-6 border border-purple-300 dark:border-purple-800 text-center">
              <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold">{user.pvp || 0}</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">PVP Points</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 rounded-2xl p-5 md:p-6 border border-amber-300 dark:border-amber-800 text-center">
              <Wallet className="w-10 h-10 md:w-12 md:h-12 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold">${(user.pgv || 0).toLocaleString()}</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">PGV Volume</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 rounded-2xl p-5 md:p-6 border border-green-300 dark:border-green-800 text-center">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-green-600 mx-auto mb-2" />
              <p className="text-2xl md:text-3xl font-bold">{user.referrals || 0}</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Referrals</p>
            </div>
          </div>
        </motion.div>

        {/* Wallet Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-[#00A991]" />
            Wallet Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {user.wallets &&
              Object.entries(user.wallets).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-neutral-700/50 rounded-2xl p-5 md:p-6 text-center border border-gray-200 dark:border-neutral-600"
                >
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()} Wallet
                  </p>
                  <p className="text-2xl md:text-3xl font-extrabold text-[#00A991] mt-3">
                    ${Number(value || 0).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;
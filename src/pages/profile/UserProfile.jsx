// src/components/profile/UserProfile.jsx
import React, { useState, useEffect } from "react";
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
  Shield,
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("authToken") || localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const data = await getUserProfile(token);
        console.log("User Profile Data:", data); // As you requested
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

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");

      const res = await apiClient.put(
        "/api/users/profile",
        { name: name.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(res.data.user);
      setMessage("Profile updated successfully!");
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
    return (
      <div className="text-center py-20 text-red-600">Failed to load profile</div>
    );
  }

  const totalBalance = Object.values(user.wallets || {}).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Success / Error Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-6 py-4 rounded-2xl text-center font-medium border ${
              message.includes("success")
                ? "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300"
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
          <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white/40">
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  {editing ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-5 py-4 text-4xl font-bold bg-white/20 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-4 focus:ring-white/50"
                        placeholder="Your Name"
                      />
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="p-4 bg-white/30 hover:bg-white/40 rounded-xl transition"
                      >
                        {saving ? (
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Save className="h-7 w-7" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setEditing(false);
                          setName(user.name);
                        }}
                        className="p-4 bg-white/30 hover:bg-white/40 rounded-xl transition"
                      >
                        <X className="h-7 w-7" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-4">
                        {user.name}
                        <button
                          onClick={() => setEditing(true)}
                          className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                        >
                          <Edit2 className="h-6 w-6" />
                        </button>
                      </h1>
                      <p className="text-xl opacity-90 mt-2">{user.email}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="flex items-center gap-4 justify-center md:justify-end mb-3">
                  <Trophy className="h-12 w-12 text-yellow-400" />
                  <span className="text-4xl font-bold capitalize">
                    {user.rank || "Member"}
                  </span>
                </div>
                <p className="text-lg opacity-90">Current Rank</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#00A991]/10 to-emerald-100 dark:from-[#00A991]/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-[#00A991]/20 text-center">
              <DollarSign className="h-12 w-12 text-[#00A991] mx-auto mb-3" />
              <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-300 dark:border-purple-800 text-center">
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">{user.pvp || 0}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">PVP Points</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-300 dark:border-amber-800 text-center">
              <Wallet className="h-12 w-12 text-amber-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">${(user.pgv || 0).toLocaleString()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">PGV Volume</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/20 rounded-2xl p-6 border border-green-300 dark:border-green-800 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold">{user.referrals || 0}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Direct Referrals</p>
            </div>
          </div>
        </motion.div>

        {/* Wallet Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Wallet className="h-8 w-8 text-[#00A991]" />
            Wallet Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {user.wallets &&
              Object.entries(user.wallets).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-neutral-700/50 rounded-2xl p-6 text-center border border-gray-200 dark:border-neutral-600"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()} Wallet
                  </p>
                  <p className="text-3xl font-extrabold text-[#00A991] mt-3">
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
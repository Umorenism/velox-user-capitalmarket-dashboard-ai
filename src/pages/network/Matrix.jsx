



import React, { useEffect, useState } from "react";
import { QrCode, Copy, Check, CheckCircle, Users, TrendingUp, Award, Moon, Sun } from "lucide-react";
import QRCode from "qrcode";
import { getUserProfile } from "../../api/authApi";

const Matrix = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ─────── THEME SETUP ───────
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    // Regenerate QR code with correct colors
    generateQRCode(profile?.referralCode, newMode);
  };

  // ─────── FETCH USER PROFILE & GENERATE QR ───────
  const generateQRCode = async (code, isDark) => {
    if (!code) return;
    try {
      const qr = await QRCode.toDataURL(
        `https://veloxcapital.com/ref/${code}`,
        {
          width: 180,
          margin: 2,
          color: {
            dark: isDark ? "#ffffff" : "#00A991",
            light: isDark ? "#1a1a1a" : "#ffffff",
          },
        }
      );
      setQrUrl(qr);
    } catch (err) {
      console.error("QR generation failed:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const data = await getUserProfile(token);
        setProfile(data);

        // Generate QR with current theme
        generateQRCode(data.referralCode, darkMode);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Regenerate QR when theme changes
  useEffect(() => {
    if (profile?.referralCode) {
      generateQRCode(profile.referralCode, darkMode);
    }
  }, [darkMode, profile?.referralCode]);

  const copyReferralLink = () => {
    if (profile?.referralCode) {
      const link = `https://veloxcapital.com/ref/${profile.referralCode}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shortUserId = (id) => (id ? `${id.slice(0, 6)}...${id.slice(-4)}` : "—");

  // ─────── EXTRACT DATA ───────
  const matrix = profile?.matrix || {};
  const position = matrix?.position || "—";
  const parent = matrix?.parent || "—";
  const matrixBonus = profile?.bonusBreakdown?.matrix_bonus || 0;
  const totalDownline = profile?.totalDownline || 0;
  const walletBalance = profile?.walletBalance || 0;
  const activePackage = profile?.activePackage?.name || "—";
  const rank = profile?.rank || "—";
  const referralCode = profile?.referralCode || "";
  const referralLink = `https://veloxcapital.com/ref/${referralCode}`;

  const positionPath = position !== "—" ? position.split("-").map(Number) : [];

  // ─────── LOADING STATE ───────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center p-6 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#00A991]" />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading Matrix Dashboard…
          </span>
        </div>
      </div>
    );
  }

  // ─────── MAIN UI ───────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-4 md:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header + Theme Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Velox Capital <span className="text-[#00A991]">Matrix Dashboard</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your position, team, and matrix earnings
            </p>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200 group"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 group-hover:rotate-12 transition-transform" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
          {/* LEFT PANEL: User Info */}
          <div className="space-y-5">
            {/* My Matrix Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#00A991]">My Matrix</h3>
                <Award className="h-6 w-6 text-amber-500" />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Rank</span>
                  <span className="text-lg font-bold capitalize text-gray-900 dark:text-white">
                    {rank}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">User ID</span>
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                    {shortUserId(profile?.userId)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Wallet Balance</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${walletBalance.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active Package</span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {activePackage}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Downline</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {totalDownline}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Matrix Position</span>
                  <span className="font-mono text-lg text-[#00A991]">{position}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Upline (Parent)</span>
                  <span className="text-base font-medium text-gray-900 dark:text-gray-200">
                    {parent}
                  </span>
                </div>
              </div>

              {/* Matrix Bonus */}
              <div className="mt-6 p-4 bg-gradient-to-r from-[#00A991]/10 to-[#10B981]/10 dark:from-[#00A991]/20 dark:to-[#10B981]/20 rounded-xl border border-[#00A991]/20 dark:border-[#00A991]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Matrix Bonus Earned</p>
                    <p className="text-2xl font-bold text-[#00A991]">${matrixBonus.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[#00A991]" />
                </div>
              </div>
            </div>

            {/* Referral Link */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Referral Link
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg text-sm bg-gray-50 dark:bg-neutral-700 font-mono text-xs text-gray-700 dark:text-gray-300"
                />
                <button
                  onClick={copyReferralLink}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 ${
                    copied
                      ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                      : "bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={16} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* QR Code */}
              <div className="mt-5 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scan to Join</p>
                <div className="inline-block p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700">
                  {qrUrl ? (
                    <img src={qrUrl} alt="Referral QR" className="w-40 h-40" />
                  ) : (
                    <div className="w-40 h-40 bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* KYC Status */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Account Status
              </h3>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">KYC Verified</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Full access enabled</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Matrix Tree */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6 border border-gray-200 dark:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Matrix Structure</h2>
              <Users className="h-6 w-6 text-[#00A991]" />
            </div>

            {/* Matrix Path Visualization */}
            <div className="mb-6 p-5 bg-gradient-to-r from-[#00A991]/5 to-[#10B981]/5 dark:from-[#00A991]/10 dark:to-[#10B981]/10 rounded-xl border border-[#00A991]/20 dark:border-[#00A991]/30">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Your Position Path</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {positionPath.length > 0 ? (
                  positionPath.map((level, i) => (
                    <React.Fragment key={i}>
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all ${
                          i === positionPath.length - 1
                            ? "bg-[#00A991] ring-4 ring-[#00A991]/30 scale-110"
                            : "bg-[#10B981]"
                        }`}
                      >
                        {level}
                      </div>
                      {i < positionPath.length - 1 && (
                        <div className="w-16 h-1 bg-gradient-to-r from-[#00A991] to-[#10B981]" />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No matrix position</p>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Upline:</span> <strong>{parent}</strong>
                </p>
              </div>
            </div>

            {/* Matrix Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Matrix Level</p>
                <p className="text-2xl font-bold text-[#00A991]">
                  {positionPath.length > 0 ? positionPath.length : 0}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Team Size</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDownline}</p>
              </div>
            </div>

            {/* Placeholder for Full Matrix Tree */}
            <div className="border-2 border-dashed border-gray-200 dark:border-neutral-700 rounded-xl p-8 text-center">
              <Users className="w-12 h-12 text-gray-300 dark:text-neutral-600 mx-auto mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Full matrix tree visualization coming soon
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                View all your downline members in a 3xN structure
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Velox Capital © 2025 | Matrix Engine v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default Matrix;
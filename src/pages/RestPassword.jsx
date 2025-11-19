import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { resetPassword, resendVerificationEmail } from "../api/authApi";

/* -------------------------------------------------------------
   1. Background Media
   ------------------------------------------------------------- */
import bg1 from "../assets/veloximg3.jpeg";
import bg2 from "../assets/veloxvid2.mp4";
import bg3 from "../assets/veloximg2.jpeg";
import bg4 from "../assets/veloxvid2.mp4";

const backgroundMedia = [
  { type: "image", src: bg1 },
  { type: "video", src: bg2 },
  { type: "image", src: bg3 },
  { type: "video", src: bg4 },
];

/* -------------------------------------------------------------
   2. BackgroundSwitcher
   ------------------------------------------------------------- */
function BackgroundSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundMedia.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = backgroundMedia[index];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {current.type === "image" ? (
        <img
          src={current.src}
          alt=""
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
      ) : (
        <video
          src={current.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
      )}
      <div className="absolute inset-0 bg-[#07112b]/70" />
    </div>
  );
}

/* -------------------------------------------------------------
   3. ResetPassword Component
   ------------------------------------------------------------- */
export default function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-fill email
  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (pendingEmail) setEmail(pendingEmail);
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        localStorage.removeItem("pendingEmail");
        navigate("/login", { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);

  // Password strength check
  const isStrongPassword = (pwd) => {
    return pwd.length >= 8 && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !code || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setMessage("Password must be 8+ chars with a number and special character.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        code: code.trim(),
        newPassword: newPassword,
      };

      const response = await resetPassword(payload);
      console.log("Reset success:", response);

      setMessage("Password reset successfully! Redirecting to login...");
      setIsSuccess(true);
    } catch (error) {
      console.error("Reset failed:", error);
      const errMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || resending || cooldown > 0) return;

    setResending(true);
    setMessage("");

    try {
      await resendVerificationEmail({ email: email.trim() });
      setMessage("Verification code sent again!");
      setCooldown(30);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07112b] text-white relative overflow-hidden p-4">
      <BackgroundSwitcher />

      <div className="max-w-md w-full bg-[#0a1a3a]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#1f315c] text-white z-10">
        <h2 className="text-2xl font-bold text-center text-[#e3b874] mb-3 tracking-wide">
          Reset Password
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Enter the code and set a new secure password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email (readonly if from storage) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            analizando</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-3 py-2 bg-[#091631]/70 border border-[#1f315c] rounded-md text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Verification Code */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              maxLength={6}
              placeholder="123456"
              className="w-full px-3 py-2 bg-[#091631] border border-[#1f315c] rounded-md focus:ring-2 focus:ring-[#e3b874] outline-none text-center font-mono text-lg tracking-widest"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 bg-[#091631] border border-[#1f315c] rounded-md focus:ring-2 focus:ring-[#e3b874] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-gray-400 hover:text-[#e3b874]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3 py-2 pr-10 bg-[#091631] border border-[#1f315c] rounded-md focus:ring-2 focus:ring-[#e3b874] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-2.5 text-gray-400 hover:text-[#e3b874]"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isSuccess}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-b from-[#e3b874] to-[#c19a4a] text-[#091631] py-2 rounded-md font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Updating...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={18} /> Redirecting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resending || cooldown > 0 || !email}
            className="text-[#e3b874] text-sm font-medium flex items-center justify-center mx-auto gap-1 hover:underline disabled:opacity-40"
          >
            <RefreshCcw size={14} />
            {resending
              ? "Sending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Code"}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-5 p-3 rounded-lg text-center text-sm font-medium border ${
              message.includes("success") || message.includes("Redirecting")
                ? "bg-green-900/50 text-green-300 border-green-500/40"
                : "bg-red-900/50 text-red-300 border-red-500/40"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../api/authApi";

/* -------------------------------------------------------------
   1. Import media files (place in src/assets/backgrounds/)
   ------------------------------------------------------------- */
import bg1 from "../assets/veloximg2.jpeg";
import bg2 from "../assets/veloxvid1.mp4";
import bg3 from "../assets/veloximg2.jpeg";
import bg4 from "../assets/veloxvid2.mp4";
import bg5 from "../assets/veloximg6.jpeg";
import bg6 from "../assets/veloximg7.jpeg";

const backgroundMedia = [
  { type: "image", src: bg1 },
  { type: "video", src: bg2 },
  { type: "image", src: bg3 },
  { type: "video", src: bg4 },
  { type: "image", src: bg5 },
  { type: "image", src: bg6 },
];

/* -------------------------------------------------------------
   2. BackgroundSwitcher Component
   ------------------------------------------------------------- */
function BackgroundSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundMedia.length);
    }, 8000); // Change every 8 seconds

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
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-[#07112b]/20" />
    </div>
  );
}

/* -------------------------------------------------------------
   3. ForgetPassword Component
   ------------------------------------------------------------- */
export default function ForgetPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.email.trim()) {
      setError("Email is required!");
      return;
    }

    setLoading(true);

    const payload = {
      email: form.email.trim(),
    };

    try {
      const res = await forgetPassword(payload);
      console.log("Forget password success:", res);

      localStorage.setItem("pendingEmail", form.email.trim());

      setTimeout(() => {
        navigate("/reset-password");
      }, 800);
    } catch (err) {
      console.error("Forget password failed:", err);
      setError(
        err.response?.data?.message || "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07112b] text-white relative overflow-hidden p-4">
      {/* Rotating Background */}
      <BackgroundSwitcher />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-16 lg:px-24 gap-10">
        {/* LEFT SIDE - Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-3xl font-semibold text-gray-100 mb-4">
            Forget Password
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            Start your journey to{" "}
            <span className="text-[#e3b874]">financial success.</span>
          </h2>
        </motion.div>

        {/* RIGHT SIDE - Form Box */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#00b4A1]/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-[#1f315c]"
        >
          <h2 className="text-2xl font-bold text-[#e3b874] mb-2 text-center">
            Reset Password
          </h2>
          <p className="text-center text-sm text-gray-400 mb-6">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] text-white placeholder-gray-500 focus:ring-2 focus:ring-[#e3b874] focus:outline-none transition"
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-b from-[#e3b874] to-[#c19a4a] text-[#091631] font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            <div className="text-center text-sm text-gray-400 mt-4">
              Remember your password?{" "}
              <a href="/login" className="text-[#e3b874] hover:underline">
                Login
              </a>
            </div>
          </form>

          <div className="text-center text-xs text-gray-400 mt-6">
            Need Help?{" "}
            <a
              href="mailto:contact@veloxcapital.com"
              className="text-[#e3b874] hover:underline"
            >
              contact@veloxcapitalmarket.ai
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
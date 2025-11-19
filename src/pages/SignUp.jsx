import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api/authApi";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { User, Mail, Lock, UserCircle, UserPlus, Gift } from "lucide-react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import bg1 from "../assets/veloximg2.jpeg";
import bg2 from "../assets/veloxvid1.mp4";
import bg3 from "../assets/veloximg6.jpeg";
import bg4 from "../assets/veloxvid2.mp4";
import bg5 from "../assets/veloximg7.jpeg";

const backgroundMedia = [
  { type: "image", src: bg1 },
  { type: "video", src: bg2 },
  { type: "image", src: bg3 },
  { type: "video", src: bg4 },
  { type: "image", src: bg5 },
];

// ─── Background Switcher ───────────────────
function BackgroundSwitcher() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % backgroundMedia.length),
      8000
    );
    return () => clearInterval(interval);
  }, []);
  const current = backgroundMedia[index];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {current.type === "image" ? (
        <img src={current.src} alt="" className="w-full h-full object-cover" />
      ) : (
        <video
          src={current.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[#07112b]/50" />
    </div>
  );
}

// ─── Animated Input ────────────────────────
function AnimatedInput({ icon: Icon, type = "text", index = 0, ...props }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: focused ? 1.15 : 1,
          color: focused ? "#e3b874" : "#9ca3af",
        }}
        className="absolute left-3 top-2.5 z-10"
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <motion.input
        type={type}
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full pl-10 pr-3 py-2.5 rounded-md bg-transparent border border-[#243a6e]
                   focus:ring-2 focus:ring-[#e3b874] outline-none text-white placeholder-gray-400
                   transition-all duration-200"
        whileFocus={{ scale: 1.02 }}
      />
    </motion.div>
  );
}

// ─── Password Input ───────────────────────
function AnimatedPassword({ value, onChange, placeholder, name, index }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        animate={{
          scale: focused ? 1.15 : 1,
          color: focused ? "#e3b874" : "#9ca3af",
        }}
        className="absolute left-3 top-2.5 z-10"
      >
        <Lock className="h-5 w-5" />
      </motion.div>
      <motion.input
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        whileFocus={{ scale: 1.02 }}
        className="w-full pl-10 pr-10 py-2.5 rounded-md bg-transparent border border-[#243a6e]
                   focus:ring-2 focus:ring-[#e3b874] outline-none text-white placeholder-gray-400"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-2.5 text-gray-400 hover:text-[#e3b874]"
      >
        {show ? (
          <EyeSlashIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </motion.div>
  );
}

// ─── Signup ───────────────────────────────
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    ref: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phone: value || "" }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const required = [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phone",
    "password",
    "confirmPassword",
  ];
  for (const field of required) {
    if (!form[field].trim()) {
      setError(
        `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}.`
      );
      return;
    }
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  setLoading(true);

  // Auto-set referral to "admin" if empty or only whitespace
  const referralCode = form.ref.trim() || "admin";

  const payload = {
    email: form.email.trim(),
    password: form.password,
    userName: form.userName.trim(),
    phone: form.phone.trim(),
    name: `${form.firstName.trim()} ${form.middleName.trim()} ${form.lastName.trim()}`.trim(),
    ref: referralCode, // Always send a ref — defaults to "admin"
  };

  try {
    const res = await signUpUser(payload);
    if (res?.user || res?.message) {
      localStorage.setItem("pendingEmail", form.email);
      navigate("/verify-email");
    } else {
      throw new Error("Unexpected server response");
    }
  } catch (err) {
    console.error("Signup failed:", err);
    setError(
      err.response?.data?.message || "Signup failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07112b] text-white relative overflow-hidden p-4">
      <BackgroundSwitcher />

      <motion.div
        className="relative z-10 w-full max-w-md bg-[#0e1f45]/70 border border-[#1f315c]/50 rounded-xl shadow-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#e3b874] text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Join our platform and explore next-level opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <AnimatedInput
              icon={UserCircle}
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              index={0}
            />
            <AnimatedInput
              icon={UserPlus}
              name="middleName"
              placeholder="Middle Name (Optional)"
              value={form.middleName}
              onChange={handleChange}
              index={1}
            />
          </div>

          <AnimatedInput
            icon={User}
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            index={2}
          />

          <AnimatedInput
            icon={User}
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            required
            index={3}
          />

          <AnimatedInput
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            index={4}
          />

          {/* Fixed Phone Input */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative rounded-md border border-[#243a6e] px-3 py-2"
          >
            <PhoneInput
              international
              defaultCountry="NG"
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handlePhoneChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full text-white bg-transparent border-none outline-none placeholder-gray-400"
            />
          </motion.div> */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative rounded-md border border-[#243a6e] px-3 py-2"
          >
            <PhoneInput
              international
              defaultCountry="NG"
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handlePhoneChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full text-black bg-transparent border-none outline-none placeholder-gray-500"
            />
          </motion.div>

          <AnimatedPassword
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            index={6}
          />

          <AnimatedPassword
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            index={7}
          />

          <AnimatedInput
            icon={Gift}
            name="ref"
            placeholder="Referral Code (Optional)"
            value={form.ref}
            onChange={handleChange}
            index={8}
          />

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-2.5 bg-gradient-to-b from-[#e3b874] to-[#c19a4a] 
                       text-[#091631] font-semibold rounded-md hover:opacity-90 
                       transition disabled:opacity-50 shadow-md"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>

          <div className="text-center text-sm text-gray-400 mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-[#e3b874] hover:underline">
              Login
            </a>
          </div>
        </form>

        <div className="text-center text-xs text-gray-400 mt-6">
          Need Help?{" "}
          <a
            href="mailto:contact@veloxcapitalmarket.ai"
            className="text-[#e3b874] hover:underline"
          >
            contact@veloxcapitalmarket.ai
          </a>
        </div>
      </motion.div>
    </div>
  );
}

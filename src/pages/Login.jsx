
// // src/pages/Login.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { User, Lock, Eye, EyeOff, X } from "lucide-react";
// import ReactCountryFlag from "react-country-flag";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logovelox.svg";
// import { useUser } from "../routes/UserContext";
// import { useUserRole } from "../routes/UserRoleContext";
// import PackageSelection from "../utlis/PackageSelection";
// import { getUserProfile } from "../api/authApi";
// import { clearAuthData } from "../api/authApi";

// /* Background assets */
// import bg1 from "../assets/veloximg2.jpeg";
// import bg2 from "../assets/veloxvid1.mp4";
// import bg3 from "../assets/veloximg2.jpeg";
// import bg4 from "../assets/veloxvid2.mp4";
// import bg5 from "../assets/veloximg6.jpeg";
// import bg6 from "../assets/veloximg7.jpeg";
// import { markLogin } from "../main";

// const backgroundMedia = [
//   { type: "image", src: bg1 },
//   { type: "video", src: bg2 },
//   { type: "image", src: bg3 },
//   { type: "video", src: bg4 },
//   { type: "image", src: bg5 },
//   { type: "image", src: bg6 },
// ];

// /* Background Switcher */
// function BackgroundSwitcher() {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((i) => (i + 1) % backgroundMedia.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);
//   const current = backgroundMedia[index];

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {current.type === "image" ? (
//         <img src={current.src} alt="" className="w-full h-full object-cover" />
//       ) : (
//         <video
//           src={current.src}
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="w-full h-full object-cover"
//         />
//       )}
//       <div className="absolute inset-0 bg-[#07112b]/20" />
//     </div>
//   );
// }

// /* Captcha Generator */
// const generateCaptcha = () => {
//   const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let result = "";
//   for (let i = 0; i < 5; i++) {
//     result += pool[Math.floor(Math.random() * pool.length)];
//   }
//   return result;
// };

// /* -----------------------------
//    MAIN LOGIN COMPONENT
// ----------------------------- */
// export default function Login() {
//   const navigate = useNavigate();
//   const { login, fetchUserState, setUser } = useUser();
//   const { setRole, clearRole } = useUserRole();

//   const [form, setForm] = useState({
//     prefix: "velox",
//     email: "",
//     password: "",
//     captcha: "",
//   });
//   const [captchaText, setCaptchaText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState("US");
//   const [showPackageModal, setShowPackageModal] = useState(false);

//   /* -----------------------------
//      1. FAST REDIRECT ON PAGE LOAD (token + role in localStorage)
//   ----------------------------- */
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("userRole");

//     if (token && savedRole && ["trading", "academy"].includes(savedRole)) {
//       const routes = {
//         trading: "/dashboard",
//         academy: "/academy/courses",
//       };
//       navigate(routes[savedRole], { replace: true });
//     }
//   }, [navigate]);

//   /* -----------------------------
//      2. Generate Captcha
//   ----------------------------- */
//   useEffect(() => {
//     setCaptchaText(generateCaptcha());
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({
//       ...f,
//       [name]: name === "captcha" ? value.toUpperCase().slice(0, 5) : value,
//     }));
//   };

//   const resetCaptcha = () => {
//     setCaptchaText(generateCaptcha());
//     setForm((f) => ({ ...f, captcha: "" }));
//   };

//   /* -----------------------------
//      3. REDIRECT BASED ON ROLE (userState)
//   ----------------------------- */
//   const redirectBasedOnRole = (role) => {
//     const routes = {
//       trading: "/dashboard",
//       academy: "/academy/courses",
//     };
//     navigate(routes[role] || "/dashboard", { replace: true });
//   };

//   /* -----------------------------
//      4. HANDLE LOGIN SUBMIT
//   ----------------------------- */
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setLoading(true);
//   setShowPackageModal(false);

//   try {
//     // ───── 1. Form validation ─────
//     if (!form.email || !form.password || !form.captcha)
//       throw new Error("All fields required!");
//     if (form.prefix.trim().toLowerCase() !== "velox")
//       throw new Error("Invalid prefix!");
//     if (form.captcha !== captchaText) throw new Error("Invalid captcha!");

//     // ───── 2. Login ─────
//     const loginRes = await login({
//       prefix: form.prefix,
//       email: form.email,
//       password: form.password,
//     });
//     if (!loginRes?.token) throw new Error("Login failed");

//     // ───── 3. Token is now in localStorage → fetch FULL profile ─────
//     const profile = await getUserProfile(loginRes.token);   // ← NEW
//     const backendUserState = (profile?.userState || "").trim();

//     // ───── 4. Persist user object ─────
//     setUser(profile);
//     localStorage.setItem("user", JSON.stringify(profile));

//     // TRIGGER REFRESH IN ALL OTHER TABS
//     // markLogin();
//     markLogin(profile.email);

//     // ───── 5. RETURN USER WITH ROLE → restore & redirect ─────
//     if (backendUserState && ["trading", "academy"].includes(backendUserState)) {
//       setRole(backendUserState);
//       localStorage.setItem("userRole", backendUserState);
//       redirectBasedOnRole(backendUserState);
//       return;                         // ← STOP – no modal
//     }

//     // ───── 6. NEW USER → clear stale role & show modal ─────
//     // clearRole();   
//     //                   // ← ONLY for new users
//     setShowPackageModal(true);
//     clearAuthData();

//   } catch (err) {
//     console.error("Login error:", err);
//     setError(err.message || "Login failed. Please try again.");
//     resetCaptcha();
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-[#07112b] text-white relative overflow-hidden">
//       <BackgroundSwitcher />

//       {/* Header */}
//       <header className="absolute top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 md:px-16 py-3 z-20">
//         {/* <img src={logo} alt="Velox Logo" className="w-12 sm:w-14 md:w-20 object-contain" /> */}
//         {/* <div className="flex items-center gap-2 sm:gap-3">
//           <ReactCountryFlag
//             countryCode={selectedCountry}
//             svg
//             style={{
//               width: "1.5em",
//               height: "1.5em",
//               borderRadius: "50%",
//               boxShadow: "0 0 4px rgba(0,0,0,0.3)",
//             }}
//           />
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="bg-transparent text-white text-xs sm:text-sm font-medium border border-[#e3b874]/40 rounded-md px-2 sm:px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#e3b874]"
//           >
//             <option value="US">US</option>
//             <option value="GB">UK</option>
//             <option value="NG">NG</option>
//             <option value="AE">UAE</option>
//             <option value="IN">IN</option>
//           </select>
//         </div> */}
//       </header>

//       {/* Login Form */}
//       <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-16 lg:px-24 mt-20">
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="w-full md:w-1/2 mb-10 md:mb-0"
//         >
//           <h1 className="text-3xl font-semibold text-gray-100 mb-4">Secure Client Area</h1>
//           <h2 className="text-4xl md:text-5xl font-bold text-white leading-snug">
//             Designed in pursuit of{" "}
//             <span className="text-[#e3b874]">higher performance.</span>
//           </h2>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="bg-[#00b4A1]/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-[#1f315c]"
//         >
//           <h2 className="text-2xl font-bold text-[#e3b874] mb-2 text-center">Welcome!</h2>
//           <p className="text-center text-sm text-gray-400 mb-6">
//             By logging in, you agree to the{" "}
//             <span className="text-[#e3b874] cursor-pointer hover:underline">Terms & Conditions</span>.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="flex space-x-2">
//               <div className="relative w-1/3">
//                 <User className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   name="prefix"
//                   placeholder="Prefix"
//                   value={form.prefix}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-9 pr-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
//                 />
//               </div>
//               <div className="relative w-2/3">
//                 <User className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full pl-9 pr-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
//                 />
//               </div>
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full pl-9 pr-9 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-[#e3b874]"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             <div className="flex w-full items-center space-x-3">
//               <div className="bg-[#091631] text-[#e3b874]  md:px-4 py-2 rounded-md font-bold select-none tracking-widest text-sm md:text-lg">
//                 {captchaText}
//               </div>
//               <input
//                 type="text"
//                 name="captcha"
//                 placeholder="Enter 5 chars"
//                 value={form.captcha}
//                 onChange={handleChange}
//                 required
//                 maxLength={5}
//                 className="flex-1 px-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none font-mono"
//                 style={{ letterSpacing: "0.2em" }}
//               />
//             </div>

//             {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2 bg-gradient-to-b from-[#e3b874] to-[#c19a4a] text-[#091631] font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>

//             <div className="text-center text-sm text-gray-400 mt-2">
//               <a href="/signup" className="hover:underline text-[#e3b874]">
//                <span className="hover:none text-[#ffff]"> Don't have an account?</span> Signup
//               </a>
//             </div>
//             <div className="text-center text-sm text-[#e3b874]">
//               <a href="/forget-password" className="underline">Forgot password</a>
//             </div>
//           </form>

//           <div className="text-center text-xs text-gray-400 mt-6">
//             Need Login Assistance?{" "}
//             <a href="mailto:contact@veloxcapital.com" className="text-[#e3b874] hover:underline">
//               contact@veloxcapitalmarket.ai
//             </a>
//           </div>
//         </motion.div>
//       </div>

//       {/* PACKAGE SELECTION MODAL */}
//       <AnimatePresence>
//         {showPackageModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="relative w-full max-w-4xl"
//             >
//               <button
//                 onClick={() => !loading && setShowPackageModal(false)}
//                 disabled={loading}
//                 className="absolute -top-12 right-0 bg-[#e3b874] text-[#091631] rounded-full p-2 shadow-lg hover:bg-[#f2cd83] transition disabled:opacity-50 z-10"
//               >
//                 <X size={18} />
//               </button>

//               <PackageSelection onClose={() => setShowPackageModal(false)} />
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }







// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Eye, EyeOff, X } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logovelox.svg";
import { useUser } from "../routes/UserContext";
import { useUserRole } from "../routes/UserRoleContext";
import PackageSelection from "../utlis/PackageSelection";
import { getUserProfile } from "../api/authApi";
import { clearAuthData } from "../api/authApi";
import { markLogin } from "../main";

/* Background assets */
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

/* Background Switcher */
function BackgroundSwitcher() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % backgroundMedia.length);
    }, 8000);
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
      <div className="absolute inset-0 bg-[#07112b]/20" />
    </div>
  );
}

/* Captcha Generator */
const generateCaptcha = () => {
  const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }
  return result;
};

/* -----------------------------
   FULL-SCREEN LOGIN LOADER WITH LIVE INFO
----------------------------- */
const LoginLoader = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Africa/Lagos",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const timeStr = now.toLocaleTimeString("en-US", options).replace(" AM", " AM").replace(" PM", " PM");
      const dateStr = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Africa/Lagos",
      });
      setCurrentTime(`${dateStr} ${timeStr} WAT`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07112b]/95 backdrop-blur-md"
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <img src={logo} alt="Velox" className="w-24 h-24 object-contain drop-shadow-lg" />
      </motion.div>

      {/* Animated Spinner */}
      <motion.div
        className="relative w-16 h-16 mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#e3b874] border-r-[#c19a4a] shadow-lg"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#e3b874] border-l-[#c19a4a] animate-pulse"></div>
      </motion.div>

      {/* Live Time + Country */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 text-sm font-medium text-[#e3b874] tracking-wider"
      >
        {/* <ReactCountryFlag
          countryCode="NG"
          svg
          style={{ width: "1.2em", height: "1.2em", borderRadius: "50%" }}
        /> */}
        <span>{currentTime}</span>
      </motion.div>

      {/* Securing Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-lg font-medium text-[#e3b874] tracking-wider"
      >
        Securing your session...
      </motion.p>

      {/* Dots */}
      <motion.div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-[#e3b874] rounded-full"
            animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

/* -----------------------------
   MAIN LOGIN COMPONENT
----------------------------- */
export default function Login() {
  const navigate = useNavigate();
  const { login, setUser } = useUser();
  const { setRole } = useUserRole();

  const [form, setForm] = useState({
    prefix: "velox",
    email: "",
    password: "",
    captcha: "",
  });
  const [captchaText, setCaptchaText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);

  /* -----------------------------
     1. FAST REDIRECT ON PAGE LOAD
  ----------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("userRole");

    if (token && savedRole && ["trading", "academy"].includes(savedRole)) {
      const routes = {
        trading: "/dashboard",
        academy: "/academy/courses",
      };
      navigate(routes[savedRole], { replace: true });
    }
  }, [navigate]);

  /* -----------------------------
     2. Generate Captcha
  ----------------------------- */
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "captcha" ? value.toUpperCase().slice(0, 5) : value,
    }));
  };

  const resetCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setForm((f) => ({ ...f, captcha: "" }));
  };

  /* -----------------------------
     3. REDIRECT BASED ON ROLE
  ----------------------------- */
  const redirectBasedOnRole = (role) => {
    const routes = {
      trading: "/dashboard",
      academy: "/academy/courses",
    };
    navigate(routes[role] || "/dashboard", { replace: true });
  };

  /* -----------------------------
     4. HANDLE LOGIN SUBMIT
  ----------------------------- */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   setShowPackageModal(false);

  //   try {
  //     // ───── 1. Form validation ─────
  //     if (!form.email || !form.password || !form.captcha)
  //       throw new Error("All fields are required!");
  //     if (form.prefix.trim().toLowerCase() !== "velox")
  //       throw new Error("Invalid prefix!");
  //     if (form.captcha !== captchaText) throw new Error("Invalid captcha!");

  //     // ───── 2. Login ─────
  //     const loginRes = await login({
  //       prefix: form.prefix,
  //       email: form.email,
  //       password: form.password,
  //     });
  //     if (!loginRes?.token) throw new Error("Login failed");

  //     // ───── 3. Fetch profile ─────
  //     const profile = await getUserProfile(loginRes.token);
  //     const backendUserState = (profile?.userState || "").trim();

  //     // ───── 4. Persist user ─────
  //     setUser(profile);
  //     localStorage.setItem("user", JSON.stringify(profile));

  //     // ───── 5. Trigger refresh in other tabs ─────
  //     markLogin(profile.email);

  //     // ───── 6. Role handling ─────
  //     if (backendUserState && ["trading", "academy"].includes(backendUserState)) {
  //       setRole(backendUserState);
  //       localStorage.setItem("userRole", backendUserState);
  //       redirectBasedOnRole(backendUserState);
  //       return;
  //     }

  //     // ───── 7. New user → show package modal ─────
  //     clearAuthData();
  //     setShowPackageModal(true);

  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setError(err.message || "Login failed. Please try again.");
  //     resetCaptcha();
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  setShowPackageModal(false);

  try {
    // 1. Basic validation
    if (!form.email || !form.password || !form.captcha) {
      throw new Error("All fields are required!");
    }
    if (form.prefix.trim().toLowerCase() !== "velox") {
      throw new Error("Invalid prefix!");
    }
    if (form.captcha !== captchaText) {
      throw new Error("Invalid captcha!");
    }

    // 2. Login API call
    const loginRes = await login({
      prefix: form.prefix.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    if (!loginRes?.token) {
      throw new Error("No token received. Login failed.");
    }

    // 3. Get user profile
    let profile;
    try {
      profile = await getUserProfile(loginRes.token);
    } catch (profileErr) {
      // This is the most common place for 400
      const msg = profileErr.response?.data?.message 
        || profileErr.response?.data?.error 
        || profileErr.message 
        || "Failed to fetch user profile";
      throw new Error(msg);
    }

    const backendUserState = (profile?.userState || "").trim().toLowerCase();

    // 4. Save user data
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));

    // 5. Broadcast login to other tabs
    markLogin(profile.email);

    // 6. Role-based redirect
    if (backendUserState && ["trading", "academy"].includes(backendUserState)) {
      setRole(backendUserState);
      localStorage.setItem("userRole", backendUserState);
      redirectBasedOnRole(backendUserState);
      return;
    }

    // 7. First-time user → show package selection
    setShowPackageModal(true);

  } catch (err) {
    console.error("Login failed:", err);

    // THIS IS THE KEY FIX: Show actual backend message
    const serverMessage = err.response?.data?.message
      || err.response?.data?.error
      || err.response?.data?.detail
      || err.message;

    setError(serverMessage || "Login failed. Please try again.");

    resetCaptcha();
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07112b] text-white relative overflow-hidden">
      <BackgroundSwitcher />

      {/* FULL-SCREEN LOADER */}
      <AnimatePresence>
        {loading && <LoginLoader />}
      </AnimatePresence>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 md:px-16 py-3 z-20">
        {/* Logo & Country selector commented as per your code */}
      </header>

      {/* Login Form */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-6 md:px-16 lg:px-24 mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-3xl font-semibold text-gray-100 mb-4">Secure Client Area</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            Designed in pursuit of{" "}
            <span className="text-[#e3b874]">higher performance.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#00b4A1]/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-xl border border-[#1f315c]"
        >
          <h2 className="text-2xl font-bold text-[#e3b874] mb-2 text-center">Welcome!</h2>
          <p className="text-center text-sm text-gray-400 mb-6">
            By logging in, you agree to the{" "}
            <span className="text-[#e3b874] cursor-pointer hover:underline">Terms & Conditions</span>.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <div className="relative w-1/3">
                <User className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="prefix"
                  placeholder="Prefix"
                  value={form.prefix}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
                />
              </div>
              <div className="relative w-2/3">
                <User className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-9 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-[#e3b874]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex w-full items-center space-x-3">
              <div className="bg-[#091631] text-[#e3b874] md:px-4 py-2 rounded-md font-bold select-none tracking-widest text-sm md:text-lg">
                {captchaText}
              </div>
              <input
                type="text"
                name="captcha"
                placeholder="Enter 5 chars"
                value={form.captcha}
                onChange={handleChange}
                required
                maxLength={5}
                className="flex-1 px-3 py-2 rounded-md bg-[#091631] border border-[#1f315c] focus:ring-2 focus:ring-[#e3b874] outline-none font-mono"
                style={{ letterSpacing: "0.2em" }}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-b from-[#e3b874] to-[#c19a4a] text-[#091631] font-semibold rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm text-gray-400 mt-2">
              <a href="/signup" className="hover:underline text-[#e3b874]">
                <span className="hover:none text-[#ffff]"> Don't have an account?</span> Signup
              </a>
            </div>
            <div className="text-center text-sm text-[#e3b874]">
              <a href="/forget-password" className="underline">Forgot password</a>
            </div>
          </form>

          <div className="text-center text-xs text-gray-400 mt-6">
            Need Login Assistance?{" "}
            <a href="mailto:contact@veloxcapital.com" className="text-[#e3b874] hover:underline">
              contact@veloxcapitalmarket.ai
            </a>
          </div>
        </motion.div>
      </div>

      {/* PACKAGE SELECTION MODAL */}
      <AnimatePresence>
        {showPackageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => !loading && setShowPackageModal(false)}
                disabled={loading}
                className="absolute -top-12 right-0 bg-[#e3b874] text-[#091631] rounded-full p-2 shadow-lg hover:bg-[#f2cd83] transition disabled:opacity-50 z-10"
              >
                <X size={18} />
              </button>

              <PackageSelection onClose={() => setShowPackageModal(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
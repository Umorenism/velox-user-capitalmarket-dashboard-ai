// import React, { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Copy, Share2, X } from "lucide-react";

// const ReferralCard = () => {
//   const [copied, setCopied] = useState(false);
//   const [shared, setShared] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const referralLink = "https://microtrade.com";

//   // Mock invited members data
//   const invitedMembers = [
//     { id: 1, name: "John Doe", email: "john@example.com", date: "2025-09-14" },
//     { id: 2, name: "Mary Johnson", email: "mary@example.com", date: "2025-09-16" },
//     { id: 3, name: "David Brown", email: "david@example.com", date: "2025-10-01" },
//     { id: 4, name: "Sarah Lee", email: "sarah@example.com", date: "2025-10-10" },
//   ];

//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Join me on MicroTrade",
//           text: "Check out this trading platform!",
//           url: referralLink,
//         });
//         setShared(true);
//         setTimeout(() => setShared(false), 2000);
//       } catch (err) {
//         console.log("Share canceled or failed:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(referralLink);
//       alert("Referral link copied. You can share it manually!");
//     }
//   };

//   return (
//     <>
//       {/* MAIN CARD */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white rounded-2xl border border-gray-100 shadow-sm dark:bg-neutral-900 dark:text-white overflow-hidden w-full max-w-6xl"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100">
//           <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
//             Referral Link
//           </h2>
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-500 transition"
//           >
//             Total Invited Members ({invitedMembers.length})
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 flex flex-col items-center justify-center text-center space-y-3">
//           <p className="text-sm flex items-center gap-4 text-gray-700 dark:text-gray-300">
//             <span className="text-gray-900 font-medium ml-1 dark:text-white">
//               {referralLink}
//             </span>
//             <button
//               onClick={handleShare}
//               className="ml-3 flex items-center justify-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-100 transition"
//             >
//               <Share2 size={16} />
//               {shared ? "Shared!" : "Share"}
//             </button>
//           </p>

//           <div className="mt-2 bg-white dark:bg-neutral-800 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
//             <QRCodeCanvas value={referralLink} size={265} />
//           </div>
//         </div>

//         {/* Footer Button */}
//         <div className="flex items-center justify-between bg-orange-500 px-4 py-3">
//           <button
//             onClick={handleCopy}
//             className="flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition w-full rounded-md py-2"
//           >
//             <Copy size={16} className="opacity-90" />
//             {copied ? "Copied!" : "Copy Link"}
//           </button>
//         </div>
//       </motion.div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//               >
//                 <X size={18} />
//               </button>

//               <h3 className="text-xl font-semibold mb-4 text-center text-orange-500">
//                 Invited Members
//               </h3>

//               {/* List */}
//               <div className="max-h-64 overflow-y-auto space-y-3">
//                 {invitedMembers.map((member) => (
//                   <div
//                     key={member.id}
//                     className="flex justify-between items-center bg-gray-50 dark:bg-neutral-800 p-3 rounded-md border border-gray-200 dark:border-neutral-700"
//                   >
//                     <div>
//                       <p className="font-medium">{member.name}</p>
//                       <p className="text-sm text-gray-500">{member.email}</p>
//                     </div>
//                     <p className="text-xs text-gray-400">{member.date}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* Footer */}
              
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ReferralCard;









// import React, { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Copy, Share2, X, Loader2 } from "lucide-react";
// import { getUserProfile } from "../api/authApi"; // ✅ adjust path if needed

// const ReferralCard = () => {
//   const [copied, setCopied] = useState(false);
//   const [shared, setShared] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch user profile
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token"); // assumes JWT is stored
//         const userData = await getUserProfile(token);
//         setUser(userData);
//         console.log("User data:", userData);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <Loader2 className="animate-spin text-[#F8983B]" size={24} />
//         <p className="ml-3 text-gray-600 dark:text-gray-300">Loading referral info...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="text-center text-gray-500 dark:text-gray-300 py-6">
//         Failed to load referral information.
//       </div>
//     );
//   }

//   // ✅ Generate referral link dynamically
//   const referralLink = `https://microtrade.com/register?ref=${user.referralCode}`;
//   const invitedMembers = user.downline || [];

//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Join me on MicroTrade",
//           text: "Earn rewards by joining through my referral link!",
//           url: referralLink,
//         });
//         setShared(true);
//         setTimeout(() => setShared(false), 2000);
//       } catch (err) {
//         console.log("Share canceled or failed:", err);
//       }
//     } else {
//       navigator.clipboard.writeText(referralLink);
//       alert("Referral link copied. You can share it manually!");
//     }
//   };

//   return (
//     <>
//       {/* MAIN CARD */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="bg-white rounded-2xl border border-gray-100 shadow-sm dark:bg-neutral-900 dark:text-white overflow-hidden w-full max-w-6xl"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100">
//           <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
//             Referral Link
//           </h2>
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-orange-500 transition"
//           >
//             Total Invited Members ({invitedMembers.length})
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 flex flex-col items-center justify-center text-center space-y-3">
//           <p className="text-sm flex items-center gap-4 text-gray-700 dark:text-gray-300 flex-wrap justify-center">
//             <span className="text-gray-900 font-medium ml-1 dark:text-white break-all">
//               {referralLink}
//             </span>
//             <button
//               onClick={handleShare}
//               className="ml-3 flex items-center justify-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-orange-100 transition"
//             >
//               <Share2 size={16} />
//               {shared ? "Shared!" : "Share"}
//             </button>
//           </p>

//           <div className="mt-2 bg-white dark:bg-neutral-800 p-3 rounded-lg border border-gray-200 dark:border-neutral-700">
//             <QRCodeCanvas value={referralLink} size={265} />
//           </div>
//         </div>

//         {/* Footer Button */}
//         <div className="flex items-center justify-between bg-orange-500 px-4 py-3">
//           <button
//             onClick={handleCopy}
//             className="flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition w-full rounded-md py-2"
//           >
//             <Copy size={16} className="opacity-90" />
//             {copied ? "Copied!" : "Copy Link"}
//           </button>
//         </div>
//       </motion.div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//               >
//                 <X size={18} />
//               </button>

//               <h3 className="text-xl font-semibold mb-4 text-center text-orange-500">
//                 Invited Members
//               </h3>

//               {/* List */}
//               <div className="max-h-64 overflow-y-auto space-y-3">
//                 {invitedMembers.length > 0 ? (
//                   invitedMembers.map((member) => (
//                     <div
//                       key={member.id}
//                       className="flex justify-between items-center bg-gray-50 dark:bg-neutral-800 p-3 rounded-md border border-gray-200 dark:border-neutral-700"
//                     >
//                       <div>
//                         <p className="font-medium">{member.name}</p>
//                         <p className="text-sm text-gray-500">{member.email}</p>
//                       </div>
//                       <p className="text-xs text-gray-400">
//                         {new Date(member.joined).toLocaleDateString()}
//                       </p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-400 text-sm">No referrals yet.</p>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ReferralCard;






// src/components/referral/ReferralCard.jsx
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2, X, Users, Trophy, Link2, Check, Search, Calendar, Package } from "lucide-react";
import { getUserProfile } from "../api/authApi";

const ReferralCard = () => {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showReferralsModal, setShowReferralsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken") || localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const data = await getUserProfile(token);
        setUser(data);
        // Assuming your API returns referrals array in profile
        setReferrals(data.referrals || data.downlines || []);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCopy = async () => {
    const link = user?.referralLink || `https://veloxcapital.io/register?ref=${user?.referralCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const link = user?.referralLink || `https://veloxcapital.io/register?ref=${user?.referralCode}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Velox Capital with me!",
          text: "Earn with algorithmic trading + referral bonuses!",
          url: link,
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const filteredReferrals = referrals.filter(ref =>
    ref.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#00A991]" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading referral dashboard...</p>
      </div>
    );
  }

  const referralLink = user?.referralLink || `https://veloxcapital.io/register?ref=${user?.referralCode || "N/A"}`;
  const totalReferrals = user?.totalReferral || referrals.length;

  return (
    <>
      {/* MAIN REFERRAL CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-4">
                <Trophy className="h-10 w-10" />
                Your Referral Empire
              </h2>
              <p className="text-emerald-100 mt-2 text-lg">Build your team • Earn forever</p>
            </div>
            <button
              onClick={() => setShowReferralsModal(true)}
              className="text-right hover:scale-110 transition-transform"
            >
              <p className="text-6xl font-extrabold drop-shadow-lg">{totalReferrals}</p>
              <p className="text-sm opacity-90">Total Referrals → Click to view</p>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Referral Link */}
          <div className="bg-gray-50 dark:bg-neutral-700/50 rounded-2xl p-6 border border-gray-200 dark:border-neutral-600">
            <div className="flex items-center gap-4 mb-4">
              <Link2 className="h-6 w-6 text-[#00A991]" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Your Unique Link</p>
            </div>
            <p className="font-mono text-sm bg-white dark:bg-neutral-800 p-4 rounded-xl break-all border">
              {referralLink}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border">
              <QRCodeCanvas
                value={referralLink}
                size={220}
                level="H"
                includeMargin
                imageSettings={{
                  src: "https://res.cloudinary.com/dzpabbn2t/image/upload/v1763069735/velox-packages/kvj5qoqxfidgnrseua6c.jpg",
                  height: 50,
                  width: 50,
                  excavate: true,
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-3 py-2 px-5 bg-gradient-to-r from-[#00A991] to-emerald-600 text-white font-bold text-sm rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Copy size={24} />
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-3 py-2 px-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <Share2 size={24} />
              Share Now
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#00A991]/10 to-emerald-100 dark:from-[#00A991]/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center border border-[#00A991]/20">
              <Users className="h-5 w-5 text-[#00A991] mx-auto mb-3" />
              <p className="text-3xl font-bold">{totalReferrals}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Direct Referrals</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/20 rounded-2xl p-6 text-center border border-yellow-300 dark:border-amber-800">
              <Trophy className="h-5 w-5 text-yellow-600 mx-auto mb-3" />
              <p className="text-3xl font-bold capitalize">{user?.rank}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Rank</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/20 rounded-2xl p-3 text-center border border-green-300 dark:border-green-800">
              <Check className="h-5 w-5 text-green-600 mx-auto mb-3" />
              <p className="text-xl font-bold">Active</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Earning Status</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* REFERRALS LIST MODAL */}
      <AnimatePresence>
        {showReferralsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReferralsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#00A991] to-emerald-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold flex items-center gap-4">
                      <Users className="h-10 w-10" />
                      Your Referrals ({totalReferrals})
                    </h3>
                    <p className="mt-2 opacity-90">These warriors joined through your link</p>
                  </div>
                  <button
                    onClick={() => setShowReferralsModal(false)}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="p-6 border-b dark:border-neutral-700">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-neutral-700 rounded-2xl border border-gray-200 dark:border-neutral-600 focus:outline-none focus:ring-4 focus:ring-[#00A991]/20"
                  />
                </div>
              </div>

              {/* Referrals List */}
              <div className="max-h-[60vh] overflow-y-auto p-6">
                {filteredReferrals.length === 0 ? (
                  <div className="text-center py-16">
                    <Users className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                      {searchTerm ? "No referrals found" : "You haven't referred anyone yet"}
                    </p>
                    <p className="text-gray-400 mt-2">Start sharing your link to grow your team!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReferrals.map((ref, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-gray-50 dark:bg-neutral-700/50 rounded-2xl p-6 border border-gray-200 dark:border-neutral-600 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#00A991] to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {ref.name?.[0] || "U"}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                {ref.name || "Anonymous User"}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-400">{ref.email || "No email"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="h-4 w-4" />
                              {new Date(ref.joinDate || ref.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Package className="h-5 w-5 text-[#00A991]" />
                              <span className="font-semibold text-[#00A991]">
                                {ref.package || "Basic"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50 dark:bg-neutral-700/50 border-t dark:border-neutral-700">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Keep sharing — every new member unlocks more bonuses for you
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReferralCard;
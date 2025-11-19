// import React from "react";

// const UsersPackagesGrid = () => {
//   const packages = [
//     {
//       title: "Opix Algo Lite",
//       return: "Projected Monthly Return: 6% – 11%",
//       description:
//         "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis. Most effective in the price consolidation stages that occupy the bulk of the market time.",
//     },
//     {
//       title: "Opix Algo Pro",
//       return: "Projected Monthly Return: 8% – 13%",
//       description:
//         "Fine-tuned automated algorithmic trading that improves as it learns through its unique self-optimization. Strict rule-based approach to trading that fits most of the market time. Equity protection, order flow strategy, money management and probabilistic analysis.",
//     },
//     {
//       title: "Opix Algo Expert",
//       return: "Projected Monthly Return: 10% – 16%",
//       description:
//         "Next generation algorithmic trading providing an edge of trading opportunity with exceptional analysis and data finding to anticipate future price movements. Includes order flow system, transaction cost analysis, equity strategy, money management & probabilistic analysis.",
//     },
//   ];

//   return (
//     <div className=" rounded-xl p-2 dark:bg-neutral-800 dark:text-white  mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {packages.map((pkg, index) => (
//           <div
//             key={index}
//             className="flex bg-white dark:bg-neutral-800 dark:text-white  flex-col justify-between border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
//           >
//             {/* Content */}
//             <div className="p-5">
//               <h3 className="text-lg dark:bg-neutral-800 dark:text-white  font-semibold text-gray-900 mb-3">
//                 {pkg.title}
//               </h3>

//               <div className="inline-block bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-white  text-sm px-3 py-1 rounded-full mb-4">
//                 {pkg.return}
//               </div>

//               <hr className="my-3 border-gray-200" />

//               <p className="text-sm dark:bg-neutral-800 dark:text-white  text-gray-600 leading-relaxed">
//                 {pkg.description}
//               </p>
//             </div>

//             {/* Subscribe Button */}
//             <button className="bg-[#F8983B] text-white font-medium text-sm py-3 w-full hover:bg-[#e1862f] transition-colors">
//               Subscribe
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UsersPackagesGrid;







// import React, { useEffect, useState } from "react";
// import { buyUserPackage, getUserPackages } from "../api/userPackageApi";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// const UsersPackagesGrid = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState({});
//   const [messages, setMessages] = useState({});

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await getUserPackages();
//         setPackages(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Failed to load packages:", error);
//         setPackages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const handleSubscribe = debounce(async (packageId) => {
//     setSubmitting((prev) => ({ ...prev, [packageId]: true }));
//     setMessages((prev) => ({ ...prev, [packageId]: null }));

//     try {
//       await buyUserPackage(packageId);
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: { type: "success", text: "Package subscribed successfully!" },
//       }));

//       setPackages((prev) =>
//         prev.map((pkg) =>
//           pkg.id === packageId ? { ...pkg, isSubscribed: true } : pkg
//         )
//       );

//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } catch (error) {
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: {
//           type: "error",
//           text: error.response?.data?.message || "Failed to subscribe to package.",
//         },
//       }));

//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } finally {
//       setSubmitting((prev) => ({ ...prev, [packageId]: false }));
//     }
//   }, 300);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <Loader2 className="animate-spin text-[#F8983B]" size={26} />
//         <p className="ml-3 text-gray-600 dark:text-gray-300">Loading packages...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl p-4 dark:bg-neutral-800 dark:text-white mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {packages.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-300">
//             No packages available.
//           </p>
//         ) : (
//           packages.map((pkg) => {
//             const isLoading = submitting[pkg.id] || false;
//             const message = messages[pkg.id];
//             const isSubscribed = pkg.isSubscribed || false;

//             return (
//               <div
//                 key={pkg.id}
//                 className="max-w-sm w-full bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02]"
//               >
//                 {/* Content Section */}
//                 <div className="md:p-6 flex flex-col flex-grow text-start p-2 md:text-start md:text-left">
//   {/* Package Title */}
//   <h2 className="md:text-lg text-sm font-semibold mb-2 text-gray-900 dark:text-white">
//     {pkg.name || "Opix Algo Lite"}
//   </h2>

//   {/* Projected Return Badge */}
//   <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full px-4 py-1.5 inline-flex items-center max-w-[280px] w-full justify-center mx-auto md:mx-0 mb-4 shadow-sm">
//     <p className="text-sm flex w-full  text-gray-700 flex text-start gap-1">
//       Projected Monthly Return:
//       <span className="font-semibold text-[#00A991]">
//         {pkg.projectedReturn || "6% – 11%"}
//       </span>
//     </p>
//   </div>

//   <hr className="border-gray-200 dark:border-neutral-700 mb-4" />

//   {/* Description */}
//   <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//     {pkg.description ||
//       "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis. Most effective in the price consolidation stages that occupy the bulk of the market time."}
//   </p>

//   {/* Message */}
//   {message && (
//     <div
//       role="alert"
//       className={`flex items-center justify-center md:justify-start gap-2 mb-4 px-3 py-2 rounded-md text-sm font-medium ${
//         message.type === "success"
//           ? "bg-green-100 text-green-700"
//           : "bg-red-100 text-red-700"
//       }`}
//     >
//       {message.type === "success" ? (
//         <CheckCircle2 size={16} />
//       ) : (
//         <XCircle size={16} />
//       )}
//       {message.text}
//     </div>
//   )}
// </div>


//                 {/* Footer Subscribe Button - flush bottom */}
//                 <button
//                   onClick={() => handleSubscribe(pkg.id)}
//                   disabled={isLoading || isSubscribed}
//                   aria-label={
//                     isLoading
//                       ? `Subscribing to ${pkg.name}`
//                       : isSubscribed
//                       ? `${pkg.name} is already subscribed`
//                       : `Subscribe to ${pkg.name}`
//                   }
//                   className={`flex justify-center items-center gap-2 bg-[#E98B37] text-white font-medium text-sm py-3 w-full hover:bg-[#d47d30] transition-colors ${
//                     isLoading || isSubscribed ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       Subscribing...
//                     </>
//                   ) : isSubscribed ? (
//                     "Subscribed"
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPackagesGrid;







// import React, { useEffect, useState } from "react";
// import { buyUserPackage, getUserPackages } from "../api/userPackageApi";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// const UsersPackagesGrid = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState({}); // per-package loading
//   const [messages, setMessages] = useState({}); // per-package messages

//   // Fetch user packages from API
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await getUserPackages();
//         setPackages(data || []);
//       } catch (error) {
//         console.error("Failed to load packages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // Handle subscription (only affects the clicked package)
//   const handleSubscribe = async (packageId) => {
//     setSubmitting((prev) => ({ ...prev, [packageId]: true }));
//     setMessages((prev) => ({ ...prev, [packageId]: null }));

//     try {
//       await buyUserPackage(packageId);
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: {
//           type: "success",
//           text: "Package subscribed successfully!",
//         },
//       }));
//     } catch (error) {
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: {
//           type: "error",
//           text: error.response?.data?.message || "Failed to subscribe to package.",
//         },
//       }));
//     } finally {
//       setSubmitting((prev) => ({ ...prev, [packageId]: false }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <Loader2 className="animate-spin text-[#F8983B]" size={26} />
//         <p className="ml-3 text-gray-600 dark:text-gray-300">
//           Loading packages...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl p-2 dark:bg-neutral-800 dark:text-white mx-auto">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {packages.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-300">
//             No packages available.
//           </p>
//         ) : (
//           packages.map((pkg) => {
//             const isLoading = submitting[pkg._id];
//             const message = messages[pkg._id];
//             return (
//               <div
//                 key={pkg._id}
//                 className="flex flex-col justify-between bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
//               >
//                 {/* Image */}
//                 {pkg.image && (
//                   <img
//                     src={pkg.image}
//                     alt={pkg.name}
//                     className="w-full h-auto object-cover"
//                   />
//                 )}

//                 {/* Content */}
//                 <div className="p-5 flex flex-col flex-grow justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                       {pkg.name}
//                     </h3>

//                     <div className="inline-block bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-200 text-sm px-3 py-1 rounded-full mb-4">
//                       {pkg.isFree ? "Free Package" : `$${pkg.price}`}
//                     </div>

//                     <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
//                       {pkg.description || "No description provided."}
//                     </p>

//                     {/* Local success/error message */}
//                     {message && (
//                       <div
//                         className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
//                           message.type === "success"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {message.type === "success" ? (
//                           <CheckCircle2 size={16} />
//                         ) : (
//                           <XCircle size={16} />
//                         )}
//                         {message.text}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Subscribe Button */}
//                 <button
//                   onClick={() => handleSubscribe(pkg._id)}
//                   disabled={isLoading}
//                   className={`flex justify-center items-center gap-2 bg-[#F8983B] text-white font-medium text-sm py-3 w-full hover:bg-[#e1862f] transition-colors ${
//                     isLoading ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isLoading && <Loader2 size={18} className="animate-spin" />}
//                   {isLoading ? "Subscribing..." : "Subscribe"}
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPackagesGrid;







// import React, { useEffect, useState } from "react";
// import { buyUserPackage, getUserPackages } from "../api/userPackageApi";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// const UsersPackagesGrid = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState({});
//   const [messages, setMessages] = useState({});

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await getUserPackages();
//         setPackages(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("Failed to load packages:", error);
//         setPackages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   const handleSubscribe = debounce(async (packageId) => {
//     setSubmitting((prev) => ({ ...prev, [packageId]: true }));
//     setMessages((prev) => ({ ...prev, [packageId]: null }));

//     try {
//       await buyUserPackage(packageId);
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: { type: "success", text: "Package subscribed successfully!" },
//       }));

//       setPackages((prev) =>
//         prev.map((pkg) =>
//           pkg.id === packageId ? { ...pkg, isSubscribed: true } : pkg
//         )
//       );

//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } catch (error) {
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: {
//           type: "error",
//           text: error.response?.data?.message || "Failed to subscribe to package.",
//         },
//       }));

//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } finally {
//       setSubmitting((prev) => ({ ...prev, [packageId]: false }));
//     }
//   }, 300);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <Loader2 className="animate-spin text-[#F8983B]" size={26} />
//         <p className="ml-3 text-gray-600 dark:text-gray-300">Loading packages...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl p-4 dark:bg-neutral-800 dark:text-white mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {packages.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-300">
//             No packages available.
//           </p>
//         ) : (
//           packages.map((pkg) => {
//             const isLoading = submitting[pkg.id] || false;
//             const message = messages[pkg.id];
//             const isSubscribed = pkg.isSubscribed || false;

//             return (
//               <div
//                 key={pkg.id}
//                 className="max-w-sm w-full bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02]"
//               >
//                 {/* Image Section */}
//                 {pkg.image ? (
//                   <div className="w-full h-auto bg-gray-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
//                     <img
//                       src={pkg.image}
//                       alt={`${pkg.name} package`}
//                       className="w-full h-full object-cover p-4"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <div className="w-full h-48 bg-gray-50 dark:bg-neutral-700 flex items-center justify-center border-b">
//                     <span className="text-gray-400 text-sm">No Image</span>
//                   </div>
//                 )}

//                 {/* Content Section */}
//                 <div className="md:p-6 flex flex-col flex-grow text-start p-2 md:text-start md:text-left">
//                   {/* Package Title */}
//                   <h2 className="md:text-lg text-sm font-semibold mb-2 text-gray-900 dark:text-white">
//                     {pkg.name || "Opix Algo Lite"}
//                   </h2>

//                   {/* Projected Return Badge */}
//                   <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full px-4 py-1.5 inline-flex items-center max-w-[280px] w-full justify-center mx-auto md:mx-0 mb-4 shadow-sm">
//                     <p className="text-sm flex w-full text-gray-700 flex text-start gap-1">
//                       Projected Monthly Return:
//                       <span className="font-semibold text-[#00A991]">
//                         {pkg.projectedReturn || "6% – 11%"}
//                       </span>
//                     </p>
//                   </div>

//                   <hr className="border-gray-200 dark:border-neutral-700 mb-4" />

//                   {/* Description */}
//                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                     {pkg.description ||
//                       "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis. Most effective in the price consolidation stages that occupy the bulk of the market time."}
//                   </p>

//                   {/* Message */}
//                   {message && (
//                     <div
//                       role="alert"
//                       className={`flex items-center justify-center md:justify-start gap-2 mb-4 px-3 py-2 rounded-md text-sm font-medium ${
//                         message.type === "success"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {message.type === "success" ? (
//                         <CheckCircle2 size={16} />
//                       ) : (
//                         <XCircle size={16} />
//                       )}
//                       {message.text}
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer Subscribe Button */}
//                 <button
//                   onClick={() => handleSubscribe(pkg.id)}
//                   disabled={isLoading || isSubscribed}
//                   aria-label={
//                     isLoading
//                       ? `Subscribing to ${pkg.name}`
//                       : isSubscribed
//                       ? `${pkg.name} is already subscribed`
//                       : `Subscribe to ${pkg.name}`
//                   }
//                   className={`flex justify-center items-center gap-2 bg-[#E98B37] text-white font-medium text-sm py-3 w-full hover:bg-[#d47d30] transition-colors ${
//                     isLoading || isSubscribed ? "opacity-70 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       Subscribing...
//                     </>
//                   ) : isSubscribed ? (
//                     "Subscribed"
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPackagesGrid;






// import React, { useEffect, useState } from "react";
// import { buyUserPackage, getUserPackages } from "../api/userPackageApi";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";

// // Debounce utility
// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// const UsersPackagesGrid = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState({});
//   const [messages, setMessages] = useState({});
//   const [wallets, setWallets] = useState(null);

//   // ✅ Fetch packages on mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const data = await getUserPackages();
//         setPackages(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error("❌ Failed to load packages:", error);
//         setPackages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // ✅ Handle package subscription
//   const handleSubscribe = debounce(async (packageId) => {
//     setSubmitting((prev) => ({ ...prev, [packageId]: true }));
//     setMessages((prev) => ({ ...prev, [packageId]: null }));

//     try {
//       // ✅ Correct call — send string ID
//       const res = await buyUserPackage(packageId);

//       // ✅ Show success message
//       const successMsg = res?.message || "Package purchased successfully!";
//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: { type: "success", text: successMsg },
//       }));

//       // ✅ Update wallet info if returned
//       if (res?.user?.wallets) setWallets(res.user.wallets);

//       // ✅ Mark package as subscribed
//       setPackages((prev) =>
//         prev.map((pkg) =>
//           pkg.id === packageId ? { ...pkg, isSubscribed: true } : pkg
//         )
//       );

//       // ✅ Auto-hide message after 5s
//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } catch (error) {
//       console.error("❌ Subscription failed:", error);
//       const errMsg =
//         error.response?.data?.message ||
//         "Failed to subscribe to package. Please try again.";

//       setMessages((prev) => ({
//         ...prev,
//         [packageId]: { type: "error", text: errMsg },
//       }));

//       setTimeout(() => {
//         setMessages((prev) => ({ ...prev, [packageId]: null }));
//       }, 5000);
//     } finally {
//       setSubmitting((prev) => ({ ...prev, [packageId]: false }));
//     }
//   }, 300);

//   // ✅ Loading indicator
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center p-6">
//         <Loader2 className="animate-spin text-[#F8983B]" size={26} />
//         <p className="ml-3 text-gray-600 dark:text-gray-300">
//           Loading packages...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl p-4 dark:bg-neutral-800 dark:text-white mx-auto">
//       {/* ✅ Optional wallet summary */}
//       {wallets && (
//         <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-yellow-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300">
//           <p className="font-semibold text-gray-900 dark:text-white mb-2">
//             Updated Wallets:
//           </p>
//           <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs md:text-sm">
//             {Object.entries(wallets).map(([key, value]) => (
//               <li key={key} className="flex justify-between">
//                 <span className="capitalize">{key}</span>
//                 <span className="font-semibold">{value}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* ✅ Package grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {packages.length === 0 ? (
//           <p className="text-center text-gray-500 dark:text-gray-300">
//             No packages available.
//           </p>
//         ) : (
//           packages.map((pkg) => {
//             const isLoading = submitting[pkg.id] || false;
//             const message = messages[pkg.id];
//             const isSubscribed = pkg.isSubscribed || false;

//             return (
//               <div
//                 key={pkg.id}
//                 className="max-w-sm w-full bg-white dark:bg-neutral-800 rounded-lg shadow-md border border-gray-200 dark:border-neutral-700 flex flex-col justify-between overflow-hidden transition-transform hover:scale-[1.02]"
//               >
//                 {/* Image Section */}
//                 {pkg.image ? (
//                   <div className="w-full h-auto bg-gray-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
//                     <img
//                       src={pkg.image}
//                       alt={`${pkg.name} package`}
//                       className="w-full h-full object-cover p-4"
//                       onError={(e) => {
//                         e.target.src =
//                           "https://via.placeholder.com/300x200?text=No+Image";
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   <div className="w-full h-48 bg-gray-50 dark:bg-neutral-700 flex items-center justify-center border-b">
//                     <span className="text-gray-400 text-sm">No Image</span>
//                   </div>
//                 )}

//                 {/* Content Section */}
//                 <div className="md:p-6 flex flex-col flex-grow text-start p-2 md:text-start md:text-left">
//                   <h2 className="md:text-lg text-sm font-semibold mb-2 text-gray-900 dark:text-white">
//                     {pkg.name || "Opix Algo Lite"}
//                   </h2>

//                   <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full px-4 py-1.5 inline-flex items-center max-w-[280px] w-full justify-center mx-auto md:mx-0 mb-4 shadow-sm">
//                     <p className="text-sm flex w-full text-gray-700 flex text-start gap-1">
//                       Projected Monthly Return:
//                       <span className="font-semibold text-[#00A991]">
//                         {pkg.projectedReturn || "6% – 11%"}
//                       </span>
//                     </p>
//                   </div>

//                   <hr className="border-gray-200 dark:border-neutral-700 mb-4" />

//                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
//                     {pkg.description ||
//                       "Fully automated algorithmic trading that uses advanced order flow strategy, money management and probabilistic analysis. Most effective in the price consolidation stages that occupy the bulk of the market time."}
//                   </p>

//                   {/* Message */}
//                   {message && (
//                     <div
//                       role="alert"
//                       className={`flex items-center justify-center md:justify-start gap-2 mb-4 px-3 py-2 rounded-md text-sm font-medium ${
//                         message.type === "success"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {message.type === "success" ? (
//                         <CheckCircle2 size={16} />
//                       ) : (
//                         <XCircle size={16} />
//                       )}
//                       {message.text}
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer Subscribe Button */}
//                 <button
//                   onClick={() => handleSubscribe(pkg.id)}
//                   disabled={isLoading || isSubscribed}
//                   aria-label={
//                     isLoading
//                       ? `Subscribing to ${pkg.name}`
//                       : isSubscribed
//                       ? `${pkg.name} is already subscribed`
//                       : `Subscribe to ${pkg.name}`
//                   }
//                   className={`flex justify-center items-center gap-2 bg-[#E98B37] text-white font-medium text-sm py-3 w-full hover:bg-[#d47d30] transition-colors ${
//                     isLoading || isSubscribed
//                       ? "opacity-70 cursor-not-allowed"
//                       : ""
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       Subscribing...
//                     </>
//                   ) : isSubscribed ? (
//                     "Subscribed"
//                   ) : (
//                     "Subscribe"
//                   )}
//                 </button>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPackagesGrid;






import React, { useEffect, useState } from "react";
import { buyUserPackage, getUserPackages } from "../api/userPackageApi";
import { Loader2, CheckCircle2, XCircle, Crown, Sparkles } from "lucide-react";

// Simple debounce
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const UsersPackagesGrid = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getUserPackages();
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load packages:", err);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleSubscribe = debounce(async (packageId) => {
    setSubmitting((prev) => ({ ...prev, [packageId]: true }));
    setMessages((prev) => ({ ...prev, [packageId]: null }));

    try {
      const res = await buyUserPackage(packageId);

      setMessages((prev) => ({
        ...prev,
        [packageId]: { type: "success", text: res?.message || "Package activated!" },
      }));

      // Mark as subscribed locally
      setPackages((prev) =>
        prev.map((p) => (p.id === packageId ? { ...p, isSubscribed: true } : p))
      );

      setTimeout(() => {
        setMessages((prev) => ({ ...prev, [packageId]: null }));
      }, 5000);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Subscription failed. Try again.";
      setMessages((prev) => ({
        ...prev,
        [packageId]: { type: "error", text: msg },
      }));
      setTimeout(() => {
        setMessages((prev) => ({ ...prev, [packageId]: null }));
      }, 5000);
    } finally {
      setSubmitting((prev) => ({ ...prev, [packageId]: false }));
    }
  }, 300);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#00A991]" size={40} />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading packages…</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your <span className="text-[#00A991]">Trading Package</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Unlock higher ROI, bonuses, and leadership rewards
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {packages.map((pkg) => {
          const isFree = pkg.isFree || pkg.price === 0;
          const isLoading = submitting[pkg.id];
          const message = messages[pkg.id];
          const isSubscribed = pkg.isSubscribed;

          return (
            <div
              key={pkg.id}
              className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border
                ${isFree ? "border-gray-300 dark:border-gray-600" : "border-[#00A991]/20"}
                ${isFree ? "" : "hover:-translate-y-2"}
              `}
            >
              {/* Badge for free package */}
              {isFree && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-br-lg z-10 flex items-center gap-1">
                  <Sparkles size={14} />
                  FREE ACCOUNT
                </div>
              )}

              {/* Image */}
              <div className="h-48 bg-gray-100 dark:bg-neutral-800 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300/1a1a1a/ffffff?text=No+Image";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-white dark:bg-neutral-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {pkg.name.replace(/_/g, " ")}
                </h3>

                <div className="mb-5">
                  <span className="text-3xl font-extrabold text-[#00A991]">
                    {isFree ? "FREE" : `$${pkg.price.toLocaleString()}`}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
                  {pkg.description}
                </p>

                {/* Success / Error Message */}
                {message && (
                  <div
                    className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                      message.type === "success"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40"
                        : "bg-red-100 text-red-700 dark:bg-red-900/40"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    {message.text}
                  </div>
                )}
              </div>

              {/* Footer Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => !isFree && handleSubscribe(pkg.id)}
                  disabled={isLoading || isSubscribed || isFree}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2
                    ${
                      isFree
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 cursor-default"
                        : isSubscribed
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#00A991] to-emerald-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl"
                    }
                    ${isLoading ? "animate-pulse" : ""}
                  `}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing…
                    </>
                  ) : isSubscribed ? (
                    <>Subscribed</>
                  ) : isFree ? (
                    <>Your Current Plan</>
                  ) : (
                    <>Subscribe Now</>
                  )}
                </button>

                {isFree && (
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    You already have the free account
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Velox Capital © 2025 | Package Selection v2.0</p>
      </div>
    </div>
  );
};

export default UsersPackagesGrid;
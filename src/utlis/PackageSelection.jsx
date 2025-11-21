// import React, { useEffect, useState } from "react";
// import { Check, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../routes/UserContext";
// import { useUserRole } from "../routes/UserRoleContext";
// import img1 from "../assets/veloximg1.jpeg";
// import img2 from "../assets/veloximg2.jpeg";

// export default function PackageSelection({ onClose }) {
//   const navigate = useNavigate();
//   const { updateUserState } = useUser();               // PUT
//   const { setRole, hasPackage, role } = useUserRole();
//   const [isSaving, setIsSaving] = useState(false);
  

//   // ---- auto-redirect when role already known ----
//   useEffect(() => {
//     if (hasPackage && role) {
//       const map = { trading: "/dashboard", academy: "/academy/courses" };
//       navigate(map[role] ?? "/dashboard", { replace: true });
//     }
//   }, [hasPackage, role, navigate]);

//   if (hasPackage && role) return null;   // never render when already chosen

//   const decisionpackages = [
//     {
//       id: "trading",
//       title: "Academy + Trading Pack",
//       subtitle: "Most Popular",
//       details: ["Earn cash back", "Full Academy Access", "Affiliate Program", "Certifications"],
//       buttonText: "Select Pack",
//       buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
//       image: img1,
//       role: "trading",
//       redirect: "/dashboard",
//     },
//     {
//       id: "academy",
//       title: "Academy Pack",
//       subtitle: "Learn & Grow",
//       details: ["Full Academy Access", "No cash back", "No affiliate program", "Certification"],
//       buttonText: "Select Academy Pack",
//       buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
//       image: img2,
//       role: "academy",
//       redirect: "/academy/courses",
//     },
//   ];

//   const handleSelect = async (pkg) => {
//     if (isSaving) return;
//     setIsSaving(true);

//     try {
//       // ---- SEND role as userState ----
//       const res = await updateUserState({ userState: pkg.role });

//       if (res?.user?.userState === pkg.role) {
//         setRole(pkg.role);                     // lock in context + localStorage
//         navigate(pkg.redirect, { replace: true });
//         onClose?.();
//       }
//     } catch (e) {
//       console.error(e);
//       alert("Failed to save selection");
//     } finally {
//       setIsSaving(false);
//     }
//   };
  
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={onClose} />
//       <div className="fixed inset-0 flex items-center justify-center p-3 z-50 overflow-y-auto">
//         <div
//           className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <button
//             onClick={onClose}
//             disabled={isSaving}
//             className="absolute top-3 right-3 text-gray-400 hover:text-white transition disabled:opacity-50"
//           >
//             <X size={22} />
//           </button>

//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5 sm:mb-6">
//             Choose Your Package
//           </h1>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
//             {decisionpackages.map((pkg) => (
//               <div
//                 key={pkg.id}
//                 className="bg-gray-800 rounded-xl overflow-hidden flex flex-col border border-gray-700 transition-transform hover:scale-[1.02] duration-200"
//               >
//                 <div className="h-40 sm:h-48 md:h-52">
//                   <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
//                 </div>

//                 <div className="p-4 sm:p-5 flex flex-col flex-grow">
//                   <div className="flex items-center justify-between mb-3">
//                     <h2 className="text-base sm:text-lg font-semibold text-white">{pkg.title}</h2>
//                     {pkg.subtitle && (
//                       <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
//                         {pkg.subtitle}
//                       </span>
//                     )}
//                   </div>

//                   <ul className="text-sm text-gray-300 space-y-2 mb-5 flex-grow">
//                     {pkg.details.map((line, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <Check size={14} className="text-green-500 flex-shrink-0" />
//                         <span className="text-xs sm:text-sm">{line}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <button
                  
//                     onClick={() => handleSelect(pkg)}
//                     disabled={isSaving}
//                     className={`${pkg.buttonClass} py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
//                   >
//                     {isSaving ? "Saving..." : pkg.buttonText}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <p className="mt-5 sm:mt-6 text-center text-[10px] sm:text-xs text-gray-500">
//             © {new Date().getFullYear()} VeloxCapitalMarket.ai – All rights reserved.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }






import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../routes/UserContext";
import { useUserRole } from "../routes/UserRoleContext";
import img1 from "../assets/veloximg1.jpeg";
import img2 from "../assets/veloximg2.jpeg";

export default function PackageSelection({ onClose }) {
  const navigate = useNavigate();
  const { updateUserState } = useUser();               // PUT
  const { setRole, hasPackage, role } = useUserRole();

  // Independent saving state per package
  const [isSaving, setIsSaving] = useState({}); // { trading: true/false, academy: true/false }

  // ---- auto-redirect when role already known ----
  useEffect(() => {
    if (hasPackage && role) {
      const map = { trading: "/dashboard", academy: "/academy/courses" };
      navigate(map[role] ?? "/dashboard", { replace: true });
    }
  }, [hasPackage, role, navigate]);

  if (hasPackage && role) return null;   // never render when already chosen

  const decisionpackages = [
    {
      id: "trading",
      title: "Academy + Trading Pack",
      subtitle: "Most Popular",
      details: ["Earn cash back", "Full Academy Access", "Affiliate Program", "Certifications"],
      buttonText: "Select Pack",
      buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
      image: img1,
      role: "trading",
      redirect: "/dashboard",
    },
    {
      id: "academy",
      title: "Academy Pack",
      subtitle: "Learn & Grow",
      details: ["Full Academy Access", "No cash back", "No affiliate program", "Certification"],
      buttonText: "Select Academy Pack",
      buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
      image: img2,
      role: "academy",
      redirect: "/academy/courses",
    },
  ];

  const handleSelect = async (pkg) => {
    const pkgId = pkg.id;

    // Prevent double submission
    if (isSaving[pkgId]) return;

    // Set only this package as saving
    setIsSaving(prev => ({  ...prev, [pkgId]: true }));

    try {
      const res = await updateUserState({ userState: pkg.role });

      if (res?.user?.userState === pkg.role) {
        setRole(pkg.role);
        navigate(pkg.redirect, { replace: true });
        onClose?.();
      } else {
        alert("Failed to save your selection. Please try again.");
      }
    } catch (e) {
      console.error("Error saving package selection:", e);
      alert("Connection error. Please check your internet and try again.");
    } finally {
      // Always clean up the saving state for this package
      setIsSaving(prev => ({ ...prev, [pkgId]: false }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-3 z-50 overflow-y-auto">
        <div
          className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            disabled={Object.values(isSaving).some(Boolean)} // disable close while any is saving
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition disabled:opacity-50"
          >
            <X size={22} />
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-5 sm:mb-6">
            Choose Your Package
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {decisionpackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gray-800 rounded-xl overflow-hidden flex flex-col border border-gray-700 transition-transform hover:scale-[1.02] duration-200"
              >
                <div className="h-40 sm:h-48 md:h-52">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-semibold text-white">{pkg.title}</h2>
                    {pkg.subtitle && (
                      <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {pkg.subtitle}
                      </span>
                    )}
                  </div>

                  <ul className="text-sm text-gray-300 space-y-2 mb-5 flex-grow">
                    {pkg.details.map((line, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check size={14} className="text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{line}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSelect(pkg)}
                    disabled={!!isSaving[pkg.id]}
                    className={`${pkg.buttonClass} py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isSaving[pkg.id] ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      pkg.buttonText
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 sm:mt-6 text-center text-[10px] sm:text-xs text-gray-500">
            © {new Date().getFullYear()} VeloxCapitalMarket.ai – All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
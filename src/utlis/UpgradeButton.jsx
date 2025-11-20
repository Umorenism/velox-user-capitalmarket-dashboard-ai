// import React from 'react';
// import { Sparkles } from 'lucide-react';

// export default function UpgradeButton() {
//   return (
//     <button className="
//       relative group
//       px-8 py-2
//       bg-gradient-to-r from-violet-600 to-indigo-600
//       text-white font-semibold
//       rounded-xl
//       shadow-lg
//       overflow-hidden
//       transform transition-all duration-300 ease-out
//       hover:scale-105 hover:shadow-2xl
//       active:scale-95
//       focus:outline-none focus:ring-4 focus:ring-violet-300
//     ">
//       {/* Animated Background Layer */}
//       <div className="
//         absolute inset-0 
//         bg-gradient-to-r from-violet-500 to-indigo-500
//         transform translate-x-[-100%] group-hover:translate-x-[100%]
//         transition-transform duration-1000 ease-in-out
//       " />

//       {/* Pulse Ring */}
//       <div className="
//         absolute -inset-1
//         bg-gradient-to-r from-violet-600 to-indigo-600
//         rounded-xl blur-lg
//         opacity-75 group-hover:opacity-100
//         animate-pulse
//       " />

//       {/* Content */}
//       <div className="relative flex items-center gap-3">
//         <Sparkles className="
//           w-5 h-5
//           transform transition-transform duration-300
//           group-hover:rotate-12 group-hover:scale-110
//         " />
//         <span className="relative z-10 text-lg">
//           Upgrade Package
//         </span>
//       </div>

//       {/* Shine Effect */}
//       <div className="
//         absolute inset-0 -top-1/2
//         bg-gradient-to-r from-transparent via-white to-transparent
//         opacity-0 group-hover:opacity-30
//         transform -skew-x-12 translate-x-[-200%]
//         group-hover:translate-x-[200%]
//         transition-transform duration-700 ease-out
//       " />
//     </button>
//   );
// }





// // UpgradeButton.tsx
// import React from 'react';
// import { Sparkles } from 'lucide-react';


// export default function UpgradeButton({ 
//   text = "Upgrade Package", 
//   disabled = false, 
//   onClick 
// }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`
//         relative group w-full
//         px-5 py-2
//         bg-gradient-to-r from-violet-600 to-indigo-600
//         text-white font-semibold text-lg
//         rounded-xl shadow-lg overflow-hidden
//         transform transition-all duration-300
//         ${disabled 
//           ? 'opacity-70 cursor-not-allowed' 
//           : 'hover:scale-105 hover:shadow-2xl active:scale-95'
//         }
//         focus:outline-none focus:ring-4 focus:ring-violet-300
//       `}
//     >
//       {/* Animated Background Layer */}
//       <div className="
//         absolute inset-0 
//         bg-gradient-to-r from-violet-500 to-indigo-500
//         transform translate-x-[-100%] group-hover:translate-x-[100%]
//         transition-transform duration-1000 ease-in-out
//       " />

//       {/* Pulse Ring */}
//       <div className="
//         absolute -inset-1
//         bg-gradient-to-r from-violet-600 to-indigo-600
//         rounded-xl blur-lg
//         opacity-75 group-hover:opacity-100
//         animate-pulse
//       " />

//       {/* Content */}
//       <div className="relative flex items-center justify-center gap-3">
//         <Sparkles className="
//           w-5 h-5
//           transform transition-transform duration-300
//           group-hover:rotate-12 group-hover:scale-110
//         " />
//         <span className="relative z-10">{text}</span>
//       </div>

//       {/* Shine Effect */}
//       <div className="
//         absolute inset-0 -top-1/2
//         bg-gradient-to-r from-transparent via-white to-transparent
//         opacity-0 group-hover:opacity-30
//         transform -skew-x-12 translate-x-[-200%]
//         group-hover:translate-x-[200%]
//         transition-transform duration-700 ease-out
//       " />
//     </button>
//   );
// }




// components/ui/UpgradeButton.tsx
import React, { useState } from 'react';
import { Sparkles, Loader2, CheckCircle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '../api/apiClient'; // Adjust path as needed

export default function UpgradeButton({ 
  text = "Upgrade Package", 
  disabled = false,
  packageId,
  onSuccess
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleUpgrade = async () => {
    if (!packageId) {
      setMessage('Invalid package selected');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    try {
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      if (!token) throw new Error('Please login again');

      const res = await apiClient.post(
        '/api/users/upgrade-package',
        { packageId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStatus('success');
      setMessage('Package upgraded successfully! Refreshing...');
      
      setTimeout(() => {
        setIsModalOpen(false);
        onSuccess?.();
        window.location.reload(); // or use better state management
      }, 2000);

    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Upgrade failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* MAIN UPGRADE BUTTON */}
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className={`
          relative group w-full px-6 py-2
          bg-gradient-to-r from-violet-600 to-indigo-600
          text-white font-bold text-lg rounded-2xl shadow-2xl
          overflow-hidden transform transition-all duration-300
          ${disabled 
            ? 'opacity-70 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-3xl active:scale-95 cursor-pointer'
          }
          focus:outline-none focus:ring-4 focus:ring-violet-400
        `}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 
                        transform -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 ease-in-out" />

        {/* Pulse Ring */}
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 
                        rounded-2xl blur-xl opacity-75 group-hover:opacity-100 
                        animate-pulse" />

        {/* Content */}
        <div className="relative flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 transform transition-all duration-300 
                              group-hover:rotate-12 group-hover:scale-125" />
          <span className="relative z-10 tracking-wide">{text}</span>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                        opacity-0 group-hover:opacity-40 transform -skew-x-12 -translate-x-full
                        group-hover:translate-x-full transition-transform duration-700" />
      </button>

      {/* UPGRADE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isLoading && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-3xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Sparkles className="w-8 h-8" />
                    Confirm Package Upgrade
                  </h3>
                  <button
                    onClick={() => !isLoading && setIsModalOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-8">
                {status === 'idle' && (
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-14 h-14 text-white animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Ready to Level Up?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        You're about to upgrade your investment package. This action will unlock higher returns and exclusive benefits.
                      </p>
                    </div>
                  </div>
                )}

                {status === 'success' && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
                    <h4 className="text-2xl font-bold text-green-600">Success!</h4>
                    <p className="text-gray-600 dark:text-gray-400">{message}</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="text-center space-y-4">
                    <XCircle className="w-20 h-20 mx-auto text-red-500" />
                    <h4 className="text-2xl font-bold text-red-600">Upgrade Failed</h4>
                    <p className="text-gray-600 dark:text-gray-400">{message}</p>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="text-center space-y-6 py-8">
                    <Loader2 className="w-16 h-16 mx-auto text-violet-600 animate-spin" />
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      Processing your upgrade...
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {!isLoading && status === 'idle' && (
                <div className="px-8 pb-8 flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 border-2 border-gray-300 dark:border-neutral-600 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpgrade}
                    className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-xl transform hover:scale-105 transition"
                  >
                    Confirm Upgrade
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
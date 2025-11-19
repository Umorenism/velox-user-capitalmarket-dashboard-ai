// import React, { useState } from "react";

// const CompoundInterestCalculator = () => {
//   const [capital, setCapital] = useState("");
//   const [rate, setRate] = useState("");
//   const [days, setDays] = useState("");
//   const [reinvest, setReinvest] = useState(100);
//   const [result, setResult] = useState(null);

//   const calculateCompound = () => {
//     let P = parseFloat(capital);
//     let r = parseFloat(rate) / 100;
//     let t = parseInt(days);
//     let reinvestRate = parseFloat(reinvest) / 100;

//     if (isNaN(P) || isNaN(r) || isNaN(t)) return;

//     for (let i = 0; i < t; i++) {
//       let profit = P * r;
//       P += profit * reinvestRate;
//     }

//     setResult(P.toFixed(2));
//   };

//   return (
//     <div className="min-h-screen dark:text-white dark:bg-neutral-800 bg-gradient-to-br from-[#012B2E] via-[#013B43] to-[#014C5A] flex items-center justify-center p-6">
//       <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md text-white">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#00A991]">
//           Trading Compound Interest Calculator
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Initial Capital ($)
//             </label>
//             <input
//               type="number"
//               value={capital}
//               onChange={(e) => setCapital(e.target.value)}
//               className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
//               placeholder="Enter amount"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Daily Return Rate (%)
//             </label>
//             <input
//               type="number"
//               value={rate}
//               onChange={(e) => setRate(e.target.value)}
//               className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
//               placeholder="e.g. 2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Number of Trading Days
//             </label>
//             <input
//               type="number"
//               value={days}
//               onChange={(e) => setDays(e.target.value)}
//               className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
//               placeholder="e.g. 30"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Reinvest Percentage (%)
//             </label>
//             <input
//               type="number"
//               value={reinvest}
//               onChange={(e) => setReinvest(e.target.value)}
//               className="w-full p-2 rounded-lg border border-gray-300 text-gray-900"
//               placeholder="e.g. 100"
//             />
//           </div>

//           <button
//             onClick={calculateCompound}
//             className="w-full mt-4 bg-[#00A991] hover:bg-[#008f7b] text-white py-2 rounded-lg font-medium transition duration-200"
//           >
//             Calculate
//           </button>
//         </div>

//         {result && (
//           <div className="mt-6 text-center">
//             <h3 className="text-lg font-semibold">Final Capital:</h3>
//             <p className="text-2xl font-bold text-[#00FFCC] mt-1">
//               ${result}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompoundInterestCalculator;






import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Calculator, RefreshCw } from "lucide-react";

const CompoundInterestCalculator = () => {
  const [capital, setCapital] = useState("");
  const [rate, setRate] = useState("");
  const [days, setDays] = useState("");
  const [reinvest, setReinvest] = useState(100);
  const [result, setResult] = useState(null);

  const calculateCompound = () => {
    let P = parseFloat(capital);
    let r = parseFloat(rate) / 100;
    let t = parseInt(days);
    let reinvestRate = parseFloat(reinvest) / 100;
    if (isNaN(P) || isNaN(r) || isNaN(t)) return;

    for (let i = 0; i < t; i++) {
      let profit = P * r;
      P += profit * reinvestRate;
    }
    setResult(P.toFixed(2));
  };

  const resetForm = () => {
    setCapital("");
    setRate("");
    setDays("");
    setReinvest(100);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#012B2E] via-[#013B43] to-[#014C5A] dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-lg p-8 bg-white/10 dark:bg-neutral-800/60 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header Glow Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00A991] via-[#00FFC3] to-[#00A991]" />

        <div className="flex items-center justify-center mb-6">
          <Calculator className="text-[#00FFC3] mr-2" size={24} />
          <h2 className="text-2xl font-bold tracking-wide text-center">
            VeloxCapital Market
          </h2>
        </div>

        <p className="text-center text-sm text-gray-300 mb-6">
          Smart Compound Interest Tool for Traders
        </p>

        {/* Form */}
        <div className="space-y-4">
          {[
            { label: "Initial Capital ($)", value: capital, set: setCapital, placeholder: "Enter amount" },
            { label: "Daily Return Rate (%)", value: rate, set: setRate, placeholder: "e.g. 2" },
            { label: "Number of Trading Days", value: days, set: setDays, placeholder: "e.g. 30" },
            { label: "Reinvest Percentage (%)", value: reinvest, set: setReinvest, placeholder: "e.g. 100" },
          ].map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <label className="block text-sm font-medium mb-1 text-gray-200">
                {field.label}
              </label>
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#00A991] focus:outline-none transition-all"
                placeholder={field.placeholder}
              />
            </motion.div>
          ))}

          <div className="flex gap-3 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={calculateCompound}
              className="w-full flex items-center justify-center gap-2 bg-[#00A991] hover:bg-[#00987D] text-white py-3 rounded-lg font-semibold shadow-md transition-all"
            >
              <TrendingUp size={18} />
              Calculate
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetForm}
              className="w-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <RefreshCw size={18} />
            </motion.button>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-200">Final Capital:</h3>
            <p className="text-3xl font-bold text-[#00FFC3] mt-2 tracking-wide drop-shadow-lg">
              ${result}
            </p>
          </motion.div>
        )}

        {/* Subtle Footer Line */}
        <div className="mt-8 text-center text-xs text-gray-400">
          Powered by <span className="text-[#00FFC3] font-medium">VeloxCapital Market</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CompoundInterestCalculator;

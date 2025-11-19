import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

const platforms = ["MT4", "MT5", "WebTrader"];
const risks = ["Low", "Medium", "High"];
const brokers = ["IC Markets", "Pepperstone", "FXTM", "XM", "Other"];

export default function CopyTrading() {
  const [platform, setPlatform] = useState("");
  const [broker, setBroker] = useState("");
  const [otherBroker, setOtherBroker] = useState("");
  const [server, setServer] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [traderPassword, setTraderPassword] = useState("");
  const [risk, setRisk] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showPlatform, setShowPlatform] = useState(false);
  const [showBroker, setShowBroker] = useState(false);
  const [showRisk, setShowRisk] = useState(false);
  const [brokerSearch, setBrokerSearch] = useState("");

  const filteredBrokers = brokers.filter((b) =>
    b.toLowerCase().includes(brokerSearch.toLowerCase())
  );

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.98 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold mb-8 text-gray-800 dark:text-white tracking-tight"
      >
        Copy Trading Setup
      </motion.h1>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90 }}
        className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-6xl p-8 space-y-6"
      >
        {/* PLATFORM */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Platform
          </label>
          <div className="relative">
            <button
              onClick={() => setShowPlatform(!showPlatform)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 hover:bg-gray-200 dark:hover:bg-gray-600 text-left text-sm transition"
            >
              {platform || "Select Platform"}
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  showPlatform ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {showPlatform && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  {platforms.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPlatform(p);
                        setShowPlatform(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      {p}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BROKER */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Broker
          </label>
          <div className="relative">
            <button
              onClick={() => setShowBroker(!showBroker)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 hover:bg-gray-200 dark:hover:bg-gray-600 text-left text-sm transition"
            >
              {broker || "Select Broker"}
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  showBroker ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {showBroker && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-3"
                >
                  <div className="relative mb-2">
                    <Search
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search broker..."
                      value={brokerSearch}
                      onChange={(e) => setBrokerSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-600 rounded-md focus:outline-none"
                    />
                  </div>
                  {filteredBrokers.map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setBroker(b);
                        setShowBroker(false);
                        if (b !== "Other") setOtherBroker("");
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition"
                    >
                      {b}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {broker === "Other" && (
            <motion.input
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              type="text"
              placeholder="Enter broker name"
              value={otherBroker}
              onChange={(e) => setOtherBroker(e.target.value)}
              className="mt-3 w-full px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#00A991] transition"
            />
          )}
        </div>

        {/* SERVER */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Server
          </label>
          <input
            type="text"
            placeholder="e.g., IC Markets-Live01"
            value={server}
            onChange={(e) => setServer(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 focus:ring-2 focus:ring-[#00A991] transition"
          />
        </div>

        {/* ACCOUNT NUMBER */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Account Number
          </label>
          <input
            type="text"
            placeholder="12345678"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 focus:ring-2 focus:ring-[#00A991] transition"
          />
        </div>

        {/* RISK */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Risk
          </label>
          <div className="relative">
            <button
              onClick={() => setShowRisk(!showRisk)}
              className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 hover:bg-gray-200 dark:hover:bg-gray-600 text-left text-sm transition"
            >
              {risk || "Select Risk"}
              <ChevronDown
                size={18}
                className={`transition-transform ${showRisk ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {showRisk && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.15 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  {risks.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRisk(r);
                        setShowRisk(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TRADER PASSWORD */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Trader Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={traderPassword}
            onChange={(e) => setTraderPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100/70 dark:bg-gray-700/70 focus:ring-2 focus:ring-[#00A991] transition"
          />
        </div>

        {/* TERMS */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-4 h-4 text-[#00A991] border-gray-300 rounded focus:ring-[#00A991]"
          />
          <label
            htmlFor="terms"
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            I have read and agree to the{" "}
            <a
              href="/terms-and-conditions"
              className="text-[#00A991] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
            .
          </label>
        </div>

        {/* SUBMIT */}
        <motion.button
          whileHover={termsAccepted ? { scale: 1.03 } : {}}
          whileTap={termsAccepted ? { scale: 0.97 } : {}}
          disabled={!termsAccepted}
          className={`w-full mt-6 py-3 rounded-lg font-semibold shadow-md transition ${
            termsAccepted
              ? "bg-[#00A991] text-white hover:bg-[#009980]"
              : "bg-gray-400 text-gray-100 cursor-not-allowed"
          }`}
        >
          Connect Account
        </motion.button>
      </motion.div>
    </motion.div>
  );
}


import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Package } from "lucide-react";
import { apiClient } from "@/api/apiClient";
import UpgradeButton from "./UpgradeButton";

const UserPackagesSection = () => {
  const [activeTab, setActiveTab] = useState("All SERIES");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    "All SERIES",
    "STARTER TRADER SERIES",
    "PRO TRADER SERIES",
    "INSTITUTIONAL TRADER SERIES",
  ];

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/users/packages");
        setPackages(res.data.filter((pkg) => !pkg.isFree)); // Exclude free packages
      } catch (err) {
        setError("Failed to load packages. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Group packages into series (5 per series)
  const groupIntoSeries = (pkgs) => {
    const sorted = [...pkgs].sort((a, b) => a.price - b.price); // Sort by price
    const starter = sorted.slice(0, 5);
    const pro = sorted.slice(5, 10);
    const institutional = sorted.slice(10, 15);
    return { starter, pro, institutional };
  };

  const { starter, pro, institutional } = groupIntoSeries(packages);

  const getFilteredPackages = () => {
    if (activeTab === "All SERIES") return packages;
    if (activeTab === "STARTER TRADER SERIES") return starter;
    if (activeTab === "PRO TRADER SERIES") return pro;
    if (activeTab === "INSTITUTIONAL TRADER SERIES") return institutional;
    return [];
  };

  const filteredPackages = getFilteredPackages();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Packages Series
      </h2>
      <div>
        <UpgradeButton packageId="507f1f77bcf86cd799439011" 
  text="Upgrade to Premium" 
  onSuccess={() => console.log("Upgraded!")}
  disabled={false}/>
      </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-neutral-700 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#F8983B]/10 text-[#F8983B] border-b-2 border-[#F8983B]"
                : "text-gray-500 dark:text-gray-400 hover:text-[#F8983B] dark:hover:text-[#F8983B]"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 min-h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F8983B]"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading packages...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 min-h-[500px] bg-red-50 dark:bg-red-900/20 rounded-lg">
          <AlertTriangle className="text-red-500 mb-4 w-12 h-12" />
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* No Packages State */}
      {!loading && !error && filteredPackages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 min-h-[500px] bg-gray-50 dark:bg-neutral-800 rounded-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Package className="text-gray-400 mb-4 w-16 h-16" />
          </motion.div>
          <p className="text-gray-500 dark:text-gray-300 text-lg font-medium">
            No packages in this series
          </p>
          <p className="text-gray-400 text-center dark:text-gray-400 text-sm mt-1 max-w-md">
            {activeTab === "All SERIES"
              ? "No paid packages available at the moment."
              : `No packages found in ${activeTab.toLowerCase()}.`}
          </p>
        </motion.div>
      )}

      {/* Packages Grid */}
      {!loading && !error && filteredPackages.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group border border-gray-200 dark:border-neutral-700 rounded-xl p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-800 dark:to-neutral-900 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                    {pkg.name}
                  </h3>
                  <span className="text-xs bg-[#F8983B]/10 text-[#F8983B] px-2 py-1 rounded-full font-medium">
                    Series
                  </span>
                </div>

                {pkg.image && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                  {pkg.description}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#F8983B]">
                    ${pkg.price}
                  </p>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Active
                  </span>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  Added: {new Date(pkg.createdAt).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default UserPackagesSection;









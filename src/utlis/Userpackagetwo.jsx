




import React, { useEffect, useState } from "react";
import { AlertTriangle, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { getUserPackages, renewUserPackage } from "../api/userPackageApi";

// Simple debounce utility
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const UserPackagesSection = () => {
  const [activeTab, setActiveTab] = useState("All Package");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState({});
  const [messages, setMessages] = useState({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const tabs = ["All Package", "Package Basic", "Package Pro", "Package Expert"];

  // ✅ Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getUserPackages();
        console.log("Fetched packages:", data);
        setPackages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // ✅ Renew package
  const handleRenew = debounce(async (packageId) => {
    setSubmitting((prev) => ({ ...prev, [packageId]: true }));
    setMessages((prev) => ({ ...prev, [packageId]: null }));

    try {
      await renewUserPackage(packageId);
      setMessages((prev) => ({
        ...prev,
        [packageId]: { type: "success", text: "Package renewed successfully!" },
      }));

      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === packageId ? { ...pkg, status: "active" } : pkg
        )
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error === "Forbidden for admin"
          ? "You don’t have permission to renew this package."
          : error.response?.data?.message || "Failed to renew package.";
      setMessages((prev) => ({
        ...prev,
        [packageId]: { type: "error", text: errorMessage },
      }));
    } finally {
      setSubmitting((prev) => ({ ...prev, [packageId]: false }));
    }
  }, 300);

  // ✅ Filter packages by tab
  const filteredPackages =
    activeTab === "All Package"
      ? packages
      : packages.filter((pkg) => pkg.name === activeTab);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // ✅ Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin text-[#F8983B]" size={26} />
        <p className="ml-3 text-gray-600 dark:text-gray-300">
          Loading packages...
        </p>
      </div>
    );
  }

  // ✅ Render UI
  return (
    <div className="bg-white dark:bg-neutral-900 dark:text-white p-6 rounded-xl border border-gray-100 mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        My Packages 
      </h2>

      {/* Tabs */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-700 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-8 pb-2 text-sm font-medium ${
              activeTab === tab
                ? "text-gray-900 dark:text-white border-b-2 border-black dark:border-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {currentPackages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="text-gray-400 mb-3 w-10 h-10" />
          <p className="text-gray-500 dark:text-gray-300 font-medium text-sm">
            No Package Data Available
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPackages.map((pkg) => {
              const isLoading = submitting[pkg.id] || false;
              const message = messages[pkg.id];
              const isActive = pkg.status === "active";

              return (
                <div
                  key={pkg.id}
                  className="border dark:border-neutral-700 rounded-lg p-5 bg-gray-50 dark:bg-neutral-800"
                >
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                    Price:{" "}
                    <span className="font-medium text-[#F8983B]">
                      {pkg.isFree ? "Free" : `$${pkg.price}`}
                    </span>
                  </p>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        isActive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isActive ? "Active" : "Expired"}
                    </span>
                  </p>

                  {message && (
                    <div
                      role="alert"
                      className={`flex items-center gap-2 mt-4 px-3 py-2 rounded-md text-sm font-medium ${
                        message.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {message.type === "success" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {message.text}
                    </div>
                  )}

                  <button
                    onClick={() => handleRenew(pkg.id)}
                    disabled={isLoading || isActive}
                    className={`mt-4 text-sm px-4 py-2 rounded-full text-white font-medium transition ${
                      isLoading || isActive
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#00A991] hover:opacity-90"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2
                          size={18}
                          className="inline-block animate-spin mr-2"
                        />
                        Renewing...
                      </>
                    ) : isActive ? (
                      "Active"
                    ) : (
                      "Renew"
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* ✅ Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm rounded-full border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-700 dark:text-white border-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              Prev
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm rounded-full border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-700 dark:text-white border-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserPackagesSection;







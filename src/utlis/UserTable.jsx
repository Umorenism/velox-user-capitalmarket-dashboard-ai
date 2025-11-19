
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transactions = [
  { id: 1, username: "John Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567", userType: "Admin" },
  { id: 2, username: "Jane Smith", email: "jane.smith@example.com", phone: "+1 (555) 987-6543", userType: "User" },
  { id: 3, username: "Michael Johnson", email: "michael.johnson@example.com", phone: "+1 (555) 222-3333", userType: "Leader" },
  { id: 4, username: "Emily Davis", email: "emily.davis@example.com", phone: "+1 (555) 444-5555", userType: "User" },
  { id: 5, username: "Robert Brown", email: "robert.brown@example.com", phone: "+1 (555) 666-7777", userType: "Admin" },
];

const UserTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "activity" or "fund"
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setModalType("");
  };

  return (
    <div className="p-5 bg-white dark:bg-neutral-800 min-h-auto dark:text-white rounded-xl shadow-md relative">
      <div className="flex justify-between items-center mb-3">
        <div className="flex dark:text-white items-center gap-2 text-sm text-gray-700">
          <span>Showing</span>
          <select
            className="border dark:text-white border-gray-300 rounded-md text-sm px-2 py-1"
            defaultValue="10"
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mt-5 border border-gray-200 text-sm">
          <thead className="bg-gray-50 dark:bg-neutral-800 dark:text-white text-gray-700">
            <tr>
              {["S/N", "Username", "Email Address", "Phone Number", "User Type", "Action"].map((heading) => (
                <th key={heading} className="px-4 py-3 text-left font-medium border-b border-gray-200">
                  <div className="flex items-center gap-1">
                    {heading}
                    <span className="text-gray-400 cursor-pointer">⇅</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-gray-700 dark:text-white">
            {transactions.map((user, index) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.userType}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Activity Button */}
                    <button
                      onClick={() => handleOpenModal(user, "activity")}
                      className="border border-[#00A991] text-[#00A991] hover:bg-[#00A991] hover:text-white text-xs font-medium px-4 py-1.5 rounded-full transition duration-200"
                    >
                      Activity
                    </button>

                    {/* Fund Package Button */}
                    <button
                      onClick={() => handleOpenModal(user, "fund")}
                      className="bg-[#00A991] text-white hover:bg-[#008f7b] text-xs font-medium px-4 py-1.5 rounded-full transition duration-200"
                    >
                      Fund Package
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-white">
        <div className="mt-5">
          Page <span className="font-semibold">1</span> of{" "}
          <span className="font-semibold">1</span>
        </div>

        <div className="flex mt-5 items-center gap-3">
          <button className="text-gray-400 hover:text-gray-700">Previous</button>
          <button className="bg-orange-500 text-white px-2 py-1 rounded-full">1</button>
          <button className="text-gray-400 hover:text-gray-700">Next</button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>

              {/* Activity Modal UI */}
              {modalType === "activity" && (
                <>
                  <h1 className="text-xl font-semibold text-start dark:text-white text-black mb-4">
                    Activate Package for User 837673
                  </h1>
                  <p>Are you sure you want to activate this user package</p>

                  <div className="flex items-center justify-between gap-4 mt-6 w-full">
                    <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-10 py-2 rounded-lg shadow transition duration-300 w-full">
                      Yes, Activate
                    </button>
                    <button
                      onClick={handleCloseModal}
                      className="bg-white w-full text-gray-700 border border-gray-300 hover:bg-gray-100 font-medium px-10 py-2 rounded-lg shadow transition duration-300"
                    >
                      No, Cancel
                    </button>
                  </div>
                </>
              )}

              {/* Fund Package Modal UI */}
              {modalType === "fund" && (
                <>
                  <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-md max-w-lg mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold text-start dark:text-[#ffff] text-black mb-4">
        Fund Package for User 387393
      </h1>

      {/* Label */}
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        Package Type <span className="text-red-500">*</span>
      </p>

      {/* Input */}
      <div className="mb-6">
  <select
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A991] text-gray-700 dark:text-white dark:bg-neutral-800"
    defaultValue=""
  >
    <option value="" disabled>
      Select package type...
    </option>
    <option value="basic">Basic Package</option>
    <option value="standard">Standard Package</option>
    <option value="premium">Premium Package</option>
    <option value="gold">Gold Package</option>
  </select>
</div>


      {/* Buttons */}
      <div className="flex items-center justify-between gap-4 w-full">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-10 py-2 rounded-lg shadow transition duration-300 w-full">
          Fund package for user 836573938
        </button>

        
      </div>
    </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserTable;


import React from "react";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

const RoleDetails = () => {
  const grantedPermissions = [
    "View all users",
    "View all reserved accounts",
    "Export and download transactions",
    "Manage online transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
  ];

  const notGrantedPermissions = [
    "View all users",
    "View all reserved accounts",
    "Export and download transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
    "Manage online and offline transactions",
  ];

  return (
    <motion.div
      className="w-full mx-auto dark:bg-neutral-800 dark:text-white p-6 bg-white rounded-xl shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Role Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 dark:bg-neutral-800 dark:text-white">Role 1</h2>
        <p className="text-gray-600 dark:bg-neutral-800 dark:text-white text-sm leading-relaxed max-w-3xl">
          This is a customer support officer role, which provides the users with
          customer service information and explanations on how to navigate the
          platforms.
        </p>
      </div>

      {/* Members Badge */}
      <div className="inline-flex items-center dark:bg-neutral-800 dark:text-white gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-md border border-gray-200 mb-6">
        <FiTrash2 className="text-gray-500 dark:bg-neutral-800 dark:text-white" />
        You currently have <span className="font-medium dark:bg-neutral-800 dark:text-white">6 members</span> with this role
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Permissions Section */}
      <div className="grid grid-cols-1 dark:bg-neutral-800 dark:text-white md:grid-cols-2 gap-6">
        {/* Granted Permissions */}
        <motion.div
          className="border border-gray-200 dark:bg-neutral-800 dark:text-white rounded-lg p-5 bg-gray-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-teal-600 dark:bg-neutral-800 dark:text-white font-semibold mb-4">
            Permission granted to this role
          </h3>
          <ul className="space-y-2 dark:bg-neutral-800 dark:text-white text-gray-700 text-sm list-disc list-inside">
            {grantedPermissions.map((perm, idx) => (
              <li key={idx}>{perm}</li>
            ))}
          </ul>
        </motion.div>

        {/* Not Granted Permissions */}
        <motion.div
          className="border border-gray-200 dark:bg-neutral-800 dark:text-white rounded-lg p-5 bg-gray-50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-gray-800 dark:bg-neutral-800 dark:text-white font-semibold mb-4">
            Permission not granted to this role
          </h3>
          <ul className="space-y-2 dark:bg-neutral-800 dark:text-white text-gray-700 text-sm list-disc list-inside">
            {notGrantedPermissions.map((perm, idx) => (
              <li key={idx}>{perm}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RoleDetails;

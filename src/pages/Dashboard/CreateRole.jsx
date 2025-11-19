
import React from "react";
import { motion } from "framer-motion";
import { RiMenuFoldLine } from "react-icons/ri";
import RolesList from "../../utlis/RoleList";
import RoleDetails from "../../utlis/RoleDetailsTwo";
import RoleForm from "../../utlis/RoleForm";

export default function CreateRole() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-start w-full bg-gray-50 dark:bg-neutral-900 dark:text-white min-h-screen px-4 sm:px-6 py-6"
    >
      {/* Wrapper */}
      <motion.div
        variants={fadeUp}
        className="w-full max-w-[1600px] dark:bg-neutral-800 p-4 sm:p-6 transition-all duration-300"
      >
        {/* Header Section */}
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-3">
            <RiMenuFoldLine
              size={28}
              className="text-gray-800 dark:text-gray-100"
            />
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Create New Role
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="border bg-[#00A991] border-green-500 text-white hover:bg-green-50 dark:hover:bg-white px-4 py-2 rounded-lg text-sm font-medium transition">
             Create Role
            </button>
           
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <RoleForm/>
        </div>
      </motion.div>
    </motion.div>
  );
}

import React from 'react'
import { motion } from 'framer-motion'

export default function Setting() {
  return (
    <div className="min-h-screen dark:bg-neutral-800 dark:text-white w-full bg-gray-50 flex justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl dark:bg-neutral-800 dark:text-white bg-white rounded-2xl shadow-lg p-8"
      >
        {/* Page Title */}
        <h1 className="text-3xl dark:bg-neutral-800 dark:text-white font-bold text-gray-800 mb-6">User Settings</h1>

        {/* Profile Section */}
        <section className="mb-10 dark:bg-neutral-800 dark:text-white">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 dark:bg-neutral-800 dark:text-white">Profile Information</h2>
          <div className="grid grid-cols-1 dark:bg-neutral-800 dark:text-white md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:bg-neutral-800 dark:text-white">Full Name</label>
              <input
                type="text"
                className="w-full dark:bg-neutral-800 dark:text-white dark:border-white mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm dark:text-white text-gray-600">Email Address</label>
              <input
                type="email"
                className="w-full dark:text-white dark:border-white dark:bg-neutral-800 mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm dark:text-white text-gray-600">Phone Number</label>
              <input
                type="text"
                className="w-full dark:text-white dark:border-white dark:bg-neutral-800 mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Country</label>
              <input
                type="text"
                className="w-full dark:text-white dark:border-white dark:bg-neutral-800 mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="Enter your country"
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="mb-10">
          <h2 className="text-lg dark:text-white font-semibold text-gray-700 mb-4">Security</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 dark:text-white">Current Password</label>
              <input
                type="password"
                className="w-full dark:bg-neutral-800 dark:text-white dark:border-white mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-white">New Password</label>
              <input
                type="password"
                className="w-full dark:bg-neutral-800 dark:text-white dark:border-white mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-white">Confirm New Password</label>
              <input
                type="password"
                className="w-full dark:bg-neutral-800 dark:text-white dark:border-white mt-1 px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  )
}

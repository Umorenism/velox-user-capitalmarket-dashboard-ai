import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ← FIXED: Open by default

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:flex`}
      >
        <SideBar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 dark:bg-neutral-900 dark:text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
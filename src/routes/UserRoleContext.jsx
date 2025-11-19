// src/routes/UserRoleContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { clearAuthData } from "../api/authApi"; // ← CORRECT PATH
const UserRoleContext = createContext(undefined);

export const UserRoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);

  // ---- restore from localStorage (fast UI) ----
  useEffect(() => {
    const saved = localStorage.getItem("userRole");
    if (saved === "trading" || saved === "academy") {
      setRoleState(saved);
    }
  }, []);

  // ---- lock: can be set **once** only ----
  const setRole = (newRole) => {
    if (role !== null) {
      console.warn("Role already locked →", role);
      return;
    }
    if (!["trading", "academy"].includes(newRole)) return;
    setRoleState(newRole);
    localStorage.setItem("userRole", newRole);
  };

  const clearRole = () => {
    setRoleState(null);
    localStorage.removeItem("userRole");
    clearAuthData();
  };

  const hasPackage = role !== null;
  const isFullAccess = () => role === "trading";
  const isAcademy   = () => role === "academy";

  return (
    <UserRoleContext.Provider
      value={{ role, setRole, clearRole, hasPackage, isFullAccess, isAcademy }}
    >
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = () => {
  const ctx = useContext(UserRoleContext);
  if (!ctx) throw new Error("useUserRole must be inside UserRoleProvider");
  return ctx;
};
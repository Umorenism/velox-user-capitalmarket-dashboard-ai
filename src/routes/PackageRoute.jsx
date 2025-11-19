// src/routes/PackageRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

export function PackageRoute({ children, allowedPackages = [] }) {
  const { userState, isTokenValid } = useUser();
  const location = useLocation();

  if (!userState?.package || !isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  const userPackage = userState.package;

  // If no restriction → allow
  if (allowedPackages.length === 0) return children;

  // If user package is not in allowed list → redirect
  if (!allowedPackages.includes(userPackage)) {
    // Academy users → force to academy home
    if (userPackage === "academy") {
      return <Navigate to="/dashboard/academy/courses" replace state={{ from: location }} />;
    }
    // Trading users → go to main dashboard
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
}
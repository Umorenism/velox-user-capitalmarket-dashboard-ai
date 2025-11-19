// src/routes/RoleRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../routes/UserContext";

export function RoleRoute({ children, allowedRoles = [] }) {
  const { userState, isTokenValid } = useUser();
  const location = useLocation();

  // Not logged in → go to login
  if (!isTokenValid()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // No role yet → should not happen (login handles this)
  if (!userState) {
    return <Navigate to="/login" replace />;
  }

  // If no restriction → allow
  if (allowedRoles.length === 0) return children;

  // If user role is NOT allowed → redirect
  if (!allowedRoles.includes(userState)) {
    if (userState === "academy") {
      return <Navigate to="/academy/courses" replace state={{ from: location }} />;
    }
    if (userState === "trading") {
      return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }
  }

  return children;
}
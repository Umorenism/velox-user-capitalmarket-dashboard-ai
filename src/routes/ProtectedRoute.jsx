// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useUser } from "./UserContext";

// export const ProtectedRoute = ({ children }) => {
//   const { user, isTokenValid, loading } = useUser();

//   // ⏳ Wait for token validation
//   if (loading) return <div className="text-center mt-20">Loading...</div>;

//   // ❌ No valid token → back to login
//   if (!isTokenValid() || !user) {
//     return <Navigate to="/login" replace />;
    
//   }

//   // ✅ Authorized → show the page
//   return children;
// };





// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { useUserRole } from "./UserRoleContext";

export const ProtectedRoute = ({ children }) => {
  const { user, isTokenValid, loading } = useUser();
  const { hasPackage } = useUserRole();

  if (loading) return <div className="text-center mt-20">Loading…</div>;

  if (!isTokenValid() || !user) return <Navigate to="/login" replace />;

  // If user has a token but never chose a package → force modal
  if (!hasPackage) return <Navigate to="/login" replace />;

  return children;
};
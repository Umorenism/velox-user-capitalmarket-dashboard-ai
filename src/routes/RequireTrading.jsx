// src/routes/RequireTrading.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../routes/UserContext";

export default function RequireTrading({ children }) {
  const { userState, user } = useUser();
  const location = useLocation();
  const packageType = userState?.package || user?.package;

  if (packageType !== "trading") {
    return <Navigate to="/academy/dashboard" replace state={{ from: location }} />;
  }

  return children;
}
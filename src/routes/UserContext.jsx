
import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, signUpUser, getUserProfile } from "../api/authApi";
import {
  fetchUserState as fetchStateAPI,
  updateUserState as updateStateAPI,
} from "../api/userApi";
import { apiClient } from "../api/apiClient";

// -----------------------------
// Token validation
// -----------------------------
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      return false;
    }
    return true;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};

// -----------------------------
// Context
// -----------------------------
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Attach token to axios
  const attachToken = (token) => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  };

  // Load user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid()) {
      attachToken(token);
      getUserProfile()
        .then((res) => {
          const profile = res.user || res;
          setUser(profile);
          localStorage.setItem("user", JSON.stringify(profile));
        })
        .catch(logout)
        .finally(() => setLoading(false));
    } else {
      logout();
      setLoading(false);
    }
  }, []);

  // -----------------------------
  // Login
  // -----------------------------
  const login = async ({ prefix, email, password }) => {
    setAuthLoading(true);
    try {
      const res = await loginUser({ prefix, email, password });
      if (res?.token) {
        localStorage.setItem("token", res.token);
        attachToken(res.token);

        // Fetch fresh profile (includes userState)
        const profileRes = await getUserProfile();
        const profile = profileRes.user || profileRes;

        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
      return res;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  // -----------------------------
  // Signup
  // -----------------------------
  const signup = async (data) => {
    setAuthLoading(true);
    try {
      const res = await signUpUser(data);
      if (res?.token) {
        localStorage.setItem("token", res.token);
        attachToken(res.token);
        const profile = res.user || {};
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
      return res;
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    
    setUser(null);
    attachToken(null);

    
  };

  const fetchUserState = async () => {
    return fetchStateAPI();
  };

  const updateUserState = async (payload) => {
    const res = await updateStateAPI(payload); // PUT
    if (res?.user) {
      const updated = { ...res.user };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));

      localStorage.setItem("userRole", updated.userState);
    }
    return res;
  };

  const isTradingUser = user?.userState === "Trading";

  const userState = user?.userState || "";

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        loading,
        authLoading,
        isTokenValid,
        fetchUserState,
        updateUserState,
        isTradingUser,
        userState, // ← NEW: use this anywhere!
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// -----------------------------
// Custom Hook
// -----------------------------
export const useUser = () => useContext(UserContext);

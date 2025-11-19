// src/api/userApi.js
import { apiClient } from "./apiClient";

/**
 * ✅ Fetch user state — backend has no GET /api/users/state,
 * so we fallback to /api/users/profile
 */
export const fetchUserState = async () => {
  try {
    const res = await apiClient.get("/api/users/profile");
    return res.data.user || {};
  } catch (error) {
    console.warn("Failed to fetch user profile:", error.message);
    return { userState: "" };
  }
};

/**
 * ✅ Update user state — backend supports PUT /api/users/state
 * payload: { userState: "online" }
 */
export const updateUserState = async (payload) => {
  try {
    const res = await apiClient.put("/api/users/state", payload);
    return res.data; // { message, user }
  } catch (error) {
    console.error("Failed to update user state:", error.response?.data || error.message);
    throw error;
  }
};


// export const updateUserState = async (payload) => {
//   // payload = { userState: "trading" }  or  { userState: "academy" }
//   const res = await apiClient.put("/users/state", payload);
//   return res.data;               // { message, user: { …, userState: "trading" } }
// };

// export const fetchUserState = async () => {
//   const res = await apiClient.get("/users/state");   // you already have a GET
//   return res.data;
// };

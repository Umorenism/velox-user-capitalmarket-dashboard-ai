







// src/api/apiClient.js
import axios from "axios";

const base_url = "https://backend.veloxcapitalmarkets.ai";

export const apiClient = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("⚠️ Session expired, logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);






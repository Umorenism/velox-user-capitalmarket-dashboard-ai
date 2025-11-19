import { apiClient } from "./apiClient";

/**
 * ✅ User Login
 * Endpoint: POST /api/auth/login
 * Body: { prefix, email, password }
 */
export const loginUser = async (loginData) => {
  try {
    const res = await apiClient.post("/api/auth/login", loginData);
    return res.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ User Sign Up
 * Endpoint: POST /api/auth/signup
 * Body: { email, password, name, phone, prefix }
 */
export const signUpUser = async (userData) => {
  try {
    const res = await apiClient.post("/api/auth/signup", userData);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};
export const forgetPassword = async (forgetData) => {
  try {
    const res = await apiClient.post("/api/auth/forgot-password", forgetData);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};
export const resetPassword = async (forgetData) => {
  try {
    const res = await apiClient.post("api/auth/reset-password", forgetData);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Verify Email
 * Endpoint: POST /api/auth/verify-email
 * Body: { email, code }
 * - Normalized to handle "Email already verified" as success
 */
export const verifyEmail = async (verifyData) => {
  try {
    const res = await apiClient.post("/api/auth/verify-email", verifyData);
    const data = res.data;

    // Normalize backend responses for smoother handling
    if (
      data?.error?.toLowerCase()?.includes("already verified") ||
      data?.message?.toLowerCase()?.includes("already verified")
    ) {
      return {
        success: true,
        message: "Email already verified. Redirecting to login...",
      };
    }

    return data;
  } catch (error) {
    console.error(
      "Email verification failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * ✅ Resend Verification Code
 * Endpoint: POST /api/auth/resend-verification
 * Body: { email }
 */
export const resendVerificationEmail = async (emailData) => {
  try {
    const res = await apiClient.post("/api/auth/resend-verification", emailData);
    return res.data;
  } catch (error) {
    console.error("Resend verification failed:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Get User Profile
 * Endpoint: GET /api/users/profile
 * Headers: { Authorization: Bearer token }
 */
export const getUserProfile = async (token) => {
  try {
    const res = await apiClient.get("/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Profile response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Failed to fetch user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};



export const clearAuthData = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userRole");
  localStorage.removeItem("pendingPaymentId");
  localStorage.removeItem("depositInitiatedAt");
  // Add any other keys you store on login
  console.log("Auth data cleared from storage");
};
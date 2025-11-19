import { apiClient } from "./apiClient";

// ✅ Get all packages
// export const getUserPackages = async () => {
//   const response = await apiClient.get("api/users/packages");
//   console.log("fetchpackages:",response.data)
//   return response.data;
// };


export const getUserPackages = async (token) => {
  const res = await apiClient.get("/api/users/packages", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Buy a package
export const buyUserPackage = async (packageId) => {
  const response = await apiClient.post("api/users/package/buy", { packageId });
  console.log("Buy Package Response:", response.data);
  return response.data;
};

// ✅ Renew a package
export const renewUserPackage = async (packageId) => {
  const response = await apiClient.post("api/users/package/renew", { packageId });
  console.log("Renew Package Response:", response.data);
  return response.data;
};


// In your API file
export const upgradeUserPackage = async (packageId, token) => {
  const res = await apiClient.post(
    "/api/users/upgrade-package",
    { packageId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
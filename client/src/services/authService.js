import api from "./api";

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const loginWithGoogle = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};

export const logout = async () => {
  await api.get("/auth/logout");
};

import axios from "axios";
import { API_BASE } from "../utils/constants";

// 🔥 ADD THIS HERE
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: { Authorization: `Bearer ${user?.token}` }
  };
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_BASE}/auth/login`, data);

  localStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

export const registerUser = async (data) => {
  const res = await axios.post(`${API_BASE}/auth/register`, data);

  localStorage.setItem("user", JSON.stringify(res.data));
  return res;
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};


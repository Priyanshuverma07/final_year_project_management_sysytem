import axios from "axios";
import { API_BASE } from "../utils/constants";

const API = axios.create({
  baseURL: API_BASE,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

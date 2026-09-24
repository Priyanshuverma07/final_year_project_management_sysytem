import axios from "axios";
import { API_BASE } from "../utils/constants";
import { authHeader } from "./authApi";   // 🔥 use central auth

// 🧑‍🎓 Get assigned mentor
export const getMyMentor = () =>
  axios.get(`${API_BASE}/mentee/my-mentor`, authHeader());

// 🧑‍🎓 Get mentee meetings
export const getMyMeetings = () =>
  axios.get(`${API_BASE}/mentee/meetings`, authHeader());

// 🧑‍🎓 Send feedback
export const giveFeedback = (data) =>
  axios.post(`${API_BASE}/feedback`, data, authHeader());



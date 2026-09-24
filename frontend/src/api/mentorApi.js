import axios from "axios";
import { API_BASE } from "../utils/constants";

const token = () => JSON.parse(localStorage.getItem("user"))?.token;

const authConfig = () => ({
  headers: { Authorization: `Bearer ${token()}` },
});

// 📥 Get feedback given to this mentor
export const getMyFeedbacks = () =>
  axios.get(`${API_BASE}/mentor/feedback`, authConfig());

// ✍️ Reply to feedback
export const replyToFeedback = (id, response) =>
  axios.put(
    `${API_BASE}/feedback/reply/${id}`,
    { response },      // backend expects { response: "text" }
    authConfig()
  );
 
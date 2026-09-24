import axios from "axios";

export const getActivityLogs = (params) => {
  return axios.get("http://localhost:5000/api/v1/admin/activity-logs", {
    params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


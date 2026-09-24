import { useEffect, useState } from "react";
import { getFeedbacks } from "../../api/adminApi";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await getFeedbacks();
      setFeedbacks(res.data.feedbacks);
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="feedback-monitor">
      <h2>📝 Feedback Monitor</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Supervisor</th>
            <th>Feedback</th>
            <th>Supervisor Reply</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(f => (
            <tr key={f._id}>
              <td>{f.menteeId?.name}</td>
              <td>{f.mentorId?.name}</td>
              <td>{f.feedbackText}</td>
              <td>{f.response || "No reply yet"}</td>
              <td>{new Date(f.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;

import { useEffect, useState } from "react";
import { getMyFeedbacks, replyToFeedback } from "../../api/mentorApi";

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getMyFeedbacks().then(res => setFeedbacks(res.data.feedbacks));
  }, []);

  const reply = async (id) => {
    const text = prompt("Reply:");
    if (!text) return;

    await replyToFeedback(id, text);
    alert("Reply sent");
  };

  return (
    <div className="feedback-page">
  <h2 className="feedback-page-title">Student Feedback</h2>

  {feedbacks.map(f => (
    <div key={f._id} className="feedback-item">

      <p className="feedback-subject"><span>Subject:</span> {f.subject}</p>
      <p className="feedback-message">{f.message}</p>
      <p className="feedback-rating"><span>Rating:</span> {f.rating} ⭐</p>

      {!f.response && (
        <button className="feedback-reply-btn" onClick={() => reply(f._id)}>
          Reply
        </button>
      )}

      {f.response && (
        <p className="feedback-response"><span>Reply:</span> {f.response}</p>
      )}

    </div>
  ))}
</div>

  );
};

export default ViewFeedback;


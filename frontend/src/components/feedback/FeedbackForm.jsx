import { useEffect, useState } from "react";
import { getMyMentor, giveFeedback } from "../../api/menteeApi";

const GiveFeedback = () => {
  const [mentor, setMentor] = useState(null);
  const [form, setForm] = useState({ subject: "", message: "", rating: 5 });

  useEffect(() => {
    getMyMentor().then(res => setMentor(res.data.mentor));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await giveFeedback({
      mentorId: mentor._id,
      ...form
    });

    alert("Feedback submitted");
  };

  return (
    <div className="feedback-wrapper">

  {mentor && (
    <div className="feedback-card">
      <p className="mentor-name">Mentor: {mentor.name}</p>

      <form className="feedback-form" onSubmit={handleSubmit}>

        <input
          className="feedback-input"
          placeholder="Subject"
          onChange={e => setForm({ ...form, subject: e.target.value })}
        />

        <textarea
          className="feedback-textarea"
          placeholder="Your message"
          onChange={e => setForm({ ...form, message: e.target.value })}
        />

        <select
          className="feedback-select"
          onChange={e => setForm({ ...form, rating: e.target.value })}
        >
          <option value="5">5 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="1">1 ⭐</option>
        </select>

        <button className="feedback-submit" type="submit">
          Submit Feedback
        </button>

      </form>
    </div>
  )}

</div>

  );
};

export default GiveFeedback;


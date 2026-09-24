import { useEffect, useState } from "react";
import { getMyMentor, giveFeedback } from "../../api/menteeApi";
import FeedbackForm from "../../components/feedback/FeedbackForm";

const GiveFeedback = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    getMyMentor().then(res => setMentor(res.data.mentor));
  }, []);

  const handleSubmit = async (formData) => {
    await giveFeedback({
      mentorId: mentor._id,
      ...formData
    });

    alert("Feedback submitted!");
  };

  return (
    <div className="feedback-wrapper">
  <div className="feedback-card">
    <h2 className="feedback-title">Give Feedback</h2>
    {mentor && <FeedbackForm onSubmit={handleSubmit} mentor={mentor} />}
  </div>
</div>

  );
};

export default GiveFeedback;


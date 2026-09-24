import { useEffect, useState } from "react";
import { getMyMentor } from "../../api/menteeApi";
import { Link } from "react-router-dom";


const MenteeDashboard = () => {
  const [mentor, setMentor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMentor = async () => {
      try {
        const res = await getMyMentor();
        setMentor(res.data.mentor);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading mentor");
      }
    };
    loadMentor();
  }, []);

  return (
    <div className="mentor-wrapper">

  {mentor && (
    <>
      <div className="mentor-card">
        <p><span>Mentor:</span> {mentor.name}</p>
        <p><span>Email:</span> {mentor.email}</p>
        <p><span>Department:</span> {mentor.department}</p>
      </div>

      <div className="mentor-action">
        <Link to="/mentee/give-feedback">
          <button className="feedback-btn">Give Feedback</button>
        </Link>
      </div>
    </>
  )}

  {!mentor && !error && <p className="mentor-loading">Loading Supervisor...</p>}
  {error && <p className="mentor-error">{error}</p>}

</div>

  );
};

export default MenteeDashboard;


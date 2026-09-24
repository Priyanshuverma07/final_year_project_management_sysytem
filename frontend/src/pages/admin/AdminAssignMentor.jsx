import { useEffect, useState } from "react";
import API from "../../api/axiosInstance";

const AdminAssignMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [mentorId, setMentorId] = useState("");
  const [menteeId, setMenteeId] = useState("");

  useEffect(() => {
    API.get("/admin/mentors").then(res => setMentors(res.data.mentors));
    API.get("/admin/mentees").then(res => setMentees(res.data.mentees));
  }, []);

  const handleAssign = async () => {
    await API.post("/admin/assign", { mentorId, menteeId });
    alert("Mentor Assigned Successfully!");
  };

  return (
   <div className="assign-wrapper">
  <div className="assign-card">
    <h2 className="assign-title">Assign Student to Supervisor</h2>

    <select
      className="assign-select"
      onChange={e => setMentorId(e.target.value)}
    >
      <option>Select Supervisor</option>
      {mentors.map(m => (
        <option key={m._id} value={m._id}>{m.name}</option>
      ))}
    </select>

    <select
      className="assign-select"
      onChange={e => setMenteeId(e.target.value)}
    >
      <option>Select Student</option>
      {mentees.map(m => (
        <option key={m._id} value={m._id}>{m.name}</option>
      ))}
    </select>

    <button className="assign-btn" onClick={handleAssign}>
      Assign
    </button>
  </div>
</div>

  );
};

export default AdminAssignMentor;

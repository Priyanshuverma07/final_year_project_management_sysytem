import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../../utils/constants";

const token = () => JSON.parse(localStorage.getItem("user"))?.token;

const ScheduleMeeting = () => {
  const [form, setForm] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    // 🔥 ADD THIS BLOCK
    let fixedLink = form.meetingLink;
    if (fixedLink && !fixedLink.startsWith("http")) {
      fixedLink = "https://" + fixedLink;
    }

    const payload = {
      mentorId: form.mentorId,
      menteeId: form.menteeId,
      topic: form.topic,
      meetingLink: fixedLink,   // 🔥 CHANGE THIS LINE
      notes: form.notes,
      meetingTime: new Date(form.meetingTime).toISOString()
    };

    console.log("SENDING DATA 👉", payload);

    await axios.post(
      `${API_BASE}/admin/schedule-meeting`,
      payload,
      { headers: { Authorization: `Bearer ${token()}` } }
    );

    alert("Meeting Scheduled ✅");

  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Scheduling failed ❌");
  }
};


  return (
    <div className="meeting-wrapper">
  <div className="meeting-card">
    <h2 className="meeting-title">Schedule Meeting</h2>

    <form className="meeting-form" onSubmit={handleSubmit}>

      <input
        className="meeting-input"
        placeholder="Supervisor ID"
        onChange={(e) => setForm({ ...form, mentorId: e.target.value })}
      />

      <input
        className="meeting-input"
        placeholder="Student ID"
        onChange={(e) => setForm({ ...form, menteeId: e.target.value })}
      />

      <input
        className="meeting-input"
        placeholder="Topic"
        onChange={(e) => setForm({ ...form, topic: e.target.value })}
      />

      <input
        className="meeting-input"
        type="datetime-local"
        onChange={(e) => setForm({ ...form, meetingTime: e.target.value })}
      />

      <input
        className="meeting-input"
        placeholder="Meeting Link"
        onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
      />

      <textarea
        className="meeting-textarea"
        placeholder="Notes"
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <button className="meeting-btn" type="submit">
        Schedule
      </button>

    </form>
  </div>
</div>

  );
};

export default ScheduleMeeting;

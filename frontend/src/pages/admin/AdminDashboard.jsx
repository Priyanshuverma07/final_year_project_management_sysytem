import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
   <div className="admin-wrapper">
  <h2 className="admin-title">Admin Control Panel</h2>

  <div className="admin-grid">

    <Link to="/admin/activity" className="admin-card">
      <span>📊</span>
      <p>View System Activity</p>
    </Link>

    <Link to="/admin/schedule-meeting" className="admin-card">
      <span>📅</span>
      <p>Schedule Meeting</p>
    </Link>

    <Link to="/admin/users" className="admin-card">
      <span>👥</span>
      <p>Supervisors & Students</p>
    </Link>

    <Link to="/admin/feedbacks" className="admin-card">
      <span>📝</span>
      <p>Feedback Reports</p>
    </Link>

    <Link to="/admin/assign" className="admin-card">
      <span>🤝</span>
      <p>Assign Student to Supervisor</p>
    </Link>

  </div>
</div>
  );
} 

export default AdminDashboard;



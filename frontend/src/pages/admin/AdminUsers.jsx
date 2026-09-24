import { useEffect, useState } from "react";
import { getMentors, getMentees } from "../../api/adminApi";

const AdminUsers = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const mRes = await getMentors();
      const meRes = await getMentees();
      setMentors(mRes.data.mentors);
      setMentees(meRes.data.mentees);
    };
    fetchUsers();
  }, []);

  return (
    <div className="admin-users">
      <h2>👨‍🏫 Supervisors</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {mentors.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>🎓 Students</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th></tr>
        </thead>
        <tbody>
          {mentees.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

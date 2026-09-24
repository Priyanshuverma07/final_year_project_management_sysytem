import { useState } from "react";
import { registerUser } from "../../api/authApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";


const Register = () => {
  const [role, setRole] = useState("mentee");
  const [form, setForm] = useState({});

const navigate = useNavigate();
const { login } = useContext(AuthContext);


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await registerUser({ ...form, role });

    login(res.data);

    if (res.data.role === "mentee") navigate("/mentee");
    else if (res.data.role === "mentor") navigate("/mentor");
    else if (res.data.role === "admin") navigate("/admin");

  } catch (err) {
    console.log(err.response?.data);

    const message =
      err.response?.data?.errors?.join(", ") ||
      err.response?.data?.message ||
      "Registration failed";

    alert(message);
  }
};


  return (
    <div className="auth-container">
  <form className="auth-card" onSubmit={handleSubmit}>
    <h2>Create Account</h2>
    <p className="subtitle">Join our community as a {role}</p>

    {/* Role Selection */}
    <div className="input-group">
      <label>I am a...</label>
      <select className="auth-select" onChange={e => setRole(e.target.value)}>
        <option value="mentee">student</option>
        <option value="mentor">Supervisor</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {/* Common Fields */}
    <div className="input-group">
      <label>Full Name</label>
      <input placeholder="John Doe" onChange={e => setForm({ ...form, name: e.target.value })} />
    </div>

    <div className="input-group">
      <label>Email Address</label>
      <input type="email" placeholder="name@company.com" onChange={e => setForm({ ...form, email: e.target.value })} />
    </div>

    <div className="input-group">
      <label>Password</label>
      <input type="password" placeholder="••••••••" onChange={e => setForm({ ...form, password: e.target.value })} />
    </div>

    <div className="input-group">
      <label>Phone Number</label>
      <input placeholder="+1 (555) 000-0000" onChange={e => setForm({ ...form, phoneNo: e.target.value })} />
    </div>

    {/* Conditional Fields with a slight fade-in effect via CSS class */}
    <div className="dynamic-fields">
      {role === "Student" && (
        <>
          <div className="input-group">
            <label>University Roll No</label>
            <input placeholder="Enter Roll Number" onChange={e => setForm({ ...form, universityRollNo: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Department</label>
            <input placeholder="e.g. Computer Science" onChange={e => setForm({ ...form, department: e.target.value })} />
          </div>
          <div className="input-group">
            <label>Section</label>
            <input placeholder="e.g. A, B, or C" onChange={e => setForm({ ...form, section: e.target.value })} />
          </div>
        </>
      )}

      {role === "Supervisor" && (
        <div className="input-group">
          <label>Department</label>
          <input placeholder="e.g. Engineering" onChange={e => setForm({ ...form, department: e.target.value })} />
        </div>
      )}

      {role === "admin" && (
        <div className="input-group">
          <label>Admin Secret Key</label>
          <input type="password" placeholder="Enter Secret" onChange={e => setForm({ ...form, adminSecret: e.target.value })} />
        </div>
      )}
    </div>

    <button type="submit" className="auth-button">Register</button>

    <p className="auth-footer">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
  </form>
</div>
  );
};

export default Register;

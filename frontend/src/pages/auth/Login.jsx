import { useState, useContext } from "react";
import { loginUser } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);
    console.log("LOGIN RESPONSE 👉", res.data);

    // ✅ SAVE TOKEN
    localStorage.setItem("token", res.data.token);

    // ✅ SAVE ROLE
    localStorage.setItem("role", res.data.role);

    login(res.data);

    if (res.data.role === "admin") navigate("/admin");
    else if (res.data.role === "mentor") navigate("/mentor");
    else navigate("/mentee");

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};




  return (
   <div className="login-wrapper">
  <form className="login-card" onSubmit={handleSubmit}>
    <h2>Welcome Back</h2>
    <p className="subtitle">Please enter your details</p>
    
    <div className="input-group">
      <label>Email</label>
      <input 
        type="email"
        placeholder="Enter your email" 
        onChange={e => setForm({ ...form, email: e.target.value })} 
        required
      />
    </div>

    <div className="input-group">
      <label>Password</label>
      <input 
        placeholder="••••••••" 
        type="password" 
        onChange={e => setForm({ ...form, password: e.target.value })} 
        required
      />
    </div>

    <button type="submit" className="login-button">Login</button>

    <p className="signup-link">
      New user? <Link to="/register">Register here</Link>
    </p>
  </form>
</div>
  );
};

export default Login;

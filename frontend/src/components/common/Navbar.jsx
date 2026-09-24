import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToDashboard = () => {
    if (!user) return navigate("/login");

    if (user.role === "mentee") navigate("/mentee");
    else if (user.role === "mentor") navigate("/mentor");
    else if (user.role === "admin") navigate("/admin");
  };

  return (
    <nav className="nav-container">
      <div className="nav-inner">

        <div className="nav-left">
          <button className="nav-link-btn" onClick={goToDashboard}>
            Dashboard
          </button>
        </div>

        <div className="nav-center">
          <button className="nav-link-btn" onClick={() => navigate("/about")}>
            About
          </button>
        </div>

        <div className="nav-right">
          {user && <span className="nav-role-badge">{user.role}</span>}
          <button className="logout-action-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;



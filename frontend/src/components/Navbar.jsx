import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentuser = JSON.parse(
    localStorage.getItem("currentuser") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentuser");

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link
          className="navbar-brand fw-bold"
          to={token ? "/" : "/login"}
        >
          Project Collector
        </Link>

        <div className="navbar-nav ms-auto align-items-center">
          {token ? (
            <>
              <Link className="nav-link" to="/">
                Home
              </Link>

              <Link className="nav-link" to="/view-projects">
                Projects
              </Link>

              <Link className="nav-link" to="/add-project">
                Add Project
              </Link>

              <span className="nav-link text-white">
                {currentuser?.name || "User"}
              </span>

              <button
                className="btn btn-outline-light ms-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>

              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
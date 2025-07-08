import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        BeautyBook
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {token && user?.role === "admin" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                  to="/admin"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/staff" ? "active" : ""}`}
                  to="/staff"
                >
                  Staff
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/services" ? "active" : ""}`}
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/appointment" ? "active" : ""}`}
                  to="/appointment"
                >
                  Appointment
                </Link>
              </li>
            </>
          )}

          {token && user?.role === "staff" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/staff" ? "active" : ""}`}
                  to="/staff"
                >
                  Staff Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/appointments" ? "active" : ""}`}
                  to="/appointments"
                >
                  Appointments
                </Link>
              </li>
            </>
          )}

          {token && user?.role === "customer" && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/customer" ? "active" : ""}`}
                  to="/customer"
                >
                  Customer Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/appointments" ? "active" : ""}`}
                  to="/appointments"
                >
                  My Appointments
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

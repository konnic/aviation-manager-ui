import React from "react";
import { useLocation, Link } from "react-router-dom";

const NavBar = ({ navItems, title }) => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4 sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand">{title}</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  to={item.path}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

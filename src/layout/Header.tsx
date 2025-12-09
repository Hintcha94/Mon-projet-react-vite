import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Si on défile vers le bas → cacher le header
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowHeader(false);
      } else {
        // Si on remonte → montrer le header
        setShowHeader(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className="container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "white",
        transition: "transform 0.3s ease",
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        zIndex: 999,
      }}
    >
      <a className="navbar-brand" href="/">
        <img src="/images/logo1.png" alt="Logo" />
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        style={{ background: "grey" }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
                fontWeight: "bolder",
                textTransform: "uppercase",
                borderBottom: isActive ? "2px solid blue" : "none",
              })}
            >
              A propos
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/services"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
                fontWeight: "bolder",
                textTransform: "uppercase",
                borderBottom: isActive ? "2px solid blue" : "none",
              })}
            >
              Nos Services
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/solutions"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
                fontWeight: "bolder",
                textTransform: "uppercase",
                borderBottom: isActive ? "2px solid blue" : "none",
              })}
            >
              Nos Solutions
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "blue" : "black",
                fontWeight: "bolder",
                textTransform: "uppercase",
                borderBottom: isActive ? "2px solid blue" : "none",
              })}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

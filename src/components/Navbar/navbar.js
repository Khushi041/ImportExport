import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">E</div>

          <div className="logo-text">
            <h2>ExportSphere</h2>
            <span>Global Agricultural Exports</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#home">Home</a>
          </li>

          <li>
            <a href="#products">Products</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="#reach">Global Reach</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Right Side */}
        <div className="nav-actions">
          <button className="language-btn">
            🌍 EN
          </button>

          <button className="quote-btn">
            Request Quote →
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
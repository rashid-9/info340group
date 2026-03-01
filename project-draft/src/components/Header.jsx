import React from "react";
import { NavLink } from "react-router-dom";

const navStyle = ({ isActive }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  backgroundColor: isActive ? "#e8f0fe" : "transparent",
  color: isActive ? "#3b82f6" : "#555",
  fontWeight: isActive ? "600" : "400",
  fontFamily: "'Encode Sans Condensed', Sans-serif, Arial",
});

export default function Header() {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", backgroundColor: "white", borderBottom: "1px solid #eee", fontFamily: "'Encode Sans Condensed', Sans-serif, Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <NavLink to="/dashboard">
          <img src="/img/Adobe%20Express%20-%20file-3.png" alt="NutriTrack Logo" style={{ height: "50px", width: "auto" }} />
        </NavLink>
      </div>

      <nav>
        <ul style={{ display: "flex", listStyle: "none", gap: "8px", margin: 0, padding: 0 }}>
          <li><NavLink to="/dashboard" end style={navStyle}>Dashboard</NavLink></li>
          <li><NavLink to="/log-food" style={navStyle}>Log Food</NavLink></li>
          <li><NavLink to="/progress" style={navStyle}>Progress</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}
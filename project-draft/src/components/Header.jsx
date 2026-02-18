import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <img
          src="/img/Adobe Express - file-3.png"
          alt="NutriTrack Logo"
          className="logo"
        />
      </div>

      <nav className="header-right">
        <ul className="nav-links nav-links-styling">
          <li>
            <NavLink to="/" end>
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="/log-food">
              Log Food
            </NavLink>
          </li>

          <li>
            <NavLink to="/progress">
              Progress
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
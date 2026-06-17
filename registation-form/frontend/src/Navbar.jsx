import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo">Alumni Portal</div>
      </div>

      <nav className={`topbar-nav ${open ? 'open' : ''}`}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/alumni">Directory</Link>
        <Link to="/events">Events</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;

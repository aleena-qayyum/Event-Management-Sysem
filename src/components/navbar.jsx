import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/events" className="brand">EventHub</Link>
        <nav>
          <Link to="/events">Events</Link>
        </nav>
      </div>
    </header>
  );
}
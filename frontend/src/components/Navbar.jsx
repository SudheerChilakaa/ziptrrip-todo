import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">📝 Todo Manager</Link>
      </div>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          Add Todo
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
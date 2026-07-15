import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="empty-state">
          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>
            The page you are looking for does not exist.
          </p>

          <Link to="/">
            <button className="add-btn">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
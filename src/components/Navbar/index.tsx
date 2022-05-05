import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <>
      <header>
        <nav className="navbar-container">
          <Link to="/" className="navbar-brand-link">
            <h1>MovieFlix</h1>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

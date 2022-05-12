import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  getTokenData,
  isAuthenticated,
  removeAuthData,
} from "../../util/requests";
import "./styles.css";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    navigate("/", { replace: true });
  };

  return (
    <header>
      <nav className="navbar-container">
          <h1 className="navbar-brand">MovieFlix</h1>
        {authContextData.authenticated && (
          <a href="#logout" onClick={handleLogoutClick}>
            <div className="logout">SAIR</div>
          </a>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

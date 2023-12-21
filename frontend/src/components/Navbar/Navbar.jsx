import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="navbarContainer">
      <nav>
        <div className="navbarHomePageButton">
          <Link to="/"> <img className='navbarWebsiteTitle' src="/images/StockTrackr.png" alt="Stock Tracker Logo" /> </Link>
        </div>
        <div className="navbarFindStockButton">
          <Link to="/stock"> Find Stocks </Link>
        </div>
        {currentUser ? (
          // Render Logout button if the user is logged in
          <div className="navbarLoginButton" onClick={logout}>
            Logout
          </div>
        ) : (
          // Render Login button if the user is not logged in
          <div className="navbarLoginButton">
            <Link to="/login"> Login </Link>
          </div>
        )}
        <div className="navbarRegisterButton">
          <Link to="/register"> Register </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;


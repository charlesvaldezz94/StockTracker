import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <nav>
        <div className="navbarHomePageButton">
          <Link to="/"> Stock Tracker </Link>
        </div>
        <div className="navbarFindStockButton">
          <Link to="/stock"> Find Stocks </Link>
        </div>
        <div className="navbarLoginButton">
          <Link to="/login"> Login </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

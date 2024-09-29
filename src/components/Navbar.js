import React from "react";
import { Link } from "react-router-dom";
import "./components.css";
import logo2 from "./itu_logo2.png";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-left">
        <Link to="/">
          <img src={logo2} alt="Logo" />
        </Link>
        <div className="site-name">ITU ATMOSPHERIC MODELLING TEAM</div>
      </div>
      <div className="navbar-right">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Forecast">WRF-Forecast</Link></li>
          <li><Link to="/Analysis">Era5-Analysis</Link></li>
          <li><Link to="/Papers">R.Articles</Link></li>
        </ul>
      </div>
    </nav>
  );
}

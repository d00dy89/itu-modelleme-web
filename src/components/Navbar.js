import React from "react";
import "./components.css";
import logo2 from "./itu_logo2.png";

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-left">
        <a href="/">
          <img src={logo2} alt="Logo" />
        </a>
        <div className="site-name">İTÜ ATMOSFERİK MODELLEME TAKIMI</div>
      </div>
      <div className="navbar-right">
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Forecast">Forecast</a></li>
          <li><a href="#Analysis">Analysis</a></li>
          <li><a href="#Papers">Papers</a></li>
        </ul>
      </div>
    </nav>
  )
}

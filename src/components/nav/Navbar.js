import React from "react";
import Subnav from "./Subnav";
import "./navbar.css";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <div className="nav_container">
      <Link to="/intro" className="link_comp">
        <Subnav title={"Intro Image"} />
      </Link>
      <Link to="/users" className="link_comp">
        <Subnav title={"Users"} />
      </Link>
    </div>
  );
}

export default navbar;

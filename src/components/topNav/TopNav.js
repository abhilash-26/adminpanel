import React from "react";
import "./topNav.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/login";
import { useHistory } from "react-router-dom";

function TopNav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", 0);
    dispatch(logout());
    history.push("/");
  };
  return (
    <div className="topnav_container">
      <h1>Welcome Admin</h1>
      <button className="logout_button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
}

export default TopNav;

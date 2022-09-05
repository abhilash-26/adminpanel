import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/login";
import { useHistory } from "react-router-dom";

function Login() {
  const [allValue, setAllValue] = useState({
    phone: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setAllValue({
      ...allValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async () => {
    let result = await axios({
      method: "post",
      url: "http://103.38.50.113:3000/api/v1/users/login",
      data: {
        phone: allValue.phone,
        pin: allValue.password,
      },
    });
    console.log(result);
    if (result.data.meta.flag == "SUCCESS") {
      localStorage.setItem("isLoggedIn", 1);
      console.log(localStorage.getItem("isLoggedIn"));
      dispatch(login());
      history.push("/users");
    } else {
      alert(result.data.meta.message);
    }
  };
  return (
    <div className="login_container">
      <div className="login_sub_container">
        <h2>Login</h2>
        <input
          className="input"
          placeholder="Phone..."
          onChange={handleChange}
          name="phone"
          value={allValue.phone}
        />
        <input
          className="input"
          placeholder="Password"
          type={"password"}
          name="password"
          onChange={handleChange}
          value={allValue.password}
        />
        <button className="login_button" onClick={handleLogin}>
          Proceed
        </button>
      </div>
    </div>
  );
}

export default Login;

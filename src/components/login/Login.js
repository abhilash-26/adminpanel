import React, { useEffect, useState } from "react";
import "./login.css";
import axios from "axios";

function Login() {
  const [allValue, setAllValue] = useState({
    phone: "",
    password: "",
  });
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
  };

  const handleChange = (e) => {
    setAllValue({
      ...allValue,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="login_container">
      <h2>Welcome to Admin panel</h2>
      <input
        className="input"
        placeholder="enter phone"
        onChange={handleChange}
        name="phone"
        value={allValue.phone}
      />
      <input
        className="input"
        placeholder="enter password"
        type={"password"}
        name="password"
        onChange={handleChange}
        value={allValue.password}
      />
      <button className="login_button" onClick={handleLogin}>
        Proceed
      </button>
    </div>
  );
}

export default Login;

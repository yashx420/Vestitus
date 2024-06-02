import React, { useState } from "react";
import axios from "axios";

export default function LoginOverlay({
  login,
  user,
  setUser,
  pass,
  setPass,
  logined,
  setLogined,
  showUser,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: user,
        password: pass,
      });
      if (response.status === 200) {
        login();
        console.log("Login successful");
        setLogined(true);
        showUser(user); // Ensure this updates the user state in App
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
    setLogined(true);
    showUser(user);
  };

  return (
    <div className="loginOverlay">
      <div className="layer" onClick={login}></div>
      <form className="login" onSubmit={handleSubmit}>
        <h1>Log-in</h1>
        <input
          type="text"
          className="username"
          placeholder="Enter Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <input
          type="password"
          className="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button type="submit" className="login_submit">
          Submit
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

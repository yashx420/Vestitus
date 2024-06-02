import React, { useState } from "react";
import axios from "axios";

export default function RegisterOverlay({
  register,
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
      const response = await axios.post("http://localhost:5000/register", {
        username: user,
        password: pass,
      });
      if (response.status === 201) {
        register();
        console.log("Registration successful");
        setLogined(true);
        showUser(user); // Ensure this updates the user state in App
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Username already exists");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="loginOverlay1">
      <div className="layer1" onClick={register}></div>
      <form className="register" onSubmit={handleSubmit}>
        <h1>Register New User</h1>
        <input
          type="text"
          className="username"
          placeholder="Enter New Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <input
          type="password"
          className="password"
          placeholder="Enter New Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button type="submit" className="reg_submit">
          Submit
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

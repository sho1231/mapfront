import React, { useState, useRef } from "react";
import RoomIcon from "@material-ui/icons/Room";
import axios from "axios";
import Cancel from "@material-ui/icons/Cancel";
import "./login.css";

export default function Login({
  setShowLogin,
  setCurrentUsername,
  myStorage,
  viewport,
  setViewport,
  pins,
}) {
  const [error, setError] = useState(false);
  const [wait, setWait] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = {
      username: usernameRef.current.value,
      pass: passwordRef.current.value,
    };
    try {
      setWait(true);
      const res = await axios.post("https://mapprojectapp.herokuapp.com/api/users/login", User);
      setCurrentUsername(res.data.username);
      myStorage.setItem("user", res.data.username);
      setWait(false);
      console.log(pins);
      setViewport({
        ...viewport,
        latitude: pins.length > 0 && pins[0].lat,
        longitude: pins.length > 0 && pins[0].long,
      });
      setShowLogin(false);
    } catch (e) {
      setWait(false);
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <RoomIcon className="logoIcon" />
        <span>Zen Maps</span>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Username:</label>
        <input
          autoFocus
          style={{ marginBottom: "15px" }}
          placeholder="Enter username"
          ref={usernameRef}
        />
        <label>Password:</label>
        <input
          type="password"
          style={{ marginBottom: "15px" }}
          placeholder="Enter password"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {wait && <span>Please wait....</span>}
        {error && (
          <span style={{ color: "red" }} className="failure">
            Something went wrong
          </span>
        )}
        <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
      </form>
    </div>
  );
}

import React, { useState } from "react";
import "./login.scss";
import { loginSubmit } from "../../service/userService";
import Toast from "../../components/Toast";

export default function Login() {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState({
    show: false,
    type: "",
    message: "",
    title: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginSubmit(loginDetails);
      console.log(res);
      if (res?.status === 200) {
        // Save token to local storage
        localStorage.setItem("token", res.data.token);
        setFeedback({
          show: true,
          type: "success",
          message: "Login successful.",
          title: "Success",
        });
      } else {
        setLoginAttempt((prev) => prev + 1);
        if (loginAttempt === 2) {
          // Lock account
        } else {
          setFeedback({
            show: true,
            type: "error",
            message: `Login failed. Attempt ${loginAttempt + 1} of 3.`,
            title: "Error",
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div id="login__container">
      <form className="login__form" autoComplete="on" onSubmit={handleSubmit}>
        <img src={"/aclogo.webp"} alt="Logo" />
        <h1>Login</h1>
        <label>
          <span>Email</span>
          <input
            type="text"
            autoComplete="email"
            value={loginDetails?.email}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, email: e.target.value });
            }}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={loginDetails?.password}
            onChange={(e) => {
              setLoginDetails({ ...loginDetails, password: e.target.value });
            }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      {feedback.show && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          title={feedback.title}
          close={() => setFeedback({ ...feedback, show: false })}
        />
      )}
    </div>
  );
}

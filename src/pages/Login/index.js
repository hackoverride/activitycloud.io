import React, { useState } from "react";
import "./login.scss";
import { loginSubmit, setToken } from "../../service/userService";
import Toast from "../../components/Toast";
import Loader from "../../components/Loader";

export default function Login() {
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await loginSubmit(loginDetails);
      if (res?.status === 200 && res?.data?.token) {
        // Save token to local storage
        setToken(res.data.token);
        setFeedback({
          show: true,
          type: "success",
          message: "Login successful.",
          title: "Success",
        });
      } else {
        setLoginAttempt((prev) => prev + 1);
        setFeedback({
          show: true,
          type: "error",
          message: `Login failed. Attempt ${loginAttempt + 1}.`,
          title: "Error",
        });
      }
    } catch (err) {
      console.error(err);
      setLoginAttempt((prev) => prev + 1);
      setFeedback({
        show: true,
        type: "error",
        message: `Login failed. Attempt ${loginAttempt + 1}.`,
        title: "Error",
      });
    } finally {
      setLoading(false);
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
          close={() => {
            if (feedback.type === "success") {
              // Redirect to profile page - We do not persist login state. - as token is stored in local storage.
              window.location.href = "/profile";
            }
            setFeedback({ ...feedback, show: false });
          }}
        />
      )}
      {loading && <Loader />}
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Toast from "../../components/Toast";
import { signup as signupFunction } from "../../service/userService";
import "./signup.scss";

export default function Signup() {
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: -1,
    phone: "",
    phonePrefix: "",
  });
  const [feedback, setFeedback] = useState({
    show: false,
    type: "",
    message: "",
    title: "",
  });
  const theme = {};
  const currentLanguage = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    signup: "Sign Up",
    legalGDPR: "Legal & GDPR",
    activityHubDescription:
      "Welcome to ActivityCloud.io. The newest adventure platform for all your activity needs. Sign up today and start your journey.",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate we have email and password.
      if (!customerDetails?.email || !customerDetails?.password) {
        setFeedback({
          show: true,
          type: "error",
          message: "Please enter email and password.",
          title: "Error",
        });
        return;
      }
      const res = await signupFunction(customerDetails);
      if (res.status === 201) {
        setFeedback({
          show: true,
          type: "success",
          message: "Account created successfully.",
          title: "Success",
        });
      } else {
        setFeedback({
          show: true,
          type: "error",
          message: "An error occurred. Please try again later.",
          title: "Error",
        });
      }
    } catch (err) {
      setFeedback({
        show: true,
        type: "error",
        message: "An error occurred. Please try again later.",
        title: "Error",
      });
    }
  };

  return (
    <main id="sign_up" style={theme?.main}>
      <section className="sign_up__container" style={theme?.signup}>
        <div className="activity__hub__details">
          <img src={"/aclogo.webp"} alt="Logo" />
          <h1 style={theme?.title}>ActivityCloud.io</h1>
          <p>{currentLanguage?.activityHubDescription}</p>
        </div>
        <div className="activity__hub__form__container">
          <form onSubmit={handleSubmit}>
            <h1 style={theme?.title}>
              {currentLanguage?.createAccount ?? "Create Account"}
            </h1>
            <div className="two__column__form">
              <label>
                <span id="firstNameLabel">{currentLanguage?.firstName}</span>
                <input
                  type="text"
                  value={customerDetails?.firstName}
                  onChange={(e) => {
                    setCustomerDetails({
                      ...customerDetails,
                      firstName: e.target.value,
                    });
                  }}
                  style={theme?.input}
                  autoComplete="given-name"
                  aria-labelledby="firstNameLabel"
                />
              </label>
              <label>
                <span id="lastNameLabel">{currentLanguage?.lastName}</span>
                <input
                  type="text"
                  value={customerDetails?.lastName}
                  onChange={(e) => {
                    setCustomerDetails({
                      ...customerDetails,
                      lastName: e.target.value,
                    });
                  }}
                  style={theme?.input}
                  autoComplete="family-name"
                  aria-labelledby="lastNameLabel"
                />
              </label>
            </div>
            <label>
              <span id="emailLabel">{currentLanguage?.email}</span>
              <input
                type="email"
                value={customerDetails?.email}
                onChange={(e) => {
                  setCustomerDetails({
                    ...customerDetails,
                    email: e.target.value,
                  });
                }}
                style={theme?.input}
                autoComplete="email"
                aria-labelledby="emailLabel"
              />
            </label>
            <label>
              <span id="phoneLabel">{currentLanguage?.phone}</span>
              <PhoneInput
                defaultCountry={currentLanguage?.type?.toUpperCase()}
                placeholder="Enter phone number"
                value={customerDetails?.phone}
                onChange={(newValue) => {
                  console.log(newValue);
                  setCustomerDetails({
                    ...customerDetails,
                    phone: newValue,
                  });
                }}
                style={theme?.input}
                autoComplete="tel"
                aria-labelledby="phoneLabel"
              />
            </label>
            <label>
              <span id="passwordLabel">{currentLanguage?.password}</span>
              <input
                type="password"
                value={customerDetails?.password}
                onChange={(e) => {
                  setCustomerDetails({
                    ...customerDetails,
                    password: e.target.value,
                  });
                }}
                autoComplete="new-password"
                aria-labelledby="passwordLabel"
              />
            </label>
            <button type="submit" style={theme?.buttonCTA}>
              {currentLanguage?.signup}
            </button>
            <Link to={`/login`}>{currentLanguage?.alreadyHaveAccount}</Link>
            {theme?._vendor?.legalLink && (
              <Link to={theme._vendor.legalLink}>
                {currentLanguage?.legalGDPR}
              </Link>
            )}
          </form>
        </div>
        <span className="our__promise">
          Effortless Selling, Endless Improving, Ever Present.
        </span>
      </section>
      {feedback.show && (
        <Toast
          message={feedback.message}
          type={feedback.type}
          title={feedback.title}
          close={() => {
            if (feedback.type === "success") {
              navigate("/login");
            }
            setFeedback({
              show: false,
              type: "",
              message: "",
              title: "",
            });
          }}
        />
      )}
    </main>
  );
}

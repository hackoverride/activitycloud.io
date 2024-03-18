import React from "react";
import "./profile.scss";

export default function Profile() {
  return (
    <div className="profile__container">
      <h1>Profile</h1>
      <p>Welcome to your profile page.</p>
      <h3 style={{ padding: "20px", textAlign: "center", margin: "40px" }}>
        This is not yet operational!
      </h3>
      <p>
        This is a protected route. You can only see this page if you are logged
        in.
      </p>
      <p>
        We will add more features to this page in the future, such as the
        ability to update your profile information.
      </p>
      <p>
        If you have any feedback, please let us know by clicking the feedback
        button in the bottom right corner of the page.
      </p>
      <div>
        <button
          className="logout__button"
          onClick={() => {
            // Clear token from local storage.
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <span>Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
}

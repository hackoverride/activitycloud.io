import React from "react";
import "./profile.scss";
import { clearToken } from "../../service/userService";

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
            clearToken();
            window.location.href = "/";
          }}
        >
          <span>Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </button>
        <div className="two__column__container">
          <form
            className="content__container"
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3>Profile</h3>
            <label>
              <span>Email</span>
              <input type="text" value="user.email" disabled />
            </label>
            <label>
              <span>First Name</span>
              <input type="text" value="user.firstName" disabled />
            </label>
            <label>
              <span>Last Name</span>
              <input type="text" value="user.lastName" disabled />
            </label>
            <label>
              <span>Phone</span>
              <input type="text" value="user.phone" disabled />
            </label>
            <label>
              <span>Address</span>
              <input type="text" value="user.address" disabled />
            </label>
            <label>
              <span>City</span>
              <input type="text" value="user.city" disabled />
            </label>
            <label>
              <span>State</span>
              <input type="text" value="user.state" disabled />
            </label>
            <label>
              <span>Zip</span>
              <input type="text" value="user.zip" disabled />
            </label>
            <button type="submit">Update</button>
          </form>
          <div className="content__container">
            <h3>Your Activity Overview</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

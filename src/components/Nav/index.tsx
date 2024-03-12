import { NavLink } from "react-router-dom";
import "./nav.scss";
export default function Nav() {
  return (
    <nav>
      <img src="./logo.webp" alt="Logo" />
      <div>activitycloud.io</div>
      <div className="link__container">
        <NavLink to="/">
          <div>Home</div>
        </NavLink>
        <NavLink to="/about">
          <div>About</div>
        </NavLink>
        <NavLink to="/map">
          <div>Map</div>
        </NavLink>
      </div>
    </nav>
  );
}

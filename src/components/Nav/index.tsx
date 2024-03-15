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
          <i className="fas fa-home"></i>
        </NavLink>
        <NavLink to="/about">
          <div>About</div>
          <i className="fas fa-info-circle"></i>
        </NavLink>
        <NavLink to="/map">
          <div>Map</div>
          <i className="fas fa-map-marked-alt"></i>
        </NavLink>
      </div>
    </nav>
  );
}

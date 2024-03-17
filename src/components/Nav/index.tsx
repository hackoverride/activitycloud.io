import { NavLink, Link } from "react-router-dom";
import "./nav.scss";
export default function Nav() {
  return (
    <nav>
      <Link to="/">
        <img src={"/aclogo.webp"} alt="Logo" />
      </Link>
      <div>activitycloud.io</div>
      <div className="link__container">
        <NavLink to="/about">
          <div>About</div>
          <i className="fas fa-info-circle"></i>
        </NavLink>
        <NavLink to="/login">
          <div>Login</div>
          <i className="fas fa-sign-in-alt"></i>
        </NavLink>
        <NavLink to="/map">
          <div>Map</div>
          <i className="fas fa-map-marked-alt"></i>
        </NavLink>
      </div>
    </nav>
  );
}

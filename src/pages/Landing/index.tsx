import { useEffect } from "react";
import { Link } from "react-router-dom";
import Parallax from "parallax-js";
import "./landing.scss";
export default function Landing() {
  useEffect(() => {
    document.title = "Activity Cloud";
    const scene = document.getElementById("hero__content");
    if (scene) {
      var parallaxInstance = new Parallax(scene, {
        relativeInput: true,
      });
    }
  }, []);

  return (
    <div className="lading__content">
      <div id="hero__content">
        <h1 data-depth="0.1" id="title">
          Explore and Sell Amazing Activities With
          <div data-depth="0.3" className="title fancy__highlight">
            <span>Activity</span>
            <span>Cloud</span>
          </div>
        </h1>

        <p id="subtitle" data-depth="0.15">
          Bring your own activities to a global audience. Our platform is the
          perfect place for innovative providers.
        </p>
      </div>
      <div className="content">
        <h5>Product description</h5>
        <p>information about this product</p>
      </div>
      <div className="content">
        <h5>Payment Platform Integrations</h5>
        <div>
          <h3>Stripe</h3>
        </div>
        <div>
          <h3>Nets Easy</h3>
        </div>
        <div>
          <h3>Vipps</h3>
        </div>
      </div>
    </div>
  );
}

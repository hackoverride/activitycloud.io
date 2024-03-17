import { Link } from "react-router-dom";
import "./landing.scss";
export default function Landing() {
  return (
    <div className="landing__content main__content">
      <div id="hero__content">
        <h1 id="title">
          Explore and Sell Amazing Activities With
          <div className="fancy__highlight">
            <span>Activity</span>
            <span>Cloud</span>
          </div>
        </h1>

        <Link to="/sign-up">
          <button id="sign-up__button">Sign Up</button>
        </Link>
        <p id="subtitle">
          Unlock the World of Online Activities - Your Gateway to Selling and
          Experiencing Unique Events
        </p>
      </div>
      <div className="content">
        <h3>activitycloud.io gives you creative control</h3>
        <p>
          Showcase your unique activities to the world with our platform. Ideal
          for forward-thinking businesses seeking full creative control over
          their digital footprint, our platform offers a dynamic and
          customizable space to amplify your online presence.
        </p>
      </div>
      <div className="content">
        <h3>Product description</h3>
        <p>
          What differentiates activitycloud.io from any other event og ticketing
          platform?
        </p>
        <p>
          We sell dynamic services, addons, treatments and meals. Each
          individually or as a configured package.
        </p>
      </div>
      <div className="content">
        <h3>Activity Hub</h3>
        <p>
          Our unique Activity Hub is a place where your customers can find all
          your activities and book them directly. The Activity Hub is a
          customizable web page that you can link to from your own website.
        </p>
        <p>
          Your customers can edit their comments, add more people to their
          reservations, change dates - times or cancel. Each process is
          carefully controlled by our extensive settings inside the admin
          platform
        </p>
        <p>
          You can sell many different membership types, activity packages, free
          activities, get available spa-treatments and much, much more.
        </p>
      </div>
      <div className="content">
        <h3>Payment Integrations</h3>
        <div>Stripe</div>
        <div>Nets Easy</div>
        <div>Vipps</div>
      </div>
      <div className="content">
        <h3>
          ActivityCloud.io is a platform for event organizers, activity
          providers and ticket sellers.
        </h3>
        <p>How can activitycloud.io handle the different use-cases?</p>
      </div>
      <div className="content">
        <h3>Licenses</h3>
        <p>
          Show the different licenses that are available for the different
          use-cases.
        </p>
        <p>
          Basic - one activity provider, one service, one user, one payment
          integration, Activity Hub
        </p>
        <p>
          Standard - one activity provider, multiple services, multiple users,
          one payment integration, Activity Hub
        </p>
        <p>
          Premium - one activity provider, multiple locations, multiple users,
          multiple payment integrations, branded Activity Hub
        </p>
        <p>
          Enterprise - multiple activity providers, multiple locations, multiple
          users, multiple payment integrations, branded Activity Hub
        </p>
      </div>

      <div className="content">
        <h3>Hotel</h3>
        <p>
          Our first customers were large resort hotels that sell everything from
          Yoga classes, lunch, dinner, spa-treatments and meeting rooms through
          activitycloud.io
        </p>
        <p>The platform is integrated with a few different PMS vendors that </p>
      </div>
      <div className="content">
        <h3>Spa</h3>
        <p>
          Through our solution you can setup schedules, skills and employees and
          let the customers pick and choose all treatments that are available
        </p>
      </div>
      <div className="content">
        <h3>Gym</h3>
        <p>
          Memberships are sold directly through the activity hub and can be per
          month, per year or as a ticketing solution
        </p>
        <p>
          We can also integrate the access and locker systems through our modern
          open API setup
        </p>
      </div>
      <div className="content">
        <h3>Restaurant</h3>
        <p>
          We do a category inventory split with drag and drop seating solution
        </p>
        <p>
          Choose whether you have a given number of available per start time, or
          if we check all available seats in the restaurant, split with other
          categories.
        </p>
        <p>
          You can let the customer choose the menu with the a-la-carte solution
          - or sell a set 5 course meal, lunch menus or just free-seating
        </p>
      </div>
      <div className="content">
        <h3>Want to know more?</h3>
        <p>Contact us directly for more information</p>
      </div>
    </div>
  );
}

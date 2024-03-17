import React from "react";

const About: React.FC = () => {
  return (
    <div className="main__content">
      <section style={{ marginBottom: "20px" }}>
        <h1>About Our Company</h1>
        <p>
          Welcome to Activity Cloud, where our mission is to revolutionize the
          way you think about sales and service. Our approach is centered around
          three core values:
        </p>
        <h2 style={{ color: "#3178c6", textAlign: "center" }}>
          Effortless Selling, Endless Improving, Ever Present.
        </h2>
      </section>

      <section>
        <h2>Our Purpose</h2>
        <p>
          In an ever-evolving market, we strive to create, innovate, and lead
          with technologies and strategies that redefine industry standards.
          We're not just a company; we're your steadfast partner in the journey
          toward excellence and success.
        </p>
        <p>
          Activity Cloud is committed to providing solutions that not only meet
          but exceed expectations. Our focus on effortless selling enables our
          clients to achieve their sales goals with minimal friction, while our
          dedication to endless improving ensures that we are always at the
          forefront of innovation. Being ever present, we offer continuous
          support and guidance to our clients, helping them navigate the
          complexities of their industries.
        </p>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <p>
          Choosing Activity Cloud means embarking on a path to unparalleled
          success. Our team of experts, groundbreaking solutions, and unwavering
          support make us the ideal choice for businesses looking to scale new
          heights. With us, you're not just getting a service provider; you're
          gaining a partner who's invested in your success.
        </p>
        <p>
          Explore our website to learn more about our products, services, and
          the values that drive our company. Together, let's achieve greatness.
        </p>
      </section>
    </div>
  );
};

export default About;

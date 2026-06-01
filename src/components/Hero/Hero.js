import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          Trusted Export Partner From India
        </span>

        <h1>
          Delivering Premium
          <span> Agricultural Products </span>
          Worldwide
        </h1>

        <p>
          Exporting high-quality Pomegranates, Moringa Leaf Powder,
          Onion Powder, and Garlic Powder to global markets with
          trusted logistics and premium packaging.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Request Quote
          </button>

          <button className="secondary-btn">
            Explore Products
          </button>
        </div>

        <div className="hero-stats">
          <div>
            <h3>50+</h3>
            <span>Countries</span>
          </div>

          <div>
            <h3>1000+</h3>
            <span>MT Exported</span>
          </div>

          <div>
            <h3>99%</h3>
            <span>On-Time Delivery</span>
          </div>
        </div>

      </div>

      <div className="hero-visual">

        <div className="glow-circle"></div>

        <div className="product-card pomegranate">
          🍎 Pomegranates
        </div>

        <div className="product-card moringa">
          🌿 Moringa Powder
        </div>

        <div className="product-card onion">
          🧅 Onion Powder
        </div>

        <div className="product-card garlic">
          🧄 Garlic Powder
        </div>

        <div className="world-globe">
          🌎
        </div>

      </div>

    </section>
  );
};

export default Hero;
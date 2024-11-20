import React, { useState } from "react";
// import "./KeyBenefits.css";

const benefits = ["Affordable Rates", "Wide Selection", "Easy Booking"];

function KeyBenefits() {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [bikeType, setBikeType] = useState("");

  const handleSearch = () => {
    // Trigger search functionality
    console.log("Search with:", { location, dates, bikeType });
  };
  return (
    <div className="key-benefits ">
      <div className="hero-banner">
        <img
          src="scenic_bike_path.jpg"
          alt="Scenic Bike Path"
          className="hero-image"
        />
        <div className="hero-content">
          <h1>Ride the City with Ease</h1>
          <button className="cta-button">Rent Your Bike Now</button>
        </div>
      </div>
      <h2>Why Choose Us?</h2>
      <div className="benefits-list">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-item">
            {benefit}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyBenefits;

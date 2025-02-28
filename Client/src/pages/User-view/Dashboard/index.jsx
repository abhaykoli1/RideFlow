import React, { useEffect } from "react";
import UserReviews from "./reviews";
import Services from "./services";
import Hero from "./hero";
import RideFleet from "./fleet";
import WhyChooseUs from "./whyChooseUs";
import { Call, Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import Reach from "./reach";

const UserDashboard = () => {
  return (
    <section className="mt-12">
      <Helmet>
        <meta charSet="utf-8" />
        <title>RideFlow | Bike to ride in jaipur</title>
        <link rel="canonical" href="https://rideflowrentals.in" />
        <meta
          name="description"
          content="RideFlow Rentals offers hassle-free motorbike rentals for city rides and adventures. Book your bike online with ease and explore the roads with confidence."
        />
      </Helmet>
      <main>
        <Hero />
        <RideFleet />
        <WhyChooseUs />
        <Services />
        <UserReviews />
        <Reach />
      </main>
    </section>
  );
};

export default UserDashboard;

import React from "react";
import UserReviews from "./reviews";
import Services from "./services";
import Hero from "./hero";
import ReachUs from "./reach";
import RideFleet from "./fleet";
import Footer from "./footer";
import WhyChooseUs from "./whyChooseUs";

const UserDashboard = () => {
  return (
    <section className="mt-12">
      <main>
        <Hero />
        <RideFleet />
        <WhyChooseUs />
        <Services />
        <UserReviews />
        <ReachUs />
      </main>
      <Footer />
    </section>
  );
};

export default UserDashboard;

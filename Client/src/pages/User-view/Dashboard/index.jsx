import React, { useEffect } from "react";
import UserReviews from "./reviews";
import Services from "./services";
import Hero from "./hero";
import ReachUs from "./reach";
import RideFleet from "./fleet";
import Footer from "./footer";
import WhyChooseUs from "./whyChooseUs";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactInfo } from "@/store/common/dashboard-slice";
import { Call, Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

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
    </section>
  );
};

export default UserDashboard;

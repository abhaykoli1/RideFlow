import React from "react";
import Home from "../../../assets/Home.png";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <section className="pt-20 pb-5 bg-transparent bg-cover">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us | RideFlow | Bike to ride in jaipur</title>
        <link rel="canonical" href="https://rideflowrentals.in/about" />
      </Helmet>
      <div className="px-6 py-3 lg:container mx-auto">
        <div className="titleHolder">
          <h1 className="font-bold text-center text-yellow">Who We Are?</h1>
          <h6 className="subtitle text-center mt-2">
            We are a passionate team dedicated to providing the best motorbike
            rental experience.
          </h6>
        </div>

        <div className="w-full flex items-end justify-end "></div>

        <div className="rounded-lg mb-6 mt-10">
          <p className="text-lg">
            Welcome to{" "}
            <span className="font-semibold text-yellow underline">
              RideFlow
            </span>
            , where we share a deep passion for motorcycling and are dedicated
            to providing you with an exceptional rental experience. Whether
            you're a local or a visitor, we strive to make riding a thrilling,
            accessible, and memorable part of your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 mb-10">
          <div>
            <h6 className="text-3xl font-semibold mb-4 text-tomato">
              Our Mission
            </h6>
            <ul>
              <li className="mb-4">
                We are driven by a mission to promote freedom on the road and
                sustainable transportation by offering top-notch motorbikes and
                unmatched customer service.
              </li>
            </ul>

            <img
              src={Home}
              alt="motorbikes"
              title="this image for knowing us"
              className="rounded-lg w-full"
            />
          </div>

          <div>
            <h6 className="text-3xl font-semibold mb-4 text-tomato">
              Our Values
            </h6>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                <span>
                  Quality: Providing well-maintained motorbikes for a safe and
                  enjoyable ride.
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                <span>
                  Customer-Centric: Putting you at the center of everything we
                  do.
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                <span>
                  Adventure: Encouraging exploration and unforgettable journeys
                  on two wheels.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h6 className="text-3xl font-semibold mb-4 text-yellow">
            Join Our Journey!
          </h6>
          <p className="mb-4">
            Discover the thrill of motorcycling with us! Whether you're seeking
            adventure, a scenic ride, or a convenient way to explore, we have
            the perfect motorbike for you. Thank you for choosing{" "}
            <span className="font-semibold text-yellow underline">
              RideFlow
            </span>
            . Together, let's create unforgettable experiences on two wheels!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

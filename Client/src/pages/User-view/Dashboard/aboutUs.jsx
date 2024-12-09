import React from "react";
import Home from "../../../assets/Home.png";
const AboutUs = () => {
  return (
    <div className="pt-20 pb-5 bg-transparent bg-cover">
      <div className="p-6 lg:container mx-auto">
        <h1 className=" text-4xl font-bold text-end text-yellow ">
          Who We Are...
        </h1>
        <div className="w-full flex items-end justify-end ">
          {/* <p classN ame="border-b-2 w-[300px] text-end  border-yellow mt-2 rounded-full"></p> */}
        </div>

        <div className=" rounded-lg  mb-6 mt-10">
          <p className="text-lg">
            Welcome to{" "}
            <span className="font-semibold text-yellow underline">
              RideFlow
            </span>
            , where we share a deep passion for biking and are dedicated to
            providing you with an exceptional rental experience. Whether you're
            a local or a visitor, we strive to make cycling a fun, accessible,
            and memorable part of your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2  gap-5 mb-10">
          <div>
            <h6 className="text-3xl font-semibold mb-4 text-tomato">
              Our Mission
            </h6>
            <ul>
              <li className="mb-4 ">
                We are driven by a mission to promote healthier lifestyles and
                sustainable transportation. By offering top-notch bikes and
                unmatched customer service.
              </li>
            </ul>

            <img src={Home} alt="Bike Rental" className="rounded-lg w-full" />
          </div>

          <div>
            <h6 className="text-3xl font-semibold mb-4 text-tomato">
              Our Values
            </h6>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span>
                <span>
                  Excellence: Providing high-quality bikes for a safe ride.
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
                  Sustainability: Promoting eco-friendly travel and supporting
                  our community.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Uncomment this section when ready */}
        {/*         
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white p-4 rounded-lg shadow transition-transform transform hover:scale-105"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h3 className="font-semibold mt-2 text-center">{member.name}</h3>
            <p className="text-gray-600 text-center">{member.role}</p>
          </div>
        ))}
      </div>
      */}

        <div className="text-center">
          <h6 className="text-3xl font-semibold mb-4 text-yellow">
            Join Our Journey!
          </h6>
          <p className="mb-4">
            Discover the joy of cycling with us! Whether you're seeking
            adventure, fitness, or simply a fun day out, we have the perfect
            bike for you. Thank you for choosing{" "}
            <span className="font-semibold  text-yellow underline">
              RideFlow
            </span>
            . Together, let's create unforgettable experiences on two wheels!
          </p>
        </div>
      </div>
    </div>
  );
};

// Sample team members data
const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://via.placeholder.com/150/FF5733/FFFFFF?text=John+Doe",
  },
  {
    name: "Jane Smith",
    role: "Customer Support Manager",
    image: "https://via.placeholder.com/150/33C1FF/FFFFFF?text=Jane+Smith",
  },
  {
    name: "Alex Johnson",
    role: "Bike Mechanic",
    image: "https://via.placeholder.com/150/33FF57/FFFFFF?text=Alex+Johnson",
  },
];

export default AboutUs;

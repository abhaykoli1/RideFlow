// import AnimatedGif from "@/components/animatedGif";
// import React from "react";

// const Services = () => {
//   const services = [
//     {
//       title: "Standard Bikes",
//       icon: (
//         <AnimatedGif
//           src={"https://i.gifer.com/3AfW.gif"}
//           alt={"Bike"}
//           className="rounded-l-lg  "
//         />
//       ),
//       description:
//         "We offer a diverse fleet of well-maintained, high-quality bikes for a smooth and enjoyable ride.",
//     },
//     {
//       title: "Bike Accessories",
//       description:
//         "We provide helmets and safety gear for your peace of mind and other accessories to ensure a safe ride.",
//       icon: (
//         <AnimatedGif
//           src={
//             "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522554/dj1icetq7z3azes4yk4w.gif"
//           }
//           className={" p-6 bg-green-400 rounded-l-lg"}
//         />
//       ),
//     },
//     {
//       title: "Bike Maintenance",
//       description:
//         "Get your bike serviced by our professionals for a smooth ride.",
//       icon: (
//         <AnimatedGif
//           src={
//             "http://res.cloudinary.com/dulkmeadg/image/upload/v1730523172/ufju5pbko927fvnwzhxe.gif"
//           }
//           alt={"service"}
//           className={" p-6 bg-blue-500 rounded-l-lg"}
//         />
//       ),
//     },
//     {
//       title: "Affordable Rent",
//       icon: (
//         <AnimatedGif
//           src={
//             "http://res.cloudinary.com/dulkmeadg/image/upload/v1730523098/d7al0epnapp2ei50obj3.gif"
//           }
//           // alt={"price"}
//           className={" p-6 bg-pink-500 rounded-l-lg"}
//         />
//       ),
//       description:
//         "Enjoy competitive rental rates with flexible packages to fit your budget and adventure needs.",
//     },
//     {
//       title: "Group Rentals",
//       description:
//         "Special discounts for group rentals. Perfect for events and family outings.",
//       icon: (
//         <AnimatedGif
//           src={
//             "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522937/nxz2b6201k3si5iq1bvh.gif"
//           }
//           alt={"group"}
//           className={" p-6 bg-tomato rounded-l-lg"}
//         />
//       ),
//     },
//     {
//       title: " Customer Service",
//       icon: (
//         <AnimatedGif
//           src={
//             "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522799/fspzicudavgpb5vbtb9t.gif"
//           }
//           alt={"CallCenter"}
//           className={" p-6 bg-purple-400 rounded-l-lg"}
//         />
//       ),
//       description:
//         "Our team is here to ensure a seamless experience, from selecting the right bike for you.",
//     },
//     //  {
//     //   title: "Safety First",
//     //   icon: (
//     //     <AnimatedGif
//     //       src={"https://i.gifer.com/CHPN.gif"}
//     //       className="rounded-l-lg h-36 w-36"
//     //     />
//     //   ),
//     //   description:
//     //     "Each bike is inspected regularly, and we provide helmets and safety gear for your peace of mind.",
//     //  },
//     {
//       title: "Flexible Rental Options",
//       icon: (
//         <AnimatedGif
//           src={"https://i.gifer.com/FPm.gif"}
//           className="rounded-l-lg "
//         />
//       ),
//       description:
//         "Whether it’s for an hour, a day, or a week, we have flexible rental periods to match your plans.",
//     },
//   ];
//   return (
//     <section className=" flex lg:py-4 md:py-3 sm:py-2 py-3 diagonal-background w-full cursor-default lg:px-6 md:px-5 sm:px-4 px-4">
//       <div className=" rounded-lg py-2 w-full  shadow-custom content container mx-auto">
//         <div className="titleHolder">
//           <h1 className="text-3xl font-bold text-tomato text-end">
//             What Makes Our Service the Best Choice?
//           </h1>
//           <h6 className="subtitle  mb-5 text-end">
//             Discover Excellence in Every Ride
//           </h6>
//         </div>
//         <div className="serviceGrid grid grid-cols-2  xl:grid-cols-3 lg:gap-5 md:gap-5 sm:gap-4 gap-2   ">
//           {services.map((feature, index) => (
//             <div
//               key={index}
//               className="serviceBox  flex w-full items-center max-h-36  bg-orange-00 bg-white rounded-lg shadow-md hover:shadow-lg  transform transition-transform duration-300 hover:scale-105 cursor-default"
//             >
//               <div className="iconBox relative">
//                 <span className=" h-36 w-36 flex">{feature.icon}</span>
//                 <p className="font-semibold text-white absolute top-0 right-0 bottom-0 left-0 text-center bg-[rgba(0,0,0,0.5)] rounded-l-lg flex items-center justify-center">
//                   {feature.title}
//                 </p>
//               </div>
//               <p className="text-gray-800 p-3">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

import React from "react";
import { motion } from "framer-motion";
import AnimatedGif from "@/components/animatedGif";

const Services = () => {
  const services = [
    {
      title: "Standard Bikes",
      icon: (
        <AnimatedGif
          src={"https://i.gifer.com/3AfW.gif"}
          alt={"Bike"}
          className="rounded-l-lg"
        />
      ),
      description:
        "We offer a diverse fleet of well-maintained, high-quality bikes for a smooth and enjoyable ride.",
    },
    {
      title: "Bike Accessories",
      description:
        "We provide helmets and safety gear for your peace of mind and other accessories to ensure a safe ride.",
      icon: (
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522554/dj1icetq7z3azes4yk4w.gif"
          }
          className="p-6 bg-green-400 rounded-l-lg"
        />
      ),
    },
    {
      title: "Bike Maintenance",
      description:
        "Get your bike serviced by our professionals for a smooth ride.",
      icon: (
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730523172/ufju5pbko927fvnwzhxe.gif"
          }
          alt={"service"}
          className="p-6 bg-blue-500 rounded-l-lg"
        />
      ),
    },
    {
      title: "Affordable Rent",
      icon: (
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730523098/d7al0epnapp2ei50obj3.gif"
          }
          className="p-6 bg-pink-500 rounded-l-lg"
        />
      ),
      description:
        "Enjoy competitive rental rates with flexible packages to fit your budget and adventure needs.",
    },
    {
      title: "Group Rentals",
      description:
        "Special discounts for group rentals. Perfect for events and family outings.",
      icon: (
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522937/nxz2b6201k3si5iq1bvh.gif"
          }
          alt={"group"}
          className="p-6 bg-tomato rounded-l-lg"
        />
      ),
    },
    {
      title: "Customer Service",
      icon: (
        <AnimatedGif
          src={
            "http://res.cloudinary.com/dulkmeadg/image/upload/v1730522799/fspzicudavgpb5vbtb9t.gif"
          }
          alt={"CallCenter"}
          className="p-6 bg-purple-400 rounded-l-lg"
        />
      ),
      description:
        "Our team is here to ensure a seamless experience, from selecting the right bike for you.",
    },
    {
      title: "Flexible Rental Options",
      icon: (
        <AnimatedGif
          src={"https://i.gifer.com/FPm.gif"}
          className="rounded-l-lg"
        />
      ),
      description:
        "Whether it’s for an hour, a day, or a week, we have flexible rental periods to match your plans.",
    },
  ];

  return (
    <section className="flex lg:py-4 md:py-3 sm:py-2 py-3 diagonal-background w-full cursor-default lg:px-6 md:px-5 sm:px-4 px-4">
      <div className="rounded-lg py-2 w-full shadow-custom content container mx-auto">
        <div className="titleHolder">
          <motion.h1
            className="text-3xl text-end font-bold text-tomato"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: false }}
          >
            What Makes Our Service the Best Choice?
          </motion.h1>

          <h6 className="subtitle mb-5 text-end">
            Discover Excellence in Every Ride
          </h6>
        </div>
        <div className="serviceGrid grid grid-cols-2 xl:grid-cols-3 lg:gap-5 md:gap-5 sm:gap-4 gap-2">
          {services.map((feature, index) => (
            <motion.div
              key={index}
              className="serviceBox  flex w-full items-center max-h-36 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-0 hover:scale-105 cursor-default"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                className="iconBox relative"
                whileHover={{ rotate: 0, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <span className="h-36 w-36 flex">{feature.icon}</span>
                <p className="font-semibold text-white absolute top-0 right-0 bottom-0 left-0 text-center bg-[rgba(0,0,0,0.5)] rounded-l-lg flex items-center justify-center">
                  {feature.title}
                </p>
              </motion.div>
              <p
                className="text-gray-800 p-3"
                // initial={{ x: -10 }}
                // whileHover={{ x: 0, color: "#FF6347" }}
                // transition={{ duration: 0.3 }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import React, { useRef, useState } from "react";
import PickDrop from "@/components/User-view/pickDrop";
import { motion } from "framer-motion";
const Hero = () => {
  const [date, setDate] = useState("");

  return (
    <section className="h-full  !-mt-16 overflow-hidden">
      <div
        className="2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] sm:h-[450px] h-[450px] 
        bg-cover bg-top 
        bg-[url('http://res.cloudinary.com/dulkmeadg/image/upload/v1730526219/e7l6eu9absgauzh6pi9c.jpg')]"
      >
        <div className="hero-Back">
          <div className="mx-auto  2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] pt-24 pb-3 sm:h-[450px] h-[450px]    flex flex-col justify-between  ">
            <div id="Conten" className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: -50 }} // Starts above and invisible
                animate={{ opacity: 1, y: 0 }} // Ends at normal position and fully visible
                transition={{ duration: 0.7, ease: "easeOut" }} // Smooth easing effect
                className={`bebas-neue-regular bg-gradient-to-t from-[#ffae00] to-[#fff9ee] bg-clip-text text-transparent font-bold text-shadow lg:text-[6vw] xl:text-[6vw] 2xl:text-[6vw] sm:text-[10vw] text-[14.5vw] leading-[1]  w-full`}
              >
                Ride the City with Ease
              </motion.h1>
            </div>
            <div className=" mx-aut px-2">
              <p className=" -mt-2 mb-2 lg:hidden md:hidden items-center justify-center sm:flex flex text-xl font-medium text-white animate-bounc animate-pulse ">
                Book Your Bike ASAP!!
              </p>
              <PickDrop />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

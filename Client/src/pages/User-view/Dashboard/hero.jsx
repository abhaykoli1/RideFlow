import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import React, { useEffect, useRef, useState } from "react";
import PickDrop from "@/components/User-view/pickDrop";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardContent } from "@/store/common/dashboard-slice";
import hero from "../../../assets/hero.jpg";

const Hero = () => {
  const [date, setDate] = useState("");
  const { DashboardContent } = useSelector((state) => state.dasboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardContent());
  }, [dispatch]);

  return (
    <section className="h-full  !-mt-16 overflow-hidden">
      {DashboardContent && DashboardContent.length > 0 ? (
        DashboardContent.map((content, index) => (
          <div
            key={index}
            className={`2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] sm:h-[450px] h-[450px] bg-cover bg-top`}
            style={{ backgroundImage: `url(${content.image || hero})` }}
          >
            <div className="hero-Back">
              <div className="mx-auto  2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] pt-24 pb-3 sm:h-[450px] h-[450px]    flex flex-col justify-between  ">
                <div id="Conten" className="text-center">
                  <motion.h1
                    // initial={{ opacity: 0, y: -50 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ duration: 0.7, ease: "easeOut" }}
                    className={` bg-gradient-to-t from-[#fff] to-[#fff9ee] bg-clip-text text-transparent font-bold text-shadow
                         2xl:text-[6vw] xl:text-[6vw] lg:text-[7vw] px-5 md:text-[7vw]  sm:text-[9.5vw] text-[13vw] leading-[1]  w-full`}
                  >
                    {content.heading}
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
        ))
      ) : (
        <div
          className={`2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] sm:h-[450px] h-[450px] bg-cover bg-top`}
          style={{ backgroundImage: `url(${hero})` }}
        >
          <div className="hero-Back">
            <div className="mx-auto  2xl:h-[600px] xl:h-[600px] lg:h-[500px] md:h-[450px] pt-24 pb-3 sm:h-[450px] h-[450px]    flex flex-col justify-between  ">
              <div id="Conten" className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className={` bg-gradient-to-t from-[#fff] to-[#fff9ee] bg-clip-text text-transparent font-bold text-shadow
                   2xl:text-[6vw] xl:text-[6vw] lg:text-[7vw] px-5 md:text-[7vw]  sm:text-[9.5vw] text-[13vw] leading-[1]  w-full`}
                >
                  Ride The City With Ease
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
      )}
    </section>
  );
};

export default Hero;

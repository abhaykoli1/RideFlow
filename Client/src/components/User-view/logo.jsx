import React from "react";
import { useNavigate } from "react-router-dom";
import rideFlowLargeLight from "../../assets/logo/rideFlowLargeLight.png";
import rideFlowSmallYellowDark from "../../assets/logo/rideFlowSmallYellowDark.png";
import rideFlowSmallYellowLight from "../../assets/logo/rideFlowSmallYellowLight.png";
import rideFlowSmallWhite from "../../assets/logo/rideFlowSmallWhite.png";
import rideFlowSmallBlack from "../../assets/logo/rideFlowSmallBlack.png";

import { Label } from "../ui/label";
const Logo = ({ L2, B, Path }) => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      {/* <img
        src={rideFlowSmallYellowLight}
        alt="logo"
        className="h-[35px] w-full mr-2"
      />
      <img
        src={rideFlowSmallWhite}
        alt="logo"
        className="h-[35px] w-full mr-2"
        /> */}
      {/* <img
        src={rideFlowSmallYellowDark}
        alt="logo"
        className="h-[35px] w-full mr-2"
        /> */}
      <div className="flex items-center">
        <img
          src={rideFlowSmallYellowDark}
          alt="logo"
          className="h-[37px] w-[39px] w-ful mr-2 z-10"
        />
        {/* <img
          src={rideFlowLargeLight}
          alt="logo"
          className="h-7 w-full mr-4 mb-1  z-0"
        /> */}
        {/* <div className="flex flex-col  text-white ">
          <Label className="font-bold text-md">Ride</Label>
          <Label className="font-bold text-md -mt-2">Flow</Label>
        </div> */}
      </div>
      {/* <Label className="font-bold text-[9px]">Rentals</Label> */}
      <title
        onClick={() => {
          navigate(Path);
        }}
        className={`${L2} font-bold mt-  items-center relative h-[60px] justify-center flex cursor-pointer`}
      >
        <span className=" text-[30px] font-extrabold text-white bg-gradient-to-t from-[#ffae00] to-[#fff9ee] bg-clip-text text-transparent">
          Ride
        </span>
        <span className={`text-[30px] font-extrabold `}>Flow </span>
        <span className="absolute  bottom-[33px] text-[11px] right-0  font-medium">
          <span
            className={`${B} absolute bottom-[1px] text-[11px] right-0 w-[90%]`}
          ></span>
          RENTALS
        </span>
      </title>
    </div>
  );
};

export default Logo;

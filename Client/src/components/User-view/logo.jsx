import React from "react";
import { useNavigate } from "react-router-dom";
import rideFlowLargeLight from "../../assets/logo/rideFlowLargeLight2.png";
import rideFlowSmallYellowDark from "../../assets/logo/rideFlowSmallYellowDark.png";
import rideFlowSmallYellowLight from "../../assets/logo/rideFlowSmallYellowLight.png";
import rideFlowSmallWhite from "../../assets/logo/rideFlowSmallWhite.png";
import rideFlowSmallBlack from "../../assets/logo/rideFlowSmallBlack.png";

import { Label } from "../ui/label";
const Logo = ({ L2, B, Path }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer"
      onClick={() => {
        goTop();
        navigate("/ride/home");
      }}
    >
      <div className="flex items-center">
        <img
          src={rideFlowSmallYellowDark}
          alt="logo"
          className="h-[37px] flex lg:hidden md:hidden w-[39px] w-ful mr-2 z-10"
        />
        <img
          src={rideFlowLargeLight}
          alt="logo"
          className="h-7 w-full mr-4 mb-1 lg:flex md:flex hidden z-0"
        />
        <div className="flex flex-col  lg:hidden md:hidden  text-white ">
          <Label className="font-bold text-md">Ride</Label>
          <Label className="font-bold text-md -mt-2">Flow</Label>
        </div>
      </div>
    </div>
  );
};

export default Logo;

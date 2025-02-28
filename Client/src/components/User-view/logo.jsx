import React from "react";
import { useNavigate } from "react-router-dom";
import rideFlowLargeLight from "../../assets/logo/rideFlowLargeLight2.png";
import rideFlowSmallYellowDark from "../../assets/logo/rideFlowSmallYellowDark.png";

import { Label } from "../ui/label";
const Logo = ({ L2, B, Path }) => {
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer"
      onClick={() => {
        goTop();
        navigate("/");
      }}
    >
      <div className="flex items-center">
        <div className="flex items-start w-[170px]">
          <img
            src={rideFlowLargeLight}
            alt="ride flow logo"
            title="Ride Flow DesktopView Logo"
            className="h-7 w-full mr-4 mb-1 lg:flex md:flex hidden z-0"
          />
        </div>
        <div className="flex absolute">
          <img
            src={rideFlowSmallYellowDark}
            alt="ride flow logo"
            title="Ride Flow MobileView Logo"
            className="h-[37px] flex lg:hidden md:hidden w-[39px] w-ful mr-2 z-10"
          />
          <div className="flex flex-col  lg:hidden md:hidden  text-white ">
            <Label className="font-bold text-md">Ride</Label>
            <Label className="font-bold text-md -mt-2">Flow</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;

import React, { useContext, useEffect, useState } from "react";
import { Bike, BikeIcon } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../common/Helper/context";
import Logo from "../User-view/logo";

import rideFlowLargeLight from "../../assets/logo/rideFlowLargeLight2.png";
import rideFlowLargeDark from "../../assets/logo/rideFlowLargeDark2.png";

const AuthContainerPageElements = ({
  HaveAccount,
  Auth,
  GoToAuth,
  Google,
  Href,
  To,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Create a matchMedia listener to detect changes in the color scheme
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    // Set the initial dark mode state
    setIsDarkMode(darkModeMediaQuery.matches);

    // Listen for changes in the system's color scheme preference
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Add the event listener
    darkModeMediaQuery.addEventListener("change", handleChange);

    // Clean up the event listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  // const [showPass]
  const { auth, setAuth } = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex">
        <img
          src={isDarkMode === true ? rideFlowLargeLight : rideFlowLargeDark}
          alt="logo"
          className={`h-[26px] w-ful mr-4 mb-3  z-0`}
        />
      </div>
      <div className=" d-flex-row align-items-center justify-content-center mb-7">
        <h3 className="text-[20px] text-dark  font-bold">{Auth}</h3>
        <div className="flex gap-1">
          <p className="font-semibold mt-3 text-[14px]">{HaveAccount}</p>
          <p
            onClick={() => {
              setAuth(!auth);
              navigate(To);
            }}
            className=" hover:underline mt-[12.5px] cursor-pointer text-yellow text-[14px]"
          >
            {GoToAuth}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainerPageElements;

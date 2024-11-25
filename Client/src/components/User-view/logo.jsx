import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ L2, B }) => {
  const navigate = useNavigate();
  return (
    <title
      onClick={() => {
        navigate("/ride/home");
      }}
      className={`${L2}  mt-2  items-center relative h-[60px] justify-center flex cursor-pointer`}
    >
      <span className=" text-[30px] font-extrabold text-yello bg-gradient-to-t from-[#ffae00] to-[#fff9ee] bg-clip-text text-transparent">
        Ride
      </span>
      <span className={`text-[30px] font-extrabold `}>Flow </span>
      <span className="absolute  bottom-[38px] text-[11px] right-0  font-medium">
        <span
          className={`${B} absolute  bottom-0 text-[11px] right-0 w-[78%]`}
        ></span>
        RENTALS
      </span>
    </title>
  );
};

export default Logo;

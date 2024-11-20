import React from "react";
import { useNavigate } from "react-router-dom";
import { SelectSeparator } from "../ui/select";

const Logo = ({ L2 }) => {
  const navigate = useNavigate();
  return (
    <title
      onClick={() => {
        navigate("/ride/home");
      }}
      className="mt-2 items-center relative h-[60px] justify-center lg:flex md:flex sm:hidden  hidden cursor-pointer"
    >
      <span className="text-[30px] font-extrabold text-yellow ">Ride</span>
      <span className={`${L2} text-[30px] font-extrabold text-white`}>
        Flow{" "}
      </span>
      <span className="absolute  bottom-[38px] text-[11px] right-0 text-white font-medium">
        <span className="absolute  bottom-0 text-[11px] right-0 w-[78%] border">
          {/* <SelectSeparator /> */}
        </span>
        RENTALS
      </span>
    </title>
  );
};

export default Logo;

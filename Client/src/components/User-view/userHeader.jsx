import React, { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import Avtar from "./Avtar";
import Logo from "./logo";
import { NavLink, useNavigate } from "react-router-dom";
import { UserNavItems } from "@/config";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const ShopHeader = ({ setSidebar, sidebar }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="backdrop-blur-x  HeaderBG bg-white HeaderBorderBotto  shadow-md">
      <div className="  px-4 lg:h-[72px] md:h-[72px]  sm:h-[60px] h-[60px] duration-500 flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          <Logo
            Path={"/ride/home"}
            L2={"text-white lg:flex md:flex hidden "}
            B={"border-[.5px] border-white"}
          />
        </div>
        {/* <div className="flex gap-3 items-center"> */}
        <div className="lg:flex md:flex hidden items-center ">
          {UserNavItems.map((nav) => (
            <ul key={nav.id} className="flex gap-5 text-md font-bold uppercase">
              <li className="mr-5">
                <NavLink
                  to={nav.path}
                  className={({ isActive }) =>
                    `cursor-pointer text-[15px] font-bold TextHover hover:underline focus:text-yellow  !text- ${
                      isActive ? "text-yellow" : "!text-white"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </li>
            </ul>
          ))}
          {isAuthenticated && (
            <p
              onClick={() => {
                navigate("/ride/bookings");
              }}
              className={`uppercase cursor-pointer text-[15px] font-bold TextHover hover:underline focus:text-yellow  !text-white`}
            >
              Bookings
            </p>
          )}
        </div>

        <div className="flex gap-2  items-center">
          {!isAuthenticated ? (
            <Button
              onClick={() => navigate("/auth/login")}
              className="h-9 text-[16px] bg-transparent px-0 text-white hover:text-yellow hover:!bg-slate-10 duration-500 font-bold  !border-none   !-py-4  flex items-center  "
            >
              SIGN IN
            </Button>
          ) : (
            <div className="lg:flex md:flex hidden">
              <Avtar />
            </div>
          )}
          <div className="border-[0.5px lg:hidden md:hidden rounded-md">
            {!sidebar ? (
              <Menu
                onClick={() => setSidebar(!sidebar)}
                size={34}
                className={`text-white  h-[40px] w-[40px]   p-1 cursor-pointer`}
              />
            ) : (
              <X
                onClick={() => setSidebar(!sidebar)}
                size={34}
                className={`text-white  h-9 w-10   p-1 cursor-pointer`}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;

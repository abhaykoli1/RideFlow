import React, { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import Avtar from "./Avtar";
import Logo from "./logo";
import { NavLink, useNavigate } from "react-router-dom";
import { UserNavItems } from "@/config";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const ShopHeader = ({ setSidebar, sidebar }) => {
  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="backdrop-blur-x  HeaderBG bg-white HeaderBorderBotto  shadow-md">
      <div className="  px-4 lg:h-[72px] md:h-[72px]  sm:h-[60px] h-[60px] duration-500 flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          <Logo
            Path={"/"}
            L2={"text-white lg:flex md:flex hidden "}
            B={"border-[.5px] border-white"}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="lg:flex md:flex hidden items-center">
            {UserNavItems.map((nav) => (
              <ul key={nav.id} className="flex text-md font-bold uppercase">
                <li className="mr-5">
                  <NavLink
                    onClick={() => {
                      goTop();
                    }}
                    to={nav.path}
                    className={({ isActive }) =>
                      `cursor-pointer text-[15px] font-bold TextHover hover:underline focus:text-yellow  !text- ${
                        isActive ? "text-yellow" : "!text-white"
                      }`
                    }
                  >
                    {isAuthenticated
                      ? nav.id === "5"
                        ? nav.label
                        : nav.label
                      : nav.id !== "5"
                      ? nav.label
                      : null}{" "}
                  </NavLink>
                </li>
              </ul>
            ))}
          </div>
          {!isAuthenticated ? (
            <Button
              onClick={() => navigate("/auth/login")}
              className="h-9  -ml-5 bg-[#fcad19] text-[16px] hover:underline  px-3 text-white hover:text- hover:!bg-slate-10 duration-500 font-bold  !border-none   !-py-[10px]  flex items-center  "
            >
              Log In
            </Button>
          ) : (
            <div className="mr-1">
              <Avtar
                AvtarClass={
                  "w-48 duration-500  transition-all lg:mt-20 md:mt-20 mt-[68px] -mr-11"
                }
              />
            </div>
          )}
          <div className="border-[0.5px] lg:hidden md:hidden rounded-md">
            {!sidebar ? (
              <Menu
                onClick={() => setSidebar(!sidebar)}
                size={34}
                className={`text-white  w-[40px] p-1 cursor-pointer`}
              />
            ) : (
              <X
                onClick={() => setSidebar(!sidebar)}
                size={32}
                className={`text-white  h-[34px] w-[40px] p-1 cursor-pointer`}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;

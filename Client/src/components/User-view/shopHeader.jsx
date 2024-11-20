import React from "react";

import { Menu } from "lucide-react";

import Avtar from "./Avtar";
import HeaderWishlistSheet from "./wishlist-sheet";
import Logo from "./logo";
import { NavLink, useNavigate } from "react-router-dom";
import { UserNavItems } from "@/config";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

const ShopHeader = ({ setSidebar, sidebar, HeaderContent }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <header className="backdrop-blur-xl HeaderBorderBottom  shadow-md">
      <div className="  px-3   lg:h-[72px] md:h-[72px]  sm:h-[60px] h-[60px] duration-500 flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          <Menu
            onClick={() => setSidebar(!sidebar)}
            size={34}
            className={`text-white lg:hidden md:hidden h-9 w-10  border-[0.5px] rounded-md  p-1 cursor-pointer`}
          />
          <Logo />
        </div>
        <div className="flex gap-3 items-center">
          <div className="lg:flex md:flex hidden ml-6">
            {UserNavItems.map((nav) => (
              <ul
                key={nav.id}
                className="flex gap-5 text-md font-bold uppercase"
              >
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
          </div>
          {!isAuthenticated ? (
            <Button
              onClick={() => navigate("/auth/login")}
              className="h-9 text-[15px] hover:!border-yello text-white duration-500 font-bold LoginBt Border  px-4 !-py-4 bg-transparent flex items-center hover:text-yellow "
            >
              SIGN IN
            </Button>
          ) : (
            <div className="flex items-center">
              <HeaderWishlistSheet />
              <Avtar />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;

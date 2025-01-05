import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, UserCog } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { Sheet } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Avtar = ({ hi, AvtarClass }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const closeDropdown = () => setDropdownOpen(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  function handleLogout() {
    dispatch(logoutUser())
      .then(() => {
        console.log("User logged out successfully!");
      })
      .catch((error) => {
        console.log("Logout failed", error);
      });
  }

  return (
    <Fragment>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              onClick={toggleDropdown}
              className="relative h-10 w-10 cursor-pointer !bg-green-700 !text-white -800 flex items-center justify-center  capitalize font-bold text-xl "
            >
              {user?.image?.length === 1
                ? user?.image.toUpperCase() || user?.userName[0]
                : <AvatarImage src={user?.image} /> || user?.userName[0]}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            className={`${AvtarClass} !bg-white !text-slate-800 !border-[0.5px]`}
          >
            <DropdownMenuLabel className="!py-2.5  px-3">
              <span className={`${hi === false && "hidden"}`}>Hi, </span>
              <span className="capitalize ">
                {user?.userName?.replace(/(_\d+)$/, "")}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={handleLogout} className="px-3">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Fragment>
  );
};

export default Avtar;

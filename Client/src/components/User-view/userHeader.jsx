import React, { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import Avtar from "./Avtar";
import HeaderWishlistSheet from "./wishlist-sheet";
import Logo from "./logo";
import { NavLink, useNavigate } from "react-router-dom";
import { UserNavItems } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { getUserBookings } from "@/store/user/booking-slice";
import { Sheet } from "../ui/sheet";
// import UserBookingContent from "./bookingSheetContent";
import RideBookingDialog from "./ride-bookings";

const ShopHeader = ({ setSidebar, sidebar, HeaderContent }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const { userBookings, isLoading, error } = useSelector(
    (state) => state.userBooking
  );
  const dispatch = useDispatch();

  const [openBookingDialog, setOpenBookingDialog] = useState(false);

  function handleGetRideDetails(getCurrentUserId) {
    setTimeout(() => {
      setOpenBookingDialog(true);
    }, 300);
    if (user?.id) {
      dispatch(getUserBookings(user?.id));
    }
  }

  return (
    <header className="backdrop-blur-x HeaderBG HeaderBorderBotto  shadow-md">
      <div className="  px-3 lg:h-[72px] md:h-[72px]  sm:h-[60px] h-[60px] duration-500 flex items-center justify-between ">
        <div className="flex gap-2 items-center">
          <div className="border-[0.5px] lg:hidden md:hidden rounded-md">
            {!sidebar ? (
              <Menu
                onClick={() => setSidebar(!sidebar)}
                size={34}
                className={`text-white  h-9 w-10   p-1 cursor-pointer`}
              />
            ) : (
              <X
                onClick={() => setSidebar(!sidebar)}
                size={34}
                className={`text-white  h-9 w-10   p-1 cursor-pointer`}
              />
            )}
          </div>
          <Logo L2={"text-white"} B={"border border-white"} />
        </div>
        <div className="flex gap-3 items-center">
          <div className="lg:flex md:flex hidden items-center ">
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
            <p
              onClick={() => {
                handleGetRideDetails();
                setOpenBookingSheet(true);
              }}
              className={`uppercase cursor-pointer text-[15px] font-bold TextHover hover:underline focus:text-yellow  !text-white`}
            >
              {" "}
              Bookings
            </p>
          </div>

          {!isAuthenticated ? (
            <Button
              onClick={() => navigate("/auth/login")}
              className="h-9 text-[15px] hover:!bg-slate-100 text-black duration-500 font-bold  !border-none  px-4 !-py-4 bg-white flex items-center  "
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

      <RideBookingDialog
        setOpen={setOpenBookingDialog}
        open={openBookingDialog}
        userBookings={userBookings}
        isLoading={isLoading}
        error={error}
      />
    </header>
  );
};

export default ShopHeader;

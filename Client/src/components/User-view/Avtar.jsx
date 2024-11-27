import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { BadgeCheck, LogOut } from "lucide-react";
import { logoutUser } from "@/store/auth-slice";
import { Sheet } from "../ui/sheet";
// import { getUserBookings } from "@/store/user/booking-slice";
// import UserBookingContent from "./bookingSheetContent";

const Avtar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const closeDropdown = () => setDropdownOpen(false);
  const dispatch = useDispatch();
  const [openBookingSheet, setOpenBookingSheet] = useState(false);

  const { user } = useSelector((state) => state.auth);

  console.log(user?.role);
  function handleLogout() {
    dispatch(logoutUser())
      .then(() => {
        console.log("User logged out successfully!");
      })
      .catch((error) => {
        console.log("Logout failed", error);
      });
  }

  console.log(user?.image);

  // const { userBookings, isLoading, error } = useSelector(
  //   (state) => state.userBooking
  // );

  // //   Fetch bookings on component mount
  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(getUserBookings(user?.id));
  //   }
  // }, [user?.id, dispatch]);

  return (
    <Fragment>
      <div className="relative">
        <Avatar
          onClick={toggleDropdown}
          className="relative h-10 w-10 cursor-pointer   !bg-white !text-slate-800 flex items-center justify-center  capitalize font-bold text-xl "
        >
          {user?.image?.length === 1
            ? user?.image.toUpperCase() || user?.userName[0]
            : <AvatarImage src={user?.image} /> || user?.userName[0]}
        </Avatar>
        {isDropdownOpen && (
          <div className=" absolute border right-0 mt-5 w-56 bg-white text-slate-800 shadow-2xl rounded-lg ">
            <div className="p-4 border-b font-semibold">
              Hi,{" "}
              <span className="capitalize">
                {user?.userName?.replace(/(_\d+)$/, "")}
              </span>
            </div>
            {/* <button
              onClick={() => {
                // setOpenBookingSheet(true);

                closeDropdown();
              }}
              className="w-full text-left px-4 py-2 hover:bg-slate-200/55 rounded-t-none flex items-center"
            >
              {" "}
              <BadgeCheck className="-ml-0.5 mr-2 h-5 w-5" />
              Bookings
            </button> */}
            <button
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
              className="w-full text-left px-4 py-2 hover:bg-slate-200/55 rounded-t-none flex items-center"
            >
              {" "}
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </button>
          </div>
        )}
        {/* <Sheet
          open={openBookingSheet}
          onOpenChange={() => setOpenBookingSheet(false)}
        >
          <UserBookingContent
            setOpenBookingSheet={setOpenBookingSheet}
            userBookings={userBookings}
            isLoading={isLoading}
            error={error}
          />
        </Sheet> */}
      </div>
    </Fragment>
  );
};

export default Avtar;

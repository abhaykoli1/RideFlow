import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, ShoppingCart } from "lucide-react";
import { Sheet } from "../ui/sheet";
import UserProfileSheetContent from "./User-Profile";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { Button } from "../ui/button";

const Avtar = () => {
  const [openSaveProfileSheet, setOpenSaveProfileSheet] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const closeDropdown = () => setDropdownOpen(false);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logoutUser())
      .then(() => {
        console.log("User logged out successfully!");
      })
      .catch((error) => {
        console.log("Logout failed", error);
      });
  }

  const { cartItems } = useSelector((state) => state.userCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  console.log(user?.image);

  return (
    <Fragment>
      <div className="relative">
        <Avatar
          onClick={toggleDropdown}
          className="relative h-10 w-10 cursor-pointer  Border !bg-white !text-slate-800 flex items-center justify-center  capitalize font-bold text-xl "
        >
          {user?.image?.length === 1 ? (
            user?.image.toUpperCase()
          ) : (
            <AvatarImage src={user?.image} />
          )}
        </Avatar>
        {isDropdownOpen && (
          <div className=" absolute border right-0 mt-5 w-56 bg-white text-slate-800 shadow-2xl rounded-lg ">
            <div className="p-4 border-b font-semibold">
              Hi,{" "}
              <span className="capitalize">
                {user?.userName?.replace(/(_\d+)$/, "")}
              </span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                closeDropdown();
              }}
              className="w-full text-left px-4 py-2 hover:bg-slate-200/55 rounded-t-none flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet> */}

      {/* <Sheet
        open={openSaveProfileSheet}
        onOpenChange={() => setOpenSaveProfileSheet(false)}
      >
        <UserProfileSheetContent />
      </Sheet> */}
    </Fragment>
  );
};

export default Avtar;

import { Menu, Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Avtar from "../User-view/Avtar";
import { MyContext } from "../common/Helper/context";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const AdminHeader = ({ setSidebar }) => {
  const location = useLocation();
  const { setOpenAddReviews, setOpenAddRidesDialog, sidebar } =
    useContext(MyContext);
  const routeMap = {
    "/admin": "Admin Dashboard",
    "/admin/contacts": "Contact Queries",
    "/admin/users": "Users List",
    "/admin/Rides": "Admin Rides",
    "/admin/Bookings": "Admin Bookings",
    "/admin/addReviews": "Add Reviews",
  };
  const routeName = routeMap[location.pathname] || "Unknown Route";

  return (
    <header
      className={`flex  items-center justify-between px-4 py-3 bg-[#fff]  lg:h-[70px] h-[60px]   shadow-md`}
    >
      <div className="flex items-center gap-4">
        <Menu
          onClick={() => setSidebar(true)}
          size={34}
          color="#222"
          className="h-9  w-9 border rounded-md border-slate-700 p-1 cursor-pointer"
        />

        <Label
          className={`lg:text-2xl text-xl lg:pl-[190px] text-slate-800 font-bold`}
        >
          {routeName}
        </Label>
      </div>
      <div className="flex gap-3 items-center">
        <Button
          className={`bg-slate-800 text-white  lg:h-full lg:w-20 md:w-20 sm:w-20 w-10 flex items-center justify-center  h-8  ${
            routeName === "Admin Rides" || routeName === "Add Reviews"
              ? "flex"
              : "hidden"
          }`}
          onClick={() => {
            routeName === "Admin Rides"
              ? setOpenAddRidesDialog(true)
              : setOpenAddReviews(true);
          }}
        >
          <Plus size={18} />
          <span className="hidden lg:flex md:flex sm:flex">New</span>
        </Button>
        <Avtar hi={false} AvtarClass={"w-48 lg:mt-20 mt-[68px] -mr-11"} />
      </div>
    </header>
  );
};

export default AdminHeader;

import { QueryStats, Reviews, ReviewsOutlined } from "@mui/icons-material";
import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  User,
} from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import rideFlowLargeDark from "../../assets/logo/rideFlowLargeDark2.png";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboard className="text-slate-700" />,
  },
  {
    id: "bookings",
    label: "Bookings",
    path: "/admin/Bookings",
    icon: <BadgeCheck className="text-slate-700" />,
  },
  {
    id: "user",
    label: "Users",
    path: "/admin/users",
    icon: <User className="text-slate-700" />,
  },
  {
    id: "rides",
    label: "Rides",
    path: "/admin/Rides",
    icon: <Bike className="text-slate-700" />,
  },
  {
    id: "reviews",
    label: "Reviews",
    path: "/admin/addReviews",
    icon: <ReviewsOutlined className="text-slate-700" />,
  },
  {
    id: "contacts",
    label: "Queries",
    path: "/admin/contacts",
    icon: <QueryStats className="text-slate-700" />,
  },
];

function MenuItems({ setSidebar, handleClose }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {adminSidebarMenuItems.map((menuItem) => (
        <a
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            handleClose();
          }}
          className="text-slate-700  flex cursor-pointer text-xl items-center gap-4 rounded-md px-3 py-2 text-muted-foregroun hover:bg-muted hover:text-slate-700"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </a>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ setSidebar, sidebar }) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  function handleClose() {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }
  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  const navigate = useNavigate();
  return (
    <div
      className={` h-full w-60  bg-[#fff] fixed duration-500 transition-all 
      ${sidebar ? "" : "-translate-x-60"}`}
    >
      {sidebar ? (
        <div
          onClick={() => setSidebar(false)}
          variant="outline"
          className="lg:hidden cursor-pointer flex h-8 w-9 absolute  items-center justify-center rounded  top-3 -right-6 bg-white shadow border"
        >
          <ChevronLeftIcon className="h-6 w-6 " color="#222" />
        </div>
      ) : null}

      <aside className=" w-full flex-col bg-transparent pt-4  flex">
        <div className="flex cursor-pointer gap-2 items-end !text-slate-700 px-4 border-b border-[#d0d0d0] lg:pb-[19px] pb-[9px]">
          <div className="text-center flex flex-col items-center">
            <ChartNoAxesCombined size={26} />
            <h1 className="text-[10px] -mt-[6px]  line-clamp-6 font-extrabold text-slate-700">
              Admin
            </h1>
          </div>
          <div className="line-clamp-1 leading-3">
            <img
              src={rideFlowLargeDark}
              alt="logo"
              className="h-[22px] mb-1  w-ful lg:flex md:flex hidde z-0"
            />
          </div>
        </div>
        <div className="px-4 -mt-5">
          <MenuItems setSidebar={setSidebar} handleClose={handleClose} />
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;

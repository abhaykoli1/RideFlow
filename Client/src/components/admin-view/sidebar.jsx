import { Reviews, ReviewsOutlined } from "@mui/icons-material";
import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  ChevronLeftIcon,
  LayoutDashboard,
  User,
} from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
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
];

function MenuItems({ setSidebar }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2 ">
      {adminSidebarMenuItems.map((menuItem) => (
        <a
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setSidebar ? setSidebar(false) : null;
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
          className="lg:hidden flex h-8 w-9 absolute  items-center justify-center rounded  top-6 -right-6 bg-white shadow border"
        >
          <ChevronLeftIcon className="h-6 w-6 " color="#222" />
        </div>
      ) : null}

      <aside className=" w-full flex-col bg-transparent pt-6 px-4 flex">
        <div className="flex cursor-pointer items-center gap-2 !text-slate-700 ">
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold mt-2 text-slate-700">
            Admin Panel
          </h1>
        </div>
        <MenuItems setSidebar={setSidebar} />
      </aside>
    </div>
  );
};

export default AdminSidebar;

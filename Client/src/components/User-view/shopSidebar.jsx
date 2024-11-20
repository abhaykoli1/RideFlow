// import { UserNavItems } from "@/config";
import { Album } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  AlbumIcon,
  Bike,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";

function MenuItems({ setSidebar, setHeaderContent }) {
  const navigate = useNavigate();

  const UserNavItems = [
    {
      id: "1",
      label: "Home",
      path: "/ride/home",
      icon: <LayoutDashboard size={28} />,
    },
    {
      id: "2",
      label: "About",
      // path: "/ride/home",
      icon: <AlbumIcon size={30} />,
    },

    {
      id: "4",
      label: "Rides",
      path: "/ride/listing",
      icon: <Bike size={30} />,
    },
    {
      id: "5",
      label: "Contact Us",
      path: "/ride/Reach-Us",
      icon: <Contact size={30} />,
    },
  ];

  return (
    <Box className=" SiderBarBorderRight shadow-sm lg:w-[240px] md:w-[240px] sm:w-[200px]  w-[180px] duration-300 bg">
      <nav className=" flex-col flex gap-2 pt-4 !-mx-3 h-screen px-2">
        {UserNavItems.map((nav) => (
          <label
            key={nav.id}
            onClick={() => {
              {
                nav.id === "rides" ? setHeaderContent(false) : null;
              }
              navigate(nav.path);
              setSidebar ? setSidebar(false) : null;
            }}
            disablepadding="true"
            className="flex gap-2 cursor-pointer text-xl items-center rounded-md  Menu_Text pl-2
            py-[13px] 
            mx-3 hover:bg-slate-100 duration-300 "
          >
            {nav.icon}
            {nav.label}
          </label>
        ))}
      </nav>
    </Box>
  );
}

const ShopSidebar = ({ sidebar, setSidebar, setHeaderContent }) => {
  const location = useLocation();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });
  const navigate = useNavigate();

  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(false)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  return (
    <div className="overflow-auto h-[100%]  bg transition-all duration-500 lg:mt-[72px] md:mt-[72px]  sm:mt-[60px] mt-[60px] ">
      <div className="flex flex-col  justify-between">
        <MenuItems
          setSidebar={setSidebar}
          setHeaderContent={setHeaderContent}
        />
      </div>
    </div>
  );
};

export default ShopSidebar;

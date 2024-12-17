// import { UserNavItems } from "@/config";
import { logoutUser } from "@/store/auth-slice";
import { Album, RecentActors } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  AlbumIcon,
  Bike,
  BookIcon,
  ChevronLeftIcon,
  Contact,
  LayoutDashboard,
  ListOrderedIcon,
  LogOut,
  Settings,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";

function MenuItems({ setSidebar, setHeaderContent }) {
  const navigate = useNavigate();

  const UserNavItems = [
    {
      id: "1",
      label: "Home",
      path: "/ride/home",
      icon: <LayoutDashboard size={26} />,
    },
    {
      id: "2",
      label: "About",
      path: "/ride/about",
      icon: <AlbumIcon size={26} />,
    },

    {
      id: "4",
      label: "Rides",
      path: "/ride/listing",
      icon: <Bike size={26} />,
    },
    {
      id: "5",
      label: "Contact Us",
      path: "/ride/Reach-Us",
      icon: <Contact size={26} />,
    },
  ];
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const [openProfileSheet, setOpenProfileSheet] = useState(false);

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
    <Box className="shadow-sm w-[230px] duration-300 SidebarBG">
      <nav className="flex-col flex gap-1 pt-4 !-mx-3 h-screen px-2">
        <div className="px-6 flex items-center">
          <Avatar
            // onClick={toggleDropdown}
            className="relative h-10 w-10 cursor-pointer   !bg-white !text-slate-800 flex items-center justify-center  capitalize font-bold text-xl "
          >
            {user?.image?.length === 1
              ? user?.image.toUpperCase() || user?.userName[0]
              : <AvatarImage src={user?.image} /> || user?.userName[0]}
          </Avatar>
          <Label className="p-3 text-white text-lg font-semibold">
            {" "}
            Hi,{" "}
            <span className="capitalize">
              {user?.userName?.replace(/(_\d+)$/, "")}
            </span>
          </Label>
        </div>
        {UserNavItems.map((nav) => (
          <label
            key={nav.id}
            onClick={() => {
              goTop();
              {
                nav.id === "rides" ? setHeaderContent(false) : null;
              }
              navigate(nav.path);
              setSidebar ? setSidebar(false) : null;
            }}
            disablepadding="true"
            className="flex gap-4 px-4 text-white cursor-pointer text-[19px] font-medium  rounded-md  Menu_Text 
            py-[13px] 
            mx-3 duration-300 "
          >
            {nav.icon}
            {nav.label}
          </label>
        ))}
        {isAuthenticated && (
          <div>
            <label
              onClick={() => {
                goTop();
                navigate("/ride/bookings");

                setSidebar ? setSidebar(false) : null;
              }}
              className="flex gap-4 px-4 text-white cursor-pointer text-[19px] font-medium  rounded-md  Menu_Text 
            py-[13px] 
            mx-3 duration-300 items-center"
            >
              <RecentActors fontSize="large" className="p-1" />
              Bookings
            </label>
            <label
              onClick={() => {
                handleLogout();
                setSidebar ? setSidebar(false) : null;
              }}
              className="flex gap-4 px-4 text-white cursor-pointer text-[19px] font-medium  rounded-md  Menu_Text 
            py-[13px] 
            mx-3 duration-300 items-center"
            >
              <LogOut className=" h-6 w-6 ml-1" /> Logout
            </label>
          </div>
        )}
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
    <div className=" h-[100%]  transition-all duration-500 lg:mt-[72px] md:mt-[72px]  sm:mt-[60px] mt-[60px] ">
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

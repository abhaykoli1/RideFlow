import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { MyContext } from "../common/Helper/context";
import { useDispatch, useSelector } from "react-redux";
import { fetchRideDetails } from "@/store/user/Rides-slice";
import RideDetailsDialog from "./ride-details";
import { addToCart, fetchCartItems } from "@/store/user/cart-slice";
import useDeviceType from "@/hooks/useDeviceType";
import { useToast } from "@/hooks/use-toast";
import {
  addToWishlist,
  deleteWishlistItem,
  fetchWishlistItems,
} from "@/store/user/wishlist-slice";
import { Favorite } from "@mui/icons-material";

function UserRideTile({ className, ride, RidesList, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const deviceType = useDeviceType();

  const [isHovered, setIsHovered] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { RideDetails } = useSelector((state) => state.userRides);
  const { user } = useSelector((state) => state.auth);
  const { wishlistItems } = useSelector((state) => state.userWishlist);

  const isInWishlist =
    Array.isArray(wishlistItems.items) &&
    wishlistItems.items.some((item) => item.rideId === ride?._id);

  function handleGetRideDetails(getCurrentRideId) {
    setOpenDetailsDialog(true);
    dispatch(fetchRideDetails(getCurrentRideId));
  }

  useEffect(() => {
    // Check localStorage for cached wishlist
    const cachedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (cachedWishlist && cachedWishlist.length > 0) {
      setWishlist(cachedWishlist);
    } else {
      // Fetch from backend if no cached data
      if (user?.id) {
        dispatch(fetchWishlistItems(user.id)).then((data) => {
          if (data?.payload?.success) {
            const fetchedWishlist = data.payload.wishlist || [];
            setWishlist(fetchedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(fetchedWishlist));
          }
        });
      }
    }
  }, [user, dispatch]);
  const handleAddToWishlist = (getCurrentRideId) => {
    dispatch(
      addToWishlist({
        userId: user?.id,
        rideId: getCurrentRideId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        const updatedWishlist = [...wishlist, getCurrentRideId];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast({
          title: "Ride added to Wishlist",
        });
      }
    });
  };

  const handleWishlistItemsDelete = (rideId) => {
    dispatch(
      deleteWishlistItem({
        userId: user?.id,
        rideId: rideId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        const updatedWishlist = wishlist.filter((id) => id !== rideId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        toast({
          title: "Ride removed from Wishlist",
        });
      }
    });
  };

  // function handleAddToWishlist(getCurrentRideId) {
  //   dispatch(
  //     addToWishlist({
  //       userId: user?.id,
  //       rideId: getCurrentRideId,
  //     })
  //   ).then((data) => {
  //     console.log(data);
  //     if (data?.payload?.success) {
  //       dispatch(fetchWishlistItems(user?.id));
  //       setWishlist((prevWishlist) => [...prevWishlist, getCurrentRideId]);
  //       toast({
  //         title: "Ride added to Wishlist",
  //       });
  //     }
  //   });
  // }

  // const handleWishlistItemsDelete = (rideId) => {
  //   dispatch(
  //     deleteWishlistItem({
  //       userId: user?.id,
  //       rideId: rideId,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       setWishlist((prevWishlist) =>
  //         prevWishlist.filter((id) => id !== rideId)
  //       );
  //       toast({
  //         title: "Ride removed from Wishlist",
  //       });
  //     }
  //   });
  // };

  function handleOrderRide(getCurrentRideId) {
    sessionStorage.setItem("currentRideId", getCurrentRideId);
    navigate("/ride/booking");
    dispatch(fetchRideDetails(getCurrentRideId));
  }

  return (
    <div>
      <div
        key={index}
        onMouseEnter={() => setIsHovered(index)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        {/* Only in Fleet || View more || Edit */}

        <div
          className={` 
          cursor-pointer  duration-500`}
        >
          {ride?.totalStock === 0 ? (
            <Badge className="absolute z-1 top-2 left-0 rounded-l-none bg-slate-500 hover:bg-slate-700">
              Out Of Stock
            </Badge>
          ) : ride?.totalStock < 5 ? (
            <Badge className="absolute z-1 top-2 left-0 rounded-l-none bg-tomato hover:bg-red-600">
              {`${ride?.totalStock} rides left`}
            </Badge>
          ) : ride?.salePrice > 0 ? (
            <Badge className="absolute top-2 z-1 left-0 rounded-l-none bg-tomato hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
          <div
            className={`
              absolute right-0
                text-black text-end pr-3 font-semibold pt-2 `}
          >
            <div>
              <p className="text-[16px] text-yellow capitalize">{ride.brand}</p>
              <p className="text-[13px] text-slate-700">{ride.rideName}</p>
            </div>
          </div>

          <img
            onClick={() => {
              handleGetRideDetails(ride?._id);
            }}
            className={`w-full mt-5 h-52 object-cover max-w-80 mx-auto text-center duration-500 
              ${isHovered === index ? "scale-[90%]" : "hover:scale-[90%]"}`}
            src={ride.image}
            alt={`${ride.rideName}`}
          />

          <p
            //  "pt-[70px] h-40"
            className={` ${
              deviceType !== "desktop" ||
              (isHovered === index && deviceType === "desktop"
                ? index !== RidesList.slice(0, 5).length - 1
                : null)
                ? "pt-[113px] h-40"
                : ""
            } text-white !z-20 text-[12px] h-[24px] duration-500 font-semibold pl-4 bg-yellow relative`}
          >
            <div className="flex justify-between items-center ">
              <span
                className={`${
                  ride?.salePrice > 0 ? "line-through" : ""
                } text-[14px] font-semibold text-primary`}
              >
                {"\u20B9"}
                {ride?.rentPrice}
              </span>
              {ride?.salePrice > 0 ? (
                <span className=" text-[14px] font-bold ">
                  {"\u20B9"}
                  {ride?.salePrice}
                  <span className="text-[14px]  italic mr-10">/- </span>
                </span>
              ) : null}
            </div>

            {isInWishlist ? (
              <div
                onClick={() => handleWishlistItemsDelete(ride?._id)}
                className={` absolute -top-[6px] rounded-tr-none  rounded-tl-xl right-0 flex justify-center items-center bg-yellow px-1 rounded-md text-[#fff] text-[12px] font-semibold h-7 hover:scale-[99%]`}
              >
                <Favorite className="text-tomato ml-1" />
              </div>
            ) : (
              <div
                onClick={() => handleAddToWishlist(ride?._id)}
                className={`absolute -top-[6px] rounded-tr-none  rounded-tl-xl right-0 flex justify-center items-center bg-yellow px-1 rounded-md text-[#fff] text-[12px] font-semibold h-7 hover:scale-[99%]`}
              >
                <Favorite className="text-white ml-1" />
              </div>
            )}
          </p>
          {deviceType === "desktop" &&
          index === RidesList.slice(0, 5).length - 1 ? null : (
            <div
              className={`${
                deviceType !== "desktop" || isHovered === index
                  ? "-translate-y-12 "
                  : "translate-y-16"
              } flex px-3  absolute bottom-0 w-[88%]  z-30 text-white font-semibold transition-transform transform duration-500`}
            >
              <div className="w-full">
                <p className=" text-[13px]">110 Km Limit</p>
                <p className=" text-[11px]">
                  {`( Excess ${"\u20B9"}3/km + GST )`}
                </p>
                <div className="flex justify-between items-center ">
                  <span
                    className={`${
                      ride?.salePrice > 0 ? "line-through" : ""
                    } text-[14px] font-semibold text-primary`}
                  >
                    {"\u20B9"}
                    {ride?.rentPrice}
                  </span>
                  {ride?.salePrice > 0 ? (
                    <span className=" text-[14px] font-bold -mr-8">
                      {"\u20B9"}
                      {ride?.salePrice}
                      <span className="text-[14px]  italic">/- </span>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          )}
          {deviceType === "desktop" &&
          index === RidesList.slice(0, 5).length - 1 ? null : (
            <div
              className={` w-full px-2 pb-2 z-30 absolute bottom-0 text-black text-md font-semibold transition-transform transform duration-300 
            ${
              deviceType === "desktop"
                ? isHovered === index
                  ? "translate-y-0"
                  : "translate-y-full"
                : null
            }`}
            >
              {ride.totalStock !== 0 ? (
                <Button
                  onClick={() => {
                    handleOrderRide(ride?._id);
                  }}
                  className="bg-white w-full text-slate-800 text-[12px] font-semibold h-8  rounded-md"
                >
                  Book Now
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toast({
                      title: "Uh oh! Ride is out of stock.",
                      // action: (
                      //   <ToastAction className="!bg-white" altText="Try again">
                      //     Try Later
                      //   </ToastAction>
                      // ),
                    });
                  }}
                  className="bg-white w-full opacity-80 text-slate-800 text-[12px] font-semibold h-8  rounded-xl"
                >
                  Not in Stock
                </Button>
              )}
            </div>
          )}
        </div>
        {index === RidesList.slice(0, 5).length - 1 ? (
          <div
            onClick={() => {
              navigate("/ride/listing");
            }}
            className="absolute z-30 bg-[rgba(0,0,0,0.5)] transform transition-transform duration-300 hover:scale-[120%]  w-full flex flex-col justify-center items-center px-3 h-full"
          >
            <Plus color="white" size={35} />
            <p className="text-white font-semibold">View More</p>
          </div>
        ) : null}
      </div>

      <RideDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        RideDetails={RideDetails}
      />
    </div>
  );
}

export default UserRideTile;

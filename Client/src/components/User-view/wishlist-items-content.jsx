import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlistItem,
  fetchWishlistItems,
} from "@/store/user/wishlist-slice";
import { useNavigate } from "react-router-dom";
import { fetchRideDetails } from "@/store/user/Rides-slice";
import { useEffect } from "react";

function UserWishlistItemsContent({ wishlistItems, setOpenWishlistSheet }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleWishlistItemsDelete(getWishlistItems) {
    dispatch(
      deleteWishlistItem({
        userId: user?.id,
        rideId: getWishlistItems?.rideId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Ride removed from Wishlist",
        });
      }
    });
  }

  function handleOrderRide(getCurrentRideId) {
    console.log(getCurrentRideId);
    setOpenWishlistSheet(false);
    navigate("/ride/booking");
    dispatch(fetchRideDetails(getCurrentRideId));
  }

  return (
    <div className="flex text-slate-800 space-x-4">
      <img
        src={wishlistItems?.image}
        alt={wishlistItems?.rideName}
        className=" w-20 h-20 rounded object-cover"
      />
      <div className=" w-full flex flex-col gap-1">
        <div className="flex justify-between items-center w-full ">
          <div className="">
            <h3 className="font-extrabold text-[13px]">
              {wishlistItems?.rideName}
            </h3>
            <p className="font-semibold text-[10px]">
              {"\u20B9"}
              {wishlistItems?.rentPerHour.toFixed(2)}{" "}
              <span className="italic">/-</span>
            </p>
          </div>
          <Trash
            onClick={() => handleWishlistItemsDelete(wishlistItems)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
        <Button
          onClick={() => {
            handleOrderRide(wishlistItems?.rideId);
          }}
          className="h-6 w-full AuthButton !bg-yellow !border-none text-[13px]"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default UserWishlistItemsContent;

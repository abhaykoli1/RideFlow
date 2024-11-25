import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

import { useState } from "react";
import { Star } from "lucide-react";
import { addToCart, fetchCartItems } from "@/store/user/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

function RideDetailsDialog({ open, setOpen, RideDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.userCart);
  // const { reviews } = useSelector((state) => state.shopReview);
  const navigate = useNavigate();
  const { toast } = useToast();

  // function handleRatingChange(getRating) {
  //   console.log(getRating, "getRating");

  //   setRating(getRating);
  // }

  // function handleAddToCart(getCurrentRideId, getTotalStock) {
  //   let getCartItems = cartItems.items || [];

  //   if (getCartItems.length) {
  //     const indexOfCurrentItem = getCartItems.findIndex(
  //       (item) => item.rideId === getCurrentRideId
  //     );
  //     if (indexOfCurrentItem > -1) {
  //       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
  //       if (getQuantity + 1 > getTotalStock) {
  //         toast({
  //           title: `Only ${getQuantity} quantity can be added for this item`,
  //           variant: "destructive",
  //         });

  //         return;
  //       }
  //     }
  //   }
  //   dispatch(
  //     addToCart({
  //       userId: user?.id,
  //       rideId: getCurrentRideId,
  //       quantity: 1,
  //     })
  //   ).then((data) => {
  //     if (data?.payload?.success) {
  //       dispatch(fetchCartItems(user?.id));
  //       toast({
  //         title: "Ride is added to cart",
  //       });
  //     }
  //   });
  // }

  // function handleDialogClose() {
  //   setOpen(false);
  //   dispatch(setProductDetails());
  //   setRating(0);
  //   setReviewMsg("");
  // }

  // function handleAddReview() {
  //   dispatch(
  //     addReview({
  //       rideId: productDetails?._id,
  //       userId: user?.id,
  //       userName: user?.userName,
  //       reviewMessage: reviewMsg,
  //       reviewValue: rating,
  //     })
  //   ).then((data) => {
  //     if (data.payload.success) {
  //       setRating(0);
  //       setReviewMsg("");
  //       dispatch(getReviews(productDetails?._id));
  //       toast({
  //         title: "Review added successfully!",
  //       });
  //     }
  //   });
  // }

  // useEffect(() => {
  //   if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  // }, [productDetails]);

  // console.log(reviews, "reviews");

  // const averageReview =
  //   reviews && reviews.length > 0
  //     ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
  //       reviews.length
  //     : 0;

  return (
    <Dialog className="detailsDialogBox " open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gradient-to-t from-[#ffeecc] to-white detailsDialog !bg-whit border-[0.5px] border-gray-500 grid pt-16 grid-cols-2  gap-8 sm:p-12 max-w-[90vw] max-h-[100vh] sm:max-w-[70vw] md:max-w-[80vw] text-black lg:max-w-[70vw] overflow-auto">
        <div className="relative overflow-hidden rounded-lg detailsImageBox">
          <img
            src={RideDetails?.image}
            alt={RideDetails?.rideName}
            className="aspect-square w-full object-cover detailsImage rounded-lg"
          />
        </div>
        <div>
          <div>
            <DialogTitle className=" font-extrabold ">
              <p className="text-yellow capitalize mb-1 text-2xl">
                {RideDetails?.brand}
              </p>
              <p className="text-black text-xl  capitalize mb-1">
                {RideDetails?.rideName}
              </p>
            </DialogTitle>
            <DialogDescription>{RideDetails?.description}</DialogDescription>
            <p className="text-gray-400 text-2xl mb-5 mt-4"></p>
          </div>
          <div className="flex flex-col">
            {RideDetails?.salePrice === 0 ? (
              <span
                className={`${
                  RideDetails?.salePrice > 0 ? "line-through" : ""
                } text-[14px] font-semibold  text-tomato`}
              >
                {"\u20B9"}
                {RideDetails?.rentPrice}
              </span>
            ) : (
              <span
                className={`${
                  RideDetails?.salePrice > 0 ? "line-through" : ""
                } text-[12px] font-medium  subtitle`}
              >
                {"\u20B9"}
                {RideDetails?.rentPrice}
              </span>
            )}

            {RideDetails?.salePrice > 0 ? (
              <div className="flex gap-3 items-center">
                <span className=" text-[14px] font-bold text-tomato">
                  {(
                    ((RideDetails?.rentPrice - RideDetails?.salePrice) /
                      RideDetails?.rentPrice) *
                    100
                  ).toFixed(0)}
                  %
                </span>
                <span className=" text-[14px] font-bold text-slate-800">
                  {"\u20B9"}
                  {RideDetails?.salePrice}
                  <span className="text-[14px] italic mr-10"> /- </span>
                </span>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
            </div>
            <span className="text-muted-foreground">
              (4.5)
              {/* ({averageReview.toFixed(2)}) */}
            </span>
          </div>
          <div className="mt-5 mb-5">
            {RideDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full border-gray-600 hover:border-black bg-black text-white   hover:text-white "
                onClick={() => {
                  navigate("/ride/booking");
                }}
                // handleAddToCart(RideDetails?._id, RideDetails?.totalStock)
              >
                Book Now
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RideDetailsDialog;

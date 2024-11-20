import { MyContext } from "@/components/common/Helper/context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import UserRideTile from "@/components/User-view/ride-tile";
import { Star } from "lucide-react";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Dashboard/footer";

const RideDetailsPage = ({}) => {
  const [reviewMsg, setReviewMsg] = useState("");
  const { RideDetails, RidesList } = useSelector((state) => state.userRides);
  return (
    <div className="">
      <div className="relative lg:h-[100%] xl:container px-4 mx-auto border-gray-500 grid gap-10 w-full sm:grid-cols-[2fr_3fr] md:grid-cols-[2fr_3fr] lg:grid-cols-[2fr_3fr_2fr]">
        <div className="sticky top-0 lg:top-10 h-[80vh]">
          <div className="relative rounded-lg detailsImageBox mt-10 DetailsImage bg-red-400">
            <img
              src={RideDetails?.image}
              alt={RideDetails?.title}
              className="aspect-square w-full object-cover detailsImage rounded-lg"
            />
          </div>
        </div>
        <div className="mt-10">
          <div>
            <p className="text-3xl font-extrabold ">{RideDetails?.rideName}</p>
            <p className="text-gray-400 text-2xl mb-5 mt-4">
              {RideDetails?.description}
            </p>
          </div>
          <div className="">
            <p className="text-xl font-bold ">
              {"\u20B9"} {RideDetails?.rentPerHour} / Hour
            </p>
            <p className="text-xl font-bold ">
              {"\u20B9"} {RideDetails?.rentPerDay} / Day
            </p>
            <p className="text-xl font-bold ">
              {"\u20B9"} {RideDetails?.rentPerWeek} / Week
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
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
                className="w-full border-gray-400 hover:border-white bg-black hover:text-white "
                // onClick={() =>
                //   handleAddToCart(RideDetails?._id, RideDetails?.totalStock)
                // }
              >
                Add to Shop
              </Button>
            )}
          </div>
          <div className="">
            <h2 className="text-xl font-bold mb-5">Reviews</h2>

            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center  gap-2">
                    <h3 className="font-bold">Abhay koli</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  </div>
                  <p className="text-muted-foreground">This bike is Awesome</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center  gap-2">
                    <h3 className="font-bold">Abhay koli</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  </div>
                  <p className="text-muted-foreground">This bike is Awesome</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center  gap-2">
                    <h3 className="font-bold">Abhay koli</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  </div>
                  <p className="text-muted-foreground">This bike is Awesome</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center  gap-2">
                    <h3 className="font-bold">Abhay koli</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  </div>
                  <p className="text-muted-foreground">This bike is Awesome</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center  gap-2">
                    <h3 className="font-bold">Abhay koli</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    <Star />
                    {/* <StarRatingComponent rating={reviewItem?.reviewValue} /> */}
                  </div>
                  <p className="text-muted-foreground">This bike is Awesome</p>
                </div>
              </div>
            </div>
            <div className=" flex-col flex gap-2">
              <Textarea
                name="reviewMsg"
                className=" bg-transparent placeholder:text-gray-600  border-gray-400 hover:border-black text-black"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                className="w-full border-gray-600 hover:border-black bg-transparent  text-gray-600 hover:text-black mb-10"
                // onClick={handleAddReview}
                // disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div
          className="BorderLeft pl-5 mb-10 
     border-gray
      lg:h-[100%] h-[290px] gap-3 lg:flex lg:flex-col hidden
      px-3 py-3  overflow-y-scroll"
        >
          {RidesList && RidesList.length > 0
            ? RidesList.map((rideItem) => (
                <UserRideTile
                  fleet={true}
                  RidesList={RidesList}
                  className={
                    "shrink-0 relative !rounded-xl overflow-hidden cursor-pointer mx-auto border  w-full"
                  }
                  // setOpenDetailsDialog={setOpenDetailsDialog}
                  key={rideItem.id}
                  ride={rideItem}
                  // handleGetRideDetails={handleGetRideDetails}
                  // handleAddtoCart={handleAddtoCart} <div>No rides available.</div>
                />
              ))
            : null}
        </div>
      </div>
      <div className="lg:hidden flex overflow-auto gap-6  px-5 pb-10">
        {RidesList && RidesList.length > 0
          ? RidesList.map((rideItem) => (
              <UserRideTile
                fleet={true}
                RidesList={RidesList}
                className={
                  "shrink-0 h-full w-80 relative !rounded-xl overflow-hidden cursor-pointer mx-auto border  "
                }
                // setOpenDetailsDialog={setOpenDetailsDialog}
                key={rideItem.id}
                ride={rideItem}
                // handleGetRideDetails={handleGetRideDetails}
                // handleAddtoCart={handleAddtoCart} <div>No rides available.</div>
              />
            ))
          : null}
      </div>
      <Footer />
    </div>
  );
};

export default RideDetailsPage;

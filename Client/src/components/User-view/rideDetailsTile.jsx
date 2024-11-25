import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { NotebookText } from "lucide-react";

const BookingRideDetailsTile = ({ RideDetails, Date, DropOffDate, Day }) => {
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const limit = 120;

  const toggleReadMore = (index) => {
    setExpandedIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div>
      <div className="Border shadow-sm Rounded   rounded-md bg-white text-black relative">
        <span className="text-md font-semibold px-3  rounded-md underline flex pt-3  gap-2 absolute top-0 right-0 left-0 bg-gradient-to-b h-12 z-10 from-[#ffedca] to-white">
          <NotebookText className="" /> Ride Details
        </span>
        <div className="z-20 -mt-4 px-3 pb-3 ">
          <div className="flex justify-between items-start mb-2 mt-12">
            <div className="flex flex-col mt-3">
              <span className="capitalize text-[20px] text-yellow font-semibold">
                {RideDetails?.brand}
              </span>
              <span className="capitalize text-[13px] font-semibold ">
                {RideDetails?.rideName}
              </span>
              <span className="text-[13px] text-tomato py-[5px] rounded-l-lg px-1 font-bold w-32  bg-gradient-to-r from-[#ffe5b1] to-white ">
                ₹{" "}
                {RideDetails?.salePrice !== 0
                  ? RideDetails?.rentPrice > RideDetails?.salePrice
                    ? RideDetails?.salePrice
                    : null
                  : RideDetails?.rentPrice}
                /-
              </span>

              {RideDetails?.description && (
                <div className="text-[12px] text-gray-600  font-medium overflow-hidden">
                  {" "}
                  {expandedIndexes[0]
                    ? RideDetails?.description
                    : `${RideDetails?.description.slice(0, limit)}...`}
                  <a
                    onClick={() => toggleReadMore(0)}
                    className="text-[12px] text-yellow hover:underline hover:text-yellow  ml-1 cursor-pointer"
                  >
                    {expandedIndexes[0] ? "Less" : "More"}
                  </a>
                </div>
              )}
            </div>
            <img
              src={RideDetails?.image}
              alt={RideDetails?.rideName}
              className=" w-full -mt-0 object-cover  object-center max-w-[120px]"
            />
          </div>
          <Separator />
          <div className="flex items-center mt-1 justify-between">
            <div className="flex gap-4 items-center  h-5 relative ">
              <p className="text-[12px] font-medium">
                {Date
                  ? `${Date.toLocaleDateString("en-US", options)}`
                  : "Invalid Date"}
              </p>
              -
              <p className="text-[12px] font-medium">
                {Date
                  ? `${DropOffDate.toLocaleDateString("en-US", options)}`
                  : "Invalid Date"}
              </p>
            </div>
          </div>
          <p className="text-[12px] font-medium mb-3 mt-1">{`For ${Day} ${
            Day === "1" ? "Day" : "Days"
          }`}</p>
          <div className="space-y-2">
            <p className="text-[14px] font-semibold underline">
              Additional Details
            </p>
            <ul className="text-xs font-medium space-y-1 mt-1 list-disc pl-5">
              <li>Total Distance: 240 km</li>
              <li>Excess Distance Charge: ₹2 per km</li>
              <li>Excess Hourly Charge: ₹50 per hour</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRideDetailsTile;

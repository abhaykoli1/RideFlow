import React from "react";
import { useSelector } from "react-redux";

const UserCheckOutRideContent = ({ RideDetails }) => {
  console.log(RideDetails);

  return (
    <div className="w-full  gap-4">
      <div>
        <p className="text-yellow capitalize mb-1 text-2xl font-bold">
          {RideDetails?.brand}
        </p>
        <h2 className="text-lg font-semibold ">{RideDetails?.rideName}</h2>
        <div>
          <p className="text-sm font-bold ">
            {"\u20B9"} {RideDetails?.rentPerHour}
            <span className="italic subtitle"> /- per hour</span>
          </p>
          <p className="text-sm font-bold ">
            {"\u20B9"} {RideDetails?.rentPerDay}{" "}
            <span className="italic subtitle">/- per day</span>
          </p>
          <p className="text-sm font-bold ">
            {"\u20B9"} {RideDetails?.rentPerWeek}{" "}
            <span className="italic subtitle">/- per week</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCheckOutRideContent;

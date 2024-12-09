import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const AddressSheetContent = ({ allBookings, booking }) => {
  return (
    <div className="text-black ">
      <p className="text-[12px]">
        <strong>Booking Id : {booking._id}</strong>
      </p>
      <p className="text-[12px] font-semibold mt-2">
        {booking.addressInfo.address},{" "}
      </p>
      <p className="uppercase text-[12px] font-semibold">
        {booking.addressInfo.city}, {booking.addressInfo.state},{" "}
        {booking.addressInfo.pincode}
      </p>
      <p className=" text-[12px] font-semibold">{booking.addressInfo.phone}</p>
    </div>
  );
};

export default AddressSheetContent;

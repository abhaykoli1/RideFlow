import { ReceiptText } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { bookRide, resetBookingState } from "@/store/user/booking-slice";
import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";

const initialBookingFormData = {
  userId: "",
  bikeId: "",
  bookedTimeSlots: {
    from: "",
    to: "",
  },
  totalDays: "",
  totalAmount: "",
  status: "",
  addressInfo: {
    userId: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  },
  orderId: "",
};

const BillingDetails = ({
  RideDetails,
  Date,
  DropOffDate,
  daysToAdd,
  deliveryOption,
  //   drivingLicenceNo,
  //   mobileNo,
}) => {
  const [drivingLicenceNo, setDrivingLicenceNo] = useState(
    sessionStorage.getItem("drivingLicenceNo") || ""
  );
  const [mobileNo, setMobileNo] = useState(
    sessionStorage.getItem("mobileNo") || ""
  );
  const [bookingData, setBookingData] = useState(initialBookingFormData);
  const { isLoading, bookingDetails, error } = useSelector(
    (state) => state.userBooking
  );

  console.log("dl", mobileNo);

  const { addressList } = useSelector((state) => state.userAddress);

  console.log("addressList", addressList?.city);

  const { user } = useSelector((state) => state.auth);

  const OrderId = uuidv4();

  console.log("Generated UUID:", OrderId);

  function calculateChargesWithDiscount(baseCharge, daysToAdd, deliveryOption) {
    let charges = baseCharge;
    let totalDiscount = 0;
    const fixedReduction = 3;
    let percent = 2;
    const reductionRate = 0.2;
    for (let day = 1; day <= daysToAdd; day++) {
      if (day === 1) {
        continue;
      } else if (day <= 7) {
        totalDiscount += fixedReduction;
        charges -= fixedReduction;
      } else {
        const discount = (charges * percent) / 100;
        totalDiscount += discount;
        charges -= discount;
        percent = Math.max(percent - reductionRate, 0);
      }
    }
    if (deliveryOption === "Home") {
      charges += 100;
    }
    return {
      finalCharge: charges.toFixed(2),
      totalDiscount: totalDiscount.toFixed(0),
    };
  }

  const charges =
    RideDetails?.salePrice !== 0
      ? RideDetails?.rentPrice > RideDetails?.salePrice
        ? RideDetails?.salePrice
        : null
      : RideDetails?.rentPrice;

  const baseCharge = charges * daysToAdd;

  const result = calculateChargesWithDiscount(
    baseCharge,
    daysToAdd,
    deliveryOption
  );

  console.log(`Final charge after ${daysToAdd} days: ₹${result.finalCharge}`);
  console.log(`Total discount given: ₹${result.totalDiscount}`);

  console.log("Date", Date);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", bookingData);
    dispatch(
      bookRide({
        userId: user?.id,
        bikeId: RideDetails?._id,
        bookedTimeSlots: {
          from: Date,
          to: DropOffDate,
        },
        totalDays: daysToAdd,
        totalAmount: result.finalCharge,
        status: "Pending", // Default status
        addressInfo: {
          userId: "",
          address: "",
          city: "",
          pincode: "",
          phone: "5343435434343",
        },
        dl: sessionStorage.getItem("drivingLicenceNo"),
        phone: sessionStorage.getItem("mobileNo"),
        orderId: OrderId,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetBookingState());
  };

  return (
    <div>
      <div className="mt-5 text-slate-800 text-[14px]">
        <span className="text-lg font-semibold underline flex gap-2 items-center">
          <ReceiptText /> Billing Details
        </span>

        <p className="mt-4">
          <strong>Stored in session:</strong>
          <br />
          Driving Licence No.: {sessionStorage.getItem("drivingLicenceNo")}
          <br />
          Mobile No.: {sessionStorage.getItem("mobileNo")}
        </p>
        <div className="flex justify-between items-center pb-1 pt-2">
          <span className="text-md font-medium text-gray-700">
            Ride Charges
          </span>
          <span className="text-md font-semibold text-gray-900">
            ₹{charges * daysToAdd} /-
          </span>
        </div>

        <div className="flex justify-between items-center pb-1 pt-1">
          <span className="text-md font-medium text-gray-700">
            Additional Discount
          </span>
          <span className="text-md font-semibold text-tomato">
            {result.totalDiscount} %
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-sm font-medium text-gray-700">
            Security Deposit
          </span>
          <span className="text-sm font-semibold text-green-600">₹ 0 /-</span>
        </div>

        <div
          className={`${
            deliveryOption === "Pick" ? "hidden" : "flex"
          } justify-between items-center pt-1 pb-2`}
        >
          <span className="text-sm font-medium text-gray-700">
            Home Delivery Charges
          </span>
          <span className="text-sm font-semibold text-green-600">
            + ₹ 100 /-
          </span>
        </div>

        <Separator />
        <div className="flex justify-between items-center pt-1 mb-3">
          <span className="text-[15.5px] font-bold text-gray-800">
            Total Charges
          </span>
          <span className="text-[15.5px] font-bold text-slate-800">
            ₹ {result.finalCharge} /-
          </span>
        </div>

        <Button
          disabled={
            !sessionStorage.getItem("drivingLicenceNo") ||
            !sessionStorage.getItem("mobileNo") ||
            isLoading
          }
          onClick={handleSubmit}
          className="w-full bg-slate-800 text-white mt-1"
        >
          {isLoading ? "Booking..." : "Book Ride"}
        </Button>
        {bookingDetails && (
          <div className="success-message text-">
            Booking Successful! Booking ID: {bookingDetails.bookingId}
          </div>
        )}
        {error && <div className="error-message">Error: {error}</div>}
        <button className="text-black" onClick={handleReset}>
          Reset
        </button>

        <p className="text-center text-sm">
          By clicking on place ride you are accepting the{" "}
          <a>Terms & Conditions</a> of BikeRental
        </p>
      </div>
    </div>
  );
};

export default BillingDetails;

{
  /* <BillingDetails
deliveryOption={deliveryOption}
RideDetails={RideDetails}
daysToAdd={daysToAdd}
/> */
}
{
  /* <div className="flex items-center ">
    <Checkbox
      className="!text-slate-800"
      sx={{
        color: "slategray", // Corrected color value for valid CSS
        "&.Mui-checked": {
          color: "tomato",
        },
      }}
      checked={isChecked}
      onChange={handleCod} // Bind the handler
    />
    <span className="text-sm font-medium text-gray-700">
      Cash on Delivery
    </span>
  </div> */
}
{
  /* {isChecked ? ( */
}

{
  /* ) : (
    <Button className="w-full bg-slate-800 text-white mt-1">
      Pay Now ₹{" "}
      {deliveryOption === "Pick"
        ? RideDetails?.rentPerDay * daysToAdd
        : RideDetails?.rentPerDay * daysToAdd + 100}
    </Button>
  )} */
}

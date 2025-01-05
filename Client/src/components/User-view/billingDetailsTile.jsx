import { ReceiptText } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { bookRide, resetBookingState } from "@/store/user/booking-slice";
import { Dialog, DialogContent } from "../ui/dialog";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  currentSelectedAddress,
  deliveryCharge,
}) => {
  const { toast } = useToast();

  // const [drivingLicenceNo, setDrivingLicenceNo] = useState(
  //   sessionStorage.getItem("drivingLicenceNo") || ""
  // );

  // const [mobileNo, setMobileNo] = useState(
  //   sessionStorage.getItem("mobileNo") || ""
  // );
  // const [bookingData, setBookingData] = useState(initialBookingFormData);

  const { isLoading } = useSelector((state) => state.userBooking);
  const { user } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);

  function calculateChargesWithDiscount(
    baseCharge,
    daysToAdd,
    deliveryOption,
    deliveryCharge
  ) {
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

    // Add delivery charge if the delivery option is "Home"
    if (deliveryOption === "Home" && deliveryCharge !== undefined) {
      charges += parseFloat(deliveryCharge) || 0;
      // console.log("Final Charges (Home):", charges);
    }
    // console.log("Type of charges:", typeof ExtraCharge);
    // console.log("Type of charges:", typeof charges);

    return {
      finalCharge: charges.toFixed(2),
      totalDiscount: totalDiscount.toFixed(0),
    };
  }
  // Example Usage:
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
    deliveryOption,
    deliveryCharge
  );

  // console.log(`Final charge after ${daysToAdd} days: ₹${result.finalCharge}`);
  // console.log(`Total discount given: ₹${result.totalDiscount}`);
  // console.log("Date", Date);

  const [Message, setMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
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
        status: "Pending",
        addressInfo: {
          userId:
            deliveryOption === "Home" ? currentSelectedAddress?.userId : "",
          address:
            deliveryOption === "Home" ? currentSelectedAddress?.address : "",
          city: deliveryOption === "Home" ? currentSelectedAddress?.city : "",
          state: deliveryOption === "Home" ? currentSelectedAddress?.state : "",
          pincode:
            deliveryOption === "Home" ? currentSelectedAddress?.pincode : "",
          phone: deliveryOption === "Home" ? currentSelectedAddress?.phone : "",
        },
        dl: sessionStorage.getItem("drivingLicenceNo"),
        phone:
          deliveryOption === "Pick"
            ? sessionStorage.getItem("mobileNo")
            : currentSelectedAddress?.phone,
      })
    ).then((booking) => {
      if (booking?.payload?.success) {
        // toast({
        //   title:
        //     booking?.payload?.message || "Your Booking Placed successfully",
        //   description:
        //     "Booking successfull! We’ll be in touch shortly with more information.",
        // });
        setOpenDialog(true);
        setTimeout(() => {
          // goTop();
          // navigate("/ride/bookings");
        }, 3000);
      } else {
        toast({
          title: booking?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mt-5 text-slate-800 text-[14px]">
        <span className="text-lg font-semibold underline flex gap-2 items-center">
          <ReceiptText /> Billing Details
        </span>
        <div className="flex justify-between items-center pb-1 pt-2">
          <span className="text-md font-medium text-gray-700">
            Ride Charges
          </span>
          <span className="text-md font-semibold text-gray-900">
            {charges * daysToAdd} ₹
          </span>
        </div>

        <div className="flex justify-between items-center pb-1 pt-1">
          <span className="text-md font-medium text-gray-700">
            Additional Discount
          </span>
          <span className="text-md font-semibold text-tomato">
            - {result.totalDiscount} ₹
          </span>
        </div>

        <div className="flex justify-between items-center py-1">
          <span className="text-sm font-medium text-gray-700">
            Security Deposit
          </span>
          <span className="text-sm font-semibold text-green-600">0 ₹ </span>
        </div>

        <div
          className={`${
            deliveryOption === "Pick" ? "hidden" : "flex"
          } justify-between items-center pt-1 pb-2`}
        >
          <span className="text-sm font-medium text-gray-700">
            Home Delivery Charges
          </span>
          {deliveryCharge ? (
            <p className="text-sm font-semibold text-green-600">
              {deliveryCharge} ₹
            </p>
          ) : (
            "NaN"
          )}
        </div>

        <Separator />
        <div className="flex justify-between items-center pt-1 mb-3">
          <span className="text-[15.5px] font-bold text-gray-800">
            Total Charges
          </span>
          <span className="text-[15.5px] font-bold text-slate-800">
            {result.finalCharge} ₹
          </span>
        </div>

        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full bg-slate-800 text-white mt-1"
        >
          {isLoading ? "Booking..." : "Book Ride"}
        </Button>
        <p className="text-center text-sm font-medium mt-2">
          By clicking on place ride you are accepting the{" "}
          <a>Terms & Conditions</a> of BikeRental
        </p>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-b from-[#ffedca] to-white text-black rounded-md p-10 text-center max-w-lg w-full">
          <h1 className="text-4xl font-bold mb-4">You're All Set!</h1>
          <p className="text-lg font-semibold ">
            Your Booking Placed successfully
          </p>
          <p className="text-lg font-medium mb-6">
            We’ll be in touch shortly with more information.
          </p>
          <Button
            onClick={() => {
              goTop();
              navigate("/bookings");
            }}
            className="bg-slate-800 text-white"
          >
            Go To Booking History
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillingDetails;

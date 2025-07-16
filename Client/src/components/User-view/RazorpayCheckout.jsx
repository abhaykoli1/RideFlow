import React, { useState } from "react";
import axios from "axios";
import config from "@/store/config";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../ui/dialog";

const RazorpayCheckout = ({
  rideId,
  amountInRupees,
  RideDetails,
  Date,
  DropOffDate,
  daysToAdd,
  deliveryOption,
  currentSelectedAddress,
  deliveryCharge,
  result,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existing = document.getElementById("razorpay-sdk");

      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.id = "razorpay-sdk";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      } else {
        if (typeof window.Razorpay !== "undefined") {
          resolve(true);
        } else {
          existing.onload = () => resolve(true);
          existing.onerror = () => resolve(false);
        }
      }
    });
  };

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handlePayment = async () => {
    const sdkLoaded = await loadRazorpayScript();

    if (!sdkLoaded) {
      alert("❌ Razorpay SDK failed to load. Please try again.");
      return;
    }

    const amountInPaise = Math.round(Number(amountInRupees) * 100);

    try {
      // Step 1: Create Razorpay order
      const { data: order } = await axios.post(
        `${config.API_URL}/payment/createOrder`,
        {
          id: rideId,
          price: amountInPaise,
        }
      );

      if (!order?.id || !order?.amount) {
        alert("❌ Invalid Razorpay order from server.");
        return;
      }

      // Step 2: Initialize Razorpay
      const options = {
        key: "rzp_test_Xwls25LJO8PuLE", // Replace with LIVE key in production
        amount: 1,
        currency: "INR",
        name: "RideFlow",
        description: "Bike Ride Payment",
        order_id: order.id,
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "guest@example.com",
          contact:
            deliveryOption === "Pick"
              ? sessionStorage.getItem("mobileNo")
              : currentSelectedAddress?.phone,
        },
        notes: {
          ride_id: rideId,
        },
        theme: {
          color: "#ffa600",
        },
        handler: async (response) => {
          try {
            const { data: verifyRes } = await axios.post(
              `${config.API_URL}/payment/verifyPayment`,
              {
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,

                //
                bookingData: {
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
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.userId
                        : "",
                    address:
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.address
                        : "",
                    city:
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.city
                        : "",
                    state:
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.state
                        : "",
                    pincode:
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.pincode
                        : "",
                    phone:
                      deliveryOption === "Home"
                        ? currentSelectedAddress?.phone
                        : "",
                  },
                  dl:
                    sessionStorage.getItem("drivingLicenceNo") ||
                    "Not Required",
                  phone:
                    deliveryOption === "Pick"
                      ? sessionStorage.getItem("mobileNo")
                      : currentSelectedAddress?.phone,
                },
              }
            );

            if (verifyRes.success) {
              //   alert("✅ Payment successful!");
              setOpenDialog(true);
              setTimeout(() => {
                goTop();
                navigate("/bookings");
              }, 3000);

              // Optional: Trigger booking logic or redirect
              // Example: navigate("/my-bookings");
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (error) {
            console.log("Verification error:", error);
            alert("❌ Payment verification request failed.");
          }
        },
        modal: {
          escape: true,
          ondismiss: () => {
            alert("❗ Payment cancelled by user.");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.open();
    } catch (err) {
      console.log("Payment init error:", err);
      alert("❌ Could not start Razorpay checkout. Try again.");
    }
  };

  return (
    <section className="w-full">
      <Button
        onClick={handlePayment}
        className="bg-[#ffa600] w-full   text-white  "
      >
        Pay ₹{amountInRupees}
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gradient-to-b from-green-100 to-white text-black rounded-md p-10 text-center max-w-lg w-full shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-green-700">
            Payment Successful!
          </h1>
          <p className="text-lg font-semibold text-gray-800">
            Your booking has been successfully placed.
          </p>
          <p className="text-base text-gray-700 mb-6">
            We've received your payment and will contact you shortly with the
            ride details.
          </p>
          <Button
            onClick={() => {
              goTop();
              navigate("/bookings");
            }}
            className="bg-green-700  hover:bg-green-800 text-white font-medium py-2 px-4 rounded"
          >
            View Booking History
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RazorpayCheckout;

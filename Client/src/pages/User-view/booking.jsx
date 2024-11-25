import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Address from "@/components/User-view/address";
import AddressCard from "@/components/User-view/address-card";
import BillingDetails from "@/components/User-view/billingDetailsTile";
import DateCompo from "@/components/User-view/date";
import DayCompo from "@/components/User-view/day";
import RentalLocation from "@/components/User-view/RentalLocation";
import BookingRideDetailsTile from "@/components/User-view/rideDetailsTile";
import { useToast } from "@/hooks/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/user/address-slice";
import { fetchRideDetails } from "@/store/user/Rides-slice";
import { MapPinCheck } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
};

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
const BookingComponent = () => {
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { RideDetails } = useSelector((state) => state.userRides);
  const [openDeliverySheet, setOpenDeliverySheet] = useState(false);
  const [day, setDay] = useState("1");
  const [date, setDate] = useState(null);

  const today = new Date();
  const formattedDate = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, " ");

  const DropOffDate = new Date(date);
  const daysToAdd = parseInt(day, 10);

  if (!isNaN(daysToAdd)) {
    DropOffDate.setDate(DropOffDate.getDate() + daysToAdd);
  } else {
    console.error("The variable 'day' is not a valid number.");
  }

  useEffect(() => {
    const rideId = sessionStorage.getItem("currentRideId");
    if (rideId) {
      dispatch(fetchRideDetails(rideId));
    }
  }, [dispatch]);

  const [deliveryOption, setDeliveryOption] = useState(() => {
    return sessionStorage.getItem("deliveryOption") || "Pick"; // Default to "Pick" if not set
  });

  const handleOptionChange = (value) => {
    setDeliveryOption(value);
    sessionStorage.setItem("deliveryOption", value); // Save in sessionStorage
    console.log("Selected delivery option:", value);
  };

  useEffect(() => {
    console.log("Current delivery option:", deliveryOption);
  }, [deliveryOption]);

  // Separate states for each input
  const [drivingLicenceNo, setDrivingLicenceNo] = useState(
    sessionStorage.getItem("drivingLicenceNo") || ""
  );
  const [mobileNo, setMobileNo] = useState(
    sessionStorage.getItem("mobileNo") || ""
  );

  // Handle individual input changes and store in sessionStorage
  const handleLicenceChange = (e) => {
    const value = e.target.value;
    setDrivingLicenceNo(value);
    sessionStorage.setItem("drivingLicenceNo", value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobileNo(value);
    sessionStorage.setItem("mobileNo", value);
  };

  // Addresss
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { addressList } = useSelector((state) => state.userAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can add max 3 addresses",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setOpenDeliverySheet(false);
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast({
              title: "Address updated successfully",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setOpenDeliverySheet(false);
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }
  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  }
  function handleEditAddress(getCurrentAddress) {
    setOpenDeliverySheet(true);
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
    });
  }
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="ListingBg">
      <div className="lg:pt-28  md:pt-28 pt-20  lg:pb-10  md:pb-10 pb-5 px-5 xl:container mx-auto ">
        <h1 className="lg:text-4xl md:text-xl sm:text-3xl text-2xl font-bold text-yello  mb-2 bg-gradient-to-t from-[#ffae00] to-[#fff9ee] bg-clip-text text-transparent">
          Ride Booking
        </h1>
        <div className="grid lg:grid-cols-[2fr_1.3fr] md:grid-cols-[2fr_1.5fr] grid-cols-1 gap-3">
          <div className="flex flex-col gap-3">
            <BookingRideDetailsTile
              RideDetails={RideDetails}
              DropOffDate={DropOffDate}
              Day={day}
              Date={date}
            />
            <div className="lg:flex md:flex flex-col gap-3 hidden">
              <RentalLocation />
            </div>
          </div>

          <div className="flex flex-col  gap-">
            {/* Add Address  */}
            <div
              className={`${
                deliveryOption === "Pick" ? "hidden" : "flex"
              } Borde shadow-lg Rounded p-3  rounded-md justify-between items-center bg-[#ffedca]   h-[54px]`}
            >
              <span className="font-semibold text-black flex items-center gap-2  text-md">
                <MapPinCheck color="tomato" />
                Your Location
              </span>
              <div
                onClick={() => setOpenDeliverySheet(true)}
                className="text-black font-semibold px-2 underline rounded-sm py-1 bg- hover:text-tomato hover:scale-[99%] cursor-pointer"
              >
                Add Address
              </div>
            </div>

            {/* show Address */}
            <div
              className={`text-slate-800  py-[6.5px] ${
                deliveryOption === "Pick"
                  ? "hidden"
                  : "grid 2xl:grid-cols-2  lg:grid-cols-1 gap-2   AddressGrid"
              }`}
            >
              {addressList && addressList.length > 0
                ? addressList.map((singleAddressItem) => (
                    <AddressCard
                      selectedId={currentSelectedAddress}
                      handleDeleteAddress={handleDeleteAddress}
                      addressInfo={singleAddressItem}
                      handleEditAddress={handleEditAddress}
                      setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />
                  ))
                : null}
            </div>

            {/* Billing  */}
            <div className="flex-col pt-3 Borde Rounded px-3 pb-3 rounded-md bg-gradient-to-b from-[#ffedca]  to-white shadow-lg text-black flex ">
              <Label>If You want to change the dates:</Label>
              <div className={`flex items-center gap-3 mt-2`}>
                <DateCompo
                  date={date}
                  Calendar={"!-left-[100px] absolute"}
                  setDate={setDate}
                  dateCss={
                    "font-semibold text-black !border-2 !pl-2 !py-2 !rounded-lg !bg-[#ffff]  h-9 w-full"
                  }
                />
                <DayCompo
                  day={day}
                  setDay={setDay}
                  dayCss={
                    "font-semibold text-black !border-2 !pl-2 !py-2 !rounded-lg !bg-white !text-black h-9"
                  }
                />
              </div>
              <input
                type="text"
                value={drivingLicenceNo}
                onChange={handleLicenceChange}
                className="bg-white focus:outline-none border rounded-md mt-2 py-1.5 px-3"
                placeholder="Driving Licence No."
              />
              <input
                type="number"
                value={mobileNo}
                onChange={handleMobileChange}
                className="bg-white focus:outline-none border rounded-md mt-2 py-1.5 px-3"
                placeholder="Mobile No."
              />
            

              <RadioGroup
                value={deliveryOption}
                onValueChange={handleOptionChange}
                className="flex gap-5 mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Pick" id="r1" />
                  <Label htmlFor="r1" className="cursor-pointer">
                    Pick-Up
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Home" id="r2" />
                  <Label htmlFor="r2" className="cursor-pointer">
                    Home Delivery
                  </Label>
                </div>
              </RadioGroup>
              <BillingDetails
                drivingLicenceNo={drivingLicenceNo}
                mobileNo={mobileNo}
                deliveryOption={deliveryOption}
                RideDetails={RideDetails}
                daysToAdd={daysToAdd}
                Date={date}
                DropOffDate={DropOffDate}
              />
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex lg:hiden md:hidden">
          <RentalLocation />
        </div>

        <Sheet
          open={openDeliverySheet}
          onOpenChange={() => setOpenDeliverySheet(false)}
        >
          <SheetContent className="BorderLeft bg-gradient-to-t from-[#ffeecc] to-white text-slate-800">
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
              handleDeleteAddress={handleDeleteAddress}
              handleEditAddress={handleEditAddress}
              formData={formData}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              currentEditedId={currentEditedId}
              addressList={addressList}
              handleManageAddress={handleManageAddress}
              isFormValid={isFormValid}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default BookingComponent;

{
  /* <div className="mt-5 text-slate-800 text-[14px]">
              <span className="text-lg font-semibold underline flex gap-2 items-center">
                <ReceiptText /> Billing Details
              </span>

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
                <span className="text-sm font-semibold text-green-600">
                  ₹ 0 /-
                </span>
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
                you are accepting the <a>Terms & Conditions</a> of BikeRental
              </p>
            </div> */
}

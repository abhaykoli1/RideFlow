import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Address from "@/components/User-view/address";
import AddressCard from "@/components/User-view/address-card";
import BillingDetails from "@/components/User-view/billingDetailsTile";
import DateCompo from "@/components/User-view/date";
import DayCompo from "@/components/User-view/day";
import Header from "@/components/User-view/header";
import HomeDeliveryChargesCalculator from "@/components/User-view/homeDeliveryChargesCalc";
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

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const initialAddressFormData = {
  address: "",
  city: "JAIPUR",
  state: "RAJASTHAN",
  phone: "",
  pincode: "",
};

const BookingComponent = () => {
  const { rideId } = useParams();

  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.userAddress);
  const { RideDetails } = useSelector((state) => state.userRides);
  const [openDeliverySheet, setOpenDeliverySheet] = useState(false);
  const [day, setDay] = useState("1");
  const [date, setDate] = useState(null);
  const DropOffDate = new Date(date);
  const daysToAdd = parseInt(day, 10);

  if (!isNaN(daysToAdd)) {
    DropOffDate.setDate(DropOffDate.getDate() + daysToAdd);
  } else {
    console.error("The variable 'day' is not a valid number.");
  }

  useEffect(() => {
    // const rideId = sessionStorage.getItem("currentRideId");
    if (rideId) {
      dispatch(fetchRideDetails(rideId));
    }
  }, [dispatch]);

  const [deliveryOption, setDeliveryOption] = useState(() => {
    return sessionStorage.getItem("deliveryOption") || "Pick"; // Default to "Pick" if not set
  });

  const handleOptionChange = (value) => {
    setDeliveryOption(value);
    sessionStorage.setItem("deliveryOption", value);
  };

  const [drivingLicenceNo, setDrivingLicenceNo] = useState(
    sessionStorage.getItem("drivingLicenceNo") || ""
  );

  const [dlError, setDlError] = useState(
    sessionStorage.getItem("dlError") || ""
  );

  const validateDrivingLicence = (value) =>
    /^[A-Za-z]{2}[0-9]{2}(?: [0-9]{11}|[A-Za-z][0-9]{11})$/.test(value);

  const handleLicenceChange = (e) => {
    const value = e.target.value;
    setDrivingLicenceNo(value);
    sessionStorage.setItem("drivingLicenceNo", value);

    // Validate while typing
    // if (!validateDrivingLicence(value)) {
    //   setDlError(
    //     sessionStorage.setItem("dlError", "Enter a valid Driving Licence.")
    //   );
    // } else {
    //   setDlError(sessionStorage.setItem("dlError", ""));
    // }
  };

  const [mobileNo, setMobileNo] = useState(
    sessionStorage.getItem("mobileNo") || "+91 "
  );

  const [mobileError, setMobileError] = useState(
    sessionStorage.getItem("mobileNoError") || ""
  );

  const validateMobileNo = (value) => /^[0-9]{10}$/.test(value.slice(0)); // Validate only digits after "+91 "

  const handleMobileChange = (e) => {
    const value = e.target.value;

    if (!value.startsWith("+91 ")) {
      setMobileNo("+91 ");
      return;
    }

    setMobileNo(value);
    sessionStorage.setItem("mobileNo", value);

    const mobilePart = value.slice(4);
    if (!validateMobileNo(mobilePart)) {
      const errorMessage = "Enter a valid 10-digit mobile number.";
      setMobileError(errorMessage);
      sessionStorage.setItem("mobileNoError", errorMessage);
    } else {
      setMobileError("");
      sessionStorage.setItem("mobileNoError", "");
    }
  };

  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState();

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
            userEmail: user?.email,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setOpenDeliverySheet(false);
            dispatch(fetchAllAddresses(user?.email));
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
            userEmail: user?.email,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setOpenDeliverySheet(false);
            dispatch(fetchAllAddresses(user?.email));
            setFormData(initialAddressFormData);
            toast({
              title: "Address added successfully",
            });
          }
        });
  }

  useState(() => {
    console.log("phone =" + formData);
  });

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({
        userEmail: user?.email,
        addressId: getCurrentAddress._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.email));
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
      state: getCurrentAddress?.state,
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
    if (addressList && addressList.length > 0) {
      setCurrentSelectedAddress(addressList[0]);
    }
  }, [addressList]);

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.email));
  }, [dispatch]);

  const address =
    currentSelectedAddress?.address + ", " + currentSelectedAddress?.city;

  return (
    <section className="ListingBg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ride Booking | RideFlow | Bike to ride in jaipur</title>
        <link
          rel="canonical"
          href={`https://rideflowrentals.in/booking/${rideId}`}
        />
      </Helmet>
      <div className="lg:pt-28 md:pt-28 pt-20  lg:pb-10  md:pb-10 pb-5 lg:px-5 md:px-5 sm:px-4 px-3 xl:container mx-auto ">
        <div className="titleHolder">
          <h1 className=" font-bold mb-2 bg-gradient-to-t from-[#ffae00] to-[#fff9ee] bg-clip-text text-transparent">
            Ride Booking
          </h1>
        </div>

        <div className="grid lg:grid-cols-[2fr_1.3fr] md:grid-cols-[2fr_1.5fr grid-cols-1 gap-3 ">
          <div className="flex flex-col gap-3">
            <BookingRideDetailsTile
              RideDetails={RideDetails}
              DropOffDate={DropOffDate}
              Day={day}
              Date={date}
            />
            <div className="lg:flex mdflex flex-col gap-3 hidden">
              <RentalLocation />
            </div>
          </div>

          <div className="flex flex-col  gap-">
            {/* Add Address  */}
            <div
              className={`
               Borde shadow-lg Rounded p-3 mb-3 flex  rounded-md justify-between items-center bg-[#ffedca]  h-[54px]`}
            >
              <span className="font-semibold text-black flex items-center gap-2 text-md">
                <RadioGroup
                  value={deliveryOption}
                  onValueChange={handleOptionChange}
                  className="flex gap-5"
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
                      Drop Home
                    </Label>
                  </div>
                </RadioGroup>
              </span>
              <p
                onClick={() => setOpenDeliverySheet(true)}
                className={`${
                  deliveryOption === "Pick" ? "hidden" : "flex"
                } text-black font-semibold px-2  underline rounded-sm py-1 bg- hover:text-tomato hover:scale-[99%] cursor-pointer`}
              >
                Add
              </p>
            </div>

            {/* show Address */}
            <div
              className={`  ${
                deliveryOption === "Pick"
                  ? "hidden"
                  : "grid 2xl:grid-cols-2  lg:grid-cols-1 gap-2  AddressGrid text-slate-800 mb-3 "
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

            <HomeDeliveryChargesCalculator
              deliveryCharge={deliveryCharge}
              setDeliveryCharge={setDeliveryCharge}
              address={address}
            />

            {/* Billing  */}
            <div className="flex-col pt-3 Borde Rounded px-3 pb-3 rounded-md bg-gradient-to-b from-[#ffedca]  to-white shadow-lg text-black flex ">
              <Label>If you want to change the Timings:</Label>
              <div className={`flex items-center gap-3 mt-2`}>
                <DateCompo
                  date={date}
                  Calendar={"bookingCalender !-left-[100px] absolute "}
                  setDate={setDate}
                  dateCss={
                    "font-semibold text-black !border-2 !pl-2  !rounded-lg !bg-[#ffff]  h-9 w-full"
                  }
                />
                <DayCompo
                  day={day}
                  setDay={setDay}
                  dayCss={
                    "font-semibold text-black !border-2 !pl-2 !pb-[1px] !rounded-lg !bg-white !text-black h-9"
                  }
                />
              </div>
              <div className="flex flex-col -gap-4">
                {/* Driving Licence Input */}
                <div className="flex w-full gap-2 ">
                  <input
                    type="text"
                    value={drivingLicenceNo}
                    onChange={handleLicenceChange}
                    className={`uppercase bg-white w-full focus:outline-none border rounded-md mt-2 py-1.5 px-3 ${
                      sessionStorage.getItem("dlError") || "" === null
                        ? "border-red-500"
                        : " border-green-500"
                    }`}
                    placeholder="Driving Licence No."
                  />
                </div>
                <p className="text-tomato text-sm ">
                  {sessionStorage.getItem("dlError")}
                </p>
                {/* Mobile Number Input */}
                <div
                  className={`${
                    deliveryOption === "Home" ? "hidden" : "flex"
                  } w-full gap-2`}
                >
                  {" "}
                  <input
                    type="text"
                    value={mobileNo}
                    onChange={handleMobileChange}
                    className={`bg-white w-full focus:outline-none border rounded-md mt-2  py-1.5 px-3 ${
                      sessionStorage.getItem("mobileNoError") || "" === null
                        ? "border-red-500"
                        : " border-green-500"
                    }`}
                    placeholder="Mobile No."
                  />
                </div>
                <p
                  className={`${
                    deliveryOption === "Home" ? "hidden" : "flex"
                  } text-tomato text-sm `}
                >
                  {sessionStorage.getItem("mobileNoError")}
                </p>
              </div>
              <BillingDetails
                deliveryCharge={deliveryCharge}
                currentSelectedAddress={currentSelectedAddress}
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
        <div className="flex lg:hidden">
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
    </section>
  );
};

export default BookingComponent;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Address from "@/components/User-view/address";
import AddressCard from "@/components/User-view/address-card";
import DateCompo from "@/components/User-view/date";
import DayCompo from "@/components/User-view/day";
import RentalLocation from "@/components/User-view/RentalLocation";
import { useToast } from "@/hooks/use-toast";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/user/address-slice";
import { bookRide, resetBookingState } from "@/store/user/booking-slice";
import { fetchRideDetails } from "@/store/user/Rides-slice";
// import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { MapPinCheck, NotebookText, ReceiptText } from "lucide-react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
};
const BookingComponent = () => {
  const dispatch = useDispatch();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { RideDetails } = useSelector((state) => state.userRides);
  const [openDeliverySheet, setOpenDeliverySheet] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState({});
  const limit = 120;
  const toggleReadMore = (index) => {
    setExpandedIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleCod = (event) => {
    setIsChecked(event.target.checked);
    console.log("Checkbox state:", event.target.checked);
  };

  const { isLoading, bookingDetails, error } = useSelector(
    (state) => state.userBooking
  );

  useEffect(() => {
    const rideId = sessionStorage.getItem("currentRideId");
    if (rideId) {
      dispatch(fetchRideDetails(rideId));
    }
  }, [dispatch]);

  // Local state for the booking form
  const [bookingData, setBookingData] = useState({
    userId: user?.id,
    bikeId: "672f2cd7fddcbb0ea6a8a1ee",
    bookedTimeSlots: [
      {
        from: "",
        to: "",
      },
    ],
    totalHours: "",
    totalAmount: "",
    status: "Pending", // Default status
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle time slot changes (assuming you're handling multiple time slots)
  const handleTimeSlotChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTimeSlots = [...bookingData.bookedTimeSlots];
    updatedTimeSlots[index] = {
      ...updatedTimeSlots[index],
      [name]: value,
    };
    setBookingData((prevData) => ({
      ...prevData,
      bookedTimeSlots: updatedTimeSlots,
    }));
  };

  // Handle adding/removing time slots (if you plan to support multiple time slots)
  const addTimeSlot = () => {
    setBookingData((prevData) => ({
      ...prevData,
      bookedTimeSlots: [...prevData.bookedTimeSlots, { from: "", to: "" }],
    }));
  };

  const removeTimeSlot = (index) => {
    const updatedTimeSlots = bookingData.bookedTimeSlots.filter(
      (_, idx) => idx !== index
    );
    setBookingData((prevData) => ({
      ...prevData,
      bookedTimeSlots: updatedTimeSlots,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(bookRide(bookingData)); // Dispatch the action to book the ride
  };
  const handleReset = () => {
    dispatch(resetBookingState()); // Clear the Redux state
    setBookingData({
      userId: user?.id,
      bikeId: RideDetails?._id,
      bookedTimeSlots: [{ from: "", to: "" }],
      totalHours: "",
      totalAmount: "",
      status: "Pending",
    });
  };

  // const [deliveryOption, etDeliveryOption] = useState("Pick");
  // const handleOptionChange = (value) => {
  //   setDeliveryOption(value);
  //   console.log("Selected delivery option:", value);
  // };
  const [deliveryOption, setDeliveryOption] = useState(() => {
    // Retrieve the previously saved option from sessionStorage
    return sessionStorage.getItem("deliveryOption") || "Pick"; // Default to "Pick" if not set
  });

  const handleOptionChange = (value) => {
    setDeliveryOption(value);
    sessionStorage.setItem("deliveryOption", value); // Save in sessionStorage
    console.log("Selected delivery option:", value);
  };

  useEffect(() => {
    console.log("Current delivery option:", deliveryOption);
  }, [deliveryOption]); // Log whenever the option changes

  const [day, setDay] = useState("");
  const [date, setDate] = useState(null);

  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const rentalPeriod = new Date(date);

  const daysToAdd = parseInt(day, 10);
  if (!isNaN(daysToAdd)) {
    rentalPeriod.setDate(rentalPeriod.getDate() + daysToAdd);
  } else {
    console.error("The variable 'day' is not a valid number.");
  }

  // addresss
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

  console.log(addressList, "addressList");

  return (
    <div className="lg:pt-28  md:pt-28  pt-20  xl:container mx-auto px-3">
      <div className="lg:max-w-[500px] md:max-w-[500px] sm:max-w-[400px]  max-w-[340px] mb-6 px-5  container mx-auto justify-between flex items-center gap-1">
        <span className="lg:text-md md:text-md  sm:text-sm ">
          <span className="bg-yellow text-white h-5 w-5  rounded-full px-[6px]">
            1
          </span>
          {"  "}
          Select
        </span>
        <Separator className="lg:w-32 md:w-32 sm:w-20 w-6 lg:bg-gray-300 bg-gray-300 " />
        <span className="lg:text-md md:text-md  sm:text-sm ">
          <span className="bg-yellow text-white h-5 w-5 rounded-full px-[5px]">
            2
          </span>{" "}
          Book{" "}
        </span>
        <Separator className="lg:w-32 md:w-32 sm:w-20 w-6 lg:bg-gray-300 bg-gray-300 " />
        <span className="lg:text-md md:text-md  sm:text-sm ">
          <span className="bg-yellow text-white h-5 w-5 rounded-full px-[5px]">
            3
          </span>{" "}
          Pay{" "}
        </span>
      </div>
      <div className="grid lg:grid-cols-[2fr_1.3fr] md:grid-cols-[2fr_1.5fr] grid-cols-1 gap-3">
        <div className="flex flex-col gap-3">
          <div className="shadow-lg car bg-[#ffedca] text-black rounded-md p-3 gap-2 lg:flex md:flex sm:flex items-center justify-between lg:h-[54px] md:h-[54px]">
            <p className="font-bold text-lg flex gap-2">Mode of Delivery</p>
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
                  Home Delivery
                </Label>
              </div>
            </RadioGroup>
          </div>

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
                  <span className="text-[13px] text-tomato py-[1px] rounded-l-lg px-1 font-bold w-32  bg-gradient-to-r from-[#ffe5b1] to-white ">
                    ₹ {RideDetails?.rentPerDay} /-
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
                    {date
                      ? `${date.toLocaleDateString("en-US", options)}`
                      : "Invalid Date"}
                  </p>
                  <span className="w-20 border border-[#555]" />
                  <p className="text-[12px] font-medium">
                    {date
                      ? `${rentalPeriod.toLocaleDateString("en-US", options)}`
                      : "Invalid Date"}
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-medium mb-3 ">{`For ${day} ${
                day === "1" ? "Day" : "Days"
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
          <div className="lg:flex md:flex flex-col gap-3 hidden">
            <RentalLocation />
          </div>
        </div>
        <div className="flex flex-col  gap-[13px]">
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

          <div
            className={`text-slate-800  ${
              deliveryOption === "Pick"
                ? "hidden"
                : "grid 2xl:grid-cols-2 lg:grid-cols-1 gap-2   AddressGrid"
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
          <div className="flex-col pt-3 Borde Rounded px-3 pb-3 rounded-md bg-gradient-to-b from-[#ffedca]  to-white shadow-lg text-black flex ">
            <Label>If You want to change the dates:</Label>
            <div
              className={`
            flex items-center gap-3 mt-2`}
            >
              <DateCompo
                date={date}
                setDate={setDate}
                dateCss={
                  "font-semibold text-black Border !pl-2 !py-2 !rounded-lg !bg-white h-9 w-full"
                }
              />
              <DayCompo
                day={day}
                setDay={setDay}
                dayCss={
                  "font-semibold text-black Border !pl-2 !py-2 !rounded-lg !bg-white !text-black h-9"
                }
              />
            </div>
            <div className="mt-5 text-slate-800 text-[14px]">
              <span className="text-lg font-semibold underline flex gap-2 items-center">
                <ReceiptText /> Billing Details
              </span>
              <div className="flex justify-between items-center  pb-1 pt-2">
                <span className="text-md font-medium text-gray-700">
                  Ride Charges
                </span>
                <span className="text-md font-semibold text-gray-900">
                  ₹{RideDetails?.rentPerDay * daysToAdd} /-
                </span>
              </div>

              <div className="flex justify-between items-center  py-1">
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
                } justify-between items-center  pt-1 pb-2`}
              >
                <span className="text-sm font-medium text-gray-700">
                  Home Delivery Charges
                </span>
                <span className={` text-sm  font-semibold text-gray-900`}>
                  ₹ 100 /-
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center pt-1 mb-3">
                <span className="text-lg font-bold text-gray-800">
                  Total Amount
                </span>
                <span className="text-lg font-bold text-orange-500">
                  ₹{" "}
                  {deliveryOption === "Pick"
                    ? RideDetails?.rentPerDay * daysToAdd
                    : RideDetails?.rentPerDay * daysToAdd + 100}{" "}
                  /-
                </span>
              </div>
              {/* <div className="flex items-center ">
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
              </div> */}
              {/* {isChecked ? ( */}
              <Button className="w-full bg-slate-800 text-white mt-1">
                Place Ride
              </Button>
              {/* ) : (
                <Button className="w-full bg-slate-800 text-white mt-1">
                  Pay Now ₹{" "}
                  {deliveryOption === "Pick"
                    ? RideDetails?.rentPerDay * daysToAdd
                    : RideDetails?.rentPerDay * daysToAdd + 100}
                </Button>
              )} */}

              <p className="text-center text-sm">
                By clicking on place ride you are accepting the{" "}
                <a>Terms & Conditions</a> of BikeRental
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-[2fr_1.3fr] md:grid-cols-[2fr_1.5fr] grid-cols-1 gap-3 mt-5">
        <div className="flex lg:hiden md:hidden">
          <RentalLocation />
        </div>
        <div></div>
      </div>
      {/*  */}
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
  );
};

export default BookingComponent;

{
  /* <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5 container mx-auto">
  <div className="flex flex-col gap-4">
    {isLoading && <p>Booking your ride...</p>}

    Display error message 
    {error && <p style={{ color: "red" }}>Error: {error}</p>}

    Display success message and booking details
    {bookingDetails && !error && (
      <div>
        <p>Your booking has been placed successfully!</p>
        <p>Booking ID: {bookingDetails.bookingId}</p>
        Display more details about the booking if necessary
      </div>
    )}

    Booking Form
    <form onSubmit={handleSubmit}>
      <div>
        <Label>User ID:</Label>
        <Input
          disabled
          type="text"
          name="userId"
          value={bookingData.userId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Bike ID:</Label>
        <Input
          disabled
          type="text"
          name="bikeId"
          value={bookingData.bikeId}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Total Hours:</Label>
        <Input
          type="number"
          name="totalHours"
          value={bookingData.totalHours}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      <div>
        <Label>Total Amount:</Label>
        <Input
          type="number"
          name="totalAmount"
          value={bookingData.totalAmount}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      Time Slots
      <h3>Booking Time Slots</h3>
      {bookingData.bookedTimeSlots.map((slot, index) => (
        <div key={index}>
          <div>
            <Label>From:</Label>
            <Input
              type="datetime-local"
              name="from"
              value={slot.from}
              onChange={(e) => handleTimeSlotChange(e, index)}
              required
            />
          </div>
          <div>
            <Label>To:</Label>
            <Input
              type="datetime-local"
              name="to"
              value={slot.to}
              onChange={(e) => handleTimeSlotChange(e, index)}
              required
            />
          </div>

          Remove button for time slot
          <button type="button" onClick={() => removeTimeSlot(index)}>
            Remove Time Slot
          </button>
        </div>
      ))}

      Add Time Slot button
      <button type="button" onClick={addTimeSlot}>
        Add Time Slot
      </button>

      Status (Optional, default to 'Pending') 
       <div>
        <Label>Status:</Label>
        <select
          name="status"
          value={bookingData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      Submit Button
      <button type="submit" disabled={isLoading}>
        Book Ride
      </button>
    </form>

    Reset button
    <button onClick={handleReset}>Reset</button>
  </div>
</div> */
}

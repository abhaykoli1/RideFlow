import { getUserBookings } from "@/store/user/booking-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const formatCustomDate = (dateString) => {
  const date = new Date(dateString);

  // Define suffixes for day numbers
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // 4th-20th are 'th'
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const day = date.getDate();
  const daySuffix = getDaySuffix(day);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day}${daySuffix} ${month} ${year},  ${formattedHours}:${minutes} ${amPm}`;
};

const Bookings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { userBookings, isLoading, error } = useSelector(
    (state) => state.userBooking
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserBookings(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="ListingBg pt-[105px] pb-4 min-h-[70vh]">
      {isLoading && <p>Loading...</p>}
      <div className="lg:px-6 md:px-6 sm:px-5 px-2">
        <div className="-mt-4 space-y-4  container mx-auto ">
          <h1 className="lg:text-3xl md:text-3xl sm:text-2xl text-2xl  font-bold text-tomato">
            Your Booking History
          </h1>
          {error && (
            <p className="text-cente h-full  font-semibold">{error}..</p>
          )}
          {!isLoading && !error && userBookings.length > 0 && (
            <div>
              {userBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="lg:px-4 md:px-4 sm:px-3 p-2 relative lg:mx-0 md:mx-0 sm:mx-0 mx-2 Border mt-4 rounded-md fle lg:flex-row md:flex-row sm:flex-row flex-col- justify-between"
                >
                  <div className="flex gap-5 w-full justify-between">
                    <div>
                      <p className="flex gap-3 capitalize">
                        <strong>Vehicle:</strong> {booking.bikeId.rideName}
                      </p>
                      <p className="flex gap-3 capitalize">
                        <strong>Brand:</strong> {booking.bikeId.brand}
                      </p>
                      <p className="flex gap-3">
                        <strong className="">Status: </strong>
                        {"  "}
                        <p
                          className={`${
                            booking.status === "Confirmed" ||
                            booking.status === "Completed"
                              ? "text-green-500"
                              : booking.status === "Pending"
                              ? "text-yellow"
                              : "text-tomato"
                          } font-medium `}
                        >
                          {booking.status}
                        </p>
                      </p>
                      <p className="flex gap-3">
                        <strong>From:</strong>{" "}
                        {formatCustomDate(booking.bookedTimeSlots.from)}
                      </p>
                      <p className="flex gap-3">
                        <strong>To:</strong>{" "}
                        {formatCustomDate(booking.bookedTimeSlots.to)}
                      </p>
                    </div>
                    <img
                      src={booking.bikeId.image}
                      alt="Bike"
                      className="absolute bookingBikeImage right-3 top-6  h-32 w-32 -mt-3"
                    />
                  </div>
                  <div>
                    <p className="flex gap-3">
                      <strong>Booking ID:</strong> {booking._id}
                    </p>
                  </div>
                  <p className="flex gap-3 ">
                    <strong>Booked On:</strong>{" "}
                    {formatCustomDate(booking.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
          {!isLoading && !error && userBookings.length === 0 && (
            <p className="w-full h-full text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;

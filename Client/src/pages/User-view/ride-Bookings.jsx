import { getUserBookings } from "@/store/user/booking-slice";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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

  return `${day}${daySuffix} ${month} ${year}`;
};

const Bookings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { userBookings, isLoading, error } = useSelector(
    (state) => state.userBooking
  );

  const [sortedBookings, setSortedBookings] = useState([]);
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserBookings(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (userBookings) {
      sortBookings(userBookings);
    }
  }, [userBookings, isDescending]);

  const sortBookings = (bookings) => {
    const sorted = [...bookings].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isDescending ? dateB - dateA : dateA - dateB;
    });
    setSortedBookings(sorted);
  };

  const toggleSortOrder = () => {
    setIsDescending((prev) => !prev);
  };

  return (
    <section className="ListingBg pt-[105px] pb-4 min-h-[70vh]">
      <Helmet>
        <meta charSet="utf-8" />
        <title>History | RideFlow | Bike to ride in jaipur</title>
        <link rel="canonical" href="https://rideflowrentals.in/bookings" />
      </Helmet>

      <div className="lg:px-6 md:px-6 sm:px-5 px-2">
        <div className="-mt-4 space-y-4 container mx-auto">
          <h1 className="px-3 lg:text-3xl md:text-3xl sm:text-2xl text-2xl font-bold text-tomato">
            Your Booking History
          </h1>
          <button
            onClick={toggleSortOrder}
            className={` ${
              userBookings === null ? "" : "hidden"
            } px-2 py-1 invertBg text-white text-sm font-semibold rounded-md mx-3 lg:mx-2 md:mx-0`}
          >
            Sort By Date: {isDescending ? "New" : "Old"}
          </button>
          {/* {error && (
            <p className="text-center h-full font-semibold">{error}...</p>
          )} */}
          {!isLoading && !error && sortedBookings.length > 0 && (
            <div>
              {sortedBookings.map((booking) => (
                <div key={booking._id} className="w-full">
                  <div className="flex justify-end w-full items-end lg:px-2 md:px-0 px-2 mb-[2px] mt-4">
                    <p className="!text-[12px]">
                      Booked On: {formatCustomDate(booking.createdAt)}
                    </p>
                  </div>
                  <div className="lg:px-4 md:px-4 sm:px-3 p-2 relative lg:mx-0 md:mx-0 sm:mx-0 mx-2 Border mt- rounded-md lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
                    <div className="flex justify-between">
                      <p
                        className={`${
                          booking.status === "Confirmed" ||
                          booking.status === "Completed"
                            ? "text-green-500"
                            : booking.status === "Pending"
                            ? "text-yellow"
                            : "text-tomato"
                        } font-medium`}
                      >
                        {booking.status}
                      </p>
                      <p className="flex gap-3 uppercase text-yellow font-bold text-md mr-5">
                        {booking.bikeId.rideName}
                      </p>
                    </div>
                    <div className="flex gap-5 w-full justify-between">
                      <div>
                        <p className="flex gap-3 capitalize">
                          <strong>Brand:</strong> {booking.bikeId.brand}
                        </p>
                        <p className="flex gap-3">
                          <strong>Amount:</strong>₹ {booking.totalAmount}
                        </p>
                        <p className="flex gap-3">
                          <strong>Pick Up:</strong>{" "}
                          {formatCustomDate(booking.bookedTimeSlots.from)}
                        </p>
                        <p className="flex gap-3">
                          <strong>Drop Off:</strong>{" "}
                          {formatCustomDate(booking.bookedTimeSlots.to)}
                        </p>
                        <p className="flex gap-3 uppercase">
                          <strong>DL:</strong> {booking.dl}
                        </p>
                        <p className="flex gap-3">
                          <strong>Phone:</strong> {booking.phone}
                        </p>
                      </div>
                      <img
                        src={booking.bikeId.image}
                        alt="Bike"
                        className="absolute bookingBikeImage right-3 top-6 h-32 w-auto mt-2"
                      />
                    </div>
                    <p className="flex gap-3">
                      <strong>Booking ID:</strong> {booking._id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {sortedBookings.length === 0 && (
            <p className="w-full h-full text-center">No bookings found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bookings;

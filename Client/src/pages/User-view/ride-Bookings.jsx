import { getUserBookings } from "@/store/user/booking-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  }, [dispatch]);

  

  return (
    <div className="ListingBg pt-[105px] min-h-[70vh]">
      {isLoading && <p>Loading...</p>}
      <div className="-mt-4 space-y-4 container mx-auto ">
        <h1 className="text-3xl font-bold  text-tomato">
          Your Booking History
        </h1>
        {error && (
          <p className="text-cente h-full  Text font-semibold">{error}</p>
        )}
        {!isLoading && !error && userBookings.length > 0 && (
          <div className="">
            {userBookings.map((booking) => (
              <div key={booking._id} className="pb-4 flex justify-between">
                <div>
                  <p>
                    {" "}
                    <strong>Booking ID: </strong> {booking._id}
                  </p>
                  <p
                    className={`${
                      booking.status === "Confirmed" ||
                      booking.status === "Completed"
                        ? "text-green-500"
                        : booking.status === "Pending"
                        ? "text-yellow"
                        : "text-red-500"
                    } font-medium `}
                  >
                    <strong>{booking.status}</strong>
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {booking.bikeId.rideName}{" "}
                  </p>
                  <p>
                    <strong>From:</strong>{" "}
                    {new Date(booking.bookedTimeSlots.from).toLocaleString()}
                  </p>
                  <p>
                    <strong>To:</strong>{" "}
                    {new Date(booking.bookedTimeSlots.to).toLocaleString()}
                  </p>
                </div>
                <img
                  src={booking.bikeId.image}
                  alt="sdsds"
                  className="max-h-32 -mt-3"
                />
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && userBookings.length === 0 && (
          <p className=" w-full h-full text-center">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;

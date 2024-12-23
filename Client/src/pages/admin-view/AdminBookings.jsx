import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "@/store/user/booking-slice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddressSheetContent from "@/components/admin-view/Booking-Details";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchAllRides } from "@/store/admin/Rides-slice";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { allBookings, isLoading, error } = useSelector(
    (state) => state.userBooking
  );

  const { user } = useSelector((state) => state.auth);

  const { RidesList } = useSelector((state) => state.adminRides);

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(fetchAllRides());
  }, [dispatch]);

  if (user?.email === allBookings?.userEmail) {
    console.log(user?.userName);
  }

  const getRideImage = (bikeId) => {
    const ride = RidesList.find((ride) => ride._id === bikeId);
    return ride?.image || "/default-bike.png";
  };

  const [openSheet, setOpenSheet] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = (bookingId, status) => {
    console.log("bookingId", bookingId);
    if (!status) return;
    setUpdatingId(bookingId);
    dispatch(
      updateBookingStatus({
        bookingId,
        status,
      })
    ).then(() => {
      setUpdatingId(null);
    });
  };

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(bookingId));
    }
  };

  return (
    <div className=" mx-aut   text-slate-800">
      {isLoading ? (
        <p className="text-center">Loading bookings...</p>
      ) : allBookings.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-5">
          {allBookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-lg shadow-lg p-2.5 flex flex-col  relative"
            >
              <div className="flex flex-col mb-2 -mt-1">
                <h2 className="text-lg font-bold text-yellow">
                  {booking.userId?.userName.replace(/(_\d+)$/, "") || "N/A"}
                </h2>
                <p className="text-gray-600 underline text-sm">
                  {" "}
                  {booking.userId?.email || "N/A"}
                </p>
              </div>
              <img
                src={getRideImage(booking.bikeId)}
                alt="Bike"
                className=" lg:w-40 lg:h-40 md:w-40 md:h-40 sm:w-40 sm:h-40 w-24 h-24 object-cover rounded-lg absolute  right-2 top-0 "
              />

              <div className="text-sm">
                <p>
                  <strong>Status:</strong>{" "}
                  <select
                    style={{ fontSize: "12px" }}
                    value={booking?.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    disabled={updatingId === booking._id}
                    className={`bg-transparent ${
                      booking.status === "Confirmed" ||
                      booking.status === "Completed"
                        ? "text-green-500"
                        : booking.status === "Pending"
                        ? "text-yellow"
                        : "text-red-500"
                    }  rounded focus:outline-none font-semibold`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>

                <p>
                  <strong>Total Days:</strong> {booking.totalDays || "N/A"}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{" "}
                  {booking.totalAmount || "N/A"}
                </p>
                <p>
                  <strong>DL No:</strong> {booking.dl || "N/A"}
                </p>
                <p>
                  <strong>Phone No:</strong> {booking.phone || "N/A"}
                </p>
                <p className="">
                  <strong>Booking ID:</strong> {booking._id || "N/A"}
                </p>
                <div className="flex justify-between mt-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <div
                        variant="outline"
                        size="icon"
                        className="bg-slate-800  flex items-center rounded px-2 py-1 !text-[12px] cursor-pointer text-white    "
                      >
                        Details
                      </div>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="w-full max-w-xs !bg-white "
                    >
                      <SheetHeader>
                        <SheetTitle className="text-black mb-4">
                          Additional Details
                        </SheetTitle>
                      </SheetHeader>
                      <AddressSheetContent
                        allBookings={allBookings}
                        booking={booking}
                      />
                    </SheetContent>
                  </Sheet>
                  <div
                    onClick={() => handleDelete(booking._id)}
                    className="bg-slate-800  rounded px-2 py-1 !text-[12px] cursor-pointer text-white    "
                  >
                    Delete
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No bookings found.</p>
      )}
    </div>
  );
};

export default AdminBookings;

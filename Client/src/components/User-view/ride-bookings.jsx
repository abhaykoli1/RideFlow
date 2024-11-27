import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const RideBookingDialog = ({
  open,
  setOpen,
  userBookings,
  isLoading,
  error,
}) => {
  return (
    <Dialog className="detailsDialogBox " open={open} onOpenChange={setOpen}>
      <DialogContent className="!flex flex-col bg-gradient-to-t from-[#ffeecc] to-white detailsDialog !bg-whit border-[0.5px] border-gray-500  pt-16 grid-cols-2  gap-8 sm:p-12 max-w-[90vw] max-h-[100vh] sm:max-w-[70vw] md:max-w-[80vw] text-black lg:max-w-[70vw] overflow-auto">
        <DialogTitle className="text-3xl -mt-7">Boookings</DialogTitle>

        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="-mt-4 space-y-4">
          {!isLoading && !error && userBookings.length > 0 && (
            <div>
              {userBookings.map((booking) => (
                <div key={booking._id} className="mb-4">
                  <p>
                    {" "}
                    <strong>Booking ID: </strong> {booking._id}
                  </p>
                  <p>
                    <strong>Bike:</strong> {booking.bikeId.rideName}{" "}
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
              ))}
            </div>
          )}
          {!isLoading && !error && userBookings.length === 0 && (
            <p>No bookings found.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RideBookingDialog;

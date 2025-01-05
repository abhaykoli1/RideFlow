// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteBooking,
//   getAllBookings,
//   updateBookingStatus,
// } from "@/store/user/booking-slice";

// import AddressSheetContent from "@/components/admin-view/Booking-Details";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { fetchAllRides } from "@/store/admin/Rides-slice";
// import { fetchRideDetails } from "@/store/user/Rides-slice";

// const AdminBookings = () => {
//   const dispatch = useDispatch();
//   const { allBookings, isLoading, error } = useSelector(
//     (state) => state.userBooking
//   );
//   const { user } = useSelector((state) => state.auth);
//   const { RidesList } = useSelector((state) => state.adminRides);

//   const [sortedBookings, setSortedBookings] = useState([]);
//   const [searchDate, setSearchDate] = useState("");
//   const [sortOrder, setSortOrder] = useState("recent"); // 'recent' or 'oldest'

//   useEffect(() => {
//     dispatch(getAllBookings());
//     dispatch(fetchAllRides());
//   }, [dispatch]);

//   useEffect(() => {
//     if (allBookings) {
//       sortBookings(allBookings, sortOrder);
//     }
//   }, [allBookings, sortOrder]);

//   const sortBookings = (bookings, order = "recent") => {
//     const sorted = [...bookings].sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);
//       return order === "recent" ? dateB - dateA : dateA - dateB;
//     });
//     setSortedBookings(sorted);
//   };

//   const getRideImage = (bikeId) => {
//     const ride = RidesList.find((ride) => ride._id === bikeId);
//     return ride?.image || "/default-bike.png";
//   };

//   const [updatingId, setUpdatingId] = useState(null);

//   const handleStatusChange = (bookingId, status) => {
//     if (!status) return;
//     setUpdatingId(bookingId);
//     dispatch(
//       updateBookingStatus({
//         bookingId,
//         status,
//       })
//     ).then(() => {
//       setUpdatingId(null);
//     });
//   };
//   const toggleSortOrder = () => {
//     const newOrder = sortOrder === "recent" ? "oldest" : "recent";
//     setSortOrder(newOrder);
//   };
//   const handleDelete = (bookingId) => {
//     if (window.confirm("Are you sure you want to delete this booking?")) {
//       dispatch(deleteBooking(bookingId));
//     }
//   };

//   const formatCustomDate = (dateString) => {
//     const date = new Date(dateString);

//     // Define suffixes for day numbers
//     const getDaySuffix = (day) => {
//       if (day > 3 && day < 21) return "th"; // 4th-20th are 'th'
//       switch (day % 10) {
//         case 1:
//           return "st";
//         case 2:
//           return "nd";
//         case 3:
//           return "rd";
//         default:
//           return "th";
//       }
//     };

//     const day = date.getDate();
//     const daySuffix = getDaySuffix(day);

//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const month = monthNames[date.getMonth()];

//     const year = date.getFullYear();

//     const hours = date.getHours();
//     const minutes = date.getMinutes().toString().padStart(2, "0");

//     const amPm = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12;

//     return `${day}${daySuffix} ${month} ${year},   ${hours} :${minutes} ${amPm}`;
//   };

//   const filterBookingsByDate = (date) => {
//     const filtered = allBookings.filter((booking) => {
//       const bookingDate = new Date(booking.bookedTimeSlots.from)
//         .toISOString()
//         .split("T")[0];
//       return bookingDate === date;
//     });
//     sortBookings(filtered, sortOrder); // Apply sorting after filtering
//   };

//   const handleSearch = (event) => {
//     const selectedDate = event.target.value;
//     setSearchDate(selectedDate);
//     filterBookingsByDate(selectedDate);
//   };

//   const { RideDetails } = useSelector((state) => state.userRides);

//   useEffect(() => {
//     if (allBookings.bikeId) {
//       dispatch(fetchRideDetails(allBookings.bikeId));
//     }
//   }, [dispatch, allBookings.bikeId]);
//   console.log("RideDetails", allBookings[0]);
//   return (
//     <div className="mx-auto text-slate-800 w-full">
//       <div className="mb-4 flex justify-between items-center">
//         {/* <input
//           type="date"
//           value={searchDate}
//           onChange={handleSearch}
//           className="border rounded-md px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//         /> */}

//         <button
//           onClick={toggleSortOrder}
//           className="bg-slate-800 text-white px-3 py-[7px] rounded-md"
//         >
//           Sort by {sortOrder === "recent" ? "Oldest" : "Recent"}
//         </button>
//       </div>

//       {isLoading ? (
//         <p className="text-center">Loading bookings...</p>
//       ) : sortedBookings.length > 0 ? (
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
//           {sortedBookings.map((booking) => (
//             <div key={booking._id}>
//               <div className="flex justify-end">
//                 {" "}
//                 <p className="text-[12px] flex gap-1">
//                   {formatCustomDate(booking.createdAt)}
//                 </p>
//               </div>
//               <div className="border rounded-lg shadow-lg p-2.5 flex flex-col relative">
//                 <div className="flex flex-col mb-2 -mt-1">
//                   <h2 className="text-lg font-bold text-yellow">
//                     {booking.userId?.userName.replace(/(_\d+)$/, "") || "N/A"}
//                   </h2>
//                   <p className="text-gray-600 underline text-sm ">
//                     {booking.userId?.email || "N/A"}
//                   </p>
//                 </div>
//                 <img
//                   src={getRideImage(booking.bikeId)}
//                   alt="Bike"
//                   className="lg:w-auto lg:h-40 md:w-auto md:h-40 sm:w-auto sm:h-40 w-auto h-24 object-cover rounded-lg absolute z-0 right-0 top-10"
//                 />

//                 <div className="text-sm">
//                   <p className="text-sm absolute top-[12px] right-3">
//                     {/* <strong>Status:</strong>{" "} */}
//                     <select
//                       style={{ fontSize: "14px" }}
//                       value={booking?.status}
//                       onChange={(e) =>
//                         handleStatusChange(booking._id, e.target.value)
//                       }
//                       disabled={updatingId === booking._id}
//                       className={`bg-transparent ${
//                         booking.status === "Confirmed" ||
//                         booking.status === "Completed"
//                           ? "text-green-500"
//                           : booking.status === "Pending"
//                           ? "text-yellow"
//                           : "text-red-500"
//                       } rounded focus:outline-none font-semibold`}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Confirmed">Confirmed</option>
//                       <option value="Cancelled">Cancelled</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   </p>

//                   <p className="text-sm">
//                     <strong>Total Days:</strong> {booking.totalDays || "N/A"}
//                   </p>
//                   <p className="text-sm">
//                     <strong>Total Amount:</strong> ₹{" "}
//                     {booking.totalAmount || "N/A"}
//                   </p>
//                   <p className="flex gap-1  z-20">
//                     <strong>DL No:</strong>{" "}
//                     <p className="uppercase"> {booking.dl || "N/A"}</p>
//                   </p>
//                   <p className="text-sm">
//                     <strong>Phone No:</strong> {booking.phone || "N/A"}
//                   </p>
//                   <p className="flex gap-2">
//                     <strong>Pick Up:</strong>
//                     {formatCustomDate(booking.bookedTimeSlots.from)}
//                   </p>
//                   <p className="flex gap-2">
//                     <strong>Drop Off:</strong>{" "}
//                     {formatCustomDate(booking.bookedTimeSlots.to)}
//                   </p>

//                   <p className="text-sm">
//                     <strong>Booking ID:</strong> {booking._id || "N/A"}
//                   </p>
//                   <div className="flex justify-between mt-2">
//                     {booking.addressInfo.address !== "" ? (
//                       <Sheet>
//                         <SheetTrigger asChild>
//                           <div
//                             variant="outline"
//                             size="icon"
//                             className="bg-slate-800 flex items-center rounded px-2 py-1 !text-[12px] cursor-pointer text-white"
//                           >
//                             Address
//                           </div>
//                         </SheetTrigger>
//                         <SheetContent
//                           side="right"
//                           className="w-full max-w-xs !bg-white"
//                         >
//                           <SheetHeader>
//                             <SheetTitle className="text-black mb-4">
//                               Address Details
//                             </SheetTitle>
//                           </SheetHeader>
//                           <AddressSheetContent
//                             allBookings={allBookings}
//                             booking={booking}
//                           />
//                         </SheetContent>
//                       </Sheet>
//                     ) : (
//                       <div></div>
//                     )}

//                     <div
//                       onClick={() => handleDelete(booking._id)}
//                       className="bg-slate-800 rounded px-2 py-1 !text-[12px] cursor-pointer text-white"
//                     >
//                       Delete
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center">No bookings found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminBookings;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} from "@/store/user/booking-slice";
import AddressSheetContent from "@/components/admin-view/Booking-Details";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { fetchAllRides } from "@/store/admin/Rides-slice";
import { fetchRideDetails } from "@/store/user/Rides-slice";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { allBookings, isLoading } = useSelector((state) => state.userBooking);
  const { RidesList } = useSelector((state) => state.adminRides);
  const { RideDetails } = useSelector((state) => state.userRides);

  const [sortedBookings, setSortedBookings] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [sortOrder, setSortOrder] = useState("recent"); // 'recent' or 'oldest'
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(getAllBookings());
    dispatch(fetchAllRides());
  }, [dispatch]);

  useEffect(() => {
    if (allBookings) {
      sortBookings(allBookings, sortOrder);
    }
  }, [allBookings, sortOrder]);

  useEffect(() => {
    if (allBookings?.bikeId) {
      dispatch(fetchRideDetails(allBookings.bikeId));
    }
  }, [dispatch, allBookings]);

  const sortBookings = (bookings, order = "recent") => {
    const sorted = [...bookings].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "recent" ? dateB - dateA : dateA - dateB;
    });
    setSortedBookings(sorted);
  };

  const getRideImage = (bikeId) => {
    const ride = RidesList.find((ride) => ride._id === bikeId);
    return ride?.image || "/default-bike.png";
  };
  const getRideName = (bikeId) => {
    const ride = RidesList.find((ride) => ride._id === bikeId);
    return ride?.rideName || "/default-bike.png";
  };
  const getRideBrand = (bikeId) => {
    const ride = RidesList.find((ride) => ride._id === bikeId);
    return ride?.brand || "/default-bike.png";
  };

  const handleStatusChange = (bookingId, status) => {
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

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "recent" ? "oldest" : "recent";
    setSortOrder(newOrder);
  };

  const handleDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(bookingId));
    }
  };

  const formatCustomDate = (dateString) => {
    const date = new Date(dateString);
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
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

    return `${day}${daySuffix} ${month} ${year}, ${formattedHours}:${minutes} ${amPm}`;
  };

  const filterBookingsByDate = (date) => {
    const filtered = allBookings.filter((booking) => {
      const bookingDate = new Date(booking.bookedTimeSlots.from)
        .toISOString()
        .split("T")[0];
      return bookingDate === date;
    });
    sortBookings(filtered, sortOrder);
  };

  const handleSearch = (event) => {
    const selectedDate = event.target.value;
    setSearchDate(selectedDate);
    filterBookingsByDate(selectedDate);
  };

  return (
    <div className="mx-auto text-slate-800 w-full">
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={toggleSortOrder}
          className="bg-slate-800 text-white px-3 py-[7px] rounded-md"
        >
          Sort by {sortOrder === "recent" ? "Oldest" : "Recent"}
        </button>
      </div>

      {isLoading ? (
        <p className="text-center">Loading bookings...</p>
      ) : sortedBookings.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {sortedBookings.map((booking) => (
            <div key={booking._id}>
              <div className="flex justify-end">
                <p className="text-[12px] flex gap-1">
                  {formatCustomDate(booking.createdAt)}
                </p>
              </div>
              <div className="border rounded-lg shadow-lg p-2.5 flex flex-col relative">
                <div className="flex flex-col mb-2 -mt-1">
                  <h2 className="text-lg font-bold text-yellow">
                    {booking.userId?.userName.replace(/(_\d+)$/, "") || "N/A"}
                  </h2>
                  <p className="text-gray-600 underline text-sm ">
                    {booking.userId?.email || "N/A"}
                  </p>
                </div>
                <img
                  src={getRideImage(booking.bikeId)}
                  alt="Bike"
                  className="lg:w-auto lg:h-40 md:w-auto md:h-40 sm:w-auto sm:h-40 w-auto h-24 object-cover rounded-lg absolute z-0 right-0 top-10"
                />

                <div className="text-sm">
                  <p className="text-sm absolute top-[12px] right-3">
                    <select
                      style={{ fontSize: "14px" }}
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
                      } rounded focus:outline-none font-semibold`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </p>

                  <p className="text-sm capitalize">
                    <strong>Name:</strong>{" "}
                    {getRideName(booking.bikeId) || "N/A"}
                  </p>
                  <p className="text-sm capitalize">
                    <strong>Brand :</strong>{" "}
                    {getRideBrand(booking.bikeId) || "N/A"}
                  </p>
                  <p className="text-sm">
                    <strong>For:</strong> {booking.totalDays || "N/A"}{" "}
                    {booking.totalDays === 1 ? "day" : "days"}
                  </p>

                  <p className="text-sm">
                    <strong>Amount:</strong> ₹ {booking.totalAmount || "N/A"}
                  </p>
                  <p className="flex gap-1 z-20">
                    <strong>DL No:</strong>{" "}
                    <p className="uppercase">{booking.dl || "N/A"}</p>
                  </p>
                  <p className="text-sm">
                    <strong>Phone No:</strong> {booking.phone || "N/A"}
                  </p>
                  <p className="flex gap-2">
                    <strong>Pick Up:</strong>
                    {formatCustomDate(booking.bookedTimeSlots.from)}
                  </p>
                  <p className="flex gap-2">
                    <strong>Drop Off:</strong>{" "}
                    {formatCustomDate(booking.bookedTimeSlots.to)}
                  </p>

                  <p className="text-sm">
                    <strong>Booking ID:</strong> {booking._id || "N/A"}
                  </p>
                  <div className="flex justify-between mt-2">
                    {booking.addressInfo.address !== "" ? (
                      <Sheet>
                        <SheetTrigger asChild>
                          <div
                            variant="outline"
                            size="icon"
                            className="bg-slate-800 flex items-center rounded px-2 py-1 !text-[12px] cursor-pointer text-white"
                          >
                            Address
                          </div>
                        </SheetTrigger>
                        <SheetContent
                          side="right"
                          className="w-full max-w-xs !bg-white"
                        >
                          <SheetHeader>
                            <SheetTitle className="text-black mb-4">
                              Address Details
                            </SheetTitle>
                          </SheetHeader>
                          <AddressSheetContent
                            allBookings={allBookings}
                            booking={booking}
                          />
                        </SheetContent>
                      </Sheet>
                    ) : (
                      <div></div>
                    )}

                    <div
                      onClick={() => handleDelete(booking._id)}
                      className="bg-slate-800 rounded px-2 py-1 !text-[12px] cursor-pointer text-white"
                    >
                      Delete
                    </div>
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

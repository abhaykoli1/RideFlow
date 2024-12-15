import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminRidesSlice from "./admin/Rides-slice";
import adminReviewsSlice from "./admin/Reviews-slice";
import UserRidesSlice from "./user/Rides-slice";
import userAddressSlice from "./user/address-slice";
import userContactSlice from "./user/contact-slice";
import userBookingSlice from "./user/booking-slice";
import adminUsersSlice from "./admin/User-slice";
import dashboardSlice from "./common/dashboard-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dasboard: dashboardSlice,
    UsersList: adminUsersSlice,
    adminRides: adminRidesSlice,
    adminReviews: adminReviewsSlice,
    userRides: UserRidesSlice,
    userAddress: userAddressSlice,
    userContact: userContactSlice,
    userBooking: userBookingSlice,
  },
});

export default store;

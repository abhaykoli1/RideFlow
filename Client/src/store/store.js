import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminRidesSlice from "./admin/Rides-slice";
import adminReviewsSlice from "./admin/Reviews-slice";
import UserRidesSlice from "./user/Rides-slice";
import UserCartSlice from "./user/cart-slice";
import UserWishlistSlice from "./user/wishlist-slice";
import userAddressSlice from "./user/address-slice";
import userContactSlice from "./user/contact-slice";
import userBookingSlice from "./user/booking-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminRides: adminRidesSlice,
    adminReviews: adminReviewsSlice,
    userRides: UserRidesSlice,
    userCart: UserCartSlice,
    userWishlist: UserWishlistSlice,
    userAddress: userAddressSlice,
    userContact: userContactSlice,
    userBooking: userBookingSlice,
  },
});

export default store;

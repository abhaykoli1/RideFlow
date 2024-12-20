import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for creating a booking
export const bookRide = createAsyncThunk(
  "userBooking/bookRide", // Action type
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/booking/bookride",
        bookingData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
      // if (error.response && error.response.data) {
      //   return rejectWithValue(error.response.data);
      // }
      // throw error;
    }
  }
);

// Async Thunk for fetching all bookings (Admin)
export const getAllBookings = createAsyncThunk(
  "userBooking/getAllBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/booking/get`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// Async Thunk for fetching user-specific bookings
export const getUserBookings = createAsyncThunk(
  "userBooking/getUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/booking/user/${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch user bookings."
      );
    }
  }
);

// Async Thunk for updating booking status
export const updateBookingStatus = createAsyncThunk(
  "userBooking/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/booking/status`,
        {
          bookingId,
          status,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to update booking status"
      );
    }
  }
);

// Async thunk for deleting a booking
export const deleteBooking = createAsyncThunk(
  "userBooking/deleteBooking",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/booking/delete/${bookingId}`
      );
      return { bookingId, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Unable to delete booking"
      );
    }
  }
);

// Initial state of the booking slice
const initialState = {
  isLoading: false, // Tracks loading state
  bookingDetails: null, // Stores successful booking details
  allBookings: [], // Stores all bookings (Admin view)
  userBookings: [], // Stores user-specific bookings
  error: null,
};

// Redux Slice for booking state
const bookingSlice = createSlice({
  name: "userBooking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.bookingDetails = null;
      state.error = null;
    },
    clearAllBookings: (state) => {
      state.allBookings = [];
    },
    clearUserBookings: (state) => {
      state.userBookings = [];
    },
  },

  extraReducers: (builder) => {
    builder
      // When booking request is pending (loading state)
      .addCase(bookRide.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      // When booking is successful (fulfilled state)
      .addCase(bookRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingDetails = action.payload; // Save booking details
      })
      // When booking request fails (rejected state)
      .addCase(bookRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Save the error message
      })

      // Get All Bookings
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get User Bookings
      .addCase(getUserBookings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userBookings = action.payload;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allBookings = state.allBookings.map((booking) =>
          booking._id === action.payload.booking._id
            ? { ...booking, status: action.payload.booking.status }
            : booking
        );
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Booking
      .addCase(deleteBooking.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted booking from the state
        state.allBookings = state.allBookings.filter(
          (booking) => booking._id !== action.payload.bookingId
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetBookingState, clearAllBookings, clearUserBookings } =
  bookingSlice.actions;
export default bookingSlice.reducer;

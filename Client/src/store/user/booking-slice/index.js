import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  isLoading: false,
  bookingDetails: null,
  error: null,
};

// Async Thunk for creating a booking (bookRide)
export const bookRide = createAsyncThunk(
  "booking/bookride",
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/booking/bookride", // Corrected endpoint to match the controller
        bookingDetails
      );
      return response.data; // Assuming response contains the booking info (including bookingId)
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.bookingDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookRide.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset error state when a new booking attempt is made
      })
      .addCase(bookRide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookingDetails = action.payload; // Store the booking details, including bookingId
      })
      .addCase(bookRide.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store error message in case of failure
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;

export default bookingSlice.reducer;

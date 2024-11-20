import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  RidesList: [],
  RideDetails: null,
};

export const fetchAllFilteredRides = createAsyncThunk(
  "/Rides/fetchAllRides",
  async ({ filterParams, sortParams }) => {
    // console.log("fetchAllFilteredRides", fetchAllFilteredRides);

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:8000/api/user/Rides/get?${query}`
    );
    return result?.data;
  }
);

export const fetchRideDetails = createAsyncThunk(
  "/Rides/fetchRideDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:8000/api/user/Rides/get/${id}`
    );
    return result?.data;
  }
);

const UserRidesSlice = createSlice({
  name: "userRides",
  initialState,
  reducers: {
    setRideDetails: (state) => {
      state.RideDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredRides.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RidesList = action.payload.data;
      })
      .addCase(fetchAllFilteredRides.rejected, (state, action) => {
        state.isLoading = false;
        state.RidesList = [];
      })

      .addCase(fetchRideDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchRideDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RideDetails = action.payload.data;
      })
      .addCase(fetchRideDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.RideDetails = null;
      });
  },
});

export default UserRidesSlice.reducer;

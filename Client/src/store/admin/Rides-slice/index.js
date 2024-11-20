import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  RidesList: [],
};

export const addNewRide = createAsyncThunk(
  "/Rides/addnewRide",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:8000/api/admin/Rides/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllRides = createAsyncThunk(
  "/Rides/fetchAllRides",
  async () => {
    console.log("fetchAllRides", fetchAllRides);

    const result = await axios.get("http://localhost:8000/api/admin/Rides/get");

    return result?.data;
  }
);

export const editRide = createAsyncThunk(
  "/Rides/editRide",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:8000/api/admin/Rides/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteRide = createAsyncThunk("/Rides/deleteRide", async (id) => {
  const result = await axios.delete(
    `http://localhost:8000/api/admin/Rides/delete/${id}`
  );

  return result?.data;
});

const AdminRidesSlice = createSlice({
  name: "adminRides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.RidesList = action.payload.data;
      })
      .addCase(fetchAllRides.rejected, (state, action) => {
        state.isLoading = false;
        state.RidesList = [];
      });
  },
});

export default AdminRidesSlice.reducer;
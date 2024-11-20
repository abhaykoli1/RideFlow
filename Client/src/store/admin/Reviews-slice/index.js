import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  ReviewsList: [],
};

export const addnewReview = createAsyncThunk(
  "/Reviews/addnewReview",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:8000/api/admin/Reviews/add",
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

export const fetchAllReviews = createAsyncThunk(
  "/Reviews/fetchAllReviews",
  async () => {
    console.log("fetchAllReviews", fetchAllReviews);

    const result = await axios.get(
      "http://localhost:8000/api/admin/Reviews/get"
    );

    return result?.data;
  }
);

export const editReview = createAsyncThunk(
  "/Reviews/editReview",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:8000/api/admin/Reviews/edit/${id}`,
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

export const deleteReview = createAsyncThunk(
  "/Reviews/deleteReview",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:8000/api/admin/Reviews/delete/${id}`
    );

    return result?.data;
  }
);

const AdminReviewsSlice = createSlice({
  name: "adminReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ReviewsList = action.payload.data;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.ReviewsList = [];
      });
  },
});

export default AdminReviewsSlice.reducer;
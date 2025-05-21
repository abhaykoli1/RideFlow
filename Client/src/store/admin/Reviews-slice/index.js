import config from "@/store/config";
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
      `${config.API_URL}/admin/Reviews/add`,
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
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${config.API_URL}/admin/Reviews/get`);
      console.log("fetchAllReviews", result);
      return result?.data;
    } catch (error) {
      console.log("Error fetching reviews:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editReview = createAsyncThunk(
  "/Reviews/editReview",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${config.API_URL}/admin/Reviews/edit/${id}`,
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
      `${config.API_URL}/admin/Reviews/delete/${id}`
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

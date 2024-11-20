import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  isLoading: false,
};

// Thunk to add item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, rideId }) => {
    const response = await axios.post(
      "http://localhost:8000/api/user/wishlist/add",
      { userId, rideId }
    );
    return response.data;
  }
);

// Thunk to fetch wishlist items
export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlistItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/user/wishlist/get/${userId}`
    );
    return response.data;
  }
);

// Thunk to delete item from wishlist
export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async ({ userId, rideId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/user/wishlist/${userId}/${rideId}`
    );
    return response.data;
  }
);

const shoppingWishlistSlice = createSlice({
  name: "shoppingWishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling addToWishlist thunk
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload.data;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.isLoading = false;
      })

      // Handling fetchWishlistItems thunk
      .addCase(fetchWishlistItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload.data;
      })
      .addCase(fetchWishlistItems.rejected, (state) => {
        state.isLoading = false;
      })

      // Handling deleteWishlistItem thunk
      .addCase(deleteWishlistItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistItems = action.payload.data;
      })
      .addCase(deleteWishlistItem.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingWishlistSlice.reducer;

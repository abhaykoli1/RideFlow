import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  allUsers: [], // (Admin view)
  error: null,
};

// Async thunk for fetching all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/api/users/get`); // Adjust API URL as needed
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);
// Async thunk for deleting a contact
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${config.API_URL}/users/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.allUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Pending state
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = state.allUsers.filter(
          (user) => user.id !== action.meta.arg // Remove deleted contact
        );
      })
      // Rejected state
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete contact.";
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

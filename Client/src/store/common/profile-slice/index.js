// src/store/profileSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch user profile by userId
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      // API request to fetch the profile
      const response = await axios.get(
        `http://localhost:8000/api/profile/get/${userId}`
      );

      return response.data;
    } catch (error) {
      // Returning a meaningful error message
      return rejectWithValue(
        error.response?.data?.message || // Message from server
          "Unable to fetch profile. Please try again later." // Fallback message
      );
    }
  }
);

// Update profile
// export const updateProfile = createAsyncThunk(
//   "profile/updateProfile",
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${BASE_API_URL}`, profileData);
//       return response.data; // Updated profile data
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to update profile."
//       );
//     }
//   }
// );

// Delete profile
// export const deleteProfile = createAsyncThunk(
//   "profile/deleteProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(`${BASE_API_URL}`);
//       return { message: response.data.message }; // Confirmation message
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to delete profile."
//       );
//     }
//   }
// );

// **Initial State**
const initialState = {
  isLoading: false,
  profileData: null,
  error: null,
};

// **Redux Slice**
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.profileData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload; // Save profile data
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update Profile
    //   .addCase(updateProfile.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateProfile.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.profileData = action.payload; // Save updated profile data
    //   })
    //   .addCase(updateProfile.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })

    //   // Delete Profile
    //   .addCase(deleteProfile.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteProfile.fulfilled, (state) => {
    //     state.isLoading = false;
    //     state.profileData = null; // Clear profile data after deletion
    //   })
    //   .addCase(deleteProfile.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

// **Export Actions and Reducer**
export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;

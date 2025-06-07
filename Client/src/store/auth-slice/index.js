import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

// console.log(config.API_URL);
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  allUsers: [],
  success: false,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "An unexpected error occurred.",
        }
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "/auth/verify-email",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.API_URL}/auth/verify-email/${token}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "An error occurred while verifying the email.",
        }
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/forgot-password`,
        {
          email,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred.";
      return rejectWithValue({ message });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred.";
      return rejectWithValue({ message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      // console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || "Login failed" }
      );
    }
  }
);

// export const googleAuth = createAsyncThunk(
//   "/auth/google-login",
//   async (tokenId, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${config.API_URL}/auth/google-login`,
//         { tokenId },
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/google`,
        { tokenId },
        { withCredentials: true }
      );
      console.log("first");
      return response.data;
    } catch (response) {
      // console.log("error Response", response.response.data.message);
      return response.response.data;
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/auth/check-auth`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "/auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/auth/admin/users`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Fetch All Users Error:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Registration failed";
      })
      // .addCase(registerUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = action.payload;
      // })
      // verify
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success; // Use response success flag
        if (action.payload.success) {
          state.user = action.payload.user || null; // Handle user data if returned
          state.isAuthenticated = true; // Update authentication status
          state.error = null;
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.error = action.payload.message || "Verification failed";
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.error = action.payload.message || "An error occurred.";
      })
      // forget password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message; // Assume API returns success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Login failed";
      })
      // .addCase(loginUser.rejected, (state, action) => {
      //   state.isLoading = false;
      //   // state.user = null;
      //   state.isAuthenticated = false;
      //   state.error = action.payload;
      // })

      // Check Authentication
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload.users;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch users";
      })

      // Google login fulfilled case
      // .addCase(googleAuth.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(googleAuth.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.user = action.payload.user;
      // })
      // .addCase(googleAuth.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // });

      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = authSlice.actions;

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

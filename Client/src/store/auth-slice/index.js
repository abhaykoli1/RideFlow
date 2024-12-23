import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
  allUsers: [], // To store the list of all users
  successMessage: null,
};

// Register User (Email-based)
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
      return rejectWithValue(error.response.data);
    }
  }
);

// Forgot Password Async Thunk
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      if (!email) {
        throw new Error("Email is required.");
      }

      const response = await axios.post(
        `${config.API_URL}/auth/forgot-password`,
        {
          email,
        }
      );

      return response.data; // Success response
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred.";
      return rejectWithValue({ message });
    }
  }
);

// Reset Password Async Thunk
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      if (!token || !newPassword) {
        throw new Error("Both token and new password are required.");
      }

      if (newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }

      const response = await axios.post(
        `${config.API_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      return response.data; // Success response
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "An error occurred.";
      return rejectWithValue({ message });
    }
  }
);

// export const forgotPassword = createAsyncThunk(
//   "/auth/forgot-password",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${config.API_URL}/auth/forgot-password`,
//         { email }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "/auth/reset-password",
//   async ({ token, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${config.API_URL}/auth/reset-password`,
//         {
//           token,
//           newPassword,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      return rejectWithValue(error.response.data);
    }
  }
);

// export const registerUser = createAsyncThunk(
//   "/auth/register",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${config.API_URL}/auth/register`,
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const verifyEmail = createAsyncThunk(
//   "/auth/verify-email",
//   async ({ email, code }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${config.API_URL}/auth/verify-email`, {
//         email,
//         code,
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "/auth/google-login",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/auth/google-login`,
        { tokenId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.user = null;
        state.isAuthenticated = false;
        // if (action.payload.success) {
        //   state.user = action.payload.user;
        //   state.isAuthenticated = false;
        // } else {
        //   state.user = null;
        //   state.isAuthenticated = false;
        // }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
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
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })
      // Forgot Password
      // .addCase(forgotPassword.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(forgotPassword.fulfilled, (state, action) => {
      //   state.isLoading = false;
      // })
      // .addCase(forgotPassword.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })
      // // Reset Password
      // .addCase(resetPassword.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(resetPassword.fulfilled, (state) => {
      //   state.isLoading = false;
      // })
      // .addCase(resetPassword.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

      // Email Verification
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // .addCase(verifyEmail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isAuthenticated = true;
      //   state.error = null;
      // })
      // .addCase(verifyEmail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isAuthenticated = false;
      //   state.error = action.payload || "Something went wrong";
      // })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // .addCase(verifyEmail.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(verifyEmail.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   if (action.payload.success) {
      //     state.user = action.payload.user || null; // Optional
      //     state.isAuthenticated = true; // If needed
      //   }
      // })
      // .addCase(verifyEmail.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload;
      // })

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
        // state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

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
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(googleAuth.rejected, (state, action) => {
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

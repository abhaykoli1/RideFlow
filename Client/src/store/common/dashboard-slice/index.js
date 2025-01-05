import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  DashboardContent: [],
  ContactInfo: [],
};

export const addNewDashboardContent = createAsyncThunk(
  "/Dashboard/addNewDashboardContent",
  async (formData) => {
    const result = await axios.post(
      `${config.API_URL}/dashboard/add`,
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

export const addContactInfo = createAsyncThunk(
  "/Dashboard/addContactInfo",
  async (formData) => {
    const result = await axios.post(
      `${config.API_URL}/dashboard/addInfo`,
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

export const fetchDashboardContent = createAsyncThunk(
  "/Dashboard/fetchDashboardContent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/dashboard/get`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard content:", error.message);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchContactInfo = createAsyncThunk(
  "/Dashboard/fetchContactInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/dashboard/getInfo`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard content:", error.message);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// export const fetchDashboardContent = createAsyncThunk(
//   "Dashboard/fetchDashboardContent",
//   async () => {
//     console.log("fetchAllRides", fetchAllRides);

//     const result = await axios.get(`${config.API_URL}/dashboard/content`);

//     return result?.data;
//   }
// );

export const editDashboardContent = createAsyncThunk(
  "/Dashboard/editDashboardContent",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${config.API_URL}/dashboard/edit/${id}`,
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

export const editContactInfo = createAsyncThunk(
  "/Dashboard/editContactInfo",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${config.API_URL}/dashboard/editInfo/${id}`,
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

export const deleteAllDashboardContent = createAsyncThunk(
  "Dashboard/deleteAllDashboardContent", // A unique action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${config.API_URL}/dashboard/delete`); // API endpoint for deleting all
      return response?.data; // Return the server response
    } catch (error) {
      // Use `rejectWithValue` to handle errors gracefully
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while deleting all content",
        }
      );
    }
  }
);

const AdminRidesSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.DashboardContent = action.payload.data;
      })
      .addCase(fetchDashboardContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchContactInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ContactInfo = action.payload.data;
      })
      .addCase(fetchContactInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteAllDashboardContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAllDashboardContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteAllDashboardContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to delete all content";
      });
  },
});

export default AdminRidesSlice.reducer;

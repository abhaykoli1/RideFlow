import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  UsersList: [],
};

// export const addnewUser = createAsyncThunk(
//   "/Users/addnewUser",
//   async (formData) => {
//     const result = await axios.post(
//       `${config.API_URL}/admin/Users/add`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result?.data;
//   }
// );

export const fetchAllUsers = createAsyncThunk(
  "/Users/fetchAllUsers",
  async () => {
    console.log("fetchAllUsers", fetchAllUsers);

    const result = await axios.get(`${config.API_URL}/admin/Users/get`);

    return result?.data;
  }
);

// export const editUser = createAsyncThunk(
//   "/Users/editUser",
//   async ({ id, formData }) => {
//     const result = await axios.put(
//       `${config.API_URL}/admin/Users/edit/${id}`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return result?.data;
//   }
// );

// export const deleteUser = createAsyncThunk("/Users/deleteUser", async (id) => {
//   const result = await axios.delete(
//     `${config.API_URL}/admin/Users/delete/${id}`
//   );

//   return result?.data;
// });

const AdminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UsersList = action.payload.data;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.UsersList = [];
      });
  },
});

export default AdminUsersSlice.reducer;

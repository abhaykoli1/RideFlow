import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for the contact slice
const initialState = {
  isLoading: false,
  contact: null,
  message: null,
  error: null,
};

// Async thunk to add a new contact
export const addContactQuery = createAsyncThunk(
  "contact/addContactQuery",
  async (formData) => {
    const response = await axios.post(
      `${config.API_URL}/user/contact/add`,
      formData
    );
    return response.data; // Return the newly added contact data
  }
);

// Async thunk to edit an existing contact by ID
// export const editContactQuery = createAsyncThunk(
//   "contacts/editContactQuery",
//   async ({ id, contactData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${config.API_URL}/user/contact/edit/${id}`,
//         contactData
//       );
//       return response.data.data; // Return the updated contact data
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Async thunk to delete a contact by ID
// export const deleteContactQuery = createAsyncThunk(
//   "contacts/deleteContactQuery",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${config.API_URL}/user/contact/delete/${id}`);
//       return id; // Return the deleted contact's ID
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Async thunk to fetch all contacts
// export const fetchAllContactQuery = createAsyncThunk(
//   "contacts/fetchAllContactQuery",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${config.API_URL}/user/contact/fetch`
//       );
//       return response.data.data; // Return the list of contacts
//     } catch (error) {
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// Create the slice to handle state updates
const contactSlice = createSlice({
  name: "userContact",
  initialState,
  reducers: {
    setContact: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContactQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload.data;
        // state.contact .push(action.payload);
      })
      .addCase(addContactQuery.rejected, (state) => {
        state.isLoading = false;
      });

    // Handling editContactQuery
    //   .addCase(editContactQuery.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(editContactQuery.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     const updatedContact = action.payload;
    //     state.contacts = state.contacts.map((contact) =>
    //       contact._id === updatedContact._id ? updatedContact : contact
    //     );
    //   })
    //   .addCase(editContactQuery.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })

    //   // Handling deleteContactQuery
    //   .addCase(deleteContactQuery.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteContactQuery.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.contacts = state.contacts.filter(
    //       (contact) => contact._id !== action.payload
    //     );
    //   })
    //   .addCase(deleteContactQuery.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   })

    //   // Handling fetchAllContactQuery
    //   .addCase(fetchAllContactQuery.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchAllContactQuery.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.contacts = action.payload; // Set the fetched contacts to the state
    //   })
    //   .addCase(fetchAllContactQuery.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export const { setContactDetails } = contactSlice.actions;

export default contactSlice.reducer;

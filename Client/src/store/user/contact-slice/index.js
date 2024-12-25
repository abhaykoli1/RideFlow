import config from "@/store/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  contact: null,
  error: null,
  contacts: [],
  totalPages: 0,
  currentPage: 1,
};

// Async thunk to add a new contact
export const addContactQuery = createAsyncThunk(
  "contact/addContactQuery",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}/contact/add`,
        formData
      );
      return response.data; // Success case
    } catch (error) {
      // Handle server error (e.g., 400 response)
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
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

export const fetchAllContactQuery = createAsyncThunk(
  "contact/fetchAllContactQuery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.API_URL}/contact/fetchAll`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${config.API_URL}/contact/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
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
      .addCase(addContactQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.contact = null;
        state.error = action.payload?.message || "Something went wrong!";
      })

      .addCase(fetchAllContactQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllContactQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.data; // Assuming 'data' contains the contacts
      })
      .addCase(fetchAllContactQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch contacts";
      })
      // Pending state
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.meta.arg // Remove deleted contact
        );
      })
      // Rejected state
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete contact.";
      });
    // .addCase(fetchAllContactQuery.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(fetchAllContactQuery.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.contact = action.payload.data; // Assuming data contains the contacts list
    //   state.totalPages = action.payload.totalPages; // Pagination info
    //   state.currentPage = action.payload.currentPage;
    // })
    // .addCase(fetchAllContactQuery.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload || "Failed to fetch contacts";
    // });

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

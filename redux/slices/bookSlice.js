import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const bookYardByUser = createAsyncThunk(
  "bookSlice/bookYardByUser",
  async (bookData, { rejectWithValue }) => {
    // console.log("API Response: ", bookData);
    try {
      const response = await api.post(`/bookings`, bookData);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllBookedByUser = createAsyncThunk(
  "bookSlice/getAllBookedByUser",
  async (_, { rejectWithValue }) => {
    // console.log("API Response: ", bookData);
    try {
      const response = await api.get(`/bookings/getByUser`);
      console.log("API Response: ", response.data);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmBooked = createAsyncThunk(
  "bookSlice/confirmBooked",
  async ({ status, booking_id }, { rejectWithValue }) => {
    // console.log("status: ", status);
    // console.log("booking_id: ", booking_id);
    try {
      const response = await api.put(`/bookings/${booking_id}`, {
        status: status,
      });
      // console.log("status", status);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
    booked: null,
    loading: false,
    error: null,
  },
  reducers: {
    setGroupMessageID: (state, action) => {
      state.group_message_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookYardByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookYardByUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(bookYardByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(getAllBookedByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBookedByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.booked = action.payload;
      })
      .addCase(getAllBookedByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmBooked.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBooked.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(confirmBooked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice;

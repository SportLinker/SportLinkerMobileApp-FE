import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const bookYardByUser = createAsyncThunk(
  "bookSlice/bookYardByUser",
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/bookings`, bookData);
      console.log("Dat san", response.data);
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
    try {
      const response = await api.get(`/bookings/getByUser`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelBooked = createAsyncThunk(
  "bookSlice/cancelBooked",
  async (booking_id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/bookings/${booking_id}`);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmBooked = createAsyncThunk(
  "bookSlice/confirmBooked",
  async ({ status, booking_id }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bookings/${booking_id}`, {
        status: status,
      });
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
      })
      .addCase(cancelBooked.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooked.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cancelBooked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice;

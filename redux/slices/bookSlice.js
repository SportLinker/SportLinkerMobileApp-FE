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

export const bookSlice = createSlice({
  name: "bookSlice",
  initialState: {
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
      });
  },
});

export default bookSlice;

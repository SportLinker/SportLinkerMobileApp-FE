import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const createStadium = createAsyncThunk(
  "bookingSlice/createStadium",
  async (stadiumData, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.post(`/stadiums`, stadiumData);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    stadium: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStadium.fulfilled, (state, action) => {
        state.loading = false;
        state.stadium = action.payload;
      })
      .addCase(createStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice;

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

export const getStadiumByOwner = createAsyncThunk(
  "bookingSlice/getStadiumByOwner",
  async (_, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/stadiums/getByOnwer`);
      console.log("API Response: ", response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailStadiumById = createAsyncThunk(
  "bookingSlice/getDetailStadiumById",
  async (stadiumId, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/stadiums/${stadiumId}`);
      console.log("API Response: ", response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState: {
    stadiumList: null,
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
        // state.stadium = action.payload;
      })
      .addCase(createStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getStadiumByOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStadiumByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.stadiumList = action.payload;
      })
      .addCase(getStadiumByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDetailStadiumById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailStadiumById.fulfilled, (state, action) => {
        state.loading = false;
        state.stadium = action.payload;
      })
      .addCase(getDetailStadiumById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice;

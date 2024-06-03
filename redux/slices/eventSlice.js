import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createEvent = createAsyncThunk(
  "eventSlice/createEvent",
  async (
    { match_name, cid, sport_name, maximum_join, start_time, end_time },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/matches`, {
        match_name,
        cid,
        sport_name,
        maximum_join,
        start_time,
        end_time,
      });

      console.log("API Response: ", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventList = createAsyncThunk(
  "eventSlice/getEventList",
  async () => {
    console.log("getEventList");

    try {
      const data = await api.get(
        `/matches?lat=11.3169917&long=106.1031225&distance=10000000&start_time=0&end_time=23&sport_name=Bóng đá`
      );

      console.log(" data:", data.data.metadata);
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      // return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
    eventList: null,
    event: {
      id: null,
    },
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
      // Add case for fetch data function
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload; // Update state with API response
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Use action.payload for error
      })
      .addCase(getEventList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEventList.fulfilled, async (state, action) => {
        state.loading = false;
        state.eventList = action.payload;
      })
      .addCase(getEventList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default eventSlice.reducer;

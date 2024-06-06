import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const createEvent = createAsyncThunk(
  "eventSlice/createEvent",
  async (eventForm, { rejectWithValue }) => {
    try {
      const response = await api.post(`/matches`, eventForm);

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
  async (formData, { rejectWithValue }) => {
    console.log("getEventList");
    const { lat, long, distance, start_time, end_time, sport_name } = formData;
    try {
      console.log(
        `/matches?lat=${lat}&long=${long}&distance=${distance}&start_time=${start_time}&end_time=${end_time}&sport_name=${sport_name}`
      );
      const data = await api.get(
        `/matches?lat=${lat}&long=${long}&distance=${distance}&start_time=${start_time}&end_time=${end_time}&sport_name=${sport_name}`
      );

      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailEvent = createAsyncThunk(
  "eventSlice/getDetailEvent",
  async (eventID, { rejectWithValue }) => {
    console.log("eventID: " + eventID);
    try {
      const response = await api.get(`/matches/${eventID}`, eventID);

      console.log("API getDetailEvent: ", response.data); // Log the API response
      return response.data.metadata; // Return the response data
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
    eventList: null,
    event: {},
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
      .addCase(getEventList.fulfilled, (state, action) => {
        state.loading = false;
        state.eventList = action.payload; // Correctly updating state without returning new state
      })
      .addCase(getEventList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getDetailEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload; // Correctly updating state without returning new state
      })
      .addCase(getDetailEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default eventSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createEvent = createAsyncThunk(
  "eventSlice/createEvent",
  async (
    { match_name, place_id, sport_name, maximum_join, start_time, end_time },
    { rejectWithValue }
  ) => {
    console.log("createEvent");

    try {
      const data = await api.post(`/matches`, {
        match_name,
        place_id,
        sport_name,
        maximum_join,
        start_time,
        end_time,
      });

      console.log(" data:", data.data.metadata);
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const eventSlice = createSlice({
  name: "eventSlice",
  initialState: {
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
      //add case for fetch data function
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, async (state, action) => {
        state.loading = false;
        // state.userInfo = action.payload.user;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

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

export const updateEvent = createAsyncThunk(
  "eventSlice/updateEvent",
  async (eventForm, { rejectWithValue }) => {
    try {
      if (eventForm) {
        const response = await api.put(`/matches/${eventForm.match_id}`, {
          match_name: eventForm.match_name,
          sport_name: eventForm.sport_name,
          maximum_join: eventForm.maximum_join,
          start_time: eventForm.start_time,
          end_time: eventForm.end_time,
          option: {
            budget: eventForm.budget,
            note: eventForm.note,
          },
        });
        console.log(response.data);
        return response.data; // Return the response data
      }
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
      // console.log("get event: " + JSON.stringify(data.data.metadata));
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyEventList = createAsyncThunk(
  "eventSlice/getMyEventList",
  async (formData, { rejectWithValue }) => {
    console.log("getMyEventList");
    const { lat, long } = formData;
    try {
      const data = await api.get(
        `/matches/getMatchByUser?long=${long}&lat=${lat}`
      );
      console.log("myEventList", data.data);
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

export const joinEventByUser = createAsyncThunk(
  "eventSlice/joinEventByUser",
  async (match_id, { rejectWithValue }) => {
    console.log("joinEventByUser: " + match_id);
    try {
      const response = await api.post(`/matchJoin/join`, {
        match_id,
      });

      console.log("API Response: ", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.log("Error: ", error); // Log the error
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "eventSlice/deleteEvent",
  async (match_id, { rejectWithValue }) => {
    console.log("deleteEvent: " + match_id);
    try {
      const response = await api.delete(`/matches/${match_id}`);

      console.log("API Response: ", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.log("Error: ", error); // Log the error
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const unjoinEventByUserOrOwner = createAsyncThunk(
  "eventSlice/unjoinEventByUserOrOwner",
  async ({ match_id, user_id }, { rejectWithValue }) => {
    const body = {
      user_id,
    };

    try {
      // Since DELETE requests usually don't accept a body, we use params instead
      const response = await api.delete(`/matchJoin/${match_id}`, {
        data: body, // This is the correct way to send body data in a DELETE request
      });
      console.log("API Response:", response.data); // Log the API response
      return response.data; // Return the response data
    } catch (error) {
      console.log("Error:", error); // Log the error
      console.log(
        "Error:",
        JSON.stringify(error.response?.data || error.message)
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPlayers = createAsyncThunk(
  "eventSlice/getAllPlayers",
  async (_, { rejectWithValue }) => {
    console.log("API getAllPlayers: ");
    try {
      const response = await api.get(`/users/getAllPlayer`);

      console.log("API getAllPlayers: ", JSON.stringify(response.data)); // Log the API response
      return response.data.metadata; // Return the response data
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllStadiumByUser = createAsyncThunk(
  "yardSlice/getAllStadiumByUser",
  async (formData, { rejectWithValue }) => {
    const { lat, long } = formData;
    try {
      console.log(`/stadiums?long=${long}&lat=${lat}`);
      const response = await api.get(`/stadiums?long=${long}&lat=${lat}`);
      console.log(response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchAdvanceListUser = createAsyncThunk(
  "eventSlice/searchAdvanceListUser",
  async ({ page_size, page_number, search }, { rejectWithValue }) => {
    console.log("Props searchAdvanceListUser :", {
      page_size,
      page_number,
      search,
    }); // Log the props

    try {
      const response = await api.get(
        `/searchs?page_size=${page_size}&page_number=${page_number}&search=${search}&type=user`
      );

      console.log("API searchAdvanceListUser: ", JSON.stringify(response.data)); // Log the API response
      return response.data.metadata; // Return the response data
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchAdvanceListMatch = createAsyncThunk(
  "eventSlice/searchAdvanceListMatch",
  async ({ page_size, page_number, search }, { rejectWithValue }) => {
    console.log("Props searchAdvanceListMatch :", {
      page_size,
      page_number,
      search,
    }); // Log the props

    try {
      const response = await api.get(
        `/searchs?page_size=${page_size}&page_number=${page_number}&search=${search}&type=match`
      );

      console.log(
        "API searchAdvanceListMatch: ",
        JSON.stringify(response.data.metadata)
      ); // Log the API response
      return response.data.metadata; // Return the response data
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchAdvanceLisYard = createAsyncThunk(
  "eventSlice/searchAdvanceLisYard",
  async (
    { page_size, page_number, search, latitude, longitude },
    { rejectWithValue }
  ) => {
    console.log("Props searchAdvanceLisYard :", {
      page_size,
      page_number,
      search,
      longitude,
      latitude,
    }); // Log the props

    try {
      const response = await api.get(
        `/searchs?page_size=${page_size}&page_number=${page_number}&search=${search}&type=stadium&long=${longitude}&lat=${latitude}`
      );

      console.log("API searchAdvanceLisYard: ", JSON.stringify(response.data)); // Log the API response
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
    myEventList: null,
    userList: null,
    stadiumListByUser: null,
    event: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
        state.eventList = action.payload;
      })
      .addCase(getEventList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getMyEventList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyEventList.fulfilled, (state, action) => {
        state.loading = false;
        state.myEventList = action.payload;
      })
      .addCase(getMyEventList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getDetailEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getDetailEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(joinEventByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinEventByUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(joinEventByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(unjoinEventByUserOrOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(unjoinEventByUserOrOwner.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unjoinEventByUserOrOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.loading = false;
      })
      .addCase(getAllPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getAllStadiumByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStadiumByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.stadiumListByUser = action.payload;
      })
      .addCase(getAllStadiumByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchAdvanceListUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAdvanceListUser.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.loading = false;
      })
      .addCase(searchAdvanceListUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(searchAdvanceListMatch.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAdvanceListMatch.fulfilled, (state, action) => {
        state.eventList = action.payload;
        state.loading = false;
      })
      .addCase(searchAdvanceListMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(searchAdvanceLisYard.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchAdvanceLisYard.fulfilled, (state, action) => {
        state.stadiumListByUser = action.payload;
        state.loading = false;
      })
      .addCase(searchAdvanceLisYard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default eventSlice;

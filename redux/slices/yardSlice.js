import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const createStadium = createAsyncThunk(
  "yardSlice/createStadium",
  async (stadiumData, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.post(`/stadiums`, stadiumData);
      // console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStadium = createAsyncThunk(
  "yardSlice/updateStadium",
  async ({ stadium_id, stadiumData }, { rejectWithValue }) => {
    console.log("stadium_id: ", stadium_id);
    console.log("API Response: ", stadiumData);
    try {
      const response = await api.put(`/stadiums/${stadium_id}`, stadiumData);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteStadium = createAsyncThunk(
  "yardSlice/deleteStadium",
  async ({ stadium_id }, { rejectWithValue }) => {
    console.log("stadium_id: ", stadium_id);
    try {
      const response = await api.delete(`/stadiums/${stadium_id}`);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const createYardInStadium = createAsyncThunk(
  "yardSlice/createYardInStadium",
  async ({ stadium_id, yardData }, { rejectWithValue }) => {
    // console.log("API Response: ", stadium_id);
    try {
      const response = await api.post(`/yards/${stadium_id}`, yardData);
      // console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getStadiumByOwner = createAsyncThunk(
  "yardSlice/getStadiumByOwner",
  async (_, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/stadiums/getByOwner`);
      console.log("API Response: ", response.data);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllSport = createAsyncThunk(
  "yardSlice/getSport",
  async (_, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/sports`);
      // console.log("API Response: ", response.data);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllStadiumByUser = createAsyncThunk(
  "yardSlice/getAllStadiumByUser",
  async ({ long, lat }, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/stadiums?long=${long}&lat=${lat}`);
      // console.log("API Response: ", response.data);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailStadiumById = createAsyncThunk(
  "yardSlice/getDetailStadiumById",
  async (stadiumId, { rejectWithValue }) => {
    // console.log("API Response: ", stadiumData);
    try {
      const response = await api.get(`/stadiums/${stadiumId}`);
      // console.log("API Response: ", response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const yardSlice = createSlice({
  name: "yardSlice",
  initialState: {
    stadiumList: [],
    stadiumListByUser: [],
    stadium: null,
    sports: null,
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
      .addCase(updateStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStadium.fulfilled, (state, action) => {
        state.loading = false;
        // state.stadium = action.payload;
      })
      .addCase(updateStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStadium.fulfilled, (state, action) => {
        state.loading = false;
        // state.stadium = action.payload;
      })
      .addCase(deleteStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createYardInStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(createYardInStadium.fulfilled, (state, action) => {
        state.loading = false;
        // state.stadium = action.payload;
      })
      .addCase(createYardInStadium.rejected, (state, action) => {
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
      })
      .addCase(getAllSport.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSport.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = action.payload;
      })
      .addCase(getAllSport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default yardSlice;

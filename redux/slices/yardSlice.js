import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const createStadium = createAsyncThunk(
  "yardSlice/createStadium",
  async (stadiumData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stadiums`, stadiumData);
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
    try {
      const response = await api.put(`/stadiums/${stadium_id}`, stadiumData);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateYard = createAsyncThunk(
  "yardSlice/updateYard",
  async ({ yard_id, yardData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/yards/${yard_id}`, yardData);
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
    try {
      const response = await api.delete(`/stadiums/${stadium_id}`);

      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteYard = createAsyncThunk(
  "yardSlice/deleteYard",
  async ({ yard_id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/yards/${yard_id}`);
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
    try {
      const response = await api.post(`/yards/${stadium_id}`, yardData);
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
    try {
      const response = await api.get(`/stadiums/getByOwner`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllYardByOwner = createAsyncThunk(
  "yardSlice/getAllYardByOwner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/yards/getAllYardByOwner`);
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
    try {
      const response = await api.get(`/sports`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);
// export const getAllStadiumByUser = createAsyncThunk(
//   "yardSlice/getAllStadiumByUser",
//   async (formData, { rejectWithValue }) => {
//     const { lat, long } = formData;
//     try {
//       console.log(`/stadiums?long=${long}&lat=${lat}`);
//       const response = await api.get(`/stadiums?long=${long}&lat=${lat}`);
//       return response.data.metadata;
//     } catch (error) {
//       console.log("Error: ", JSON.stringify(error.response.data));
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getAllYardByUser = createAsyncThunk(
  "yardSlice/getAllYardByUser",
  async ({ stadium_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/yards/getListYardByUser/${stadium_id}`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllYardByYardOwner = createAsyncThunk(
  "yardSlice/getAllYardByYardOwner",
  async ({ stadium_id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/yards/getListYardByOwner/${stadium_id}`);
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
    try {
      const response = await api.get(`/stadiums/${stadiumId}`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailYardByOwner = createAsyncThunk(
  "yardSlice/getDetailYardByOwner",
  async (yard_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/yards/${yard_id}`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailStadiumByUser = createAsyncThunk(
  "yardSlice/getDetailStadiumByUser",
  async (stadium_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stadiums/${stadium_id}`);
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const ratingStadium = createAsyncThunk(
  "yardSlice/ratingStadium",
  async ({ stadium_id, feedbackData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/stadiums/rating/${stadium_id}`,
        feedbackData
      );
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const yardSlice = createSlice({
  name: "yardSlice",
  initialState: {
    stadiumList: null,
    yardList: null,
    stadiumListByUser: null,
    stadium: null,
    yard: null,
    stadiumByUser: null,
    yardListByUser: null,
    yardListByOwner: null,
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
      })
      .addCase(updateStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateYard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateYard.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateYard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStadium.fulfilled, (state, action) => {
        state.loading = false;
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
      // .addCase(getAllStadiumByUser.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(getAllStadiumByUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.stadiumListByUser = action.payload;
      // })
      // .addCase(getAllStadiumByUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      .addCase(getDetailStadiumByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailStadiumByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.stadiumByUser = action.payload;
      })
      .addCase(getDetailStadiumByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllYardByOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllYardByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.yardList = action.payload;
      })
      .addCase(getAllYardByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllYardByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllYardByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.yardListByUser = action.payload;
      })
      .addCase(getAllYardByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllYardByYardOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllYardByYardOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.yardListByOwner = action.payload;
      })
      .addCase(getAllYardByYardOwner.rejected, (state, action) => {
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
      .addCase(getDetailYardByOwner.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailYardByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.yard = action.payload;
      })
      .addCase(getDetailYardByOwner.rejected, (state, action) => {
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
      })
      .addCase(ratingStadium.pending, (state) => {
        state.loading = true;
      })
      .addCase(ratingStadium.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(ratingStadium.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

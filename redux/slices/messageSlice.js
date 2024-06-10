import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getListMessage = createAsyncThunk(
  "messageSlice/getListMessage",
  async (_, { rejectWithValue }) => {
    console.log("vao day");
    try {
      const data = await api.get(`/groupMessage`);

      console.log("getListMessage:", data.data.metadata);
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    chatList: null,
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
      .addCase(getListMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      })
      .addCase(getListMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default messageSlice;

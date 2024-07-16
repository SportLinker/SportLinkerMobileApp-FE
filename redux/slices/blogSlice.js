import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const postBlog = createAsyncThunk(
  "blogSlice/postBlog",
  async (formData, { rejectWithValue }) => {
    console.log("formData: ", formData);
    try {
      const response = await api.post(`/blogs`, formData);
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blogList: null,
    loading: false,
    error: null,
  },
  reducers: {
    setBlogLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default blogSlice;

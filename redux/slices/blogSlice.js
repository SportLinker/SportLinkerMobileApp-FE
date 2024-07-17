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

export const getBlogList = createAsyncThunk(
  "bookSlice/getBlogList",
  async (formData, { rejectWithValue }) => {
    try {
      const { pageNumber, pageSize } = formData;
      console.log("get blog list: ", pageNumber, pageSize);
      const response = await api.get(
        `/blogs?page_number=${pageNumber}&page_size=${pageSize}`
      );
      console.log("API Response: ", JSON.stringify(response.data));
      return response.data.metadata;
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
      })
      .addCase(getBlogList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogList.fulfilled, (state, action) => {
        state.loading = false;
        //handle whether load a new list or paging
        if (action.payload.page_number > 1) {
          state.blogList = [...state.blogList, action.payload];
        } else {
          state.blogList = action.payload;
        }
      })
      .addCase(getBlogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default blogSlice;

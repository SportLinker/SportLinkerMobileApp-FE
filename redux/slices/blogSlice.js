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

export const likeBlog = createAsyncThunk(
  "blogSlice/likeBlog",
  async (blogId, { rejectWithValue }) => {
    console.log("blogId: ", blogId);
    try {
      const response = await api.post(`blogs/react`, {
        blog_id: blogId,
      });
      console.log("API Response: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const dislikeBlog = createAsyncThunk(
  "blogSlice/dislikeBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      console.log("dislike blog with id: ", blogId);
      const response = await api.delete(`blogs/react/${blogId}`);
      console.log("Dislike blog response: ", JSON.stringify(response.data));
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlogList = createAsyncThunk(
  "blogSlice/getBlogList",
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

export const getMyBlogList = createAsyncThunk(
  "blogSlice/getMyBlogList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/getMyBlog`);
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
    myBlogList: null,
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
      .addCase(likeBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(likeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(dislikeBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(dislikeBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(dislikeBlog.rejected, (state, action) => {
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
      })
      .addCase(getMyBlogList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBlogList.fulfilled, (state, action) => {
        state.loading = false;
        state.myBlogList = action.payload;
      })
      .addCase(getMyBlogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default blogSlice;

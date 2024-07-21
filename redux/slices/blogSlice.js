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

export const postCommentBlog = createAsyncThunk(
  "blogSlice/postCommentBlog",
  async (formData, { rejectWithValue }) => {
    const { blogId, comment } = formData;
    console.log("comment blogId: ", blogId, comment);
    try {
      const response = await api.post(`blogs/comment/${blogId}`, {
        content: comment,
      });
      console.log("API Response post comment blog: ", response.data);
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

export const deleteBlog = createAsyncThunk(
  "blogSlice/deleteBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      console.log("deleteBlog blog with id: ", blogId);
      const response = await api.delete(`blogs/${blogId}`);
      console.log("deleteBlog blog response: ", JSON.stringify(response.data));
      return response.data.metadata;
    } catch (error) {
      console.log("Error: ", JSON.stringify(error.response.data));
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentBlog = createAsyncThunk(
  "blogSlice/deleteCommentBlog",
  async (commentId, { rejectWithValue }) => {
    try {
      console.log("deleteBlog comment blog with id: ", commentId);
      const response = await api.delete(`blogs/comment/${commentId}`);
      console.log(
        "deleteBlog comment blog response: ",
        JSON.stringify(response.data)
      );
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

export const getBlogDetail = createAsyncThunk(
  "blogSlice/getBlogDetail",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/${blogId}`);
      console.log(
        "API Response Get Blog Detail: ",
        JSON.stringify(response.data)
      );
      return response.data.metadata;
    } catch (error) {
      console.log(
        "Error Get Blog Detail: ",
        JSON.stringify(error.response.data)
      );
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlogCommentList = createAsyncThunk(
  "blogSlice/getBlogCommentList",
  async (blogId, { rejectWithValue }) => {
    try {
      console.log("Blog Id: ", blogId);
      const response = await api.get(`/blogs/comment/${blogId}`);
      console.log(
        "API Get Blog Comment Response: ",
        JSON.stringify(response.data)
      );
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
    blogDetail: null,
    blogCommentList: null,
    loading: false,
    error: null,
  },
  reducers: {
    setBlogLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetBlogDetail: (state, action) => {
      state.blogDetail = null;
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
      .addCase(postCommentBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(postCommentBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(postCommentBlog.rejected, (state, action) => {
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
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(deleteCommentBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCommentBlog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCommentBlog.rejected, (state, action) => {
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
      })
      .addCase(getBlogDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetail = action.payload;
      })
      .addCase(getBlogDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(getBlogCommentList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogCommentList.fulfilled, (state, action) => {
        state.loading = false;
        state.blogCommentList = action.payload;
      })
      .addCase(getBlogCommentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default blogSlice;

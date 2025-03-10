import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getListMessage = createAsyncThunk(
  "messageSlice/getListMessage",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get(`/groupMessage`);

      console.log("getListMessage:", JSON.stringify(data.data.metadata));
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchListMessage = createAsyncThunk(
  "messageSlice/searchListMessage",
  async ({ searchValue }, { rejectWithValue }) => {
    console.log("vao day:", searchValue);

    try {
      const data = await api.get(`/groupMessage?search=${searchValue}`);

      console.log("searchListMessage:", data.data.metadata);
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMessageDetail = createAsyncThunk(
  "messageSlice/getMessageDetail",
  async (group_message_id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/messages/${group_message_id}`);

      // console.log("getMessageDetail:", data.data.metadata);
      return data.data.metadata;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessageByUser = createAsyncThunk(
  "messageSlice/sendMessageByUser",
  async ({ group_message_id, content }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/messages/${group_message_id}`, {
        content,
      });
      // console.log("sendMessageByUser:", response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log("error", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createIndividualChat = createAsyncThunk(
  "messageSlice/createIndividualChat",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("userId", userId);
      const response = await api.post(`/groupMessage`, {
        user_id: userId,
      });
      console.log("createIndividualChat API Response:", response.data.metadata);
      return response.data.metadata;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log("error", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListNotification = createAsyncThunk(
  "messageSlice/getListNotification",
  async (_, { rejectWithValue }) => {
    console.log("vao day");
    try {
      const data = await api.get(`/notifications`);

      // console.log("getListNotification:", data.data.metadata);
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
    chatDetail: null,
    group_message_id: null,
    loading: false,
    error: null,
    notifications: null,
  },
  reducers: {
    setGroupMessageID: (state, action) => {
      state.group_message_id = action.payload;
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
      })
      .addCase(searchListMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchListMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.chatList = action.payload;
      })
      .addCase(searchListMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(getMessageDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessageDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.chatDetail = action.payload;
      })
      .addCase(getMessageDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(sendMessageByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageByUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessageByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(createIndividualChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIndividualChat.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createIndividualChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(getListNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getListNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default messageSlice;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = createAsyncThunk(
  "userSlice/login",
  async ({ phone, password }, { rejectWithValue }) => {
    console.log("login");

    try {
      const data = await api.post(`/authen/login?type=phone`, {
        phone,
        password,
      });

      console.log("login data:", data.data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const register = createAsyncThunk(
  "userSlice/register",
  async (formData, { rejectWithValue }) => {
    console.log("register");

    try {
      const data = await api.post(`/authen/register?type=phone`, formData);

      console.log("login data:", data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {
      id: null,
      phone: null,
      email: null,
      name: null,
      password: null,
      bio: null,
      avatar_url: null,
      gender: null,
      date_of_birth: null,
      role: null,
      createdAt: null,
      updatedAt: null,
      last_active_time: null,
      status: "active",
      longitude: null,
      latitude: null,
    },
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserLocation: (state, action) => {
      console.log("setUserLocation");
      const { longitude, latitude } = action.payload;
      state.userInfo.longitude = longitude;
      state.userInfo.latitude = latitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.metadata.user;
        AsyncStorage.setItem(
          "accessToken",
          action.payload.metadata.token.accessToken
        );
        AsyncStorage.setItem(
          "refreshToken",
          action.payload.metadata.token.refreshToken
        );
        AsyncStorage.setItem("xClientId", action.payload.metadata.user.id);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default userSlice;

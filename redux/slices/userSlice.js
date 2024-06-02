import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

//fetch data function example
// export const fetchUsers = createAsyncThunk(
// 	'users/fetchAll',
// 	async ({currentPage, searchName, searchRole}, {rejectWithValue}) => {
// 		try {
// 			const data = await fetchAllUsers(currentPage, searchName, searchRole);
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

export const login = createAsyncThunk(
  "userSlice/login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const data = await api.post(`/authen/login?type=phone`, {
        phone,
        password,
      });

      console.log("login data:", data.data.metadata);
      return data.data.metadata;
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
    },
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
      //add case for fetch data function
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, async (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.user;
        await AsyncStorage.setItem(
          "accessToken",
          action.payload.token.accessToken
        );
        await AsyncStorage.setItem(
          "refreshToken",
          action.payload.token.refreshToken
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

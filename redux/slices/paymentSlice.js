import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const paymentRecharge = createAsyncThunk(
  "paymentSlice/paymentRecharge",
  async ({ money, userID }, { rejectWithValue }) => {
    console.log("paymentRecharge" + money + " " + userID);

    try {
      //   // Change logic in there
      //   const data = await api.post(`/authen/paymentRecharge?type=phone`, {
      //     phone,
      //     password,
      //   });

      console.log("paymentRecharge data:", data.data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState: {
    QRcode: null,
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
      .addCase(paymentRecharge.pending, (state) => {
        state.loading = true;
      })
      .addCase(paymentRecharge.fulfilled, (state, action) => {
        state.loading = false;
        state.QRcode = action.payload;
      })
      .addCase(paymentRecharge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default paymentSlice;

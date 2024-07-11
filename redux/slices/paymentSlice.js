import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const paymentRecharge = createAsyncThunk(
  "paymentSlice/paymentRecharge",
  async ({ money, userID }, { rejectWithValue }) => {
    console.log("paymentRecharge: " + typeof money + " " + userID);

    try {
      // Change logic in there
      const data = await api.post(`/payments?type=deposit&method=bank`, {
        amount: parseInt(money),
      });

      console.log("paymentRecharge data:", data.data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusPayement = createAsyncThunk(
  "paymentSlice/updateStatusPayement",
  async ({ transactionCode }, { rejectWithValue }) => {
    console.log("updateStatusPayement: " + transactionCode);

    try {
      // Change logic in there
      const data = await api.get(`/payments/${transactionCode}`);

      console.log("updateStatusPayement data:", data.data);
      return data.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListTransactionByUser = createAsyncThunk(
  "paymentSlice/getListTransactionByUser",
  async (_, { rejectWithValue }) => {
    console.log("getListTransactionByUser: ");

    try {
      // Change logic in there
      const data = await api.get(
        `/transactions/getByUser?pageSize=10&pageNumber=1`
      );

      console.log("getListTransactionByUser data:", data.data.metadata);
      return data.data.metadata;
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
    status: null,
    listTransaction: null,
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
      })
      .addCase(updateStatusPayement.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStatusPayement.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(updateStatusPayement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      })
      .addCase(getListTransactionByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListTransactionByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.listTransaction = action.payload;
      })
      .addCase(getListTransactionByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure consistent error handling
      });
  },
});

export default paymentSlice;

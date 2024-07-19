import storage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { eventSlice } from "./slices/eventSlice";
import { messageSlice } from "./slices/messageSlice";
import { userSlice } from "./slices/userSlice";
import { yardSlice } from "./slices/yardSlice";
import { paymentSlice } from "./slices/paymentSlice";
import bookSlice from "./slices/bookSlice";
import blogSlice from "./slices/blogSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  safelist: ["userSlice"], // name of reducer which will be stored in the local storage
};

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  eventSlice: eventSlice.reducer,
  messageSlice: messageSlice.reducer,
  yardSlice: yardSlice.reducer,
  paymentSlice: paymentSlice.reducer,
  bookSlice: bookSlice.reducer,
  blogSlice: blogSlice.reducer,

  //add more reducer here
  //...
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 400, // Increase the warning threshold to 400
      },
    }),
});

export const persistor = persistStore(store);

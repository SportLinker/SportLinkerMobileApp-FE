import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import storage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { eventSlice } from "./slices/eventSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  safelist: ["userSlice", "eventSlice"], // name of reducer which will be stored
};

const rootReducer = combineReducers({
  userSlice: userSlice.reducer,
  eventSlice: eventSlice.reducer,
  //add more reducer here
  //...
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

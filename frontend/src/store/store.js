import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "job"], // Only persist these reducers
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializableCheck for redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;

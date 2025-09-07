import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import watchlistReducer from "./slices/watchlistSlice";
import { movieApi } from "./api/movieApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["watchlist"], 
};

const rootReducer = combineReducers({
  auth: authReducer,
  watchlist: watchlistReducer,
  [movieApi.reducerPath]: movieApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(movieApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
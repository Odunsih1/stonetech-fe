import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from './api/movieApi';
import authSlice from './slices/authSlice';
import watchlistSlice from './slices/watchlistSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    watchlist: watchlistSlice,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
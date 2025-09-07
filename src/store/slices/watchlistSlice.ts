import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../api/movieApi';

interface WatchlistState {
  movies: Movie[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.find(movie => movie.imdbID === action.payload.imdbID);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(movie => movie.imdbID !== action.payload);
    },
    reorderWatchlist: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, reorderWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
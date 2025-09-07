import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WatchlistItem {
  imdbID: string;
  order: number;
}

interface WatchlistState {
  movies: WatchlistItem[];
}

const initialState: WatchlistState = {
  movies: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<WatchlistItem[]>) => {
      state.movies = action.payload.sort((a, b) => a.order - b.order);
    },
    addToWatchlist: (state, action: PayloadAction<{ imdbID: string }>) => {
      if (!state.movies.some((movie) => movie.imdbID === action.payload.imdbID)) {
        state.movies.push({
          imdbID: action.payload.imdbID,
          order: state.movies.length,
        });
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter((movie) => movie.imdbID !== action.payload);
      state.movies.forEach((movie, index) => {
        movie.order = index;
      });
    },
    reorderWatchlist: (
      state,
      action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>
    ) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [movedItem] = state.movies.splice(sourceIndex, 1);
      state.movies.splice(destinationIndex, 0, movedItem);
      state.movies.forEach((movie, index) => {
        movie.order = index;
      });
    },
    clearWatchlist: (state) => {
      state.movies = [];
    },
  },
});

export const { setWatchlist, addToWatchlist, removeFromWatchlist, reorderWatchlist, clearWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
import React from "react";
import MoviePlot from "./MoviePlot";
import MovieDetails from "./MovieDetails";
import WatchlistButton from "./WatchlistButton";
import type { MovieInfoProps } from "@/types/types";

const MovieInfo: React.FC<MovieInfoProps> = ({
  movie,
  user,
  isInWatchlist,
  onWatchlistToggle,
}) => (
  <div className="flex-1 space-y-4">
    <MoviePlot plot={movie.Plot} />
    <MovieDetails movie={movie} />
    {user && (
      <WatchlistButton
        isInWatchlist={isInWatchlist}
        onClick={onWatchlistToggle}
      />
    )}
  </div>
);

export default MovieInfo;

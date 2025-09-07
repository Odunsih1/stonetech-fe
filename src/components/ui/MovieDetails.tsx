import React from "react";
import type { MovieDetailsProps } from "@/types/types";

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => (
  <div>
    <h3 className="text-lg font-semibold">Details</h3>
    <ul className="text-[var(--muted-foreground)] space-y-2">
      <li>
        <strong>Director:</strong> {movie.Director || "N/A"}
      </li>
      <li>
        <strong>Actors:</strong> {movie.Actors || "N/A"}
      </li>
      <li>
        <strong>Genre:</strong> {movie.Genre || "N/A"}
      </li>
      <li>
        <strong>Released:</strong> {movie.Released || "N/A"}
      </li>
      <li>
        <strong>Writer:</strong> {movie.Writer || "N/A"}
      </li>
      <li>
        <strong>Language:</strong> {movie.Language || "N/A"}
      </li>
      <li>
        <strong>Country:</strong> {movie.Country || "N/A"}
      </li>
      <li>
        <strong>Awards:</strong> {movie.Awards || "N/A"}
      </li>
      <li>
        <strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}
      </li>
    </ul>
  </div>
);

export default MovieDetails;

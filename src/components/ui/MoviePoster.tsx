import React from "react";
import type { MoviePosterProps } from "@/types/types";

const MoviePoster: React.FC<MoviePosterProps> = ({ poster, title }) => (
  <div className="w-full md:w-1/3">
    <img
      src={poster !== "N/A" ? poster : "/placeholder.jpg"}
      alt={title}
      className="w-full aspect-[2/3] object-cover rounded-lg shadow-[var(--shadow-card)]"
    />
  </div>
);

export default MoviePoster;

import React from "react";

interface MoviePlotProps {
  plot: string;
}

const MoviePlot: React.FC<MoviePlotProps> = ({ plot }) => (
  <div>
    <h3 className="text-lg font-semibold">Plot</h3>
    <p className="text-[var(--muted-foreground)]">
      {plot || "No plot available."}
    </p>
  </div>
);

export default MoviePlot;

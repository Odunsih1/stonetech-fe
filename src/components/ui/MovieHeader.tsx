import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { MovieHeaderProps } from "@/types/types";

const MovieHeader: React.FC<MovieHeaderProps> = ({
  title,
  year,
  type,
  rated,
  runtime,
}) => (
  <CardHeader>
    <CardTitle className="text-3xl gradient-text">
      {title} ({year})
    </CardTitle>
    <p className="text-[var(--muted-foreground)]">
      {type.charAt(0).toUpperCase() + type.slice(1)} • {rated || "N/A"} •{" "}
      {runtime || "N/A"}
    </p>
  </CardHeader>
);

export default MovieHeader;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WatchlistHeaderProps {
  movieCount: number;
}

const WatchlistHeader: React.FC<WatchlistHeaderProps> = ({ movieCount }) => {
  return (
    <Card className="bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="text-3xl gradient-text">Your Watchlist</CardTitle>
        <p className="text-[var(--muted-foreground)]">
          {movieCount} {movieCount === 1 ? "movie" : "movies"}
        </p>
      </CardHeader>
    </Card>
  );
};

export default WatchlistHeader;

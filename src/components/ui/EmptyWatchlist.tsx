import React from "react";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyWatchlistProps {
  onDiscoverMovies: () => void;
}

const EmptyWatchlist: React.FC<EmptyWatchlistProps> = ({
  onDiscoverMovies,
}) => {
  return (
    <Card className="text-center py-16 bg-gradient-card border-[var(--cinema-border)]">
      <CardContent>
        <Film className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your Watchlist is Empty</h2>
        <p className="text-[var(--muted-foreground)]">
          Add some movies to your watchlist to see them here!
        </p>
        <Button
          onClick={onDiscoverMovies}
          className="mt-4 bg-gradient-button hover:opacity-90"
        >
          Discover Movies
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyWatchlist;

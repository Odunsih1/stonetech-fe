import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onClick: () => void;
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  isInWatchlist,
  onClick,
}) => (
  <Button onClick={onClick} className="bg-gradient-button hover:opacity-90">
    <Heart className={`w-4 h-4 mr-2 ${isInWatchlist ? "fill-current" : ""}`} />
    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
  </Button>
);

export default WatchlistButton;

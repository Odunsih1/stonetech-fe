import React from "react";
import { useState } from "react";
import { Heart, Eye, Calendar } from "lucide-react";
import { Movie } from "@/store/api/movieApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/store/slices/watchlistSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
}

interface AuthState {
  auth: {
    user: { uid: string; email: string | null } | null;
  };
  watchlist: {
    movies: Array<{ imdbID: string }>;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const user = useAppSelector((state: AuthState) => state.auth.user);
  const watchlist = useAppSelector((state) => state.watchlist.movies);
  const isInWatchlist = watchlist.some((item) => item.imdbID === movie.imdbID);

  const handleWatchlistToggle = () => {
    if (!user) {
      toast("Error, Please sign in to manage your watchlist.");
      router.push("/auth");
      return;
    }
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.imdbID));
      toast(`${movie.Title} has been removed from your watchlist.`);
    } else {
      dispatch(addToWatchlist(movie));
      toast(`${movie.Title} has been added to your watchlist.`);
    }
  };

  const handleViewDetails = () => {
    if (!user) {
      toast("Error, Please sign in to view movie details.");
      router.push("/auth");
      return;
    } else router.push(`/movie/${movie.imdbID}`);
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-[var(--cinema-border)] hover:shadow-hover transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          {!imageError && movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">No Poster</p>
              </div>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Watchlist button */}
          <Button
            variant="secondary"
            size="sm"
            className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
              isInWatchlist ? "bg-cinema-gold text-cinema-dark" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleWatchlistToggle();
            }}
          >
            <Heart
              className={`w-4 h-4 ${isInWatchlist ? "fill-current" : ""}`}
            />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-4 space-y-3">
        <div className="w-full">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-cinema-gold transition-colors">
            {movie.Title}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {movie.Year}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-cinema-border hover:bg-cinema-purple hover:border-cinema-purple hover:text-white transition-all duration-300"
          onClick={handleViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;

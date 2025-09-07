import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/redux";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "@/store/slices/watchlistSlice";
import type { User } from "@/types/types";

interface UseWatchlistToggleProps {
  user: User | null;
  movieId: string;
  movieTitle?: string;
  isInWatchlist: boolean;
}

export const useWatchlistToggle = ({
  user,
  movieId,
  movieTitle,
  isInWatchlist,
}: UseWatchlistToggleProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleWatchlistToggle = useCallback(() => {
    if (!user) {
      toast.error("Error", {
        description: "Please sign in to manage your watchlist.",
      });
      router.push("/auth");
      return;
    }

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movieId));
      toast.success("Removed from Watchlist", {
        description: `${movieTitle} has been removed from your watchlist.`,
      });
    } else {
      dispatch(addToWatchlist({ imdbID: movieId }));
      toast.success("Added to Watchlist", {
        description: `${movieTitle} has been added to your watchlist.`,
      });
    }
  }, [user, movieId, movieTitle, isInWatchlist, dispatch, router]);

  return { handleWatchlistToggle };
};
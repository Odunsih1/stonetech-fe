import { useEffect } from "react";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { setWatchlist } from "@/store/slices/watchlistSlice";
import { User, WatchlistItem } from "../types/types";


export const useWatchlistSync = (
  user: User | null,
  watchlist: WatchlistItem[],
  dispatch: (action: any) => void
) => {
  useEffect(() => {
     if (user) {
      const fetchWatchlist = async () => {
        try {
          const docRef = doc(db, "users", user.uid, "watchlist", "movies");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data().movies as WatchlistItem[] | undefined;
            if (data) {
              dispatch(setWatchlist(data));
            } else {
              dispatch(setWatchlist([])); 
            }
          } else {
            dispatch(setWatchlist([])); 
          }
        } catch (error: unknown) {
          console.error("Fetch watchlist error:", error);
          toast.error("Error", {
            description: "Failed to load watchlist. Please try again.",
          });
        }
      };
      fetchWatchlist();
    }
  }, [user, dispatch]);
 

  // Sync watchlist to Firestore when it changes
  useEffect(() => {
    if (!user || watchlist.length === 0) return;

    const syncWatchlist = async () => {
      try {
        const docRef = doc(db, "users", user.uid, "watchlist", "movies");
        await setDoc(docRef, { movies: watchlist }, { merge: true });
      } catch (error) {
        console.error("Failed to sync watchlist:", error);
        toast.error("Error", {
          description: "Failed to sync watchlist. Please try again.",
        });
      }
    };

    // Debounce the sync operation to avoid excessive writes
    const timeoutId = setTimeout(syncWatchlist, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchlist, user]);
};
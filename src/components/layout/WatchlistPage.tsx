"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { reorderWatchlist } from "@/store/slices/watchlistSlice";
import WatchlistHeader from "@/components/ui/WatchlistHeader";
import EmptyWatchlist from "@/components/ui/EmptyWatchlist";
import WatchlistGrid from "@/components/ui/WatchlistGrid";
import { useWatchlistSync } from "@/hooks/useWatchlistSync";
import { AuthState } from "@/types/types";

const WatchlistPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: AuthState) => state.auth.user);
  const watchlist = useAppSelector(
    (state: AuthState) => state.watchlist.movies
  );

  // Custom hook for Firestore synchronization
  useWatchlistSync(user, watchlist, dispatch);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast.error("Error", {
        description: "Please sign in to view your watchlist.",
      });
      router.push("/auth");
    }
  }, [user, router]);

  // Handle drag-and-drop reordering
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = watchlist.findIndex((item) => item.imdbID === active.id);
      const newIndex = watchlist.findIndex((item) => item.imdbID === over?.id);
      dispatch(
        reorderWatchlist({
          sourceIndex: oldIndex,
          destinationIndex: newIndex,
        })
      );
      toast.success("Watchlist reordered", {
        description: "Your watchlist order has been updated.",
      });
    }
  };

  const handleBackToHome = () => router.push("/");

  if (!user) return null;

  if (watchlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={handleBackToHome} />
        <EmptyWatchlist onDiscoverMovies={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={handleBackToHome} />
      <WatchlistHeader movieCount={watchlist.length} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <WatchlistGrid watchlist={watchlist} dispatch={dispatch} />
      </DndContext>
    </div>
  );
};

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="mb-6 text-[var(--muted-foreground)] hover:bg-[var(--cinema-card)]"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Home
  </Button>
);

export default WatchlistPage;

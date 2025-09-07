import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { removeFromWatchlist } from "@/store/slices/watchlistSlice";
import WatchlistItem from "./WatchlistItem";
import { WatchlistItem as WatchlistItemType } from "@/types/types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AppDispatch } from "@/store/store";

interface WatchlistGridProps {
  watchlist: WatchlistItemType[];
  dispatch:  AppDispatch;
}

const WatchlistGrid: React.FC<WatchlistGridProps> = ({
  watchlist,
  dispatch,
}) => {
  const handleRemoveItem = (imdbID: string) => {
    dispatch(removeFromWatchlist(imdbID));
  };

  return (
    <Card className="bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
      <CardContent className="pt-6">
        <SortableContext
          items={watchlist.map((item) => item.imdbID)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchlist.map((item, index) => (
              <WatchlistItem
                key={item.imdbID}
                item={item}
                index={index}
                onRemove={() => handleRemoveItem(item.imdbID)}
              />
            ))}
          </div>
        </SortableContext>
      </CardContent>
    </Card>
  );
};

export default WatchlistGrid;

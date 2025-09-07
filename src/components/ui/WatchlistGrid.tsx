import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { removeFromWatchlist } from "@/store/slices/watchlistSlice";
import WatchlistItem from "./WatchlistItem";
import { WatchlistItem as WatchlistItemType } from "../../types/types";

interface WatchlistGridProps {
  watchlist: WatchlistItemType[];
  dispatch: (action: any) => void;
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
        <Droppable droppableId="watchlist">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {watchlist.map((item, index) => (
                <WatchlistItem
                  key={item.imdbID}
                  item={item}
                  index={index}
                  onRemove={() => handleRemoveItem(item.imdbID)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
    </Card>
  );
};

export default WatchlistGrid;

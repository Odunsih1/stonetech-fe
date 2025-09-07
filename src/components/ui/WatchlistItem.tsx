import React from "react";
import { useRouter } from "next/navigation";
import { Draggable } from "react-beautiful-dnd";
import { Heart, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMovieDetailsQuery } from "@/store/api/movieApi";
import WatchlistItemSkeleton from "./WatchlistItemSkeleton";
import WatchlistItemError from "./WatchlistItemError";
import { WatchlistItem as WatchlistItemType } from "../../types/types";

interface WatchlistItemProps {
  item: WatchlistItemType;
  index: number;
  onRemove: () => void;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({
  item,
  index,
  onRemove,
}) => {
  const router = useRouter();
  const {
    data: movie,
    isLoading,
    error,
  } = useGetMovieDetailsQuery(item.imdbID);

  const handleMovieClick = () => {
    if (movie) {
      router.push(`/movie/${movie.imdbID}`);
    }
  };

  if (isLoading) {
    return <WatchlistItemSkeleton />;
  }

  if (error || !movie || movie.Response === "False") {
    return <WatchlistItemError onRemove={onRemove} />;
  }

  return (
    <Draggable draggableId={item.imdbID} index={index}>
      {(provided) => (
        <Card
          className="bg-gradient-card border-[var(--cinema-border)]"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <DragHandle dragHandleProps={provided.dragHandleProps} />

              <div className="flex-1">
                <MoviePoster
                  poster={movie.Poster}
                  title={movie.Title}
                  onClick={handleMovieClick}
                />

                <MovieInfo
                  title={movie.Title}
                  year={movie.Year}
                  type={movie.Type}
                />

                <RemoveButton onRemove={onRemove} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

// Sub-components for better organization
const DragHandle: React.FC<{ dragHandleProps: any }> = ({
  dragHandleProps,
}) => (
  <div {...dragHandleProps} className="pt-2">
    <GripVertical className="w-4 h-4 text-[var(--muted-foreground)] cursor-grab" />
  </div>
);

const MoviePoster: React.FC<{
  poster: string;
  title: string;
  onClick: () => void;
}> = ({ poster, title, onClick }) => (
  <img
    src={poster !== "N/A" ? poster : "/placeholder.jpg"}
    alt={title}
    className="w-full aspect-[2/3] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
    onClick={onClick}
  />
);

const MovieInfo: React.FC<{
  title: string;
  year: string;
  type: string;
}> = ({ title, year, type }) => (
  <>
    <h3 className="text-lg font-semibold truncate gradient-text mt-2">
      {title}
    </h3>
    <p className="text-sm text-[var(--muted-foreground)]">
      {year} • {type.charAt(0).toUpperCase() + type.slice(1)}
    </p>
  </>
);

const RemoveButton: React.FC<{ onRemove: () => void }> = ({ onRemove }) => (
  <Button
    variant="outline"
    size="sm"
    onClick={onRemove}
    className="w-full mt-2 border-[var(--cinema-border)] hover:bg-destructive hover:text-white transition-colors"
  >
    <Heart className="w-4 h-4 mr-2" />
    Remove
  </Button>
);

export default WatchlistItem;

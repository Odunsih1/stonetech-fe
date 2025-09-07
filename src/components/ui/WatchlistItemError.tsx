import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WatchlistItemErrorProps {
  onRemove: () => void;
}

const WatchlistItemError: React.FC<WatchlistItemErrorProps> = ({
  onRemove,
}) => (
  <Card className="bg-gradient-card border-[var(--cinema-border)]">
    <CardContent className="p-4 text-center">
      <div className="py-8">
        <p className="text-[var(--muted-foreground)] mb-4">
          Failed to load movie details.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="border-[var(--cinema-border)] hover:bg-destructive hover:text-white transition-colors"
        >
          <Heart className="w-4 h-4 mr-2" />
          Remove
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default WatchlistItemError;

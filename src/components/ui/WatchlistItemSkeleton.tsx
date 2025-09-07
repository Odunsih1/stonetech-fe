import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WatchlistItemSkeleton: React.FC = () => (
  <Card className="bg-gradient-card border-[var(--cinema-border)]">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="w-4 h-4 mt-2" />
        <div className="flex-1">
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
          <Skeleton className="h-6 w-3/4 mt-2" />
          <Skeleton className="h-4 w-1/2 mt-2" />
          <Skeleton className="h-8 w-full mt-2" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default WatchlistItemSkeleton;

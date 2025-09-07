import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton: React.FC = () => (
  <Card className="bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="w-full md:w-1/3 aspect-[2/3] rounded-lg" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LoadingSkeleton;

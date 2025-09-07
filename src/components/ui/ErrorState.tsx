import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, ArrowLeft } from "lucide-react";

interface ErrorStateProps {
  errorMessage?: string;
  onBackToHome: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage = "Could not load movie details. Please try again.",
  onBackToHome,
}) => (
  <Card className="text-center py-16 bg-gradient-card border-[var(--cinema-border)]">
    <CardContent>
      <Film className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Movie Not Found</h2>
      <p className="text-[var(--muted-foreground)]">{errorMessage}</p>
      <Button
        onClick={onBackToHome}
        className="mt-4 bg-gradient-button hover:opacity-90"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
    </CardContent>
  </Card>
);

export default ErrorState;

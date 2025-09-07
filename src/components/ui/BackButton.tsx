import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { BackButtonProps } from "@/types/types";

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="mb-6 text-[var(--muted-foreground)] hover:bg-[var(--cinema-card)]"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Home
  </Button>
);

export default BackButton;

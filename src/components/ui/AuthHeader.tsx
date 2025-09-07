import React from "react";
import { Film } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AuthHeader: React.FC = () => {
  return (
    <CardHeader className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="p-3 rounded-full bg-gradient-button">
          <Film className="w-8 h-8 text-white" />
        </div>
      </div>
      <div>
        <CardTitle className="text-2xl gradient-text">BoxMovie</CardTitle>
        <CardDescription className="text-[var(--muted-foreground)]">
          Your personal movie discovery platform
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export default AuthHeader;

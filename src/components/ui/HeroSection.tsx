import React from "react";
import { Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  user: { uid: string; email: string | null } | null;
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ user, onGetStarted }) => {
  return (
    <div className="text-center mb-12 animate-fadeIn">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-gradient-button shadow-glow">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </div>

      <h1 className="text-6xl font-bold gradient-text mb-4">Discover Cinema</h1>

      <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
        Search through millions of movies, create your personal watchlist, and
        never miss a great film again.
      </p>

      {!user && (
        <Button
          onClick={onGetStarted}
          className="bg-gradient-button hover:opacity-90 text-lg cursor-pointer px-8 py-3 h-auto text-white"
        >
          <Film className="w-5 h-5 mr-2" />
          Get Started
        </Button>
      )}
    </div>
  );
};

export default HeroSection;

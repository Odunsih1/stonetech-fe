import React from "react";
import { Button } from "@/components/ui/button";

interface GoogleSignInButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onClick,
  disabled,
  text,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full border-[var(--cinema-border)] hover:bg-[var(--cinema-purple)] hover:border-[var(--cinema-purple)] transition-colors"
      onClick={onClick}
      disabled={disabled}
    >
      <img
        src="https://www.google.com/favicon.ico"
        alt="Google"
        className="h-5 w-5 mr-2"
      />
      {text}
    </Button>
  );
};

export default GoogleSignInButton;

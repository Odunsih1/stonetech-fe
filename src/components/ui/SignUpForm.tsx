import React from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GoogleSignInButton from "./GoogleSignInButton";
import { AuthFormProps } from "../../types/types";

const SignUpForm: React.FC<AuthFormProps> = ({
  email,
  password,
  confirmPassword,
  loading,
  setEmail,
  setPassword,
  setConfirmPassword,
  onSignUp,
  onGoogleSignIn,
}) => {
  return (
    <form onSubmit={onSignUp} className="space-y-4">
      <EmailInput
        id="signup-email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
      />

      <PasswordInput
        id="signup-password"
        value={password}
        onChange={setPassword}
        placeholder="Create a password"
        label="Password"
      />

      <PasswordInput
        id="confirm-password"
        value={confirmPassword || ""}
        onChange={setConfirmPassword!}
        placeholder="Confirm your password"
        label="Confirm Password"
      />

      <Button
        type="submit"
        className="w-full bg-gradient-button cursor-pointer hover:opacity-90 transition-opacity"
        disabled={loading}
      >
        <LogIn className="w-4 h-4 mr-2" />
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>

      <GoogleSignInButton
        onClick={onGoogleSignIn}
        disabled={loading}
        text="Sign Up with Google"
      />
    </form>
  );
};

export default SignUpForm;

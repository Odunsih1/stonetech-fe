import React from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GoogleSignInButton from "./GoogleSignInButton";
import { AuthFormProps } from "../../types/types";

const SignInForm: React.FC<AuthFormProps> = ({
  email,
  password,
  loading,
  setEmail,
  setPassword,
  onSignIn,
  onGoogleSignIn,
}) => {
  return (
    <form onSubmit={onSignIn} className="space-y-4 flex flex-col gap-3">
      <EmailInput
        id="email"
        value={email}
        onChange={setEmail}
        placeholder="Enter your email"
      />

      <PasswordInput
        id="password"
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        label="Password"
      />

      <Button
        type="submit"
        className="w-full bg-gradient-button cursor-pointer hover:opacity-90 transition-opacity"
        disabled={loading}
      >
        <LogIn className="w-4 h-4 mr-2" />
        {loading ? "Signing In..." : "Sign In"}
      </Button>

      <GoogleSignInButton
        onClick={onGoogleSignIn}
        disabled={loading}
        text="Sign In with Google"
      />
    </form>
  );
};

export default SignInForm;

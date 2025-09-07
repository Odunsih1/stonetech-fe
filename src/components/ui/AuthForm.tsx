"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthHeader from "./AuthHeader";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useAuthActions } from "../../hooks/useAuthActions";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { handleSignUp, handleSignIn, handleGoogleSignIn } = useAuthActions({
    email,
    password,
    confirmPassword,
    setLoading,
    dispatch,
  });

  const authFormProps = {
    email,
    password,
    confirmPassword,
    loading,
    setEmail,
    setPassword,
    setConfirmPassword,
    onSignIn: handleSignIn,
    onSignUp: handleSignUp,
    onGoogleSignIn: handleGoogleSignIn,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero">
      <Card className="w-full max-w-md bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
        <AuthHeader />

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <AuthTabsList />

            <TabsContent value="signin" className="space-y-4 mt-6">
              <SignInForm {...authFormProps} />
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <SignUpForm {...authFormProps} />
            </TabsContent>
          </Tabs>
        </CardContent>

        <AuthFooter />
      </Card>
    </div>
  );
};

// Auth Tabs List Component
const AuthTabsList: React.FC = () => (
  <TabsList className="grid w-full grid-cols-2 bg-[var(--cinema-card)]">
    <TabsTrigger
      value="signin"
      className="data-[state=active]:bg-[var(--cinema-purple)] cursor-pointer data-[state=active]:text-white"
    >
      Sign In
    </TabsTrigger>
    <TabsTrigger
      value="signup"
      className="data-[state=active]:bg-[var(--cinema-purple)] cursor-pointer data-[state=active]:text-white"
    >
      Sign Up
    </TabsTrigger>
  </TabsList>
);

// Auth Footer Component
const AuthFooter: React.FC = () => (
  <CardFooter className="justify-center">
    <p className="text-xs text-[var(--muted-foreground)] text-center">
      Join thousands of movie enthusiasts discovering their next favorite film
    </p>
  </CardFooter>
);

export default AuthForm;

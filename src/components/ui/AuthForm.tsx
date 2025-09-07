"use client";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/redux";
import { setUser, setLoading, setError } from "@/store/slices/authSlice";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Film, LogIn } from "lucide-react";

// Define types for Redux state (adjust based on your authSlice)
interface AuthState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
}

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
    } catch (error: string | null | unknown) {
      dispatch(setError(error));
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully.",
      });
    } catch (error: string | null | unknown) {
      dispatch(setError(error));
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const provider = new GoogleAuthProvider();
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      dispatch(setUser(userCredential.user));
      toast({
        title: "Welcome!",
        description: "You've signed in with Google successfully.",
      });
    } catch (error: string | null | unknown) {
      dispatch(setError(error));
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-hero">
      <Card className="w-full max-w-md bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
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

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
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

            <TabsContent value="signin" className="space-y-4 mt-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-button cursor-pointer hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-[var(--cinema-border)] hover:bg-[var(--cinema-purple)] hover:border-[var(--cinema-purple)]"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In with Google
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)]"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-button cursor-pointer hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-[var(--cinema-border)] hover:bg-[var(--cinema-purple)] hover:border-[var(--cinema-purple)]"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign Up with Google
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-xs text-[var(--muted-foreground)] text-center">
            Join thousands of movie enthusiasts discovering their next favorite
            film
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;

import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import * as authActions from "@/store/slices/authSlice";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";

interface UseAuthActionsProps {
  email: string;
  password: string;
  confirmPassword: string;
  setLoading: (loading: boolean) => void;
  dispatch: AppDispatch;
}

export const useAuthActions = ({
  email,
  password,
  confirmPassword,
  setLoading,
  dispatch,
}: UseAuthActionsProps) => {
  const handleSignUp = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if (password !== confirmPassword) {
        toast.error("Passwords don't match.");
        return;
      }

      setLoading(true);
      dispatch(authActions.setLoading(true));

      try {
        const userCredential: UserCredential =
          await createUserWithEmailAndPassword(auth, email, password);
        dispatch(authActions.setUser(userCredential.user));
        toast.success("Your account has been created successfully.");
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        console.error("Sign up error:", errorMessage);
        dispatch(authActions.setError("Unable to create account"));
        toast.error("Unable to create account");
      } finally {
        setLoading(false);
        dispatch(authActions.setLoading(false));
      }
    },
    [email, password, confirmPassword, setLoading, dispatch]
  );

  const handleSignIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      dispatch(authActions.setLoading(true));

      try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(authActions.setUser(userCredential.user));
        toast.success("You've been signed in successfully.");
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        console.error("Sign in error:", errorMessage);
        dispatch(authActions.setError("Unable to sign in"));
        toast.error("Unable to sign in");
      } finally {
        setLoading(false);
        dispatch(authActions.setLoading(false));
      }
    },
    [email, password, setLoading, dispatch]
  );

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    setLoading(true);
    dispatch(authActions.setLoading(true));

    try {
      const provider = new GoogleAuthProvider();
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      dispatch(authActions.setUser(userCredential.user));
      toast.success("You've signed in with Google successfully.");
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      console.error("Google sign in error:", errorMessage);
      dispatch(authActions.setError("Unable to sign in with Google"));
      toast.error("Unable to sign in with Google");
    } finally {
      setLoading(false);
      dispatch(authActions.setLoading(false));
    }
  }, [setLoading, dispatch]);

  return {
    handleSignUp,
    handleSignIn,
    handleGoogleSignIn,
  };
};

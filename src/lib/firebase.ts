import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  Auth,
  UserCredential,
  User,
} from "firebase/auth";

// Define the Firebase configuration type
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Safely access environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

// Validate that all required environment variables are defined
const requiredConfigKeys: (keyof FirebaseConfig)[] = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

for (const key of requiredConfigKeys) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing Firebase config: ${key}`);
  }
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence).catch((error: Error) => {
  console.error("setPersistence: Error:", error.message);
});

// Re-export Firebase auth methods
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
};

// Sign in with email and password
export const signInWithEmailPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!result.user.emailVerified) {
      await sendEmailVerification(result.user);
    }
    return result.user;
  } catch (error: string | null | unknown) {
    console.error("signInWithEmailPassword: Error:", error);
    throw error;
  }
};

// Sign up with email and password
export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(result.user);
    return result.user;
  } catch (error: string | null | unknown) {
    console.error("signUpWithEmailPassword: Error:", error);
    throw error;
  }
};

// Send password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: string | null | unknown) {
    console.error("sendPasswordReset: Error:", error);
    throw error;
  }
};

// Sign out user
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: string | null | unknown) {
    console.error("signOutUser: Error:", error);
    throw error;
  }
};
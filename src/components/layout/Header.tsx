"use client"; // Required for client-side hooks in Next.js App Router

import React from "react";
import { Film, Search, Heart, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/store/slices/authSlice";
import { toast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";

interface User {
  email: string | null;
  uid: string;
}

interface AuthState {
  auth: {
    user: User | null;
  };
  watchlist: {
    movies: Array<{ imdbID: string }>; 
  };
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname(); 
  const user = useAppSelector((state: AuthState) => state.auth.user);
  const watchlistCount = useAppSelector(
    (state: AuthState) => state.watchlist.movies.length
  );

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      dispatch(logout());
      router.push("/");
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    } catch (error: string | null | unknown) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isActive = (path: string): boolean => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[var(--cinema-card)]/80 backdrop-blur-md border-b border-[var(--cinema-border)]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-gradient-button  group-hover:scale-110 transition-transform">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CineVault</span>
          </button>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                onClick={() => router.push("/")}
                className={isActive("/") ? "bg-[var(--cinema-purple)] cursor-pointer" : ""}
              >
                <Search className="w-4 h-4 mr-2" />
                Discover
              </Button>
              <Button
                variant={isActive("/watchlist") ? "default" : "ghost"}
                onClick={() => router.push("/watchlist")}
                className={`relative ${
                  isActive("/watchlist") ? "bg-[var(--cinema-purple)] cursor-pointer" : ""
                }`}
              >
                <Heart className="w-4 h-4 mr-2" />
                Watchlist
                {watchlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--cinema-gold)] text-[var(--cinema-dark)] text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {watchlistCount}
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span className="text-[var(--muted-foreground)]">
                    {user.email?.split("@")[0] ?? "User"}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-[var(--cinema-border)] hover:bg-[var(--destructive)] hover:border-[var(--destructive)] cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={() => router.push("/auth")}
                className="border-[var(---cinema-border)] hover:bg-[var(--cinema-purple)] hover:border-[var(--cinema-purple)] cursor-pointer"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && (
          <div className="md:hidden flex items-center justify-center space-x-1 mt-3 pt-3 border-t border-[var(--cinema-border)]">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/")}
              className={isActive("/") ? "bg-[var(--cinema-purple)] cursor-pointer" : ""}
            >
              <Search className="w-4 h-4 mr-2" />
              Discover
            </Button>
            <Button
              variant={isActive("/watchlist") ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/watchlist")}
              className={`relative ${
                isActive("/watchlist") ? "bg-[var(--cinema-purple)] cursor-pointer" : ""
              }`}
            >
              <Heart className="w-4 h-4 mr-2" />
              Watchlist
              {watchlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--cinema-gold)] text-[var(--cinema-dark)] cursor-pointer text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {watchlistCount}
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

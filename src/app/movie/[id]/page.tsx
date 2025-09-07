"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetMovieDetailsQuery } from "@/store/api/movieApi";
import { useAppSelector } from "@/hooks/redux";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import BackButton from "@/components/ui/BackButton";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import MovieHeader from "@/components/ui/MovieHeader";
import MoviePoster from "@/components/ui/MoviePoster";
import MovieInfo from "@/components/ui/MovieInfo";
import { useWatchlistToggle } from "@/hooks/useWatchlistToggle";
import type { AuthState } from "@/types/types";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = useAppSelector((state: AuthState) => state.auth.user);
  const watchlist = useAppSelector(
    (state: AuthState) => state.watchlist.movies
  );
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(id);

  const isInWatchlist = watchlist.some((item) => item.imdbID === id);

  const { handleWatchlistToggle } = useWatchlistToggle({
    user,
    movieId: id,
    movieTitle: movie?.Title,
    isInWatchlist,
  });

  const handleBackToHome = () => router.push("/");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !movie) {
    const errorMessage =
      JSON.stringify(error, null, 2) || "Failed to load movie details.";

    toast.error("Error", {
      description: errorMessage,
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState
          errorMessage={errorMessage}
          onBackToHome={handleBackToHome}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton onClick={handleBackToHome} />

      <Card className="bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
        <MovieHeader
          title={movie.Title}
          year={movie.Year}
          type={movie.Type}
          rated={movie.Rated}
          runtime={movie.Runtime}
        />
        <CardContent className="flex flex-col md:flex-row gap-6">
          <MoviePoster poster={movie.Poster} title={movie.Title} />
          <MovieInfo
            movie={movie}
            user={user}
            isInWatchlist={isInWatchlist}
            onWatchlistToggle={handleWatchlistToggle}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetailPage;

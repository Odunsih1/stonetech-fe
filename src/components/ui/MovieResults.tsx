import React from "react";
import { Search, Film } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "@/components/ui/MovieCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Movie, SearchResults } from "../../types/types";

interface MovieResultsProps {
  movies: Movie[];
  searchResults: SearchResults | undefined;
  isLoading: boolean;
  error: unknown;
}

const MovieResults: React.FC<MovieResultsProps> = ({
  movies,
  searchResults,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (searchResults && searchResults.Response === "False") {
    return <NoResultsState searchResults={searchResults} />;
  }

  if (movies.length > 0) {
    return <MoviesGrid movies={movies} searchResults={searchResults} />;
  }

  return null;
};

// Error State Component
const ErrorState: React.FC<{ error: unknown }> = ({ error }) => (
  <Card className="text-center py-16 bg-gradient-card border-[var(--cinema-border)]">
    <CardContent>
      <Film className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-[var(--muted-foreground)]">
        Unable to fetch movie details. Please try again later.
      </p>
    </CardContent>
  </Card>
);

// No Results State Component
const NoResultsState: React.FC<{ searchResults: SearchResults }> = ({
  searchResults,
}) => (
  <Card className="text-center py-16 bg-gradient-card border-[var(--cinema-border)]">
    <CardContent>
      <Search className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
      <h2 className="text-2xl font-semibold mb-2">No results found</h2>
      <p className="text-[var(--muted-foreground)]">
        {searchResults.Error || "Try adjusting your search terms or filters."}
      </p>
    </CardContent>
  </Card>
);

// Movies Grid Component
const MoviesGrid: React.FC<{
  movies: Movie[];
  searchResults: SearchResults | undefined;
}> = ({ movies, searchResults }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">
        Search Results ({searchResults?.totalResults || movies.length})
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
      ))}
    </div>
  </div>
);

export default MovieResults;

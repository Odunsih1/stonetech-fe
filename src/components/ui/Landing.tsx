"use client";

import React, { useMemo, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { useSearchMoviesQuery } from "@/store/api/movieApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";
import SearchFilters from "./SearchFilter";
import MovieResults from "./MovieResults";
import { Movie, AuthState } from "../../types/types";

const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

const Landing: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state: AuthState) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchMoviesQuery({
    query: debouncedSearchQuery || "batman",
    year: selectedYear === "all" ? "" : selectedYear,
    type: selectedType === "all" ? "" : selectedType,
  });

  // Remove duplicates and sort movies
  const sortedMovies = useMemo(() => {
    if (!searchResults?.Search) return [];

    const uniqueMovies = Array.from(
      new Map(
        searchResults.Search.map((movie: Movie) => [movie.imdbID, movie])
      ).values()
    );

    if (searchResults?.Search.length !== uniqueMovies.length) {
      console.warn("Duplicate movies found:", searchResults.Search);
    }

    switch (sortBy) {
      case "title":
        return uniqueMovies.sort((a, b) => a.Title.localeCompare(b.Title));
      case "year":
        return uniqueMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      default:
        return uniqueMovies;
    }
  }, [searchResults, sortBy]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedType("");
    setSortBy("relevance");
  };

  const hasActiveFilters =
    selectedYear || selectedType || sortBy !== "relevance";

  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection user={user} onGetStarted={() => router.push("/auth")} />

      <SearchFilters
        searchQuery={searchQuery}
        selectedYear={selectedYear}
        selectedType={selectedType}
        sortBy={sortBy}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={handleSearch}
        onYearChange={setSelectedYear}
        onTypeChange={setSelectedType}
        onSortChange={setSortBy}
        onClearFilters={clearFilters}
      />

      <MovieResults
        movies={sortedMovies}
        searchResults={searchResults}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Landing;

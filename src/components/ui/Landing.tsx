"use client";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, SortAsc, Film, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchMoviesQuery } from "@/store/api/movieApi";
import { useAppSelector } from "@/hooks/redux";
import MovieCard from "@/components/ui/MovieCard";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

const Landing = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

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

  const sortedMovies = useMemo(() => {
    if (!searchResults?.Search) return [];

    const movies = [...searchResults.Search];

    switch (sortBy) {
      case "title":
        return movies.sort((a, b) => a.Title.localeCompare(b.Title));
      case "year":
        return movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
      default:
        return movies;
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

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[2/3] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-[var(--gradient-button)] bg-gradient-button shadow-[var(--glow)]">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold gradient-text mb-4">
          Discover Cinema
        </h1>
        <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
          Search through millions of movies, create your personal watchlist, and
          never miss a great film again.
        </p>

        {!user && (
          <Button
            onClick={() => router.push("/auth")}
            className="bg-[var(--gradient-button)] bg-gradient-button hover:opacity-90 text-lg cursor-pointer px-8 py-3 h-auto"
          >
            <Film className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        )}
      </div>

      {/* Search & Filters */}
      <Card className="mb-8 bg-[var(--gradient-card)] bg-gradient-card border-[var(--cinema-border)] shadow-[var(--card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Movies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-[var(--muted-foreground)]" />
            <Input
              placeholder="Search for movies, TV shows..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)] text-lg py-6"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32 bg-[var(--cinema-card)] border-[var(--cinema-border)]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {YEARS.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32 bg-[var(--cinema-card)] border-[var(--cinema-border)]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="movie">Movies</SelectItem>
                <SelectItem value="series">TV Series</SelectItem>
                <SelectItem value="episode">Episodes</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-[var(--muted-foreground)]" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-[var(--cinema-card)] border-[var(--cinema-border)]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="year">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(selectedYear || selectedType || sortBy !== "relevance") && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="border-[var(--cinema-border)] hover:bg-[var(--cinema-card)]"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading && <LoadingSkeleton />}

      {error && (
        <Card className="text-center py-16 bg-[var(--gradient-card)] bg-gradient-card border-[var(--cinema-border)]">
          <CardContent>
            <Film className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-[var(--muted-foreground)]">
              Please check your connection and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {searchResults && searchResults.Response === "False" && (
        <Card className="text-center py-16 bg-[var(--gradient-card)] border-[var(--cinema-border)]">
          <CardContent>
            <Search className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-[var(--muted-foreground)]">
              Try adjusting your search terms or filters.
            </p>
          </CardContent>
        </Card>
      )}

      {sortedMovies.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Search Results (
              {searchResults?.totalResults || sortedMovies.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;

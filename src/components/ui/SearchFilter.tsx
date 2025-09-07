import React from "react";
import { Search, Filter, SortAsc } from "lucide-react";
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
import { YEARS } from "./Landing";

interface SearchFiltersProps {
  searchQuery: string;
  selectedYear: string;
  selectedType: string;
  sortBy: string;
  hasActiveFilters: string | boolean;
  onSearchChange: (value: string) => void;
  onYearChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  selectedYear,
  selectedType,
  sortBy,
  hasActiveFilters,
  onSearchChange,
  onYearChange,
  onTypeChange,
  onSortChange,
  onClearFilters,
}) => {
  return (
    <Card className="mb-8 bg-gradient-card border-[var(--cinema-border)] shadow-[var(--shadow-card)]">
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-[var(--cinema-card)] border-[var(--cinema-border)] text-lg py-6"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--muted-foreground)]" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <YearFilter value={selectedYear} onChange={onYearChange} />
          <TypeFilter value={selectedType} onChange={onTypeChange} />
          <SortFilter value={sortBy} onChange={onSortChange} />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="border-[var(--cinema-border)] hover:bg-[var(--cinema-card)]"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Sub-components for better organization
const YearFilter: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
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
);

const TypeFilter: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
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
);

const SortFilter: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <SortAsc className="w-4 h-4 text-[var(--muted-foreground)]" />
    <Select value={value} onValueChange={onChange}>
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
);

export default SearchFilters;

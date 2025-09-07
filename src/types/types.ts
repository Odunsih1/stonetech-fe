// Movie interface
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  Runtime?: string;
  imdbRating?: string;
  Rated?: string;
  Released?: string;
  Writer?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Response?: string;
  Error?: string;
}

// Search Results interface
export interface SearchResults {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

// User interface
export interface User {
  email: string | null;
  uid: string;
}

// Watchlist item interface
export interface WatchlistItem {
  imdbID: string;
  order: number;
  Response?: string;
  Error?: string;
}

// Redux state interface
export interface AuthState {
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
  watchlist: {
    movies: WatchlistItem[];
  };
}

// Movie interface
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Response?: string;
}

export interface AuthFormProps {
  email: string;
  password: string;
  confirmPassword?: string;
  loading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword?: (password: string) => void;
  onSignIn?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onSignUp?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
}

export interface MovieDetailPageProps {
  id: string;
}

export interface BackButtonProps {
  onClick: () => void;
}

export interface MoviePosterProps {
  poster: string;
  title: string;
}

export interface MovieInfoProps {
  movie: Movie; 
  user: User | null;
  isInWatchlist: boolean;
  onWatchlistToggle: () => void;
}

export interface MovieHeaderProps {
  title: string;
  year: string;
  type: string;
  rated?: string;
  runtime?: string;
}

export interface MovieDetailsProps {
  movie: Movie;
}
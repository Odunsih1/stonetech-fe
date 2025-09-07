import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY!; 

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
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.omdbapi.com/',
  }),
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResponse, { query: string; page?: number; year?: string; type?: string }>({
      query: ({ query, page = 1, year, type }) => {
        const params = new URLSearchParams({
          apikey: OMDB_API_KEY,
          s: query,
          page: page.toString(),
        });
        
        if (year) params.append('y', year);
        if (type) params.append('type', type);
        
        return `?${params.toString()}`;
      },
    }),
    getMovieDetails: builder.query<Movie, string>({
      query: (id) => `?apikey=${OMDB_API_KEY}&i=${id}&plot=full`,
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = movieApi;
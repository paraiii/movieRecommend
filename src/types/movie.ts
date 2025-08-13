// src/types/movie.ts
export interface Movie {
  id: number;
  title?: string;
  name?: string; // TV 用 name
  poster_path: string | null;
  vote_average: number;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: "movie" | "tv";
}

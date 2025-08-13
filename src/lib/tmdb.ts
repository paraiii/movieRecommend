// src/lib/tmdb.ts
import { Movie } from "@/src/types/movie";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1): Promise<Movie[]> {
  const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, page, language: "en-US" },
  });
  return data.results as Movie[];
}

export async function fetchTrendingMovies(page = 1): Promise<Movie[]> {
  const { data } = await axios.get(`${BASE_URL}/trending/all/week`, {
    params: { api_key: API_KEY, page },
  });
  return data.results as Movie[];
}

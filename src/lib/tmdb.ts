import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/all/week`, {
    params: { api_key: API_KEY },
  });
  console.log("Trending Movies:", res.data.results);
  return res.data.results;
};

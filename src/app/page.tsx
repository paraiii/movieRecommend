// app/page.tsx
import { fetchPopularMovies, fetchTrendingMovies } from "@/src/lib/tmdb";
import { MovieSection } from "./movie/MovieSection";

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: "movie" | "tv";
}
export default async function HomePage() {
  const trendingMovies = await fetchTrendingMovies();
  const popularMovies = await fetchPopularMovies();
  console.log("Trending Movies:", trendingMovies, popularMovies);

  return (
    // <main className="p-6 max-w-7xl mx-auto">
    //   <h1 className="text-3xl font-bold mb-6 text-white">
    //     🔥 Trending This Week
    //   </h1>
    //   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    //     {trendingMovies.map((movie: Movie) => (
    //       <MovieCard key={movie.id} movie={movie} />
    //     ))}
    //   </div>
    //   <h1 className="text-3xl font-bold mb-6 text-white">
    //     🔥 Popular This Week
    //   </h1>
    //   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    //     {popularMovies.map((movie: Movie) => (
    //       <MovieCard key={movie.id} movie={movie} />
    //     ))}
    //   </div>
    // </main>

    <main className="p-6 max-w-7xl mx-auto">
      <MovieSection
        variant="popular"
        title="🔥 Popular"
        accent="from-red-500 to-red-700"
      />
      <MovieSection
        variant="trending"
        title="📈 Trending This Week"
        accent="from-sky-500 to-blue-700"
      />
    </main>
  );
}

// app/page.tsx
import { MovieCard } from "@/src/components/MovieCard";
import { fetchTrendingMovies } from "@/src/lib/tmdb";

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
  const movies = await fetchTrendingMovies();
  console.log("Trending Movies:", movies);

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">
        🔥 Trending This Week
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

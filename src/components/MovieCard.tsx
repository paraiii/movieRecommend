import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    vote_average?: number;
  };
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie?.title || movie?.name || "Movie poster"}
        width={500}
        height={750}
      />
      <div>
        <span>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </span>
      </div>
    </Link>
  );
};

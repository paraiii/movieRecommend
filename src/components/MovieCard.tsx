import { Movie } from "@/src/types/movie";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

export function MovieCard({ movie }: { movie: Movie }) {
  const title = movie.title || movie.name || "Untitled";
  const date = movie.release_date || movie.first_air_date || "—";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-2x3.png";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className={clsx(
        "group relative rounded-xl bg-zinc-900 shadow-2xl",
        // 注意：放大的是“整张卡片”，因此需要更明确的层叠控制
        "transition-transform duration-300 hover:scale-105 hover:z-10"
      )}
    >
      {/* 海报区域（限制溢出） */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />

        {/* 渐变遮罩：放在最低层 */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 悬停信息面板：只在图片内滑入，层级低于标题 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300">{date}</span>
          </div>
          <p className="mt-2 text-xs text-zinc-200 line-clamp-3">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>

      {/* 标题常显：提升层级，确保永远在最上层 */}
      <div className="relative z-20 p-3">
        <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
          {title}
        </h3>
        <span className="text-yellow-400 font-semibold">
          ★ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </span>
      </div>
    </Link>
  );
}

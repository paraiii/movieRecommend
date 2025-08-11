// src/components/MovieSection.tsx
"use client";
import { MovieCard } from "@/src/components/MovieCard";
import { Movie } from "@/src/types/movie";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useSWR from "swr";

type Variant = "popular" | "trending";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function MovieSection({
  variant,
  title,
  accent = "from-red-500 to-red-700",
}: {
  variant: Variant;
  title: string;
  accent?: string; // 不同分区不同色
}) {
  const [page, setPage] = useState(1);

  // 用 Next API Route 代理（见下方 /app/api）
  const { data, isLoading } = useSWR<{ results: Movie[] }>(
    `/api/tmdb?variant=${variant}&page=${page}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const movies: Movie[] = data?.results ?? [];

  const next = () => setPage((p) => p + 1);
  const prev = () => setPage((p) => Math.max(1, p - 1));

  return (
    <section className="mb-10">
      {/* 标题 + 彩条 */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={clsx("h-6 w-1 rounded-full bg-gradient-to-b", accent)}
        />
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={prev}
            className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-sm disabled:opacity-40"
            disabled={page === 1 || isLoading}
          >
            ← Prev
          </button>
          <span className="text-zinc-300 text-sm">Page {page}</span>
          <button
            onClick={next}
            className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white text-sm disabled:opacity-40"
            disabled={isLoading}
          >
            Next →
          </button>
        </div>
      </div>

      {/* 网格 + 切页动画 */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page} // 关键点：用 page 作为 key 触发过渡
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[270px] rounded-xl bg-zinc-800 animate-pulse"
                  />
                ))
              : movies.map((m) => <MovieCard key={m.id} movie={m} />)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 页码指示器（点阵） */}
      <div className="mt-3 flex justify-center gap-2">
        {[page - 1, page, page + 1].map((p) =>
          p > 0 ? (
            <span
              key={p}
              className={clsx(
                "h-2 w-2 rounded-full",
                p === page ? "bg-white" : "bg-zinc-600"
              )}
            />
          ) : null
        )}
      </div>
    </section>
  );
}

// app/api/tmdb/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY =
  process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const variant = searchParams.get("variant"); // popular | trending
  const page = Number(searchParams.get("page") || "1");

  try {
    if (variant === "popular") {
      const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, page, language: "en-US" },
      });
      console.log("Popular Movies Data:", data);
      return NextResponse.json({ results: data.results });
    }

    if (variant === "trending") {
      const { data } = await axios.get(`${BASE_URL}/trending/all/week`, {
        params: { api_key: API_KEY, page },
      });
      return NextResponse.json({ results: data.results });
    }

    return NextResponse.json({ results: [] }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

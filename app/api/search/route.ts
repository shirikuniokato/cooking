import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  return NextResponse.json({ test: "test" });
}

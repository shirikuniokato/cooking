import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (id == null) {
    notFound();
  }
  return NextResponse.json(id);
}

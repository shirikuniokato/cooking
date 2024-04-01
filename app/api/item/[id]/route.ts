import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { COOK } from "@/app/lib/type";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (id == null) {
    notFound();
  }

  try {
    console.log("start");
    const result = await getCook(id);
    if (result) {
      return NextResponse.json(result);
    } else {
      notFound();
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getCook = async (id: number): Promise<COOK | undefined> => {
  const { rows } =
    await sql<COOK>`SELECT id, name, link, memo, is_cook, user_name, created_at, updated_at FROM cook WHERE id = ${id}`;

  if (rows[0]) {
    return rows[0];
  } else {
    return undefined;
  }
};

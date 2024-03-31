import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { COOK, REQUEST_TYPE } from "@/app/lib/type";

export async function POST(request: Request) {
  const body = await request.json();

  // 必須チェック
  if (!body.id || body.is_cook == null) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const result = await sql`UPDATE cook SET is_cook = ${
      body.is_cook
    } WHERE id = ${parseInt(body.id, 10)}`;
    console.log(result);
    return NextResponse.json({ message: "更新成功" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

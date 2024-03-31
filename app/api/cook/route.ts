import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { COOK, REQUEST_TYPE } from "@/app/lib/type";

export async function POST(request: Request) {
  const body = (await request.json()) as REQUEST_TYPE;

  // 必須チェック
  if (!body.name) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const result = await create(body);
    console.log(result);
    return NextResponse.json({ link: result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const create = async (body: REQUEST_TYPE): Promise<string> => {
  const { rows } =
    await sql<COOK>`INSERT INTO cook(name, link, memo, is_cook, user_name) VALUES (${body.name}, ${body.link}, ${body.memo}, false, ${body.user_name}) RETURNING id;`;
  if (rows[0]) {
    return `/item/${rows[0]["id"]}`;
  } else {
    throw new Error("登録失敗");
  }
};

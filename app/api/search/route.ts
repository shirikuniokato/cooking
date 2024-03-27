import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { COOK } from "@/app/lib/type";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  try {
    const result = await getLists(name, type);
    return NextResponse.json(createResultJson(result));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getLists = async (
  name: string | null,
  type: string | null
): Promise<COOK[]> => {
  if ((name == null || name == "") && (type == null || type == "")) {
    const { rows } =
      await sql<COOK>`SELECT * FROM cook ORDER BY created_at DESC;`;
    return rows;
  } else {
    const isQueryType = isType(type!);
    const queryName = `%${name}%`;
    const queryType = parseInt(type!, 10) === 1 ? true : false;
    if (isQueryType) {
      if (name) {
        const { rows } =
          await sql<COOK>`SELECT * FROM cook WHERE name LIKE ${queryName} AND is_cook = ${queryType} ORDER BY created_at DESC;`;
        return rows;
      } else {
        const { rows } =
          await sql<COOK>`SELECT * FROM cook WHERE is_cook = ${queryType} ORDER BY created_at DESC;`;
        return rows;
      }
    } else {
      const { rows } =
        await sql<COOK>`SELECT * FROM cook WHERE name LIKE ${queryName} ORDER BY created_at DESC;`;
      return rows;
    }
  }
};

const isType = (type: string): boolean => {
  const typeNumber: number = parseInt(type, 10);
  switch (typeNumber) {
    case 0:
      return false;
    case 1:
      return true;
    case 2:
      return true;
    default:
      return false;
  }
};

const createResultJson = (targets: COOK[]): any => {
  if (targets.length === 0) {
    return { doneList: [], doingList: [] };
  }
  let result = { doneList: [] as COOK[], doingList: [] as COOK[] };
  result.doneList = targets.filter((item) => item.is_cook);
  result.doingList = targets.filter((item) => !item.is_cook);
  return result;
};

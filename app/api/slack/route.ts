import { App } from "@slack/bolt";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const { appRunner } = require("./_app");

// Slackイベントのリスナーを登録
// app.command("/cook-add", async ({ command, ack, respond }) => {
//   await ack();
//   await respond("Hello world!");
// });

// app.message("hello", async ({ message, say }) => {
//   // イベントがトリガーされたチャンネルに say() でメッセージを送信します
//   await say(`Hello world!`);
// });

export async function POST(request: Request, response: Response) {
  // リクエストハンドラを使ってBoltアプリを起動
  try {
    await appRunner.handleEvents(request, response);
    // const json = await request.json();
    // await updateItem();
    // const result =
    //   await sql`SELECT item_id, item_type, content, order_id, user_id, false AS is_deleted FROM t_item t WHERE user_id = ORDER BY order_id ASC`;
  } catch (e: any) {
    return NextResponse.json({ status: "error", data: e.message });
  }
}

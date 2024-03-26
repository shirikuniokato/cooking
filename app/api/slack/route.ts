import { App, Receiver } from "@slack/bolt";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// Slackイベントのリスナーを登録
// app.command("/cook-add", async ({ command, ack, respond }) => {
//   await ack();
//   await respond("Hello world!");
// });

// app.message("hello", async ({ message, say }) => {
//   // イベントがトリガーされたチャンネルに say() でメッセージを送信します
//   await say(`Hello world!`);
// });

export async function POST(request: Request) {
  // リクエストハンドラを使ってBoltアプリを起動
  try {
    console.log(request);
    const json = await request.json();
    // await updateItem();
    // const result =
    //   await sql`SELECT item_id, item_type, content, order_id, user_id, false AS is_deleted FROM t_item t WHERE user_id = ORDER BY order_id ASC`;
    return NextResponse.json({
      status: "200",
      headers: {
        "Content-Type": "application/json",
      },
      result: "verify",
    });
  } catch (e: any) {
    return NextResponse.json({ status: "error", data: e.message });
  }
}

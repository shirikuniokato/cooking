import { headers } from "next/headers";
import { config } from "@/app/lib/config";
import Link from "next/link";
import Cooking from "./components/root/cooking";
import Request from "./components/root/request";

async function getData(host: string) {
  const res = await fetch(`${config.apiPrefix}${host}/api/search`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const host = headers().get("host");
  const data = await getData(host!);

  return (
    <>
      <section className="lead_sec c-anim-up move">
        <h3 className="">西岡の花婿修行</h3>
        <p>
          永野芽郁の「結婚するなら料理できる人が良い」
          <br />
          という発言から始まった <br />
          料理の腕を磨くための奮闘記！！
          <br />
          <span>#永野芽郁#西岡#結婚</span>
        </p>
      </section>
      <section id="ancr_news" className="news_sec">
        <div className="max-w-[899px] container2 c-anim-up move">
          <h3>NEWS</h3>
          <dl>
            <dt>2023.03.31</dt>
            <dd>料理のリクエスト機能追加</dd>
          </dl>
          <dl>
            <dt>2023.03.27</dt>
            <dd>当サイト公開 && Slack連携開始！</dd>
          </dl>
          <dl>
            <dt>2024.03.25</dt>
            <dd>フライパンセット購入！</dd>
          </dl>
        </div>
      </section>

      {/* 料理リクエスト */}
      <Request />

      {/* 料理 */}
      <Cooking cookList={data} />

      {/* コンタクト */}
      <section className="cont_sec c-anim-up move">
        <h4>【西岡について】</h4>
        <p>
          About Me:
          <Link className="tel min-w-[900px]" href="tel:0120-828-828">
            0120-828-828
          </Link>{" "}
          /{" "}
          <span>
            <Link
              className="link"
              href="https://www.nishioka-app.com/"
              target="_blank"
            >
              www.nishioka-app.com
            </Link>
          </span>
        </p>
      </section>
    </>
  );
}

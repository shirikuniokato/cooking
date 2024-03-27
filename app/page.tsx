import Image from "next/image";
import Link from "next/link";

// async function getData() {
//   const res = await fetch("/api/item/1");
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function Page() {
  // const data = await getData();
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
            <dt>2023.03.27</dt>
            <dd>当サイト公開 && Slack連携開始！</dd>
          </dl>
          <dl>
            <dt>2024.03.25</dt>
            <dd>フライパンセット購入！</dd>
          </dl>
        </div>
      </section>
      {/* 料理検索 */}
      <section className="atte_sec">
        <div className="container2 c-anim-up move sm:px-5">
          <h4>料理検索</h4>
          <ul className="custom:custom-ul-display">
            <li>
              <span>
                リクエストがあった料理一覧を表示するよ。※絶対に全部作ります。
              </span>
              <span>料理名のあいまい検索になります。</span>
              <span>
                検索条件を指定することで「作成済みの料理 or
                未作成の料理」のいずれかを絞り込むことができます。
              </span>
              {/* <form onSubmit={() =>{alert("test")}}> */}
              <div className="flex flex-col mt-8">
                <input type="text" placeholder="料理名" />
                <button>検索</button>
              </div>
              {/* </form> */}
            </li>
            <li>
              <figure className="mei02 c-anim-up delay1 move custom:custom-ul-figure">
                <img
                  src="/img_naganomei02.png"
                  alt="こんな永野芽郁、見たことない。"
                />
              </figure>
            </li>
          </ul>
        </div>
      </section>
      {/* 料理一覧 */}
      <section className="good_sec c-anim-up move">
        <h3>LIST</h3>
        <div className="inner custom2:custom-goods-inner-div">
          <div className="bg">
            <h4 className="custom2:custom-goods-inner">全ての料理</h4>
            <p className="p1">作成済み、未作成いずれも表示</p>

            <h5>作成済み</h5>

            <div className="fig1">
              <img src="/fig1.jpg" alt="販売商品" />
            </div>

            <h5>未作成</h5>

            <div className="fig1">
              <img src="/fig1.jpg" alt="販売商品" />
            </div>
          </div>
        </div>
      </section>
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

import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { config } from "@/app/lib/config";

type Props = {
  params: { id: number };
};

const formatYmd = (createDate: string): string => {
  const date = new Date(createDate);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

async function getData(host: string, id: number) {
  const res = await fetch(`${config.apiPrefix}${host}/api/item/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  const host = headers().get("host");
  const data = await getData(host!, id);

  return {
    title: `西岡 | 詳細 | ${data.name}`,
    description: "西岡が料理を極めて永野芽郁と結婚するまでの道のり",
  };
}

export default async function Page({ params: { id } }: Props) {
  const host = headers().get("host");
  const data = await getData(host!, id);
  return (
    <>
      <section id="ancr_ticket" className="tick_sec c-anim-up move mt-[100px]">
        <div className="container2 custom2:custom-goods-inner-div">
          <h3>DETAILS</h3>
          <p className="txt_price">{data.name}</p>
          <ul>
            <li>
              <dl>
                <dt>{data.is_cook ? "作成済み" : "未作成"}</dt>
                <dd className="soldout">
                  <p className="details">
                    ■登録日：{formatYmd(data.created_at)}
                  </p>
                  <p className="details">
                    ■参考サイト：
                    {data.link && isLink(data.link) ? (
                      <Link className="link" href={data.link}>
                        こちら
                      </Link>
                    ) : (
                      "無し"
                    )}
                  </p>
                  <p className="details">
                    ■メモ：{data.memo ? data.memo : "無し"}
                  </p>
                  <p className="details">
                    ■登録者：
                    {data.user_name ? data.user_name : "不明"}
                  </p>
                </dd>
              </dl>
            </li>
          </ul>

          <figure className="mei01 c-anim-up delay2 move">
            <img
              src="/img_naganomei01.png"
              alt="こんな永野芽郁、見たことない。"
            />
          </figure>
        </div>
      </section>
    </>
  );
}

const isLink = (link: string): boolean => {
  if (!link) return false;

  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

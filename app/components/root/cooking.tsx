"use client";
import Link from "next/link";
import { COOK } from "@/app/lib/type";
import { useState } from "react";

const getTypeText = (type: number): string => {
  switch (type) {
    case 0:
      return "全て";
    case 1:
      return "作成済みのみ表示";
    case 2:
      return "未作成のみ表示";
    default:
      return "全て";
  }
};

const getNameText = (name: string): string => {
  if (name == "") {
    return "全ての料理";
  } else {
    return name;
  }
};

const isShowType = (selectType: number, showType: number): boolean => {
  // 検索条件で全てを選択している場合
  if (selectType === 0) return true;

  // 表示領域と検索条件の作成状況が一致する場合
  return selectType === showType;
};

const NotFound = () => {
  return (
    <p className="p1">
      お探しの条件にマッチする料理は見つかりませんでした。
      <br />
      別のキーワードで再検索するか修行させたい料理を登録してみてください。
    </p>
  );
};

const formatYmd = (createDate: string): string => {
  const date = new Date(createDate);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const CookList = (param: { targetList: COOK[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center">
      {param.targetList.map((cook) => {
        return (
          <div
            key={cook.id}
            className="m-2 flex-basis[45%] sm:max-w-full lg:max-w-1/2"
          >
            <div className="card">
              <Link href={`/item/${cook.id}`} target="_blank">
                <p className="search_result_name">{cook.name}</p>
                <p className="search_result_date">
                  登録日：{formatYmd(cook.created_at.toString())}
                </p>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type COOKLIST = {
  doneList: COOK[];
  doingList: COOK[];
};
export default function Cooking(param: { cookList: COOKLIST }) {
  const [list, setList] = useState<COOKLIST>(param.cookList);
  const [searchName, setSearchName] = useState<string>("");
  const [searchType, setSearchType] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(parseInt(event.target.value));
  };

  const handleSearchButtonClick = async (): Promise<void> => {
    const res = await fetch(
      `/api/search?name=${searchName}&type=${searchType}`
    );

    if (!res.ok) {
      const data = await res.json();
      setList({ doneList: [], doingList: [] });
    }

    const data = await res.json();
    setList(data);
  };

  return (
    <>
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
              <div className="flex flex-col mt-8 gap-2">
                <input
                  type="text"
                  placeholder="料理名"
                  id="name"
                  name="name"
                  value={searchName}
                  onChange={handleInputChange}
                  className="px-2 text-black h-10 focus:outline-none bg-white/70"
                />

                <select
                  id="countries"
                  className="px-2 text-black h-10 focus:outline-none bg-white/70"
                  value={searchType}
                  onChange={handleRadioChange}
                >
                  <option value={0}>全て（作成状態を問わない）</option>
                  <option value={1}>作成済み</option>
                  <option value={2}>未作成</option>
                </select>

                <button
                  className="mt-4 py-2 bg-black text-white rounded-full"
                  onClick={handleSearchButtonClick}
                >
                  検索
                </button>
              </div>
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
            <h4 className="custom2:custom-goods-inner">
              {getNameText(searchName)}
            </h4>
            <p className="p1">{getTypeText(searchType)}</p>

            {isShowType(searchType, 1) ? (
              <>
                <h5>作成済み</h5>

                <div className="fig1">
                  {list.doneList.length === 0 ? (
                    <NotFound />
                  ) : (
                    <CookList targetList={list.doneList} />
                  )}
                </div>
              </>
            ) : (
              <></>
            )}

            {isShowType(searchType, 2) ? (
              <>
                <h5>未作成</h5>

                <div className="fig1">
                  {list.doingList.length === 0 ? (
                    <NotFound />
                  ) : (
                    <CookList targetList={list.doingList} />
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

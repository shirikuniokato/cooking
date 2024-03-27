"use client";
import { useState } from "react";
export default function Cooking(param: { cookList: any[] }) {
  const [list, setList] = useState<any[]>(param.cookList);
  const [searchName, setSearchName] = useState<string>("");
  const [searchType, setSearchType] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(parseInt(event.target.value));
  };

  const handleSearchButtonClick = async (): Promise<void> => {
    const res = await fetch(
      `/api/search?name=${searchName}&type=${searchType}`
    );
    console.log(res.body);
    if (!res.ok) {
      setList([]);
    } else {
      setList([]);
    }
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
              <div className="flex flex-col mt-8">
                <input
                  type="text"
                  placeholder="料理名"
                  id="name"
                  name="name"
                  value={searchName}
                  onChange={handleInputChange}
                />

                <button onClick={handleSearchButtonClick}>検索</button>
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
    </>
  );
}

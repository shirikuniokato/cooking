"use client";
import Link from "next/link";
import { COOK, REQUEST_TYPE } from "@/app/lib/type";
import { useState } from "react";
import { Alert } from "../alert";

type AlertRequest = {
  level: "info" | "error";
  message: string;
  link?: string;
};
export default function Request() {
  const [request, setRequest] = useState<REQUEST_TYPE>({});
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState<AlertRequest>({
    level: "info",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRequest({ ...request, [event.target.name]: event.target.value });
  };

  const handleRequestButtonClick = async (): Promise<void> => {
    const res = await fetch(`/api/cook`, {
      method: "POST",
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      setResult({ level: "error", message: "リクエストに失敗しました" });
      setShowAlert(true);
      return;
    }

    const data = await res.json();
    setResult({
      level: "info",
      message: "リクエストを送信しました",
      link: data.link,
    });
    setShowAlert(true);
  };

  return (
    <>
      {/* 料理リクエスト */}
      {showAlert && (
        <Alert
          alertParams={result}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}

      <section className="atte_sec cook-request">
        <div className="container2 c-anim-up move sm:px-5">
          <h4>リクエスト</h4>
          <ul className="custom:custom-ul-display">
            <li>
              <span>
                西岡に修行させたい料理があったらリクエストください※絶対に全部作ります。
              </span>
              <div className="flex flex-col mt-8 gap-2">
                <input
                  type="text"
                  placeholder="料理名"
                  id="name"
                  name="name"
                  value={request.name}
                  onChange={handleInputChange}
                  className="px-2 text-black h-10 focus:outline-none bg-white/70 rounded-none"
                />

                <input
                  type="text"
                  placeholder="リンク(備考)"
                  id="link"
                  name="link"
                  value={request.link}
                  onChange={handleInputChange}
                  className="px-2 text-black h-10 focus:outline-none bg-white/70 rounded-none"
                />

                <textarea
                  placeholder="メモ(任意)"
                  id="memo"
                  name="memo"
                  rows={3}
                  value={request.memo}
                  onChange={handleInputChange}
                  className="px-2 py-2 text-black focus:outline-none bg-white/70 rounded-none"
                />

                <input
                  type="text"
                  placeholder="登録者(任意)"
                  id="user_name"
                  name="user_name"
                  value={request.user_name}
                  onChange={handleInputChange}
                  className="px-2 text-black h-10 focus:outline-none bg-white/70 rounded-none"
                />

                <button
                  className="mt-4 py-2 bg-black text-white rounded-full"
                  onClick={handleRequestButtonClick}
                >
                  リクエスト
                </button>
              </div>
            </li>
            <li>
              <figure className="mei02 c-anim-up delay1 move custom:custom-ul-figure">
                <img
                  src="/img_naganomei01.png"
                  alt="こんな永野芽郁、見たことない。"
                />
              </figure>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

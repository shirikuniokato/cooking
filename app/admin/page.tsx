"use client";
import { useEffect, useState } from "react";
import { config } from "@/app/lib/config";
import Link from "next/link";
import { Alert } from "../components/alert";

async function getData() {
  const res = await fetch(`/api/search`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

type AlertRequest = {
  level: "info" | "error";
  message: string;
  link?: string;
};
export default function Page() {
  const [data, setData] = useState({ doingList: [], doneList: [] });
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState<AlertRequest>({
    level: "info",
    message: "",
  });
  useEffect(() => {
    (async () => {
      const result = await getData();
      setData(result);
    })();
  }, []);

  const handlerUpdateButton = async (id: string, is_cook: boolean) => {
    const body = { id, is_cook: !is_cook };
    const response = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      setResult({ level: "error", message: "更新失敗" });
      setShowAlert(true);
      return;
    }

    setResult({ level: "info", message: "更新成功" });
    setShowAlert(true);
  };

  return (
    <>
      {/* コンタクト */}
      {showAlert && (
        <Alert
          alertParams={result}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
      )}
      <section className="cont_sec c-anim-up move">
        <h3 className="mb-10 text-3xl">未作成料理</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                料理名
              </th>
              <th scope="col" className="px-6 py-3">
                リンク
              </th>
              <th scope="col" className="px-6 py-3">
                作成日
              </th>
              <th scope="col" className="px-6 py-3">
                更新
              </th>
            </tr>
          </thead>
          <tbody>
            {data.doingList.map((item: any) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 truncate">{item.name}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {item.link ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        className="font-medium text-blue-600 dark:text-blue-500 underline hover:no-underline"
                      >
                        ★
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">{getYmd(item.created_at)}</td>
                  <td className="px-6 py-4">
                    <span
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={() => {
                        handlerUpdateButton(item.id, item.is_cook);
                      }}
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="cont_sec c-anim-up move">
        <h3 className="mb-10 text-3xl">作成済料理</h3>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                料理名
              </th>
              <th scope="col" className="px-6 py-3">
                リンク
              </th>
              <th scope="col" className="px-6 py-3">
                作成日
              </th>
              <th scope="col" className="px-6 py-3">
                更新
              </th>
            </tr>
          </thead>
          <tbody>
            {data.doneList.map((item: any) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4 truncate">{item.name}</td>
                  <td className="px-6 py-4">
                    {" "}
                    {item.link ? (
                      <Link
                        href={item.link}
                        target="_blank"
                        className="font-medium text-blue-600 dark:text-blue-500 underline hover:no-underline"
                      >
                        ★
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4">{getYmd(item.created_at)}</td>
                  <td className="px-6 py-4">
                    <span
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                      onClick={() => {
                        handlerUpdateButton(item.id, item.is_cook);
                      }}
                    >
                      Edit
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

const getYmd = (createData: string): string => {
  const date = new Date(createData);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

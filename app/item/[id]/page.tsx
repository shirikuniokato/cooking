import Image from "next/image";
import { headers } from "next/headers";
import { config } from "@/app/lib/config";

async function getData(host: string, id: number) {
  const res = await fetch(`${config.apiPrefix}${host}/api/item/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  const host = headers().get("host");
  const data = await getData(host!, id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      test {id}
    </main>
  );
}

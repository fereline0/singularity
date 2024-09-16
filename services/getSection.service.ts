import { notFound } from "next/navigation";

import { serverFetcher } from "@/utils/fetcher";

export default async (id: string) => {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/sections/${id}`,
  );

  if (!res.ok) notFound();

  return res.json();
};

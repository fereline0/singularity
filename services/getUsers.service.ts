import { notFound } from "next/navigation";

import { serverFetcher } from "@/utils/fetcher";

export default async (
  page: number,
  limit: number,
  query: string,
  order: string,
) => {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=${limit}${
      query ? `&query=${query}` : ""
    }${order ? `&order=${order}` : ""}`,
  );

  if (!res.ok) notFound();

  return res.json();
};

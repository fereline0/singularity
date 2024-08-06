import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export default async (
  id: string,
  page: number,
  limit: number,
  query: string,
  order: string
) => {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${id}?page=${page}&limit=${limit}${
      query ? `&query=${query}` : ""
    }${order ? `&order=${order}` : ""}`
  );

  if (!res.ok) notFound();

  return res.json();
};

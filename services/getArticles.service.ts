import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export default async (page: number, limit: number) => {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
};

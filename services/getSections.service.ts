import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export default async () => {
  const res = await serverFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api`);

  if (!res.ok) notFound();

  return res.json();
};

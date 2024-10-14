import { notFound } from "next/navigation";

import { serverFetcher } from "@/utils/fetcher";

export default async () => {
  const res = await serverFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api`);

  if (!res.ok) notFound();

  return res.json();
};

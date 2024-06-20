import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export async function getUser(id: string) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function deleteUser(id: string) {
  await serverFetcher(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
    method: "DELETE",
  });
}

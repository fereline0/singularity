import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export async function getUserSubscribers(
  id: string,
  page: number,
  limit: number,
  query: string
) {
  const res = await serverFetcher(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/users/${id}/subscribers?page=${page}&limit=${limit}${
      query ? `&q=${query}` : ""
    }`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function getUserSubscribed(
  id: string,
  page: number,
  limit: number,
  query: string
) {
  const res = await serverFetcher(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/users/${id}/subscribed?page=${page}&limit=${limit}${
      query ? `&q=${query}` : ""
    }`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function subscribe(userId: string, subscriberId: string) {
  const formData = new FormData();

  formData.append("subscriberId", subscriberId);

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/subscribed`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function unSubscribe(userId: string, subscriberId: string) {
  const formData = new FormData();

  formData.append("subscriberId", subscriberId);

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/subscribed`,
    {
      method: "DELETE",
      body: formData,
    }
  );
}

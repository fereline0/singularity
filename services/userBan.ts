import { serverFetcher } from "@/utils/fetcher";
import { notFound } from "next/navigation";

export async function getUserBans(id: number, page: number, limit: number) {
  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans?page=${page}&limit=${limit}`
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function userBan(
  id: number,
  reason: string,
  expires: string,
  initiatorId: number
) {
  const formData = new FormData();

  formData.append("reason", reason);
  formData.append("expires", expires);
  formData.append("initiatorId", initiatorId.toString());

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`,
    {
      method: "POST",
      body: formData,
    }
  );
}

export async function deleteUserBans(id: number) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`,
    {
      method: "DELETE",
    }
  );
}

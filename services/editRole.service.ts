import { serverFetcher } from "@/utils/fetcher";

export default async (id: number, name: string) => {
  const formData = new FormData();

  formData.append("name", name);

  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/roles`,
    {
      method: "POST",
      body: formData,
    }
  );
};

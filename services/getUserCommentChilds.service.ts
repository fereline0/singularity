import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";
import { IUserComment } from "@/types/userComment";

export default (id: string | null, page: number, limit: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}?page=${page}&limit=${limit}`;

  const { data, mutate } = useSWR<IUserComment>(id ? url : null, clientFetcher);

  return {
    data,
    mutate,
  };
};

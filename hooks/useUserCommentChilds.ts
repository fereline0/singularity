import useSWR from "swr";

import { IUserComment } from "@/interfaces/userComment.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string | undefined, page: number, limit: number) => {
  const { data, mutate } = useSWR<IUserComment>(
    id
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}?page=${page}&limit=${limit}`
      : null,
    clientFetcher,
  );

  return {
    data,
    mutate,
  };
};

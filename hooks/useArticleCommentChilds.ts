import useSWR from "swr";

import { IArticleComment } from "@/interfaces/articleComment.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string | undefined, page: number, limit: number) => {
  const { data, mutate } = useSWR<IArticleComment>(
    id
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}?page=${page}&limit=${limit}`
      : null,
    clientFetcher,
  );

  return {
    data,
    mutate,
  };
};

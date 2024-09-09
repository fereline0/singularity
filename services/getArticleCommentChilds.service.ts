import { IArticleComment } from "@/interfaces/articleComment.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default (id: string | undefined, page: number, limit: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}?page=${page}&limit=${limit}`;

  const { data, mutate } = useSWR<IArticleComment>(
    id ? url : null,
    clientFetcher
  );

  return {
    data,
    mutate,
  };
};

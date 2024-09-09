import IArticleCommentLiker from "@/interfaces/articleCommentLiker.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default (id: string, likerId?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}/like?likerId=${likerId}`;

  const { data, mutate } = useSWR<[IArticleCommentLiker, number]>(
    url,
    clientFetcher
  );

  return {
    data,
    mutate,
  };
};

import useSWR from "swr";

import IArticleLiker from "@/interfaces/articleLiker.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string, likerId: string | undefined) => {
  const { data, mutate } = useSWR<[IArticleLiker, number]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}/like?likerId=${likerId}`,
    clientFetcher,
  );

  return {
    data,
    mutate,
  };
};

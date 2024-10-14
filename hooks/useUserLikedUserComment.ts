import useSWR from "swr";

import IUserCommentLiker from "@/interfaces/userCommentLiker.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string, likerId: string | undefined) => {
  const { data, mutate } = useSWR<[IUserCommentLiker, number]>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like?likerId=${likerId}`,
    clientFetcher,
  );

  return {
    data,
    mutate,
  };
};

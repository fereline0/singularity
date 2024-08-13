import { IUserComment } from "@/interfaces/userComment.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default (id: string, userId?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like?userId=${userId}`;

  const { data, mutate } = useSWR<[IUserComment, IUserComment]>(
    userId ? url : null,
    clientFetcher
  );

  return {
    data,
    mutate,
  };
};

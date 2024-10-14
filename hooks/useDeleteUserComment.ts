import useSWRMutation from "swr/mutation";

import { IUserComment } from "@/interfaces/userComment.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const { trigger, isMutating } = useSWRMutation<IUserComment>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`,
    (url: string) =>
      clientFetcher(url, {
        method: "DELETE",
      }),
  );

  return {
    trigger,
    isMutating,
  };
};

import useSWRMutation from "swr/mutation";

import { IUserComment } from "@/interfaces/userComment.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}`;

  const { trigger, isMutating } = useSWRMutation<IUserComment>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    }),
  );

  return {
    trigger,
    isMutating,
  };
};

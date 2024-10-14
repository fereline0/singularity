import useSWRMutation from "swr/mutation";

import IUserCommentLiker from "@/interfaces/userCommentLiker.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string, likerId: string | undefined) => {
  const formData = new FormData();

  likerId && formData.append("likerId", likerId);

  const { trigger, isMutating } = useSWRMutation<IUserCommentLiker>(
    likerId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like`
      : null,
    (url: string) => clientFetcher(url, { method: "DELETE", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

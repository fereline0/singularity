import useSWRMutation from "swr/mutation";

import IArticleCommentLiker from "@/interfaces/articleCommentLiker.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string, likerId: string | undefined) => {
  const formData = new FormData();

  likerId && formData.append("likerId", likerId);

  const { trigger, isMutating } = useSWRMutation<IArticleCommentLiker>(
    likerId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}/like`
      : null,
    (url: string) => clientFetcher(url, { method: "POST", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

import useSWRMutation from "swr/mutation";

import { IArticleComment } from "@/interfaces/articleComment.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string | undefined, value: string, published: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/comments/${id}`;

  const formData = new FormData();

  formData.append("value", value.toString());
  formData.append("published", published.toString());

  const { trigger, isMutating } = useSWRMutation<IArticleComment>(
    id ? url : null,
    () => clientFetcher(url, { method: "PUT", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

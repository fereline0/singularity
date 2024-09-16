import useSWRMutation from "swr/mutation";

import IArticle from "@/interfaces/article.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}`;

  const { trigger, isMutating } = useSWRMutation<IArticle>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    }),
  );

  return {
    trigger,
    isMutating,
  };
};

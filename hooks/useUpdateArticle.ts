import useSWRMutation from "swr/mutation";

import { clientFetcher } from "@/utils/fetcher";
import IArticle from "@/interfaces/article.interface";

export default (
  id: string | undefined,
  title: string,
  value: string,
  published: boolean,
) => {
  const formData = new FormData();

  formData.append("title", title.toString());
  formData.append("value", value.toString());
  formData.append("published", published.toString());

  const { trigger, isMutating } = useSWRMutation<IArticle>(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}` : null,
    (url: string) => clientFetcher(url, { method: "PUT", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

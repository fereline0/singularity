import useSWRMutation from "swr/mutation";

import IArticle from "@/interfaces/article.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (
  title: string,
  value: string,
  writerId: string | undefined,
  sectionId: string,
  published: boolean,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles`;

  const formData = new FormData();

  formData.append("title", title);
  formData.append("value", value);
  writerId && formData.append("writerId", writerId);
  formData.append("sectionId", sectionId);
  formData.append("published", published.toString());

  const { trigger, isMutating } = useSWRMutation<IArticle>(
    writerId ? url : null,
    () => clientFetcher(url, { method: "POST", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

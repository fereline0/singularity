import useSWRMutation from "swr/mutation";

import IArticleLiker from "@/interfaces/articleLiker.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string, likerId: string | undefined) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${id}/like`;

  const formData = new FormData();

  likerId && formData.append("likerId", likerId);

  const { trigger, isMutating } = useSWRMutation<IArticleLiker>(
    likerId ? url : null,
    () => clientFetcher(url, { method: "DELETE", body: formData }),
  );

  return {
    trigger,
    isMutating,
  };
};

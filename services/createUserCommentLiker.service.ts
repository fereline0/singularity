import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string, likerId: string | undefined) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like`;

  const formData = new FormData();

  likerId && formData.append("likerId", likerId);

  const { trigger, isMutating } = useSWRMutation<boolean>(
    likerId ? url : null,
    () => clientFetcher(url, { method: "POST", body: formData })
  );

  return {
    trigger,
    isMutating,
  };
};

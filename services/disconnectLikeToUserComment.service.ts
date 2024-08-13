import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string, userId: string | undefined) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like`;

  const formData = new FormData();

  userId && formData.append("userId", userId);

  const { trigger, isMutating } = useSWRMutation<boolean>(
    userId ? url : null,
    () => clientFetcher(url, { method: "DELETE", body: formData })
  );

  return {
    trigger,
    isMutating,
  };
};

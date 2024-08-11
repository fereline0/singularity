import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string, userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}/like`;

  const formData = new FormData();

  formData.append("userId", userId);

  const { trigger, isMutating } = useSWRMutation<boolean>(url, () =>
    clientFetcher(url, { method: "DELETE", body: formData })
  );

  return {
    trigger,
    isMutating,
  };
};

import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";
import { IUserComment } from "@/types/userComment";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`;

  const { trigger, isMutating } = useSWRMutation<IUserComment>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    })
  );

  return {
    trigger,
    isMutating,
  };
};

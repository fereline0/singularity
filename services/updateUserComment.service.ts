import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";
import { IUserComment } from "@/types/userComment";

export default (value: string, id?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`;

  const formData = new FormData();

  formData.append("value", value.toString());

  const { trigger, isMutating } = useSWRMutation<IUserComment>(url, () =>
    clientFetcher(url, { method: "PUT", body: formData })
  );

  return {
    trigger,
    isMutating,
  };
};

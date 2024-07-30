import { IUserComment } from "@/interfaces/userComment.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (
  id: string,
  value: string,
  writerId?: string,
  parentId?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments`;

  const formData = new FormData();

  formData.append("userId", id.toString());
  writerId && formData.append("writerId", writerId);
  formData.append("value", value.toString());
  parentId && formData.append("parentId", parentId.toString());

  const { trigger, isMutating } = useSWRMutation<IUserComment>(url, () =>
    clientFetcher(url, { method: "POST", body: formData })
  );

  return {
    trigger,
    isMutating,
  };
};

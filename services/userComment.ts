import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { IUserComment } from "@/types/userComment";

export function getUserCommentChilds(
  id: string | null,
  page: number,
  limit: number
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}?page=${page}&limit=${limit}`;

  const { data, mutate } = useSWR<IUserComment>(id ? url : null, clientFetcher);

  return {
    data,
    mutate,
  };
}

export function updateUserComment(value: string, id?: string) {
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
}

export function createUserComment(
  id: string,
  value: string,
  writerId?: string,
  parentId?: string
) {
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
}

export function deleteUserComment(id: string) {
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
}

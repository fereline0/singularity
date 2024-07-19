import commentRequest from "@/requests/comment.request";
import toast from "react-hot-toast";
import { clientFetcher, serverFetcher } from "@/utils/fetcher";
import useSWR from "swr";
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

export async function updateUserComment(id: string, value: string) {
  const formData = new FormData();

  formData.append("value", value.toString());

  const validationRes = commentRequest.safeParse(Object.fromEntries(formData));

  if (!validationRes.success) {
    validationRes.error.issues.forEach((error) => {
      toast.error(error.message);
    });

    return;
  }

  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`,
    { method: "PUT", body: formData }
  );

  return res;
}

export async function createUserComment(
  id: string,
  writerId: string,
  value: string,
  parentId?: string
) {
  const formData = new FormData();

  formData.append("userId", id.toString());
  formData.append("writerId", writerId.toString());
  formData.append("value", value.toString());
  parentId && formData.append("parentId", parentId.toString());

  const validationRes = commentRequest.safeParse(Object.fromEntries(formData));

  if (!validationRes.success) {
    validationRes.error.issues.forEach((error) => {
      toast.error(error.message);
    });

    return;
  }

  const res = await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments`,
    { method: "POST", body: formData }
  );

  return res;
}

export async function deleteUserComment(id: string) {
  await serverFetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/comments/${id}`,
    {
      method: "DELETE",
    }
  );
}

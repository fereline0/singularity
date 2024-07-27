import IUserBan from "@/types/userBan.type";
import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (
  id: string,
  reason: string,
  expires: string,
  initiatorId?: string
) => {
  const formData = new FormData();

  formData.append("reason", reason);
  formData.append("expires", expires);
  initiatorId && formData.append("initiatorId", initiatorId.toString());

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`;

  const { trigger, isMutating } = useSWRMutation<IUserBan>(url, () =>
    clientFetcher(url, {
      method: "POST",
      body: formData,
    })
  );

  return {
    trigger,
    isMutating,
  };
};

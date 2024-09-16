import useSWRMutation from "swr/mutation";

import IUserBan from "@/interfaces/userBan.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (
  id: string,
  reason: string,
  expires: string,
  initiatorId: string,
) => {
  const formData = new FormData();

  formData.append("reason", reason);
  formData.append("expires", expires);
  formData.append("initiatorId", initiatorId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`;

  const { trigger, isMutating } = useSWRMutation<IUserBan>(url, () =>
    clientFetcher(url, {
      method: "POST",
      body: formData,
    }),
  );

  return {
    trigger,
    isMutating,
  };
};

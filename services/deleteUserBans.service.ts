import useSWRMutation from "swr/mutation";

import IUserBan from "@/interfaces/userBan.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`;

  const { trigger, isMutating } = useSWRMutation<IUserBan>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    }),
  );

  return {
    trigger,
    isMutating,
  };
};

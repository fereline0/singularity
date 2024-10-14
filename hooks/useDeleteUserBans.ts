import useSWRMutation from "swr/mutation";

import IUserBan from "@/interfaces/userBan.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const { trigger, isMutating } = useSWRMutation<IUserBan>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`,
    (url: string) =>
      clientFetcher(url, {
        method: "DELETE",
      }),
  );

  return {
    trigger,
    isMutating,
  };
};

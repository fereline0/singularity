import IUserBan from "@/types/userBan.type";
import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/bans`;

  const { trigger, isMutating } = useSWRMutation<IUserBan>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    })
  );

  return {
    trigger,
    isMutating,
  };
};

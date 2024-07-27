import IUser from "@/types/user.type";
import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`;

  const { trigger, isMutating } = useSWRMutation<IUser>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    })
  );

  return {
    trigger,
    isMutating,
  };
};

import useSWRMutation from "swr/mutation";

import IUser from "@/interfaces/user.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`;

  const { trigger, isMutating } = useSWRMutation<IUser>(url, () =>
    clientFetcher(url, {
      method: "DELETE",
    }),
  );

  return {
    trigger,
    isMutating,
  };
};

import useSWRMutation from "swr/mutation";

import IUser from "@/interfaces/user.interface";
import { clientFetcher } from "@/utils/fetcher";

export default (id: string) => {
  const { trigger, isMutating } = useSWRMutation<IUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
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

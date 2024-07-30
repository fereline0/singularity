import IUserRole from "@/interfaces/userRole.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: string, roleId?: string) => {
  const formData = new FormData();

  roleId && formData.append("roleId", roleId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}/roles`;

  const { trigger, isMutating } = useSWRMutation<IUserRole>(url, () =>
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

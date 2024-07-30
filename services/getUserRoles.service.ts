import IUserRole from "@/interfaces/userRole.interface";
import { clientFetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/roles/${id}`;

  const { data } = useSWR<IUserRole[]>(url, clientFetcher);

  return {
    data,
  };
};

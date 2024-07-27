import useSWR from "swr";
import { clientFetcher } from "@/utils/fetcher";
import IRole from "@/types/userRole.type";

export default (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/users/roles/${id}`;

  const { data, error, isLoading } = useSWR<IRole[]>(
    id ? url : null,
    clientFetcher
  );

  return {
    data,
    isLoading,
    error,
    url,
  };
};

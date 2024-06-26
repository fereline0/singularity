import User from "@/components/screens/User/page";
import { getUser } from "@/services/user";
import IUser from "@/types/user.type";

export const revalidate = 0;

export default async function user({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: number };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const user: IUser = await getUser(params.id, page, limit);

  return <User user={user} total={user._count.comments} limit={limit} />;
}

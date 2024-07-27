import User from "@/components/screens/User/page";
import getUserService from "@/services/getUser.service";
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
  const user: IUser = await getUserService(params.id, page, limit);

  return <User user={user} total={user._count.comments} limit={limit} />;
}

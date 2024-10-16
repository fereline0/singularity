import User from "@/components/screens/User/page";
import IUser from "@/interfaces/user.interface";
import userService from "@/services/user.service";

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
  const user: IUser = await userService(params.id, page, limit);

  return <User limit={limit} total={user._count.comments} user={user} />;
}

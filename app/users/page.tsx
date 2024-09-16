import Users from "@/components/screens/Users/page";
import IUser from "@/interfaces/user.interface";
import getUsersService from "@/services/getUsers.service";

export const revalidate = 0;

export default async function users({
  searchParams,
}: {
  searchParams: { page: number; query: string; order: string };
}) {
  const page = searchParams.page || 1;
  const limit = 20;
  const users: [IUser[], IUser[], number] = await getUsersService(
    page,
    limit,
    searchParams.query,
    searchParams.order,
  );

  return (
    <Users
      limit={limit}
      newUsers={users[1]}
      total={users[2]}
      users={users[0]}
      usersCount={users[2]}
    />
  );
}

import User from "@/components/screens/User/page";
import { getUser } from "@/services/user";
import IUser from "@/types/user.type";

export default async function user({ params }: { params: { id: string } }) {
  const user: IUser = await getUser(params.id);

  return <User user={user} />;
}

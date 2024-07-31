import Marginer from "@/components/shared/Marginer/page";
import Ban from "./Ban/page";
import Delete from "./Delete/page";
import IUser from "@/interfaces/user.interface";

interface IActions {
  user: IUser;
}

export default function Actions(props: IActions) {
  return (
    <Marginer y={8}>
      <Ban user={props.user} />
      <Delete user={props.user} />
    </Marginer>
  );
}

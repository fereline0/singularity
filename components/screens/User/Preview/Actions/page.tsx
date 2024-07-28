"use client";

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/types/user.type";
import Ban from "./Ban/page";
import Delete from "./Delete/page";

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

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import Ban from "./Ban/page";
import Delete from "./Delete/page";

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/interfaces/user.interface";
import { auth } from "@/auth";
import userCan, { roleBenefits } from "@/policies/user.policy";

interface IPreview {
  user: IUser;
}

export default async function Preview(props: IPreview) {
  const session = await auth();

  return (
    <Card>
      <CardBody className="text-center">
        <Marginer y={8}>
          <div className="flex justify-center">
            <Image
              isBlurred
              src={props.user.image ?? "/no-avatar.jpg"}
              width={240}
            />
          </div>
          <span className="font-semibold">{props.user.role.name}</span>
          {userCan(session?.user.role.abilities, "banUser") &&
            roleBenefits(
              session?.user.role.position,
              props.user.role.position,
            ) && <Ban authedUserId={session?.user.id} user={props.user} />}
          {userCan(session?.user.role.abilities, "deleteUser") &&
            roleBenefits(
              session?.user.role.position,
              props.user.role.position,
            ) && <Delete user={props.user} />}
        </Marginer>
      </CardBody>
    </Card>
  );
}

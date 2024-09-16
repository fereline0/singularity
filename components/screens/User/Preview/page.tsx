"use client";

import { Card, CardBody, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import Actions from "./Actions/page";

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/interfaces/user.interface";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  const session = useSession();

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
          {session.status == "authenticated" && (
            <Actions authedUserId={session.data.user.id} user={props.user} />
          )}
        </Marginer>
      </CardBody>
    </Card>
  );
}

import { Card, CardBody, Image } from "@nextui-org/react";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "./Actions/page";
import IUser from "@/interfaces/user.interface";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <Card>
      <CardBody className="text-center">
        <Marginer y={8}>
          <div className="flex justify-center">
            <Image
              isBlurred
              width={240}
              src={props.user.image ?? "/no-avatar.jpg"}
            />
          </div>
          <span className="font-semibold">{props.user.role.name}</span>
          <Actions user={props.user} />
        </Marginer>
      </CardBody>
    </Card>
  );
}

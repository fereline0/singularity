import IUser from "@/types/user.type";
import { Card, CardBody, Image } from "@nextui-org/react";
import Subscribers from "./Subscribers/page";
import Subscribed from "./Subscribed/page";
import Marginer from "@/components/shared/Marginer/page";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <Marginer y={8}>
      <Card shadow="none">
        <CardBody className="text-center">
          <Marginer y={8}>
            <div className="flex justify-center">
              <Image
                width={240}
                isBlurred
                src={props.user.image ?? "/no-avatar.jpg"}
              />
            </div>
            <div
              className={`w-full py-1 px-2 rounded-md`}
              style={{
                backgroundColor: props.user.role.color,
              }}
            >
              <span>{props.user.role.name}</span>
            </div>
          </Marginer>
        </CardBody>
      </Card>
      {props.user.subscribers.length > 0 && <Subscribers user={props.user} />}
      {props.user.subscribed.length > 0 && <Subscribed user={props.user} />}
    </Marginer>
  );
}

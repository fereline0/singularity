import IUser from "@/types/user.type";
import { Card, CardBody, Image, Spacer } from "@nextui-org/react";
import Subscribers from "./Subscribers/page";
import Subscribed from "./Subscribed/page";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <div>
      <Card shadow="none">
        <CardBody className="text-center">
          <div className="flex justify-center">
            <Image
              width={240}
              isBlurred
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            />
          </div>
          <Spacer y={2} />
          <div
            className={`w-full py-1 px-2 rounded-md`}
            style={{
              backgroundColor: props.user.role.color,
            }}
          >
            <span>{props.user.role.name}</span>
          </div>
        </CardBody>
      </Card>
      <Spacer y={2} />
      {props.user.subscribers.length > 0 && <Subscribers user={props.user} />}
      <Spacer y={2} />
      {props.user.subscribed.length > 0 && <Subscribed user={props.user} />}
    </div>
  );
}

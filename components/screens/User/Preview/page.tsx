import IUser from "@/types/user.type";
import { Card, CardBody, Image } from "@nextui-org/react";
import Subscribers from "./Subscribers/page";
import Subscribed from "./Subscribed/page";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
    <div className="mb-2">
      <Card shadow="none" className="mb-2">
        <CardBody className="text-center">
          <div className="mb-2">
            <Image
              width={240}
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
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
        </CardBody>
      </Card>
      {props.user.subscribers.length > 0 && <Subscribers user={props.user} />}
      {props.user.subscribed.length > 0 && <Subscribed user={props.user} />}
    </div>
  );
}

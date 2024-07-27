import IUser from "@/types/user.type";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import Subscribers from "./Subscribers/page";
import Subscribed from "./Subscribed/page";
import Marginer from "@/components/shared/Marginer/page";
import Actions from "./Actions/page";

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
            <Button
              style={{
                background: props.user.role.color,
              }}
              fullWidth
            >
              {props.user.role.name}
            </Button>
            <Actions user={props.user} />
          </Marginer>
        </CardBody>
      </Card>
      {props.user.subscribers.length > 0 && <Subscribers user={props.user} />}
      {props.user.subscribed.length > 0 && <Subscribed user={props.user} />}
    </Marginer>
  );
}

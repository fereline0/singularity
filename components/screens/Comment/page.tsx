import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/interfaces/user.interface";

interface IComment {
  writer: IUser;
  description: React.ReactNode;
  value: React.ReactNode;
  actions?: React.ReactNode;
  replys?: React.ReactNode;
}

export default function Comment(props: IComment) {
  return (
    <Marginer y={8}>
      <Card>
        <CardHeader className="flex justify-between">
          <User
            avatarProps={{ src: props.writer.image ?? "/no-avatar.jpg" }}
            description={props.description}
            name={
              <Link href={`/users/${props.writer.id}`}>
                {props.writer.name}
              </Link>
            }
          />
          {props.actions}
        </CardHeader>
        <CardBody>{props.value}</CardBody>
      </Card>
      {props.replys}
    </Marginer>
  );
}

import Marginer from "@/components/shared/Marginer/page";
import IUser from "@/interfaces/user.interface";
import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";

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
            name={
              <Link href={`/users/${props.writer.id}`}>
                {props.writer.name}
              </Link>
            }
            description={props.description}
            avatarProps={{ src: props.writer.image ?? "/no-avatar.jpg" }}
          />
          {props.actions}
        </CardHeader>
        <CardBody>{props.value}</CardBody>
      </Card>
      {props.replys}
    </Marginer>
  );
}

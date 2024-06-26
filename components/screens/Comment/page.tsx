import IUser from "@/types/user.type";
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
    <div className="mb-2">
      <Card shadow="none" className="mb-2">
        <CardHeader className="flex justify-between">
          <User
            name={
              <Link href={`/users/${props.writer.id}`}>
                {props.writer.name}
              </Link>
            }
            description={props.description}
            avatarProps={{ src: props.writer.image }}
          />
          {props.actions}
        </CardHeader>
        <CardBody>{props.value}</CardBody>
      </Card>
      {props.replys}
    </div>
  );
}

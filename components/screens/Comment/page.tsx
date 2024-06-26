import IUser from "@/types/user.type";
import {
  Card,
  CardBody,
  CardHeader,
  Link,
  Spacer,
  User,
} from "@nextui-org/react";

interface IComment {
  writer: IUser;
  description: React.ReactNode;
  value: React.ReactNode;
  actions?: React.ReactNode;
  replys?: React.ReactNode;
}

export default function Comment(props: IComment) {
  return (
    <>
      <Card shadow="none">
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
      {props.replys && (
        <>
          <Spacer y={2} />
          {props.replys}
        </>
      )}
    </>
  );
}

import IUser from "@/types/user.type";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  User,
} from "@nextui-org/react";

interface ISubscribers {
  user: IUser;
}

export default function Subscribers(props: ISubscribers) {
  return (
    <Card shadow="none" className="w-full">
      <CardHeader>
        <div className="flex w-full justify-between">
          <Link href={`/users/${props.user.id}/subscribers`}>Subscribers</Link>
          <span>{props.user._count.subscribers}</span>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {props.user.subscribers.map((data: { subscriber: IUser }) => (
          <User
            className="items-start justify-normal"
            key={data.subscriber.id}
            name={
              <Link href={`/users/${data.subscriber.id}`}>
                {data.subscriber.name}
              </Link>
            }
            description={data.subscriber.role.name}
            avatarProps={{
              src: data.subscriber.image ?? "/no-avatar.jpg",
            }}
          />
        ))}
      </CardBody>
    </Card>
  );
}

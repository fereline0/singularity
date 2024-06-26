import IUser from "@/types/user.type";
import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";

interface ISubscribers {
  user: IUser;
}

export default function Subscribers(props: ISubscribers) {
  return (
    <Card shadow="none" className="mb-2 w-full">
      <CardHeader>
        <Link href={`/users/${props.user.id}/subscribers`}>Subscribers</Link>
      </CardHeader>
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
              src: data.subscriber.image,
            }}
          />
        ))}
      </CardBody>
    </Card>
  );
}

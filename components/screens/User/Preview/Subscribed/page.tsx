import IUser from "@/types/user.type";
import { Card, CardBody, CardHeader, Link, User } from "@nextui-org/react";

interface ISubscribed {
  user: IUser;
}

export default function Subscribed(props: ISubscribed) {
  return (
    <Card shadow="none">
      <CardHeader>
        <Link href={`/users/${props.user.id}/subscribers`}>Subscribed</Link>
      </CardHeader>
      <CardBody>
        {props.user.subscribed.map((data: { user: IUser }) => (
          <User
            className="items-start justify-normal"
            key={data.user.id}
            name={<Link href={`/users/${data.user.id}`}>{data.user.name}</Link>}
            description={data.user.role.name}
            avatarProps={{
              src: data.user.image,
            }}
          />
        ))}
      </CardBody>
    </Card>
  );
}

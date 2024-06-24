import IUser from "@/types/user.type";
import { Card, CardBody, Image } from "@nextui-org/react";

interface IPreview {
  user: IUser;
}

export default function Preview(props: IPreview) {
  return (
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
  );
}
